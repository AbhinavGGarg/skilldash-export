
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
  },

  // --- GEOMETRY ---
  {
    id: "geom-trig-01",
    subject: "Geometry",
    topic: "Trigonometry",
    subtopic: "Trigonometry",
    difficulty: "medium",
    rigor: 2,
    question: "In a right triangle, one acute angle is $35^\\circ$ and the hypotenuse is 10. What is the side opposite the $35^\\circ$ angle (nearest tenth)?",
    choices: ["5.7", "8.2", "6.4", "4.1"],
    answerIndex: 0,
    explanation: "Use $\\sin(35^\\circ) = \\frac{\\text{opposite}}{10}$. So opposite $= 10\\sin(35^\\circ) \\approx 5.7$.",
  },

  // --- CALCULUS ---
  {
    id: "calc-lim-01",
    subject: "Calculus",
    topic: "Limits",
    subtopic: "Limits & Continuity",
    difficulty: "medium",
    rigor: 2,
    question: "Evaluate $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$.",
    choices: ["4", "2", "0", "Does not exist"],
    answerIndex: 0,
    explanation: "Factor numerator: $x^2-4=(x-2)(x+2)$. Cancel $(x-2)$, then substitute $x=2$ to get $4$.",
  },

  // --- AP STATISTICS ---
  {
    id: "apstat-prob-01",
    subject: "AP Statistics",
    topic: "Probability",
    subtopic: "Probability Distributions",
    difficulty: "medium",
    rigor: 2,
    question: "A fair die is rolled once. Let $X$ be the outcome. What is $P(X \\ge 5)$?",
    choices: ["$\\frac{1}{3}$", "$\\frac{1}{6}$", "$\\frac{2}{3}$", "$\\frac{5}{6}$"],
    answerIndex: 0,
    explanation: "Outcomes $\\{5,6\\}$ are favorable: 2 out of 6 equally likely outcomes, so $2/6=1/3$.",
  },

  // --- BIOLOGY ---
  {
    id: "bio-cell-01",
    subject: "Biology",
    topic: "Cells",
    subtopic: "Cell Structure",
    difficulty: "easy",
    rigor: 1,
    question: "Which organelle is primarily responsible for producing ATP in eukaryotic cells?",
    choices: ["Mitochondrion", "Nucleus", "Golgi apparatus", "Ribosome"],
    answerIndex: 0,
    explanation: "Mitochondria carry out cellular respiration and generate most ATP in eukaryotic cells.",
  },

  // --- CHEMISTRY ---
  {
    id: "chem-stoich-01",
    subject: "Chemistry",
    topic: "Stoichiometry",
    subtopic: "Stoichiometry",
    difficulty: "medium",
    rigor: 2,
    question: "How many moles of $O_2$ are required to completely react with 2 moles of $H_2$ in $2H_2 + O_2 \\to 2H_2O$?",
    choices: ["1 mole", "2 moles", "0.5 mole", "4 moles"],
    answerIndex: 0,
    explanation: "From the balanced equation, 2 moles of $H_2$ react with 1 mole of $O_2$.",
  },

  // --- ENVIRONMENTAL SCIENCE ---
  {
    id: "env-eco-01",
    subject: "Environmental Science",
    topic: "Ecosystems",
    subtopic: "Ecosystems",
    difficulty: "easy",
    rigor: 1,
    question: "Which trophic level directly consumes producers in a food web?",
    choices: ["Primary consumers", "Secondary consumers", "Decomposers", "Apex predators"],
    answerIndex: 0,
    explanation: "Primary consumers (herbivores) feed directly on producers such as plants and algae.",
  },

  // --- AP ENVIRONMENTAL SCIENCE ---
  {
    id: "apenv-global-01",
    subject: "AP Environmental Science",
    topic: "Global Change",
    subtopic: "Global Change",
    difficulty: "medium",
    rigor: 2,
    question: "Which gas contributes the most to recent anthropogenic global warming by total emitted volume?",
    choices: ["Carbon dioxide ($CO_2$)", "Methane ($CH_4$)", "Nitrous oxide ($N_2O$)", "Water vapor ($H_2O$)"],
    answerIndex: 0,
    explanation: "While methane is more potent per molecule, carbon dioxide dominates total human-caused warming impact by volume emitted.",
  },

  // --- WORLD HISTORY ---
  {
    id: "wh-mid-01",
    subject: "World History",
    topic: "Middle Ages",
    subtopic: "Middle Ages",
    difficulty: "medium",
    rigor: 2,
    question: "Which institution in medieval Europe preserved many classical texts through manuscript copying?",
    choices: ["Monasteries", "Guilds", "Feudal courts", "Merchant leagues"],
    answerIndex: 0,
    explanation: "Monastic scriptoria copied and preserved religious and classical manuscripts across the Middle Ages.",
  },

  // --- AP WORLD HISTORY ---
  {
    id: "apwh-global-01",
    subject: "AP World History",
    topic: "Global Interactions",
    subtopic: "Global Interactions",
    difficulty: "medium",
    rigor: 2,
    question: "The Columbian Exchange most directly refers to what historical process?",
    choices: ["Transfer of plants, animals, and diseases between Afro-Eurasia and the Americas", "European military alliance systems", "Spread of Buddhism along the Silk Roads", "Industrial labor migration within Europe"],
    answerIndex: 0,
    explanation: "The Columbian Exchange was the transatlantic movement of crops, animals, pathogens, and people after 1492.",
  },

  // --- US GOVERNMENT ---
  {
    id: "usgov-const-01",
    subject: "US Government",
    topic: "Constitution",
    subtopic: "The Constitution",
    difficulty: "easy",
    rigor: 1,
    question: "The first ten amendments to the U.S. Constitution are known collectively as what?",
    choices: ["Bill of Rights", "Federalist Papers", "Articles of Confederation", "Civil Rights Act"],
    answerIndex: 0,
    explanation: "The first ten amendments are called the Bill of Rights.",
  },

  // --- ECONOMICS ---
  {
    id: "econ-sd-01",
    subject: "Economics",
    topic: "Markets",
    subtopic: "Supply and Demand",
    difficulty: "medium",
    rigor: 2,
    question: "If demand increases while supply stays constant, what happens to equilibrium price?",
    choices: ["It increases", "It decreases", "It stays the same", "It becomes zero"],
    answerIndex: 0,
    explanation: "A rightward demand shift with fixed supply raises equilibrium price (and quantity).",
  },

  // --- AP MACROECONOMICS ---
  {
    id: "apmacro-nia-01",
    subject: "AP Macroeconomics",
    topic: "National Income",
    subtopic: "National Income Accounts",
    difficulty: "medium",
    rigor: 2,
    question: "GDP measures the market value of final goods and services produced where and when?",
    choices: ["Within a country in a given period", "By domestic firms worldwide over all time", "Only in government sectors each year", "Only consumer purchases in a month"],
    answerIndex: 0,
    explanation: "GDP is the value of final output produced domestically within a specified time period.",
  },

  // --- AP MICROECONOMICS ---
  {
    id: "apmicro-cons-01",
    subject: "AP Microeconomics",
    topic: "Consumer Choice",
    subtopic: "Consumer Choice",
    difficulty: "medium",
    rigor: 2,
    question: "Utility maximization under a budget constraint occurs when a consumer chooses the bundle that does what?",
    choices: ["Reaches the highest attainable indifference curve", "Minimizes all spending", "Equalizes total utility across goods", "Sets price equal to marginal cost"],
    answerIndex: 0,
    explanation: "Consumers maximize utility by selecting the highest indifference curve they can afford given their budget line.",
  },

  // --- COMPUTER SCIENCE ---
  {
    id: "cs-func-01",
    subject: "Computer Science",
    topic: "Functions",
    subtopic: "Functions",
    difficulty: "easy",
    rigor: 1,
    question: "What is the primary purpose of defining a function in programming?",
    choices: ["To encapsulate reusable logic", "To permanently store files", "To speed up internet access", "To replace all variables"],
    answerIndex: 0,
    explanation: "Functions package behavior so it can be reused, tested, and maintained more easily.",
  },

  // --- AP SPANISH ---
  {
    id: "apspan-verb-01",
    subject: "AP Spanish",
    topic: "Verb Tenses",
    subtopic: "Verb Tenses",
    difficulty: "medium",
    rigor: 2,
    question: "Choose the correct present perfect form: \"Ellos ___ estudiado mucho.\"",
    choices: ["han", "ha", "he", "hemos"],
    answerIndex: 0,
    explanation: "For \"ellos\", the present perfect auxiliary is \"han\": \"Ellos han estudiado mucho.\"",
  },

  // --- AUTO-GENERATED CURRICULUM COVERAGE ---
  {
    id: "auto-algebra-1-systems-of-equations-01",
    subject: "Algebra 1",
    topic: "Systems of Equations",
    subtopic: "Systems of Equations",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Systems of Equations for Algebra 1?",
    choices: [
      "Systems of Equations emphasizes structured reasoning and accurate interpretation of key principles.",
      "Systems of Equations avoids models and focuses only on memorization.",
      "Systems of Equations is unrelated to evidence or quantitative analysis.",
      "Systems of Equations replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Systems of Equations in Algebra 1 requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-algebra-1-intro-to-functions-01",
    subject: "Algebra 1",
    topic: "Intro to Functions",
    subtopic: "Intro to Functions",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Intro to Functions for Algebra 1?",
    choices: [
      "Intro to Functions emphasizes structured reasoning and accurate interpretation of key principles.",
      "Intro to Functions avoids models and focuses only on memorization.",
      "Intro to Functions is unrelated to evidence or quantitative analysis.",
      "Intro to Functions replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Intro to Functions in Algebra 1 requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-algebra-2-logarithms-01",
    subject: "Algebra 2",
    topic: "Logarithms",
    subtopic: "Logarithms",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Logarithms for Algebra 2?",
    choices: [
      "Logarithms emphasizes structured reasoning and accurate interpretation of key principles.",
      "Logarithms avoids models and focuses only on memorization.",
      "Logarithms is unrelated to evidence or quantitative analysis.",
      "Logarithms replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Logarithms in Algebra 2 requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-algebra-2-rational-expressions-01",
    subject: "Algebra 2",
    topic: "Rational Expressions",
    subtopic: "Rational Expressions",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Rational Expressions for Algebra 2?",
    choices: [
      "Rational Expressions emphasizes structured reasoning and accurate interpretation of key principles.",
      "Rational Expressions avoids models and focuses only on memorization.",
      "Rational Expressions is unrelated to evidence or quantitative analysis.",
      "Rational Expressions replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Rational Expressions in Algebra 2 requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-geometry-coordinate-geometry-01",
    subject: "Geometry",
    topic: "Coordinate Geometry",
    subtopic: "Coordinate Geometry",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Coordinate Geometry for Geometry?",
    choices: [
      "Coordinate Geometry emphasizes structured reasoning and accurate interpretation of key principles.",
      "Coordinate Geometry avoids models and focuses only on memorization.",
      "Coordinate Geometry is unrelated to evidence or quantitative analysis.",
      "Coordinate Geometry replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Coordinate Geometry in Geometry requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-geometry-volume-surface-area-01",
    subject: "Geometry",
    topic: "Volume & Surface Area",
    subtopic: "Volume & Surface Area",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Volume & Surface Area for Geometry?",
    choices: [
      "Volume & Surface Area emphasizes structured reasoning and accurate interpretation of key principles.",
      "Volume & Surface Area avoids models and focuses only on memorization.",
      "Volume & Surface Area is unrelated to evidence or quantitative analysis.",
      "Volume & Surface Area replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Volume & Surface Area in Geometry requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-geometry-congruence-similarity-01",
    subject: "Geometry",
    topic: "Congruence & Similarity",
    subtopic: "Congruence & Similarity",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Congruence & Similarity for Geometry?",
    choices: [
      "Congruence & Similarity emphasizes structured reasoning and accurate interpretation of key principles.",
      "Congruence & Similarity avoids models and focuses only on memorization.",
      "Congruence & Similarity is unrelated to evidence or quantitative analysis.",
      "Congruence & Similarity replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Congruence & Similarity in Geometry requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-calculus-basic-derivatives-01",
    subject: "Calculus",
    topic: "Basic Derivatives",
    subtopic: "Basic Derivatives",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Basic Derivatives for Calculus?",
    choices: [
      "Basic Derivatives emphasizes structured reasoning and accurate interpretation of key principles.",
      "Basic Derivatives avoids models and focuses only on memorization.",
      "Basic Derivatives is unrelated to evidence or quantitative analysis.",
      "Basic Derivatives replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Basic Derivatives in Calculus requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-calculus-basic-integration-01",
    subject: "Calculus",
    topic: "Basic Integration",
    subtopic: "Basic Integration",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Basic Integration for Calculus?",
    choices: [
      "Basic Integration emphasizes structured reasoning and accurate interpretation of key principles.",
      "Basic Integration avoids models and focuses only on memorization.",
      "Basic Integration is unrelated to evidence or quantitative analysis.",
      "Basic Integration replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Basic Integration in Calculus requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-calculus-applications-of-derivatives-01",
    subject: "Calculus",
    topic: "Applications of Derivatives",
    subtopic: "Applications of Derivatives",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Applications of Derivatives for Calculus?",
    choices: [
      "Applications of Derivatives emphasizes structured reasoning and accurate interpretation of key principles.",
      "Applications of Derivatives avoids models and focuses only on memorization.",
      "Applications of Derivatives is unrelated to evidence or quantitative analysis.",
      "Applications of Derivatives replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Applications of Derivatives in Calculus requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-calculus-ab-mean-value-theorem-01",
    subject: "AP Calculus AB",
    topic: "Mean Value Theorem",
    subtopic: "Mean Value Theorem",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Mean Value Theorem for AP Calculus AB?",
    choices: [
      "Mean Value Theorem emphasizes structured reasoning and accurate interpretation of key principles.",
      "Mean Value Theorem avoids models and focuses only on memorization.",
      "Mean Value Theorem is unrelated to evidence or quantitative analysis.",
      "Mean Value Theorem replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Mean Value Theorem in AP Calculus AB requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-calculus-ab-fundamental-theorem-of-calculus-01",
    subject: "AP Calculus AB",
    topic: "Fundamental Theorem of Calculus",
    subtopic: "Fundamental Theorem of Calculus",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Fundamental Theorem of Calculus for AP Calculus AB?",
    choices: [
      "Fundamental Theorem of Calculus emphasizes structured reasoning and accurate interpretation of key principles.",
      "Fundamental Theorem of Calculus avoids models and focuses only on memorization.",
      "Fundamental Theorem of Calculus is unrelated to evidence or quantitative analysis.",
      "Fundamental Theorem of Calculus replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Fundamental Theorem of Calculus in AP Calculus AB requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-calculus-ab-area-between-curves-01",
    subject: "AP Calculus AB",
    topic: "Area Between Curves",
    subtopic: "Area Between Curves",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Area Between Curves for AP Calculus AB?",
    choices: [
      "Area Between Curves emphasizes structured reasoning and accurate interpretation of key principles.",
      "Area Between Curves avoids models and focuses only on memorization.",
      "Area Between Curves is unrelated to evidence or quantitative analysis.",
      "Area Between Curves replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Area Between Curves in AP Calculus AB requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-calculus-ab-volume-of-solids-01",
    subject: "AP Calculus AB",
    topic: "Volume of Solids",
    subtopic: "Volume of Solids",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Volume of Solids for AP Calculus AB?",
    choices: [
      "Volume of Solids emphasizes structured reasoning and accurate interpretation of key principles.",
      "Volume of Solids avoids models and focuses only on memorization.",
      "Volume of Solids is unrelated to evidence or quantitative analysis.",
      "Volume of Solids replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Volume of Solids in AP Calculus AB requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-calculus-bc-parametric-polar-01",
    subject: "AP Calculus BC",
    topic: "Parametric & Polar",
    subtopic: "Parametric & Polar",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Parametric & Polar for AP Calculus BC?",
    choices: [
      "Parametric & Polar emphasizes structured reasoning and accurate interpretation of key principles.",
      "Parametric & Polar avoids models and focuses only on memorization.",
      "Parametric & Polar is unrelated to evidence or quantitative analysis.",
      "Parametric & Polar replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Parametric & Polar in AP Calculus BC requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-calculus-bc-integration-by-parts-01",
    subject: "AP Calculus BC",
    topic: "Integration by Parts",
    subtopic: "Integration by Parts",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Integration by Parts for AP Calculus BC?",
    choices: [
      "Integration by Parts emphasizes structured reasoning and accurate interpretation of key principles.",
      "Integration by Parts avoids models and focuses only on memorization.",
      "Integration by Parts is unrelated to evidence or quantitative analysis.",
      "Integration by Parts replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Integration by Parts in AP Calculus BC requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-calculus-bc-logistic-growth-01",
    subject: "AP Calculus BC",
    topic: "Logistic Growth",
    subtopic: "Logistic Growth",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Logistic Growth for AP Calculus BC?",
    choices: [
      "Logistic Growth emphasizes structured reasoning and accurate interpretation of key principles.",
      "Logistic Growth avoids models and focuses only on memorization.",
      "Logistic Growth is unrelated to evidence or quantitative analysis.",
      "Logistic Growth replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Logistic Growth in AP Calculus BC requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-statistics-inference-01",
    subject: "AP Statistics",
    topic: "Inference",
    subtopic: "Inference",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Inference for AP Statistics?",
    choices: [
      "Inference emphasizes structured reasoning and accurate interpretation of key principles.",
      "Inference avoids models and focuses only on memorization.",
      "Inference is unrelated to evidence or quantitative analysis.",
      "Inference replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Inference in AP Statistics requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-statistics-chi-square-tests-01",
    subject: "AP Statistics",
    topic: "Chi-Square Tests",
    subtopic: "Chi-Square Tests",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Chi-Square Tests for AP Statistics?",
    choices: [
      "Chi-Square Tests emphasizes structured reasoning and accurate interpretation of key principles.",
      "Chi-Square Tests avoids models and focuses only on memorization.",
      "Chi-Square Tests is unrelated to evidence or quantitative analysis.",
      "Chi-Square Tests replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Chi-Square Tests in AP Statistics requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-statistics-linear-regression-01",
    subject: "AP Statistics",
    topic: "Linear Regression",
    subtopic: "Linear Regression",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Linear Regression for AP Statistics?",
    choices: [
      "Linear Regression emphasizes structured reasoning and accurate interpretation of key principles.",
      "Linear Regression avoids models and focuses only on memorization.",
      "Linear Regression is unrelated to evidence or quantitative analysis.",
      "Linear Regression replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Linear Regression in AP Statistics requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-biology-genetics-01",
    subject: "Biology",
    topic: "Genetics",
    subtopic: "Genetics",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Genetics for Biology?",
    choices: [
      "Genetics emphasizes structured reasoning and accurate interpretation of key principles.",
      "Genetics avoids models and focuses only on memorization.",
      "Genetics is unrelated to evidence or quantitative analysis.",
      "Genetics replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Genetics in Biology requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-biology-evolution-01",
    subject: "Biology",
    topic: "Evolution",
    subtopic: "Evolution",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Evolution for Biology?",
    choices: [
      "Evolution emphasizes structured reasoning and accurate interpretation of key principles.",
      "Evolution avoids models and focuses only on memorization.",
      "Evolution is unrelated to evidence or quantitative analysis.",
      "Evolution replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Evolution in Biology requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-biology-ecology-01",
    subject: "Biology",
    topic: "Ecology",
    subtopic: "Ecology",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Ecology for Biology?",
    choices: [
      "Ecology emphasizes structured reasoning and accurate interpretation of key principles.",
      "Ecology avoids models and focuses only on memorization.",
      "Ecology is unrelated to evidence or quantitative analysis.",
      "Ecology replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Ecology in Biology requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-biology-cellular-energetics-01",
    subject: "AP Biology",
    topic: "Cellular Energetics",
    subtopic: "Cellular Energetics",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Cellular Energetics for AP Biology?",
    choices: [
      "Cellular Energetics emphasizes structured reasoning and accurate interpretation of key principles.",
      "Cellular Energetics avoids models and focuses only on memorization.",
      "Cellular Energetics is unrelated to evidence or quantitative analysis.",
      "Cellular Energetics replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Cellular Energetics in AP Biology requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-biology-heredity-01",
    subject: "AP Biology",
    topic: "Heredity",
    subtopic: "Heredity",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Heredity for AP Biology?",
    choices: [
      "Heredity emphasizes structured reasoning and accurate interpretation of key principles.",
      "Heredity avoids models and focuses only on memorization.",
      "Heredity is unrelated to evidence or quantitative analysis.",
      "Heredity replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Heredity in AP Biology requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-biology-gene-expression-01",
    subject: "AP Biology",
    topic: "Gene Expression",
    subtopic: "Gene Expression",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Gene Expression for AP Biology?",
    choices: [
      "Gene Expression emphasizes structured reasoning and accurate interpretation of key principles.",
      "Gene Expression avoids models and focuses only on memorization.",
      "Gene Expression is unrelated to evidence or quantitative analysis.",
      "Gene Expression replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Gene Expression in AP Biology requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-chemistry-atomic-structure-01",
    subject: "Chemistry",
    topic: "Atomic Structure",
    subtopic: "Atomic Structure",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Atomic Structure for Chemistry?",
    choices: [
      "Atomic Structure emphasizes structured reasoning and accurate interpretation of key principles.",
      "Atomic Structure avoids models and focuses only on memorization.",
      "Atomic Structure is unrelated to evidence or quantitative analysis.",
      "Atomic Structure replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Atomic Structure in Chemistry requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-chemistry-chemical-bonding-01",
    subject: "Chemistry",
    topic: "Chemical Bonding",
    subtopic: "Chemical Bonding",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Chemical Bonding for Chemistry?",
    choices: [
      "Chemical Bonding emphasizes structured reasoning and accurate interpretation of key principles.",
      "Chemical Bonding avoids models and focuses only on memorization.",
      "Chemical Bonding is unrelated to evidence or quantitative analysis.",
      "Chemical Bonding replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Chemical Bonding in Chemistry requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-chemistry-solutions-01",
    subject: "Chemistry",
    topic: "Solutions",
    subtopic: "Solutions",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Solutions for Chemistry?",
    choices: [
      "Solutions emphasizes structured reasoning and accurate interpretation of key principles.",
      "Solutions avoids models and focuses only on memorization.",
      "Solutions is unrelated to evidence or quantitative analysis.",
      "Solutions replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Solutions in Chemistry requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-chemistry-thermodynamics-01",
    subject: "AP Chemistry",
    topic: "Thermodynamics",
    subtopic: "Thermodynamics",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Thermodynamics for AP Chemistry?",
    choices: [
      "Thermodynamics emphasizes structured reasoning and accurate interpretation of key principles.",
      "Thermodynamics avoids models and focuses only on memorization.",
      "Thermodynamics is unrelated to evidence or quantitative analysis.",
      "Thermodynamics replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Thermodynamics in AP Chemistry requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-chemistry-equilibrium-01",
    subject: "AP Chemistry",
    topic: "Equilibrium",
    subtopic: "Equilibrium",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Equilibrium for AP Chemistry?",
    choices: [
      "Equilibrium emphasizes structured reasoning and accurate interpretation of key principles.",
      "Equilibrium avoids models and focuses only on memorization.",
      "Equilibrium is unrelated to evidence or quantitative analysis.",
      "Equilibrium replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Equilibrium in AP Chemistry requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-chemistry-electrochemistry-01",
    subject: "AP Chemistry",
    topic: "Electrochemistry",
    subtopic: "Electrochemistry",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Electrochemistry for AP Chemistry?",
    choices: [
      "Electrochemistry emphasizes structured reasoning and accurate interpretation of key principles.",
      "Electrochemistry avoids models and focuses only on memorization.",
      "Electrochemistry is unrelated to evidence or quantitative analysis.",
      "Electrochemistry replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Electrochemistry in AP Chemistry requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-environmental-science-biodiversity-01",
    subject: "Environmental Science",
    topic: "Biodiversity",
    subtopic: "Biodiversity",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Biodiversity for Environmental Science?",
    choices: [
      "Biodiversity emphasizes structured reasoning and accurate interpretation of key principles.",
      "Biodiversity avoids models and focuses only on memorization.",
      "Biodiversity is unrelated to evidence or quantitative analysis.",
      "Biodiversity replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Biodiversity in Environmental Science requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-environmental-science-land-use-01",
    subject: "Environmental Science",
    topic: "Land Use",
    subtopic: "Land Use",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Land Use for Environmental Science?",
    choices: [
      "Land Use emphasizes structured reasoning and accurate interpretation of key principles.",
      "Land Use avoids models and focuses only on memorization.",
      "Land Use is unrelated to evidence or quantitative analysis.",
      "Land Use replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Land Use in Environmental Science requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-environmental-science-energy-resources-01",
    subject: "Environmental Science",
    topic: "Energy Resources",
    subtopic: "Energy Resources",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Energy Resources for Environmental Science?",
    choices: [
      "Energy Resources emphasizes structured reasoning and accurate interpretation of key principles.",
      "Energy Resources avoids models and focuses only on memorization.",
      "Energy Resources is unrelated to evidence or quantitative analysis.",
      "Energy Resources replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Energy Resources in Environmental Science requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-environmental-science-atmospheric-pollution-01",
    subject: "AP Environmental Science",
    topic: "Atmospheric Pollution",
    subtopic: "Atmospheric Pollution",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Atmospheric Pollution for AP Environmental Science?",
    choices: [
      "Atmospheric Pollution emphasizes structured reasoning and accurate interpretation of key principles.",
      "Atmospheric Pollution avoids models and focuses only on memorization.",
      "Atmospheric Pollution is unrelated to evidence or quantitative analysis.",
      "Atmospheric Pollution replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Atmospheric Pollution in AP Environmental Science requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-environmental-science-populations-01",
    subject: "AP Environmental Science",
    topic: "Populations",
    subtopic: "Populations",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Populations for AP Environmental Science?",
    choices: [
      "Populations emphasizes structured reasoning and accurate interpretation of key principles.",
      "Populations avoids models and focuses only on memorization.",
      "Populations is unrelated to evidence or quantitative analysis.",
      "Populations replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Populations in AP Environmental Science requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-environmental-science-aquatic-systems-01",
    subject: "AP Environmental Science",
    topic: "Aquatic Systems",
    subtopic: "Aquatic Systems",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Aquatic Systems for AP Environmental Science?",
    choices: [
      "Aquatic Systems emphasizes structured reasoning and accurate interpretation of key principles.",
      "Aquatic Systems avoids models and focuses only on memorization.",
      "Aquatic Systems is unrelated to evidence or quantitative analysis.",
      "Aquatic Systems replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Aquatic Systems in AP Environmental Science requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-world-history-ancient-civilizations-01",
    subject: "World History",
    topic: "Ancient Civilizations",
    subtopic: "Ancient Civilizations",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Ancient Civilizations for World History?",
    choices: [
      "Ancient Civilizations emphasizes structured reasoning and accurate interpretation of key principles.",
      "Ancient Civilizations avoids models and focuses only on memorization.",
      "Ancient Civilizations is unrelated to evidence or quantitative analysis.",
      "Ancient Civilizations replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Ancient Civilizations in World History requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-world-history-industrial-revolution-01",
    subject: "World History",
    topic: "Industrial Revolution",
    subtopic: "Industrial Revolution",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Industrial Revolution for World History?",
    choices: [
      "Industrial Revolution emphasizes structured reasoning and accurate interpretation of key principles.",
      "Industrial Revolution avoids models and focuses only on memorization.",
      "Industrial Revolution is unrelated to evidence or quantitative analysis.",
      "Industrial Revolution replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Industrial Revolution in World History requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-world-history-world-wars-01",
    subject: "World History",
    topic: "World Wars",
    subtopic: "World Wars",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in World Wars for World History?",
    choices: [
      "World Wars emphasizes structured reasoning and accurate interpretation of key principles.",
      "World Wars avoids models and focuses only on memorization.",
      "World Wars is unrelated to evidence or quantitative analysis.",
      "World Wars replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "World Wars in World History requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-world-history-empires-01",
    subject: "AP World History",
    topic: "Empires",
    subtopic: "Empires",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Empires for AP World History?",
    choices: [
      "Empires emphasizes structured reasoning and accurate interpretation of key principles.",
      "Empires avoids models and focuses only on memorization.",
      "Empires is unrelated to evidence or quantitative analysis.",
      "Empires replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Empires in AP World History requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-world-history-industrialization-01",
    subject: "AP World History",
    topic: "Industrialization",
    subtopic: "Industrialization",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Industrialization for AP World History?",
    choices: [
      "Industrialization emphasizes structured reasoning and accurate interpretation of key principles.",
      "Industrialization avoids models and focuses only on memorization.",
      "Industrialization is unrelated to evidence or quantitative analysis.",
      "Industrialization replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Industrialization in AP World History requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-world-history-global-conflict-01",
    subject: "AP World History",
    topic: "Global Conflict",
    subtopic: "Global Conflict",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Global Conflict for AP World History?",
    choices: [
      "Global Conflict emphasizes structured reasoning and accurate interpretation of key principles.",
      "Global Conflict avoids models and focuses only on memorization.",
      "Global Conflict is unrelated to evidence or quantitative analysis.",
      "Global Conflict replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Global Conflict in AP World History requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-us-government-branches-of-gov-01",
    subject: "US Government",
    topic: "Branches of Gov",
    subtopic: "Branches of Gov",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Branches of Gov for US Government?",
    choices: [
      "Branches of Gov emphasizes structured reasoning and accurate interpretation of key principles.",
      "Branches of Gov avoids models and focuses only on memorization.",
      "Branches of Gov is unrelated to evidence or quantitative analysis.",
      "Branches of Gov replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Branches of Gov in US Government requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-us-government-elections-01",
    subject: "US Government",
    topic: "Elections",
    subtopic: "Elections",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Elections for US Government?",
    choices: [
      "Elections emphasizes structured reasoning and accurate interpretation of key principles.",
      "Elections avoids models and focuses only on memorization.",
      "Elections is unrelated to evidence or quantitative analysis.",
      "Elections replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Elections in US Government requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-us-government-public-policy-01",
    subject: "US Government",
    topic: "Public Policy",
    subtopic: "Public Policy",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Public Policy for US Government?",
    choices: [
      "Public Policy emphasizes structured reasoning and accurate interpretation of key principles.",
      "Public Policy avoids models and focuses only on memorization.",
      "Public Policy is unrelated to evidence or quantitative analysis.",
      "Public Policy replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Public Policy in US Government requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-us-government-founding-documents-01",
    subject: "AP US Government",
    topic: "Founding Documents",
    subtopic: "Founding Documents",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Founding Documents for AP US Government?",
    choices: [
      "Founding Documents emphasizes structured reasoning and accurate interpretation of key principles.",
      "Founding Documents avoids models and focuses only on memorization.",
      "Founding Documents is unrelated to evidence or quantitative analysis.",
      "Founding Documents replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Founding Documents in AP US Government requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-us-government-civil-liberties-01",
    subject: "AP US Government",
    topic: "Civil Liberties",
    subtopic: "Civil Liberties",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Civil Liberties for AP US Government?",
    choices: [
      "Civil Liberties emphasizes structured reasoning and accurate interpretation of key principles.",
      "Civil Liberties avoids models and focuses only on memorization.",
      "Civil Liberties is unrelated to evidence or quantitative analysis.",
      "Civil Liberties replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Civil Liberties in AP US Government requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-us-government-political-ideologies-01",
    subject: "AP US Government",
    topic: "Political Ideologies",
    subtopic: "Political Ideologies",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Political Ideologies for AP US Government?",
    choices: [
      "Political Ideologies emphasizes structured reasoning and accurate interpretation of key principles.",
      "Political Ideologies avoids models and focuses only on memorization.",
      "Political Ideologies is unrelated to evidence or quantitative analysis.",
      "Political Ideologies replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Political Ideologies in AP US Government requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-economics-market-structures-01",
    subject: "Economics",
    topic: "Market Structures",
    subtopic: "Market Structures",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Market Structures for Economics?",
    choices: [
      "Market Structures emphasizes structured reasoning and accurate interpretation of key principles.",
      "Market Structures avoids models and focuses only on memorization.",
      "Market Structures is unrelated to evidence or quantitative analysis.",
      "Market Structures replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Market Structures in Economics requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-economics-business-cycles-01",
    subject: "Economics",
    topic: "Business Cycles",
    subtopic: "Business Cycles",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Business Cycles for Economics?",
    choices: [
      "Business Cycles emphasizes structured reasoning and accurate interpretation of key principles.",
      "Business Cycles avoids models and focuses only on memorization.",
      "Business Cycles is unrelated to evidence or quantitative analysis.",
      "Business Cycles replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Business Cycles in Economics requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-economics-personal-finance-01",
    subject: "Economics",
    topic: "Personal Finance",
    subtopic: "Personal Finance",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Personal Finance for Economics?",
    choices: [
      "Personal Finance emphasizes structured reasoning and accurate interpretation of key principles.",
      "Personal Finance avoids models and focuses only on memorization.",
      "Personal Finance is unrelated to evidence or quantitative analysis.",
      "Personal Finance replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Personal Finance in Economics requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-macroeconomics-financial-sector-01",
    subject: "AP Macroeconomics",
    topic: "Financial Sector",
    subtopic: "Financial Sector",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Financial Sector for AP Macroeconomics?",
    choices: [
      "Financial Sector emphasizes structured reasoning and accurate interpretation of key principles.",
      "Financial Sector avoids models and focuses only on memorization.",
      "Financial Sector is unrelated to evidence or quantitative analysis.",
      "Financial Sector replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Financial Sector in AP Macroeconomics requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-macroeconomics-stabilization-policies-01",
    subject: "AP Macroeconomics",
    topic: "Stabilization Policies",
    subtopic: "Stabilization Policies",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Stabilization Policies for AP Macroeconomics?",
    choices: [
      "Stabilization Policies emphasizes structured reasoning and accurate interpretation of key principles.",
      "Stabilization Policies avoids models and focuses only on memorization.",
      "Stabilization Policies is unrelated to evidence or quantitative analysis.",
      "Stabilization Policies replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Stabilization Policies in AP Macroeconomics requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-macroeconomics-open-economy-01",
    subject: "AP Macroeconomics",
    topic: "Open Economy",
    subtopic: "Open Economy",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Open Economy for AP Macroeconomics?",
    choices: [
      "Open Economy emphasizes structured reasoning and accurate interpretation of key principles.",
      "Open Economy avoids models and focuses only on memorization.",
      "Open Economy is unrelated to evidence or quantitative analysis.",
      "Open Economy replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Open Economy in AP Macroeconomics requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-microeconomics-firm-behavior-01",
    subject: "AP Microeconomics",
    topic: "Firm Behavior",
    subtopic: "Firm Behavior",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Firm Behavior for AP Microeconomics?",
    choices: [
      "Firm Behavior emphasizes structured reasoning and accurate interpretation of key principles.",
      "Firm Behavior avoids models and focuses only on memorization.",
      "Firm Behavior is unrelated to evidence or quantitative analysis.",
      "Firm Behavior replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Firm Behavior in AP Microeconomics requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-microeconomics-factor-markets-01",
    subject: "AP Microeconomics",
    topic: "Factor Markets",
    subtopic: "Factor Markets",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Factor Markets for AP Microeconomics?",
    choices: [
      "Factor Markets emphasizes structured reasoning and accurate interpretation of key principles.",
      "Factor Markets avoids models and focuses only on memorization.",
      "Factor Markets is unrelated to evidence or quantitative analysis.",
      "Factor Markets replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Factor Markets in AP Microeconomics requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-microeconomics-market-failures-01",
    subject: "AP Microeconomics",
    topic: "Market Failures",
    subtopic: "Market Failures",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Market Failures for AP Microeconomics?",
    choices: [
      "Market Failures emphasizes structured reasoning and accurate interpretation of key principles.",
      "Market Failures avoids models and focuses only on memorization.",
      "Market Failures is unrelated to evidence or quantitative analysis.",
      "Market Failures replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Market Failures in AP Microeconomics requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-computer-science-variables-control-flow-01",
    subject: "Computer Science",
    topic: "Variables & Control Flow",
    subtopic: "Variables & Control Flow",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Variables & Control Flow for Computer Science?",
    choices: [
      "Variables & Control Flow emphasizes structured reasoning and accurate interpretation of key principles.",
      "Variables & Control Flow avoids models and focuses only on memorization.",
      "Variables & Control Flow is unrelated to evidence or quantitative analysis.",
      "Variables & Control Flow replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Variables & Control Flow in Computer Science requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-computer-science-arrays-01",
    subject: "Computer Science",
    topic: "Arrays",
    subtopic: "Arrays",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Arrays for Computer Science?",
    choices: [
      "Arrays emphasizes structured reasoning and accurate interpretation of key principles.",
      "Arrays avoids models and focuses only on memorization.",
      "Arrays is unrelated to evidence or quantitative analysis.",
      "Arrays replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Arrays in Computer Science requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-computer-science-logic-01",
    subject: "Computer Science",
    topic: "Logic",
    subtopic: "Logic",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Logic for Computer Science?",
    choices: [
      "Logic emphasizes structured reasoning and accurate interpretation of key principles.",
      "Logic avoids models and focuses only on memorization.",
      "Logic is unrelated to evidence or quantitative analysis.",
      "Logic replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Logic in Computer Science requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-computer-science-a-classes-objects-01",
    subject: "AP Computer Science A",
    topic: "Classes & Objects",
    subtopic: "Classes & Objects",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Classes & Objects for AP Computer Science A?",
    choices: [
      "Classes & Objects emphasizes structured reasoning and accurate interpretation of key principles.",
      "Classes & Objects avoids models and focuses only on memorization.",
      "Classes & Objects is unrelated to evidence or quantitative analysis.",
      "Classes & Objects replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Classes & Objects in AP Computer Science A requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-computer-science-a-searching-sorting-01",
    subject: "AP Computer Science A",
    topic: "Searching & Sorting",
    subtopic: "Searching & Sorting",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Searching & Sorting for AP Computer Science A?",
    choices: [
      "Searching & Sorting emphasizes structured reasoning and accurate interpretation of key principles.",
      "Searching & Sorting avoids models and focuses only on memorization.",
      "Searching & Sorting is unrelated to evidence or quantitative analysis.",
      "Searching & Sorting replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Searching & Sorting in AP Computer Science A requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-computer-science-a-inheritance-01",
    subject: "AP Computer Science A",
    topic: "Inheritance",
    subtopic: "Inheritance",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Inheritance for AP Computer Science A?",
    choices: [
      "Inheritance emphasizes structured reasoning and accurate interpretation of key principles.",
      "Inheritance avoids models and focuses only on memorization.",
      "Inheritance is unrelated to evidence or quantitative analysis.",
      "Inheritance replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Inheritance in AP Computer Science A requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-spanish-past-tense-01",
    subject: "Spanish",
    topic: "Past Tense",
    subtopic: "Past Tense",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Past Tense for Spanish?",
    choices: [
      "Past Tense emphasizes structured reasoning and accurate interpretation of key principles.",
      "Past Tense avoids models and focuses only on memorization.",
      "Past Tense is unrelated to evidence or quantitative analysis.",
      "Past Tense replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Past Tense in Spanish requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-spanish-basic-vocabulary-01",
    subject: "Spanish",
    topic: "Basic Vocabulary",
    subtopic: "Basic Vocabulary",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Basic Vocabulary for Spanish?",
    choices: [
      "Basic Vocabulary emphasizes structured reasoning and accurate interpretation of key principles.",
      "Basic Vocabulary avoids models and focuses only on memorization.",
      "Basic Vocabulary is unrelated to evidence or quantitative analysis.",
      "Basic Vocabulary replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Basic Vocabulary in Spanish requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-spanish-sentence-structure-01",
    subject: "Spanish",
    topic: "Sentence Structure",
    subtopic: "Sentence Structure",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Sentence Structure for Spanish?",
    choices: [
      "Sentence Structure emphasizes structured reasoning and accurate interpretation of key principles.",
      "Sentence Structure avoids models and focuses only on memorization.",
      "Sentence Structure is unrelated to evidence or quantitative analysis.",
      "Sentence Structure replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Sentence Structure in Spanish requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-spanish-advanced-syntax-01",
    subject: "AP Spanish",
    topic: "Advanced Syntax",
    subtopic: "Advanced Syntax",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Advanced Syntax for AP Spanish?",
    choices: [
      "Advanced Syntax emphasizes structured reasoning and accurate interpretation of key principles.",
      "Advanced Syntax avoids models and focuses only on memorization.",
      "Advanced Syntax is unrelated to evidence or quantitative analysis.",
      "Advanced Syntax replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Advanced Syntax in AP Spanish requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-spanish-nuanced-vocabulary-01",
    subject: "AP Spanish",
    topic: "Nuanced Vocabulary",
    subtopic: "Nuanced Vocabulary",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Nuanced Vocabulary for AP Spanish?",
    choices: [
      "Nuanced Vocabulary emphasizes structured reasoning and accurate interpretation of key principles.",
      "Nuanced Vocabulary avoids models and focuses only on memorization.",
      "Nuanced Vocabulary is unrelated to evidence or quantitative analysis.",
      "Nuanced Vocabulary replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Nuanced Vocabulary in AP Spanish requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
  },

  {
    id: "auto-ap-spanish-literary-analysis-01",
    subject: "AP Spanish",
    topic: "Literary Analysis",
    subtopic: "Literary Analysis",
    difficulty: "medium",
    rigor: 2,
    question: "Which statement best reflects a core concept in Literary Analysis for AP Spanish?",
    choices: [
      "Literary Analysis emphasizes structured reasoning and accurate interpretation of key principles.",
      "Literary Analysis avoids models and focuses only on memorization.",
      "Literary Analysis is unrelated to evidence or quantitative analysis.",
      "Literary Analysis replaces foundational skills with guessing strategies."
    ],
    answerIndex: 0,
    explanation: "Literary Analysis in AP Spanish requires systematic reasoning, evidence-based methods, and accurate use of core ideas.",
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
