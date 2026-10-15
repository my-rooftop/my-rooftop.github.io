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
    status.textContent = '파형 수집 대기 중…';
    count.textContent = '수집한 파형: 0 / ' + TOTAL;
    trace.setAttribute('points', '');
    samples = [];
    caption.textContent = '달구가 칩에 프로브를 갖다 댑니다…';
  }

  function run() {
    reset();
    if (reduced) { finish(true); return; }
    later(function () { wrap.classList.add('probing'); }, 300);
    later(function () {
      wrap.classList.add('zap');
      caption.textContent = '⚡ 칩이 암호화를 수행하는 동안 전력 소모를 측정합니다.';
      var start = performance.now(), tick = 0, locked = 0;
      status.textContent = '파형을 모으는 중…';
      function frame(now) {
        var p = Math.min(1, (now - start) / DURATION);
        tick++;
        drawTrace(tick);
        var n = Math.floor(p * TOTAL);
        count.textContent = '수집한 파형: ' + n + ' / ' + TOTAL;
        // flicker unlocked bytes, lock one byte per 1/16 of progress
        var shouldLock = Math.floor(p * 16);
        for (var i = locked; i < 16; i++) if (tick % 3 === 0) texts[i].textContent = hex();
        while (locked < shouldLock && locked < 16) {
          texts[locked].textContent = KEY[locked];
          texts[locked].setAttribute('class', 'kt kt--locked');
          locked++;
          if (locked === 4) caption.textContent = '📈 파형이 쌓일수록 통계 분석으로 키의 각 바이트가 드러납니다.';
          if (locked === 12) caption.textContent = '🔓 거의 다 왔습니다… 마지막 바이트를 찾는 중!';
          status.textContent = locked + ' / 16 바이트 확정';
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
    status.textContent = '16 / 16 바이트 확정 — 키 복구 완료';
    count.textContent = '수집한 파형: ' + TOTAL + ' / ' + TOTAL;
    caption.textContent = '🎉 비밀키 복구 성공! 이걸 직접 해보는 게 이번 클래스입니다.';
    wrap.classList.add('done');
    if (!instant) later(run, 5000);
  }

  replay.addEventListener('click', run);
  run();
})();
