/* Dalgu recovers an AES key: a small state machine driving the inline SVG. */
(function () {
  var svg = document.getElementById('scene');
  if (!svg) return;
  var NS = 'http://www.w3.org/2000/svg';
  var wrap = document.getElementById('scene-wrap');
  var keyG = document.getElementById('keybytes');
  var status = document.getElementById('keystatus');
  var count = document.getElementById('tracecount');
  var trace = document.getElementById('trace');
  var caption = document.getElementById('scene-caption');
  var replay = document.getElementById('replay');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- the key we "recover" (the classic FIPS-197 example key) ---
  var KEY = ['2b','7e','15','16','28','ae','d2','a6','ab','f7','15','88','09','cf','4f','3c'];
  var TOTAL = 500;        // traces to collect
  var I18N = {
    ko: { idle: '파형 수집 대기 중…', collecting: '파형을 모으는 중…', locked: function(n){ return n + ' / 16 바이트 확정'; }, done: '16 / 16 바이트 확정 — 키 복구 완료',
          count: function(n){ return '수집한 파형: ' + n + ' / ' + TOTAL; },
          cap0: '달구가 칩에 프로브를 갖다 댑니다…', cap1: '⚡ 칩이 암호화를 수행하는 동안 전력 소모를 측정합니다.', cap4: '📈 파형이 쌓일수록 통계 분석으로 키의 각 바이트가 드러납니다.', cap12: '🔓 거의 다 왔습니다… 마지막 바이트를 찾는 중!', capDone: '🎉 비밀키 복구 성공! 이걸 직접 해보는 게 이번 클래스입니다.' },
    en: { idle: 'Waiting for traces…', collecting: 'Collecting traces…', locked: function(n){ return n + ' / 16 bytes recovered'; }, done: '16 / 16 bytes recovered — key found',
          count: function(n){ return 'Traces: ' + n + ' / ' + TOTAL; },
          cap0: 'Dalgu places the probe on the chip…', cap1: '⚡ Measuring power consumption while the chip encrypts.', cap4: '📈 As traces pile up, statistics reveal the key one byte at a time.', cap12: '🔓 Almost there… hunting the last bytes!', capDone: '🎉 Key recovered! This is exactly what you will do in the class.' }
  };
  function L() { return I18N[document.documentElement.lang === 'en' ? 'en' : 'ko']; }
  var DURATION = 9000;    // ms for the collection phase

  // build the 16 key bytes as plain text
  var texts = [];
  for (var i = 0; i < 16; i++) {
    var t = document.createElementNS(NS, 'text');
    t.setAttribute('x', 120 + i * 44); t.setAttribute('y', 72); t.setAttribute('text-anchor', 'middle');
    t.setAttribute('class', 'kt');
    t.textContent = '??';
    keyG.appendChild(t); texts.push(t);
  }

  function hex() { return (Math.random() * 256 | 0).toString(16).padStart(2, '0'); }

  // --- power trace: a noisy AES-like waveform scrolling across the scope ---
  var samples = [];
  function tracePoint(k) {
    var round = Math.sin(k / 6) * 10;               // slow "rounds" envelope
    var sbox = (k % 11 === 0) ? -18 : 0;            // periodic spikes
    var noise = (Math.random() - 0.5) * 10;
    return 190 + round + sbox + noise;
  }
  function drawTrace(t) {
    var n = 110;
    if (samples.length === 0) for (var k = 0; k < n; k++) samples.push(tracePoint(k));
    samples.shift(); samples.push(tracePoint(t));
    var pts = [];
    for (var j = 0; j < n; j++) pts.push((628 + j * (214 / (n - 1))).toFixed(1) + ',' + samples[j].toFixed(1));
    trace.setAttribute('points', pts.join(' '));
  }

  var raf = null, timers = [];
  function clearAll() {
    if (raf) cancelAnimationFrame(raf); raf = null;
    timers.forEach(clearTimeout); timers = [];
    wrap.classList.remove('probing', 'zap', 'done');
  }
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  function reset() {
    clearAll();
    for (var i = 0; i < 16; i++) { texts[i].setAttribute('class', 'kt'); texts[i].textContent = '??';
    }
    status.textContent = L().idle;
    count.textContent = L().count(0);
    trace.setAttribute('points', '');
    samples = [];
    caption.textContent = L().cap0;
  }

  function run() {
    reset();
    if (reduced) { finish(true); return; }
    later(function () { wrap.classList.add('probing'); }, 300);
    later(function () {
      wrap.classList.add('zap');
      caption.textContent = L().cap1;
      var start = performance.now(), tick = 0, locked = 0;
      status.textContent = L().collecting;
      function frame(now) {
        var p = Math.min(1, (now - start) / DURATION);
        tick++;
        drawTrace(tick);
        var n = Math.floor(p * TOTAL);
        count.textContent = L().count(n);
        // flicker unlocked bytes, lock one byte per 1/16 of progress
        var shouldLock = Math.floor(p * 16);
        for (var i = locked; i < 16; i++) if (tick % 3 === 0) texts[i].textContent = hex();
        while (locked < shouldLock && locked < 16) {
          texts[locked].textContent = KEY[locked];
          texts[locked].setAttribute('class', 'kt kt--locked');
          locked++;
          if (locked === 4) caption.textContent = L().cap4;
          if (locked === 12) caption.textContent = L().cap12;
          status.textContent = L().locked(locked);
        }
        if (p < 1) raf = requestAnimationFrame(frame); else finish(false);
      }
      raf = requestAnimationFrame(frame);
    }, 1000);
  }

  function finish(instant) {
    wrap.classList.remove('zap');
    for (var i = 0; i < 16; i++) {
      texts[i].textContent = KEY[i]; texts[i].setAttribute('class', 'kt kt--locked');
    }
    status.textContent = L().done;
    count.textContent = L().count(TOTAL);
    caption.textContent = L().capDone;
    wrap.classList.add('done');
    if (!instant) later(run, 5000);
  }

  replay.addEventListener('click', run);
  // language toggle: switch, remember, restart the scene so captions follow
  Array.prototype.forEach.call(document.querySelectorAll('.lang-toggle button'), function (b) {
    b.addEventListener('click', function () {
      var lang = b.getAttribute('data-lang');
      document.documentElement.lang = lang;
      try { localStorage.setItem('sca-lang', lang); } catch (e) {}
      document.title = lang === 'en' ? 'Side-Channel Analysis One-Day Class | DGIST PACL' : '부채널 분석 원데이 클래스 | DGIST PACL';
      run();
    });
  });
  run();
})();
