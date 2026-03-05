
/**
 * @fileOverview High-rigor, curriculum-aligned hard-coded question bank.
 * NO AI generation. NO vague prompts.
 * Each question is a concrete task with real calculations and scenarios.
 */

export type Question = {
  id: string;
  subject: string;
  topic: string;
  subtopic: string;
  difficulty: "easy" | "medium" | "hard";
  rigor: 1 | 2 | 3;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

export const QUESTION_BANK: Question[] = [
  // --- ALGEBRA 1 ---
  {
    id: "alg1-lin-01",
    subject: "Algebra 1",
    topic: "Equations",
    subtopic: "Linear Equations",
    difficulty: "easy",
    rigor: 1,
    question: "Solve for $x$: $5x - 15 = 35$",
    choices: ["$x = 10$", "$x = 4$", "$x = 25$", "$x = 5$"],
    answerIndex: 0,
    explanation: "Add 15 to both sides: $5x = 50$. Divide by 5: $x = 10$."
  },
  {
    id: "alg1-lin-02",
    subject: "Algebra 1",
    topic: "Equations",
    subtopic: "Linear Equations",
    difficulty: "medium",
    rigor: 2,
    question: "A technician charges a $45 flat fee plus $25 per hour. If a total bill was $170, how many hours did the job take?",
    choices: ["5 hours", "6 hours", "4 hours", "7 hours"],
    answerIndex: 0,
    explanation: "Set up the equation: $45 + 25h = 170$. Subtract 45: $25h = 125$. Divide by 25: $h = 5$."
  },
  {
    id: "alg1-lin-03",
    subject: "Algebra 1",
    topic: "Equations",
    subtopic: "Linear Equations",
    difficulty: "hard",
    rigor: 3,
    question: "Solve for $x$: $3(2x - 4) + 10 = 2(x + 5) + 6$",
    choices: ["$x = 4.5$", "$x = 5$", "$x = 4$", "$x = 6$"],
    answerIndex: 0,
    explanation: "Expand: $6x - 12 + 10 = 2x + 10 + 6 \\implies 6x - 2 = 2x + 16$. Group terms: $4x = 18 \\implies x = 4.5$."
  },
  {
    id: "alg1-ineq-01",
    subject: "Algebra 1",
    topic: "Inequalities",
    subtopic: "Linear Inequalities",
    difficulty: "medium",
    rigor: 2,
    question: "Solve the inequality: $-3x + 7 < 22$",
    choices: ["$x > -5$", "$x < -5$", "$x > 5$", "$x < 5$"],
    answerIndex: 0,
    explanation: "Subtract 7: $-3x < 15$. Divide by -3 and FLIP the sign: $x > -5$."
  },

  // --- ALGEBRA 2 ---
  {
    id: "alg2-quad-01",
    subject: "Algebra 2",
    topic: "Functions",
    subtopic: "Quadratic Functions",
    difficulty: "easy",
    rigor: 1,
    question: "What is the vertex of the parabola $y = (x - 4)^2 + 7$?",
    choices: ["$(4, 7)$", "$(-4, 7)$", "$(4, -7)$", "$(7, 4)$"],
    answerIndex: 0,
    explanation: "In vertex form $y = a(x - h)^2 + k$, the vertex is $(h, k)$. Here $h=4$ and $k=7$."
  },
  {
    id: "alg2-quad-02",
    subject: "Algebra 2",
    topic: "Functions",
    subtopic: "Quadratic Functions",
    difficulty: "medium",
    rigor: 2,
    question: "Find the roots of $x^2 - 5x + 6 = 0$.",
    choices: ["$x = 2, 3$", "$x = -2, -3$", "$x = 1, 6$", "$x = -1, -6$"],
    answerIndex: 0,
    explanation: "Factor the quadratic: $(x - 2)(x - 3) = 0$. Solving gives $x = 2$ and $x = 3$."
  },

  // --- AP CALCULUS AB ---
  {
    id: "apcab-der-01",
    subject: "AP Calculus AB",
    topic: "Derivatives",
    subtopic: "Basic Derivatives",
    difficulty: "easy",
    rigor: 1,
    question: "Find $\\frac{d}{dx} [4x^3 - 5x^2 + 7]$.",
    choices: ["$12x^2 - 10x$", "$12x^3 - 10x^2$", "$4x^2 - 5x$", "$12x^2 - 10$"],
    answerIndex: 0,
    explanation: "Apply the power rule: $\\frac{d}{dx}[ax^n] = nax^{n-1}$. Constant derivative is 0."
  },
  {
    id: "apcab-int-01",
    subject: "AP Calculus AB",
    topic: "Integrals",
    subtopic: "Basic Integration",
    difficulty: "medium",
    rigor: 2,
    question: "Evaluate $\\int (3x^2 + 2x) dx$.",
    choices: ["$x^3 + x^2 + C$", "$3x^3 + 2x^2 + C$", "$x^3 + 2x^2 + C$", "$x^2 + x + C$"],
    answerIndex: 0,
    explanation: "Apply the reverse power rule: $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$."
  },

  // --- AP CALCULUS BC ---
  {
    id: "apcbc-ser-01",
    subject: "AP Calculus BC",
    topic: "Series",
    subtopic: "Infinite Series",
    difficulty: "hard",
    rigor: 3,
    question: "Determine the interval of convergence for $\\sum_{n=1}^{\\infty} \\frac{(x-3)^n}{n \\cdot 2^n}$.",
    choices: ["$1 \\leq x < 5$", "$1 < x < 5$", "$1 < x \\leq 5$", "$x = 3$"],
    answerIndex: 0,
    explanation: "Use the Ratio Test: $\\lim_{n \\to \\infty} |\\frac{x-3}{2}| < 1 \\implies 1 < x < 5$. Test endpoints: $x=1$ converges (alternating), $x=5$ diverges (harmonic)."
  },

  // --- AP BIOLOGY ---
  {
    id: "apbio-mol-01",
    subject: "AP Biology",
    topic: "Cells",
    subtopic: "Molecular Biology",
    difficulty: "medium",
    rigor: 2,
    question: "Which enzyme is responsible for unwinding the DNA double helix during replication?",
    choices: ["Helicase", "DNA Polymerase", "Ligase", "Primase"],
    answerIndex: 0,
    explanation: "Helicase 'unzips' the DNA strands by breaking hydrogen bonds between nitrogenous bases."
  },

  // --- AP CHEMISTRY ---
  {
    id: "apchem-kin-01",
    subject: "AP Chemistry",
    topic: "Kinetics",
    subtopic: "Kinetics",
    difficulty: "hard",
    rigor: 3,
    question: "A first-order reaction has a rate constant $k = 0.05 \\text{ min}^{-1}$. How long will it take for the concentration to drop to 25% of its initial value?",
    choices: ["27.7 min", "13.9 min", "20.0 min", "5.0 min"],
    answerIndex: 0,
    explanation: "For first-order, $t = \\frac{\\ln([A]_0/[A]_t)}{k}$. Here $[A]_0/[A]_t = 4$. $t = \\ln(4)/0.05 \\approx 27.7$."
  },

  // --- AP COMPUTER SCIENCE A ---
  {
    id: "apcsa-rec-01",
    subject: "AP Computer Science A",
    topic: "Recursion",
    subtopic: "Recursion",
    difficulty: "hard",
    rigor: 3,
    question: "What is returned by `mystery(3)`?\n`public int mystery(int n) { if (n == 0) return 1; return n * mystery(n - 1); }`",
    choices: ["6", "3", "0", "1"],
    answerIndex: 0,
    explanation: "This is a factorial function: $3 \\times 2 \\times 1 \\times 1 = 6$."
  },

  // --- AP US GOVERNMENT ---
  {
    id: "apgov-fed-01",
    subject: "AP US Government",
    topic: "Foundations",
    subtopic: "Federalism",
    difficulty: "medium",
    rigor: 2,
    question: "Which amendment reserves powers not delegated to the federal government to the states?",
    choices: ["Tenth Amendment", "First Amendment", "Fourteenth Amendment", "Second Amendment"],
    answerIndex: 0,
    explanation: "The Tenth Amendment is the basis of 'reserved powers' for the states."
  },

  // --- SPANISH ---
  {
    id: "span-pres-01",
    subject: "Spanish",
    topic: "Verbs",
    subtopic: "Present Tense",
    difficulty: "easy",
    rigor: 1,
    question: "Translate: 'We eat apples.'",
    choices: ["Nosotros comemos manzanas.", "Nosotros comen manzanas.", "Nosotros como manzanas.", "Nosotros comes manzanas."],
    answerIndex: 0,
    explanation: "The 'we' (nosotros) form of -er verbs ends in -emos."
  }
,
  // --- ALGEBRA 2 --- Complex Numbers
  {
    id: "alg2-complex-01",
    subject: "Algebra 2",
    topic: "Complex Numbers",
    subtopic: "Complex Numbers",
    difficulty: "easy",
    rigor: 1,
    question: "What is i²?",
    choices: ["-1", "1", "i", "-i"],
    answerIndex: 0,
    explanation: "By definition, i² = -1.",
  },
  {
    id: "alg2-complex-02",
    subject: "Algebra 2",
    topic: "Complex Numbers",
    subtopic: "Complex Numbers",
    difficulty: "medium",
    rigor: 2,
    question: "Compute (3 + 4i) + (1 - 2i).",
    choices: ["4 + 2i", "4 + 6i", "2 + 6i", "2i"],
    answerIndex: 0,
    explanation: "Add real parts and imaginary parts separately: 3+1=4 and 4i-2i=2i.",
  },
  {
    id: "alg2-complex-03",
    subject: "Algebra 2",
    topic: "Complex Numbers",
    subtopic: "Complex Numbers",
    difficulty: "hard",
    rigor: 3,
    question: "Compute (2 - 3i)(1 + 4i).",
    choices: ["14 + 5i", "14 - 5i", "-10 + 11i", "-10 - 11i"],
    answerIndex: 0,
    explanation: "Multiply and combine: (2)(1)+(2)(4i)+(-3i)(1)+(-3i)(4i)=14+5i.",
  }
];

export function getQuestionPool(subject: string, subtopic: string, difficulty?: string): Question[] {
  const normalize = (s: string) => s?.trim().toLowerCase() || "";
  
  return QUESTION_BANK.filter(q => 
    normalize(q.subject) === normalize(subject) && 
    (normalize(subtopic) === "all topics" || normalize(q.subtopic) === normalize(subtopic)) &&
    (!difficulty || normalize(q.difficulty) === normalize(difficulty))
  );
}
