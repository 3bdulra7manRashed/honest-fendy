export interface Book {
  id: string;
  title: string;
  category: string;
  description: string;
  pdfUrl: string;
  coverImage?: string;
}

export const books: Book[] = [
  {
    id: "useful-knowledge",
    title: "علم ينتفع به",
    category: "أبحاث ومقالات",
    description: "سلسلة معرفية تجمع الأبحاث والعلوم النافعة والمستدامة لخدمة المجتمع.",
    pdfUrl: "/books/book-1.pdf"
  },
  {
    id: "sky-earth-rift",
    title: "السماء ذات الرجع والأرض ذات الصدع",
    category: "الإعجاز العلمي",
    description: "دراسة علمية وتدبرية في القوانين الكونية وحركة السماء والأرض وتوازنهما.",
    pdfUrl: "/books/book-2.pdf"
  },
  {
    id: "al-yaseen",
    title: "الياسين: نداء الأكرمين من رب العالمين",
    category: "سيرة وتاريخ",
    description: "قصة ونبوة نبي الله إلياس وتدبر في نداء الأكرمين والدروس والعبر المستفادة.",
    pdfUrl: "/books/book-3.pdf"
  },
  {
    id: "wisdom-judgments",
    title: "حكم من لدن حكيم عليم (الجزء الأول)",
    category: "تدبر وتفسير",
    description: "مجموعة من الحكم والملاحظات التدبرية القائمة على آيات الذكر الحكيم.",
    pdfUrl: "/books/book-4.pdf"
  },
  {
    id: "philosophy-attitudes",
    title: "فلسفة المواقف",
    category: "فلسفة وفكر",
    description: "طرح فكري في تحليل المواقف الإنسانية، التفكير الأخلاقي، والمنهجية الفلسفية.",
    pdfUrl: "/books/book-5.pdf"
  },
  {
    id: "sound-heart",
    title: "قلب سليم",
    category: "تزكية وتطوير",
    description: "كتاب يتناول سلامة القلب والوعي، التوازن النفسي والروحي للأفراد في المجتمع.",
    pdfUrl: "/books/book-6.pdf"
  },
  {
    id: "revelation-engineering-map",
    title: "مشروع هندسة الوحي - الخارطة الكاملة",
    category: "هندسة الوحي",
    description: "خارطة شاملة لمشروع هندسة الوحي لتوضيح العلاقة بين النصوص والتطبيق المعرفي.",
    pdfUrl: "/books/book-7.pdf"
  },
  {
    id: "arab-prophets",
    title: "أنبياء العرب",
    category: "سيرة وتاريخ",
    description: "أبحاث ودراسات حول تاريخ الأنبياء في شبه الجزيرة العربية ومسارات دعوتهم.",
    pdfUrl: "/books/book-8.pdf"
  },
  {
    id: "ibrahim-hagar",
    title: "إبراهيم وهاجر",
    category: "سيرة وتاريخ",
    description: "دراسة تاريخية فكرية في سيرة الخليل إبراهيم وأم عهد الصفاء هاجر.",
    pdfUrl: "/books/book-9.pdf"
  },
  {
    id: "cosmic-splitting-merging",
    title: "الفتق والرتق",
    category: "الإعجاز العلمي",
    description: "بحث تدبري وعلمي يتناول مفهوم الفتق والرتق وتطبيقاته الكونية الهندسية.",
    pdfUrl: "/books/book-10.pdf"
  },
  {
    id: "ali-fatima",
    title: "علي وفاطمة",
    category: "سيرة وتاريخ",
    description: "دراسة في بيت النبوة وسيرة أمير المؤمنين علي وفاطمة الزهراء رضي الله عنهما.",
    pdfUrl: "/books/book-11.pdf"
  },
  {
    id: "mohammad-khadija",
    title: "محمد وخديجة",
    category: "سيرة وتاريخ",
    description: "تأملات في بيت النبوة الأول وسيرة الرسول ﷺ مع أم المؤمنين خديجة رضي الله عنها.",
    pdfUrl: "/books/book-12.pdf"
  },
  {
    id: "mohammad-aisha",
    title: "محمد وعائشة",
    category: "سيرة وتاريخ",
    description: "تأملات في السيرة العطرة للرسول ﷺ مع أم المؤمنين عائشة رضي الله عنها.",
    pdfUrl: "/books/book-13.pdf"
  },
  {
    id: "philosophy-attitudes-self-rebuilding",
    title: "مشروع فلسفة المواقف: من التخلي إلى إعادة بناء الذات",
    category: "تطوير الذات",
    description: "منهجية عملية للانتقال من التخلي الفكري والنفسي لبناء شخصية متوازنة وفاعلة.",
    pdfUrl: "/books/book-14.pdf"
  },
  {
    id: "revelation-engineering",
    title: "هندسة الوحي",
    category: "هندسة الوحي",
    description: "النسخة الكاملة لكتاب هندسة الوحي الذي يؤسس لمنهجية قراءة وبحث متكاملة.",
    pdfUrl: "/books/book-15.pdf"
  },
  {
    id: "environmental-balance-scale",
    title: "وأقيموا الوزن بالقسط: قوانين التوازن البيئي",
    category: "التوازن البيئي",
    description: "دراسة تأصيلية عميقة في التوازن البيئي واستدامة الموارد استناداً لقوانين الوحي.",
    pdfUrl: "/books/book-16.pdf"
  },
  {
    id: "chosen-for-myself",
    title: "واصطنعتك لنفسي",
    category: "تزكية وتطوير",
    description: "تدبر معرفي في محطات الاختيار والتزكية الإلهية والأبعاد التربوية والروحية.",
    pdfUrl: "/books/book-17.pdf"
  }
];
