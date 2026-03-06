import { ACTIVE_QUESTION_BANK, Question } from "@/lib/questions-data";
import { getGroupNameForCourse } from "@/lib/course-catalog";

export type WorkedExample = {
  id: string;
  question: string;
  solution: string;
  difficulty: "easy" | "medium" | "hard";
  answerPreview: string;
};

export type RetrievalDrill = {
  prompt: string;
  answer: string;
};

export type LearnPacket = {
  title: string;
  unitLabel: string;
  overview: string;
  examUse: string;
  keyIdeas: string[];
  keySteps: string[];
  memorySheet: string[];
  commonTraps: string[];
  workedExamples: WorkedExample[];
  retrievalDrills: RetrievalDrill[];
  studyPlan: string[];
};

const DOMAIN_OVERVIEW: Record<string, string> = {
  Mathematics:
    "This unit is scored on procedural accuracy plus interpretation. You need setup, execution, and validation under timed pressure.",
  Science:
    "This unit is scored on claim-evidence-reasoning quality. You need causal logic, variable control, and data interpretation.",
  "Social Studies":
    "This unit is scored on argument quality with evidence. You need contextualization, source analysis, and defensible reasoning.",
  Technology:
    "This unit is scored on correctness and design quality. You need robust logic, edge-case handling, and clear justification.",
  Languages:
    "This unit is scored on meaning precision and grammar control. You need accurate form, coherent expression, and context-appropriate language.",
  General:
    "This unit is scored on whether your reasoning is complete, evidence-backed, and checked for errors."
};

const DOMAIN_STEPS: Record<string, string[]> = {
  Mathematics: [
    "Identify givens, unknowns, and constraints before computing.",
    "Choose the method that matches structure (algebraic, graphical, numerical, or calculus-based).",
    "Execute symbolically, then check domain/sign/unit conditions.",
    "Interpret the final value in context, not just as a raw number."
  ],
  Science: [
    "Write the claim and exactly what evidence supports it.",
    "Track variables: manipulated, measured, controlled, and confounded.",
    "Evaluate mechanism strength and alternative explanations.",
    "State confidence level with uncertainty and limits."
  ],
  "Social Studies": [
    "State the thesis with historical/economic context.",
    "Use specific evidence and source quality checks.",
    "Compare alternatives and address counterevidence.",
    "Conclude with causal logic and trade-offs."
  ],
  Technology: [
    "Define input/output contract and constraints.",
    "Trace logic on normal and edge cases.",
    "Evaluate time/space trade-offs and failure paths.",
    "Validate with targeted tests before finalizing."
  ],
  Languages: [
    "Determine communicative intent and register first.",
    "Select tense/agreement/syntax to match context.",
    "Refine connectors and transitions for coherence.",
    "Proofread for form accuracy and nuance."
  ],
  General: [
    "Clarify what is asked.",
    "Apply the right framework.",
    "Check assumptions.",
    "Verify final answer independently."
  ]
};

const DOMAIN_TRAPS: Record<string, string[]> = {
  Mathematics: [
    "Solving correctly but not checking domain restrictions.",
    "Using a familiar formula outside its assumptions.",
    "Rounding too early and creating downstream error.",
    "Stopping before interpreting units or context."
  ],
  Science: [
    "Treating one result as universal without replication.",
    "Confusing correlation with causation.",
    "Ignoring sample bias or measurement error.",
    "Overstating certainty from limited evidence."
  ],
  "Social Studies": [
    "Using broad claims without concrete evidence.",
    "Ignoring counterexamples that weaken the argument.",
    "Projecting modern assumptions into past contexts.",
    "Choosing narrative confidence over source quality."
  ],
  Technology: [
    "Passing basic cases but failing edge cases.",
    "Assuming code is correct without trace-based checks.",
    "Ignoring complexity bottlenecks.",
    "Confusing syntactic validity with algorithmic correctness."
  ],
  Languages: [
    "Literal translation that breaks intended meaning.",
    "Correct vocabulary with wrong register or tense.",
    "Agreement errors in longer structures.",
    "Weak cohesion from missing transitions."
  ],
  General: [
    "Choosing first plausible option without comparison.",
    "Skipping validation.",
    "Ignoring assumptions.",
    "No post-error review."
  ]
};

const UNIT_REFERENCE: Array<{ match: string[]; notes: string[] }> = [
  {
    match: ["linear equations"],
    notes: [
      "Standard form: ax + b = c; isolate variable with inverse operations.",
      "Word problems: define variable first, then translate sentence-by-sentence.",
      "Always check by substitution into original equation."
    ]
  },
  {
    match: ["linear inequalities"],
    notes: [
      "When multiplying/dividing by a negative, reverse inequality direction.",
      "Use interval language and boundary inclusion correctly.",
      "Validate with a test value in each region."
    ]
  },
  {
    match: ["systems of equations"],
    notes: [
      "Choose substitution for isolated forms; elimination for aligned coefficients.",
      "After solving one variable, back-substitute and verify both equations.",
      "Identify special cases: no solution or infinitely many solutions."
    ]
  },
  {
    match: ["quadratic", "parabola"],
    notes: [
      "Use factoring, completing square, or quadratic formula based on structure.",
      "Discriminant b^2 - 4ac classifies root behavior.",
      "Vertex/axis form supports interpretation of maxima/minima."
    ]
  },
  {
    match: ["logarithm"],
    notes: [
      "Domain rule: log input must be strictly positive.",
      "Convert between exponential and logarithmic forms fluently.",
      "Apply product/quotient/power rules only when domain is valid."
    ]
  },
  {
    match: ["trigonometry", "polar", "parametric"],
    notes: [
      "Track angle units (radians vs degrees) consistently.",
      "Use identities strategically, not mechanically.",
      "Check periodicity and principal values in inverse trig contexts."
    ]
  },
  {
    match: ["limits", "continuity"],
    notes: [
      "Evaluate direct substitution first, then algebraic simplification if indeterminate.",
      "Distinguish removable, jump, and infinite discontinuities.",
      "One-sided limits determine overall limit existence."
    ]
  },
  {
    match: ["derivative"],
    notes: [
      "Derivative represents instantaneous rate of change and local slope.",
      "Use product/quotient/chain rules with clean structure and parentheses.",
      "Interpret sign of f' and f'' for monotonicity and concavity."
    ]
  },
  {
    match: ["integration", "area", "volume"],
    notes: [
      "Antiderivative + constant for indefinite integrals; bounds for definite integrals.",
      "FTC links accumulation to derivative and net change.",
      "For volume methods, define slices clearly and keep units cubic."
    ]
  },
  {
    match: ["inference", "chi-square", "regression", "probability"],
    notes: [
      "State hypotheses and conditions before calculation.",
      "Interpret p-value/context rather than memorizing thresholds.",
      "For regression, assess assumptions using residual behavior."
    ]
  },
  {
    match: ["cell", "genetics", "evolution", "ecology", "biology"],
    notes: [
      "Connect structure to function at molecular and system scales.",
      "Explain mechanisms with evidence rather than isolated facts.",
      "Use experimental design language: control, variable, replication."
    ]
  },
  {
    match: ["chem", "stoichiometry", "equilibrium", "kinetics", "thermodynamics", "electrochem"],
    notes: [
      "Track units and significant quantities every step.",
      "Identify driving forces (energy, entropy, concentration, potential).",
      "Separate equilibrium position from reaction rate logic."
    ]
  },
  {
    match: ["history", "civilization", "wars", "empire", "industrial"],
    notes: [
      "Frame periodization and causation before evidence selection.",
      "Use primary/secondary sources with provenance checks.",
      "Differentiate trigger events from long-run structural causes."
    ]
  },
  {
    match: ["government", "constitution", "policy", "federalism", "civil liberties"],
    notes: [
      "Identify institution powers and limits before evaluating outcomes.",
      "Use constitutional principle + precedent + consequence structure.",
      "Compare competing interpretations with explicit assumptions."
    ]
  },
  {
    match: ["economics", "market", "macro", "micro", "stabilization", "income", "financial"],
    notes: [
      "Use model assumptions explicitly (ceteris paribus, time horizon, openness).",
      "Separate short-run from long-run effects and distributional impacts.",
      "Track equilibrium shifts with labeled causal chains."
    ]
  },
  {
    match: ["computer", "recursion", "array", "sorting", "object", "inheritance", "logic"],
    notes: [
      "Reason with invariants and edge-case tests.",
      "For recursion, define base case and measure progress toward it.",
      "Justify data structure/algorithm choices using constraints."
    ]
  },
  {
    match: ["spanish", "syntax", "tense", "vocabulary", "literary"],
    notes: [
      "Choose tense/mood by communicative intent and timeframe.",
      "Maintain agreement and register consistency.",
      "Use transitions to strengthen coherence and interpretation."
    ]
  }
];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function stripLatex(text: string): string {
  return text
    .replace(/\$+/g, "")
    .replace(/\\(frac|cdot|times|left|right|le|ge|neq|approx|to|rightarrow|implies)/g, "")
    .replace(/[{}]/g, "")
    .replace(/\\/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getAnswerPreview(question: Question): string {
  if (question.responseType === "input") {
    if (typeof question.numericAnswer === "number") return `${question.numericAnswer}`;
    if (question.acceptedAnswers && question.acceptedAnswers.length > 0) return question.acceptedAnswers[0];
    return "Constructed response";
  }
  return question.choices[question.answerIndex] ?? "See solution";
}

function pickWorkedExamples(pool: Question[]): WorkedExample[] {
  const byDifficulty: Array<Question | undefined> = [
    pool.find((q) => q.difficulty === "easy"),
    pool.find((q) => q.difficulty === "medium"),
    pool.find((q) => q.difficulty === "hard")
  ];

  const seeded = byDifficulty.filter((q): q is Question => Boolean(q));
  const fallback = pool.filter((q) => !seeded.some((s) => s.id === q.id)).slice(0, Math.max(0, 3 - seeded.length));

  return [...seeded, ...fallback].slice(0, 3).map((q) => ({
    id: q.id,
    question: q.question,
    solution: q.explanation,
    difficulty: q.difficulty,
    answerPreview: getAnswerPreview(q)
  }));
}

function makeRetrievalDrills(subject: string, subtopic: string, examples: WorkedExample[]): RetrievalDrill[] {
  const unit = subtopic === "All Topics" ? `${subject} comprehensive review` : `${subject} - ${subtopic}`;
  const drills: RetrievalDrill[] = [
    {
      prompt: `In 2-3 sentences, define what mastery looks like in ${unit}.`,
      answer: "Mastery means selecting the correct framework, executing accurately, and validating the result with constraints/evidence/context."
    },
    {
      prompt: `List 3 mistakes you must avoid in ${unit}.`,
      answer: "Avoid assumption mismatch, skipped validation, and context-free final answers."
    }
  ];

  examples.slice(0, 2).forEach((example, idx) => {
    drills.push({
      prompt: `Drill ${idx + 1}: Without looking, solve this prompt skeleton from memory: ${stripLatex(example.question).slice(0, 130)}...`,
      answer: `Target result: ${stripLatex(example.answerPreview)}. Full method: ${stripLatex(example.solution)}`
    });
  });

  return drills;
}

function getMemorySheet(subject: string, subtopic: string, group: string): string[] {
  const haystack = `${normalize(subject)} ${normalize(subtopic)}`;
  const matched = UNIT_REFERENCE.filter((entry) => entry.match.some((key) => haystack.includes(key)));

  if (matched.length === 0) {
    if (group === "Mathematics") {
      return [
        "Write constraints first (domain, intervals, signs, units).",
        "Keep symbolic steps clean; defer rounding.",
        "Substitute back to verify validity."
      ];
    }
    if (group === "Science") {
      return [
        "Use claim-evidence-reasoning structure.",
        "Track variable roles and confounders.",
        "State uncertainty and scope."
      ];
    }
    return [
      "Anchor claims to evidence.",
      "Check assumptions before conclusions.",
      "Use explicit reasoning links (because/therefore/however)."
    ];
  }

  return Array.from(new Set(matched.flatMap((entry) => entry.notes))).slice(0, 6);
}

export function buildLearnPacket(subject: string, subtopic: string): LearnPacket {
  const group = getGroupNameForCourse(subject);
  const titleUnit = subtopic === "All Topics" ? "Comprehensive Review" : subtopic;

  const subjectPool = ACTIVE_QUESTION_BANK.filter((q) => normalize(q.subject) === normalize(subject));
  const scopedPool =
    subtopic === "All Topics"
      ? subjectPool
      : subjectPool.filter((q) => normalize(q.subtopic) === normalize(subtopic));

  const examplePool = scopedPool.length > 0 ? scopedPool : subjectPool;
  const workedExamples = pickWorkedExamples(examplePool);
  const retrievalDrills = makeRetrievalDrills(subject, subtopic, workedExamples);

  const keyIdeas = [
    `Core objective: solve ${titleUnit} tasks with complete reasoning, not just final answers.`,
    `Unit alignment: questions test method selection, execution quality, and interpretation in ${subject}.`,
    `Scoring focus: correct setup + valid assumptions + verified conclusion.`
  ];

  const studyPlan = [
    "10 min: read memory sheet and restate each point in your own words.",
    "20 min: work the 3 examples below step-by-step on paper, then compare to solutions.",
    "10 min: complete retrieval drills without notes.",
    "10 min: start a 5-10 question practice set and log every miss by error type."
  ];

  return {
    title: `${subject} • ${titleUnit}`,
    unitLabel: titleUnit,
    overview: DOMAIN_OVERVIEW[group] ?? DOMAIN_OVERVIEW.General,
    examUse:
      subtopic === "All Topics"
        ? `Use this as your pre-test review room for all ${subject} units. Rotate through each unit after finishing the recall drills.`
        : `Use this room to review ${titleUnit} deeply, then transition directly into timed practice for this same unit.`,
    keyIdeas,
    keySteps: DOMAIN_STEPS[group] ?? DOMAIN_STEPS.General,
    memorySheet: getMemorySheet(subject, subtopic, group),
    commonTraps: DOMAIN_TRAPS[group] ?? DOMAIN_TRAPS.General,
    workedExamples,
    retrievalDrills,
    studyPlan
  };
}
