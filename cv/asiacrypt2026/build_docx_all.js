const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, ImageRun, AlignmentType, BorderStyle, Footer, TabStopType, TabStopPosition, Table, TableRow, TableCell, WidthType, ShadingType, VerticalAlign } = require('docx');
const BLUE="1F4F9C", INK="1B2A41", MUTED="6B7686", LINE="D9E1EC"; const font="Calibri";
const T=(text,o={})=>new TextRun({text,font,size:21,color:INK,...o});
const P=(children,o={})=>new Paragraph({spacing:{after:160,line:300},alignment:AlignmentType.JUSTIFIED,...o,children});
const H=(text)=>new Paragraph({spacing:{before:220,after:80},children:[new TextRun({text,font,size:22,bold:true,color:BLUE})]});
const noB={style:BorderStyle.NONE,size:0,color:"FFFFFF"}; const noBorders={top:noB,bottom:noB,left:noB,right:noB,insideHorizontal:noB,insideVertical:noB};
const logo=fs.readFileSync('../../images/sca-class/pacl_logo.png'); const photo=fs.readFileSync('../../images/profile.jpg');
const sigLine=()=>new Paragraph({spacing:{before:700,after:60},border:{bottom:{style:BorderStyle.SINGLE,size:6,color:INK,space:1}},children:[T(" ")],indent:{right:6500}});
const footer=(l,r)=>new Footer({children:[new Paragraph({tabStops:[{type:TabStopType.RIGHT,position:TabStopPosition.MAX}],border:{top:{style:BorderStyle.SINGLE,size:4,color:LINE,space:4}},children:[T(l,{size:16,color:"8A94A3"}),T("\t"+r,{size:16,color:"8A94A3"})]})]});
const page={margin:{top:1300,bottom:1100,left:1250,right:1250}};

// ---- CV helpers: 2-col borderless table rows (date | text)
const CW=[1900,7700], TOT=9600;
const cvH=(t)=>new Paragraph({spacing:{before:200,after:60},border:{bottom:{style:BorderStyle.SINGLE,size:4,color:LINE,space:2}},children:[new TextRun({text:t.toUpperCase(),font,size:19,bold:true,color:BLUE,characterSpacing:30})]});
const cell=(children,w)=>new TableCell({width:{size:w,type:WidthType.DXA},borders:noBorders,margins:{top:30,bottom:30,left:0,right:80},verticalAlign:VerticalAlign.TOP,children});
const row=(when,runs)=>new TableRow({children:[cell([new Paragraph({spacing:{after:0},children:[T(when,{size:18,color:MUTED})]})],CW[0]),cell([new Paragraph({spacing:{after:0,line:260},children:runs})],CW[1])]});
const tbl=(rows)=>new Table({width:{size:TOT,type:WidthType.DXA},columnWidths:CW,borders:noBorders,rows});
const pub=(runs)=>new Paragraph({spacing:{after:80,line:260},indent:{left:360,hanging:360},children:runs});
const me=(t)=>T(t,{bold:true,underline:{}});

const cv=[
  new Table({width:{size:TOT,type:WidthType.DXA},columnWidths:[8000,1600],borders:noBorders,rows:[new TableRow({children:[
    cell([
      new Paragraph({spacing:{after:40},children:[new TextRun({text:"Jaeho Jeon",font,size:44,bold:true,color:BLUE}),new TextRun({text:"  전재호 · 田宰昊",font:"Malgun Gothic",size:20,bold:true,color:MUTED})]}),
      new Paragraph({spacing:{after:20},children:[T("Ph.D. Student, Department of Electrical Engineering and Computer Science, DGIST",{bold:true,size:20})]}),
      new Paragraph({spacing:{after:60},children:[T("Privacy and Applied Cryptography Lab (PACL) · Advisor: Prof. Young-Sik Kim",{size:19,color:"3B4A60"})]}),
      new Paragraph({spacing:{after:0,line:250},children:[T("Email ",{bold:true,size:17,color:BLUE}),T("dgwogh@dgist.ac.kr   ",{size:17}),T("Web ",{bold:true,size:17,color:BLUE}),T("my-rooftop.github.io   ",{size:17}),T("GitHub ",{bold:true,size:17,color:BLUE}),T("my-rooftop   ",{size:17}),T("Scholar ",{bold:true,size:17,color:BLUE}),T("h2pBQrcAAAAJ",{size:17})]}),
      new Paragraph({spacing:{after:0,line:250},children:[T("ORCID ",{bold:true,size:17,color:BLUE}),T("0009-0007-9074-8491   ",{size:17}),T("LinkedIn ",{bold:true,size:17,color:BLUE}),T("jaeho-jeon-3a063425b   ",{size:17}),T("Location ",{bold:true,size:17,color:BLUE}),T("Daegu, South Korea",{size:17})]}),
    ],8000),
    cell([new Paragraph({alignment:AlignmentType.RIGHT,children:[new ImageRun({type:"jpg",data:photo,transformation:{width:92,height:92}})]})],1600)]})]}),
  new Paragraph({spacing:{after:60},border:{bottom:{style:BorderStyle.SINGLE,size:12,color:BLUE,space:4}},children:[T(" ")]}),
  cvH("Research Interests"),
  new Paragraph({spacing:{after:40,line:260},children:[T("Side-channel analysis · Hardware security · Post-quantum cryptography implementation · Cryptographic engineering · Computer architecture · Coding theory",{bold:true,color:BLUE,size:19})]}),
  new Paragraph({spacing:{after:0,line:260},children:[T("My research focuses on "),T("side-channel analysis",{bold:true}),T(". My goal is to become a uniquely recognized expert in side-channel analysis, and to gradually expand into computer architecture, quantum computing, networking, and coding theory.")]}),
  cvH("Education"),
  tbl([
    row("2026.02 – present",[T("Ph.D. student",{bold:true}),T(", Electrical Engineering and Computer Science, DGIST")]),
    row("2024.02 – 2026.02",[T("M.S.",{bold:true}),T(", Electrical Engineering and Computer Science, DGIST")]),
    row("2017.02 – 2024.02",[T("B.S.",{bold:true}),T(", School of Undergraduate Studies, DGIST")]),
    row("2014.03 – 2017.02",[T("Cheonan Upsung High School, Cheonan")]),
  ]),
  cvH("Publications"),
  pub([T("RB-LDC: Redundancy-Balanced Latent Coding for Robust Diffusion. ",{bold:true}),T("Hyunseok Jeong, "),me("Jaeho Jeon"),T(", Young-Sik Kim. "),T("The Fortieth Annual Conference on Neural Information Processing Systems (NeurIPS 2026)",{italics:true}),T(", accepted.")]),
  pub([T("Codeword Masking Can Be Harmful Under Replay Attacks on HQC. ",{bold:true}),me("Jaeho Jeon"),T(", Yongseong Park, Jaeyeon Lee, Suseong Lee, Donghyen Kim, Young-Sik Kim. "),T("International Conference on the Theory and Application of Cryptology and Information Security (ASIACRYPT 2026)",{italics:true}),T(", accepted. Cryptology ePrint Archive 2026/071.")]),
  cvH("Honors & Awards"),
  tbl([
    row("2026.09",[T("Grand Prize, 4th KICS HFR Paper Award",{bold:true}),T(" (제4회 KICS HFR 논문대상), Korean Institute of Communications and Information Sciences. Yongseong Park, Hyunseok Jeong, Jaeho Jeon. "),T("Total prize $10,000.",{size:18,color:MUTED})]),
    row("2026.06",[T("GRAVITY 2026 Startup Competition",{bold:true}),T(", passed the DGIST preliminary round with a hardware-hacking (side-channel) certification service for cryptographic products. "),T("Prize $10,000.",{size:18,color:MUTED})]),
  ]),
  cvH("Teaching & Mentoring"),
  tbl([
    row("2026.06 – 2026.09",[T("Teaching Assistant",{bold:true}),T(", Pre-URP, DGIST. Mentored a student team on "),T("“Reading the Current to Break Ciphers: Side-Channel Analysis on RSA/AES”",{italics:true}),T(".")]),
    row("2025.03 – 2025.12",[T("Teaching Assistant",{bold:true}),T(", UGRP (Undergraduate Group Research Program), DGIST. Supported the team that built an optimized PQC implementation on ARM Cortex-M4. "),T("The team won two Grand Prizes: PQC Migration Challenge (NIA, 2025.11) and Undergraduate Best Paper Award, 2025 KICS Fall Conference.",{size:18,color:MUTED})]),
  ]),
  cvH("Academic & Student Services"),
  tbl([
    row("2026.07",[T("Staff",{bold:true}),T(", DGIST AI & Crypto Summer Camp 2026 — organized the camp, hosted the rump session")]),
    row("2026.04 – 2026.09",[T("President",{bold:true}),T(", DGIST Graduate Student Council — representing graduate students of all departments")]),
    row("2026.03 – present",[T("Graduate Student Representative",{bold:true}),T(", Department of EECS, DGIST")]),
    row("2024.10",[T("Treasurer",{bold:true}),T(", 2024 EECS & AI DGIST Student Conference & Happy Hour")]),
  ]),
];

const statement=[
  new Paragraph({spacing:{after:20},children:[T("ASIACRYPT 2026 · STUDENT STIPEND APPLICATION",{size:16,bold:true,color:MUTED})]}),
  new Paragraph({spacing:{after:80},children:[new TextRun({text:"Student Statement",font,size:34,bold:true,color:BLUE})]}),
  new Paragraph({spacing:{after:240},border:{bottom:{style:BorderStyle.SINGLE,size:6,color:LINE,space:6}},children:[T("Jaeho Jeon",{bold:true,size:19}),T(" · Ph.D. student, Department of Electrical Engineering and Computer Science, DGIST (Daegu, South Korea) · Privacy and Applied Cryptography Lab (PACL), advised by Prof. Young-Sik Kim · dgwogh@dgist.ac.kr",{size:19,color:"3B4A60"}),new TextRun({break:1}),T("Presenting: ",{size:19,color:"3B4A60"}),T("“Codeword Masking Can Be Harmful Under Replay Attacks on HQC”",{bold:true,size:19}),T(" (first author), accepted to Asiacrypt 2026",{size:19,color:"3B4A60"})]}),
  H("Summary of research interests"),
  P([T("My research focuses on "),T("side-channel analysis",{bold:true}),T(" and the implementation security of cryptographic systems. I study how secret information leaks from devices through physical channels such as power consumption, and how countermeasures that look sound on paper can fail, or even backfire, when they meet a concrete attacker model. My recent work centers on "),T("post-quantum cryptography (PQC)",{bold:true}),T(", in particular code-based schemes: our Asiacrypt 2026 paper shows that codeword masking, a widely used countermeasure in HQC implementations, can actually be harmful under replay attacks, and analyzes the conditions under which it reduces rather than improves security. I have also worked on PQC implementations on constrained devices (ARM Cortex-M4), and on coding-theoretic tools for robustness, which led to a paper accepted to NeurIPS 2026.")]),
  P([T("My long-term goal is to become a recognized expert in side-channel analysis and to grow outward from it into computer architecture, networking, and coding theory, so that the security of a cryptographic system can be assessed end to end, from the algorithm down to the silicon.")]),
  H("How I will benefit from participating in Asiacrypt"),
  P([T("Asiacrypt 2026 will be my first time presenting at an IACR flagship conference. I am a first-year Ph.D. student, and this paper is the first work I have led from the initial observation to the final analysis. Presenting it in person to the researchers who design, implement, and attack code-based schemes is the most direct way to test our claims, to learn which assumptions the community finds convincing, and to understand which follow-up questions matter most. Since HQC was selected by NIST for standardization, the question of which countermeasures are safe to deploy has become urgent, and I expect the discussions around our result to shape the next steps of my thesis.")]),
  P([T("Beyond my own talk, Asiacrypt is where the PQC, implementation-security, and side-channel communities meet. My lab is relatively small and geographically distant from most of these groups, so a few days of conversations at the conference are worth months of reading papers alone. I also mentor undergraduate research teams at DGIST and help organize our lab's cryptography summer camp, so what I learn at Asiacrypt will be passed on to students deciding whether to pursue cryptography.")]),
  P([T("I would be grateful for the opportunity to present our work and to take part in the conference in person. Thank you for considering my application.")]),
  sigLine(),
  P([T("Jaeho Jeon",{bold:true}),T(" · October 19, 2026")],{alignment:AlignmentType.LEFT}),
];

const letter=[
  new Paragraph({tabStops:[{type:TabStopType.RIGHT,position:TabStopPosition.MAX}],spacing:{after:0},children:[new TextRun({text:"DGIST · Privacy and Applied Cryptography Lab (PACL)",font,size:26,bold:true,color:BLUE}),new TextRun({text:"\t"}),new ImageRun({type:"png",data:logo,transformation:{width:64,height:66}})]}),
  new Paragraph({spacing:{after:120},border:{bottom:{style:BorderStyle.SINGLE,size:12,color:BLUE,space:6}},children:[T("Department of Electrical Engineering and Computer Science, Daegu Gyeongbuk Institute of Science and Technology, Daegu, South Korea",{size:17,color:MUTED})]}),
  P([T("October 19, 2026",{color:"3B4A60"})],{alignment:AlignmentType.LEFT,spacing:{before:200,after:240}}),
  P([T("To the Asiacrypt 2026 Student Stipend Committee",{bold:true})],{alignment:AlignmentType.LEFT}),
  P([T("Re: Letter of support and justification of financial need for Jaeho Jeon",{bold:true})],{alignment:AlignmentType.LEFT}),
  P([T("I am writing to support the student stipend application of my Ph.D. student, "),T("Jaeho Jeon",{bold:true}),T(", who will present the paper "),T("“Codeword Masking Can Be Harmful Under Replay Attacks on HQC”",{italics:true}),T(" at Asiacrypt 2026 as its first author.")]),
  P([T("Jaeho joined my laboratory as a master's student in 2024 and began his Ph.D. in February 2026. He works on side-channel analysis and the implementation security of post-quantum cryptography. The Asiacrypt paper is his own initiative: he noticed that a standard countermeasure for HQC behaves unexpectedly under replay attacks, developed the analysis, and carried the work through to acceptance. He is also a co-author of a paper accepted to NeurIPS 2026 and received the Grand Prize of the 4th KICS HFR Paper Award in 2026. In addition to research, he mentors undergraduate research teams, one of which won two national-level awards for a PQC implementation on ARM Cortex-M4 under his guidance, and he organized our lab's AI & Crypto Summer Camp this year. He is exactly the kind of early-career researcher who benefits most from presenting at, and meeting the community of, an IACR conference.")]),
  P([T("Supplementary funding. ",{bold:true}),T("Jaeho has applied for the student presenter registration fee waiver. For his travel and accommodation in Hong Kong, the laboratory will contribute up to USD 100; no further institutional travel funding is available for this trip. I would appreciate the committee's support for the remaining cost.")]),
  P([T("I am confident that Jaeho will make full use of the opportunity, and that his participation will benefit both his development and the discussion of countermeasures for code-based PQC at the conference. Please do not hesitate to contact me if any further information is needed.")]),
  P([T("Sincerely,")],{alignment:AlignmentType.LEFT}),
  sigLine(),
  P([T("Young-Sik Kim",{bold:true}),T(", Professor")],{alignment:AlignmentType.LEFT,spacing:{after:0}}),
  P([T("Department of Electrical Engineering and Computer Science, DGIST")],{alignment:AlignmentType.LEFT,spacing:{after:0}}),
  P([T("Privacy and Applied Cryptography Lab (PACL)")],{alignment:AlignmentType.LEFT,spacing:{after:0}}),
  P([T("ysk@dgist.ac.kr · +82-10-3251-1418")],{alignment:AlignmentType.LEFT}),
];

const doc=new Document({styles:{default:{document:{run:{font,size:21}}}},sections:[
  {properties:{page:{margin:{top:1100,bottom:900,left:1250,right:1250}}},footers:{default:footer("Jaeho Jeon · Curriculum Vitae","Asiacrypt 2026 Student Stipend Application · 1. CV")},children:cv},
  {properties:{page},footers:{default:footer("Jaeho Jeon · Student Statement","Asiacrypt 2026 Student Stipend Application · 2. Statement")},children:statement},
  {properties:{page},footers:{default:footer("Letter from the research advisor","Asiacrypt 2026 Student Stipend Application · 3. Advisor letter")},children:letter},
]});
(async()=>{fs.writeFileSync('Asiacrypt2026_Stipend_Application_JaehoJeon.docx',await Packer.toBuffer(doc));console.log('written');})();
