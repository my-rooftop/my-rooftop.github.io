const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, ImageRun, AlignmentType, BorderStyle, Header, Footer, TabStopType, TabStopPosition } = require('docx');

const BLUE = "1F4F9C", INK = "1B2A41", MUTED = "6B7686";
const font = "Calibri";
const P = (children, opts={}) => new Paragraph({ spacing: { after: 160, line: 300 }, alignment: AlignmentType.JUSTIFIED, ...opts, children });
const T = (text, opts={}) => new TextRun({ text, font, size: 21, color: INK, ...opts });
const H = (text) => new Paragraph({ spacing: { before: 220, after: 80 }, children: [ new TextRun({ text, font, size: 22, bold: true, color: BLUE }) ] });
const logo = fs.readFileSync('../../images/sca-class/pacl_logo.png');
const sigLine = () => new Paragraph({ spacing: { before: 700, after: 60 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: INK, space: 1 } }, children: [ T(" ") ], indent: { right: 6500 } });
const footer = (left, right) => new Footer({ children: [ new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }], border: { top: { style: BorderStyle.SINGLE, size: 4, color: "D9E1EC", space: 4 } }, children: [ T(left, { size: 16, color: "8A94A3" }), T("\t" + right, { size: 16, color: "8A94A3" }) ] }) ] });
const page = { margin: { top: 1300, bottom: 1100, left: 1250, right: 1250 } };

// ---------------- Advisor letter ----------------
const letter = new Document({ styles: { default: { document: { run: { font, size: 21 } } } }, sections: [{
  properties: { page },
  footers: { default: footer("Letter from the research advisor", "Asiacrypt 2026 Student Stipend Application · Jaeho Jeon") },
  children: [
    new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }], spacing: { after: 0 }, children: [
      new TextRun({ text: "DGIST · Privacy and Applied Cryptography Lab (PACL)", font, size: 26, bold: true, color: BLUE }),
      new TextRun({ text: "\t" }), new ImageRun({ type: "png", data: logo, transformation: { width: 64, height: 66 } }) ] }),
    new Paragraph({ spacing: { after: 120 }, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: BLUE, space: 6 } }, children: [ T("Department of Electrical Engineering and Computer Science, Daegu Gyeongbuk Institute of Science and Technology, Daegu, South Korea", { size: 17, color: MUTED }) ] }),
    P([T("October 19, 2026", { color: "3B4A60" })], { alignment: AlignmentType.LEFT, spacing: { before: 200, after: 240 } }),
    P([T("To the Asiacrypt 2026 Student Stipend Committee", { bold: true })], { alignment: AlignmentType.LEFT }),
    P([T("Re: Letter of support and justification of financial need for Jaeho Jeon", { bold: true })], { alignment: AlignmentType.LEFT }),
    P([T("I am writing to support the student stipend application of my Ph.D. student, "), T("Jaeho Jeon", { bold: true }), T(", who will present the paper "), T("“Codeword Masking Can Be Harmful Under Replay Attacks on HQC”", { italics: true }), T(" at Asiacrypt 2026 as its first author.")]),
    P([T("Jaeho joined my laboratory as a master's student in 2024 and began his Ph.D. in February 2026. He works on side-channel analysis and the implementation security of post-quantum cryptography. The Asiacrypt paper is his own initiative: he noticed that a standard countermeasure for HQC behaves unexpectedly under replay attacks, developed the analysis, and carried the work through to acceptance. He is also a co-author of a paper accepted to NeurIPS 2026 and received the Grand Prize of the 4th KICS HFR Paper Award in 2026. In addition to research, he mentors undergraduate research teams, one of which won two national-level awards for a PQC implementation on ARM Cortex-M4 under his guidance, and he organized our lab's AI & Crypto Summer Camp this year. He is exactly the kind of early-career researcher who benefits most from presenting at, and meeting the community of, an IACR conference.")]),
    P([T("Supplementary funding. ", { bold: true }), T("Jaeho has applied for the student presenter registration fee waiver. For his travel and accommodation in Hong Kong, the laboratory will contribute up to USD 100; no further institutional travel funding is available for this trip. I would appreciate the committee's support for the remaining cost.")]),
    P([T("I am confident that Jaeho will make full use of the opportunity, and that his participation will benefit both his development and the discussion of countermeasures for code-based PQC at the conference. Please do not hesitate to contact me if any further information is needed.")]),
    P([T("Sincerely,")], { alignment: AlignmentType.LEFT }),
    sigLine(),
    P([T("Young-Sik Kim", { bold: true }), T(", Professor")], { alignment: AlignmentType.LEFT, spacing: { after: 0 } }),
    P([T("Department of Electrical Engineering and Computer Science, DGIST")], { alignment: AlignmentType.LEFT, spacing: { after: 0 } }),
    P([T("Privacy and Applied Cryptography Lab (PACL)")], { alignment: AlignmentType.LEFT, spacing: { after: 0 } }),
    P([T("ysk@dgist.ac.kr · +82-10-3251-1418")], { alignment: AlignmentType.LEFT }),
  ] }] });

// ---------------- Student statement ----------------
const statement = new Document({ styles: { default: { document: { run: { font, size: 21 } } } }, sections: [{
  properties: { page },
  footers: { default: footer("Jaeho Jeon · Student Statement", "Asiacrypt 2026 Student Stipend Application") },
  children: [
    new Paragraph({ spacing: { after: 20 }, children: [ T("ASIACRYPT 2026 · STUDENT STIPEND APPLICATION", { size: 16, bold: true, color: MUTED }) ] }),
    new Paragraph({ spacing: { after: 80 }, children: [ new TextRun({ text: "Student Statement", font, size: 34, bold: true, color: BLUE }) ] }),
    new Paragraph({ spacing: { after: 240 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "D9E1EC", space: 6 } }, children: [
      T("Jaeho Jeon", { bold: true, size: 19 }), T(" · Ph.D. student, Department of Electrical Engineering and Computer Science, DGIST (Daegu, South Korea) · Privacy and Applied Cryptography Lab (PACL), advised by Prof. Young-Sik Kim · dgwogh@dgist.ac.kr", { size: 19, color: "3B4A60" }),
      new TextRun({ break: 1 }), T("Presenting: ", { size: 19, color: "3B4A60" }), T("“Codeword Masking Can Be Harmful Under Replay Attacks on HQC”", { bold: true, size: 19 }), T(" (first author), accepted to Asiacrypt 2026", { size: 19, color: "3B4A60" }) ] }),
    H("Summary of research interests"),
    P([T("My research focuses on "), T("side-channel analysis", { bold: true }), T(" and the implementation security of cryptographic systems. I study how secret information leaks from devices through physical channels such as power consumption, and how countermeasures that look sound on paper can fail, or even backfire, when they meet a concrete attacker model. My recent work centers on "), T("post-quantum cryptography (PQC)", { bold: true }), T(", in particular code-based schemes: our Asiacrypt 2026 paper shows that codeword masking, a widely used countermeasure in HQC implementations, can actually be harmful under replay attacks, and analyzes the conditions under which it reduces rather than improves security. I have also worked on PQC implementations on constrained devices (ARM Cortex-M4), and on coding-theoretic tools for robustness, which led to a paper accepted to NeurIPS 2026.")]),
    P([T("My long-term goal is to become a recognized expert in side-channel analysis and to grow outward from it into computer architecture, networking, and coding theory, so that the security of a cryptographic system can be assessed end to end, from the algorithm down to the silicon.")]),
    H("How I will benefit from participating in Asiacrypt"),
    P([T("Asiacrypt 2026 will be my first time presenting at an IACR flagship conference. I am a first-year Ph.D. student, and this paper is the first work I have led from the initial observation to the final analysis. Presenting it in person to the researchers who design, implement, and attack code-based schemes is the most direct way to test our claims, to learn which assumptions the community finds convincing, and to understand which follow-up questions matter most. Since HQC was selected by NIST for standardization, the question of which countermeasures are safe to deploy has become urgent, and I expect the discussions around our result to shape the next steps of my thesis.")]),
    P([T("Beyond my own talk, Asiacrypt is where the PQC, implementation-security, and side-channel communities meet. My lab is relatively small and geographically distant from most of these groups, so a few days of conversations at the conference are worth months of reading papers alone. I also mentor undergraduate research teams at DGIST and help organize our lab's cryptography summer camp, so what I learn at Asiacrypt will be passed on to students deciding whether to pursue cryptography.")]),
    P([T("I would be grateful for the opportunity to present our work and to take part in the conference in person. Thank you for considering my application.")]),
    sigLine(),
    P([T("Jaeho Jeon", { bold: true }), T(" · October 19, 2026")], { alignment: AlignmentType.LEFT }),
  ] }] });

(async () => {
  fs.writeFileSync('Advisor_Letter_YoungSikKim.docx', await Packer.toBuffer(letter));
  fs.writeFileSync('Student_Statement_JaehoJeon.docx', await Packer.toBuffer(statement));
  console.log('docx written');
})();
