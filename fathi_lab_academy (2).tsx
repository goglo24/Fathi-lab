// Safeguard to prevent crashes if the external Tailwind library fails to load or is blocked
if (typeof window !== 'undefined' && !window.tailwind) {
  window.tailwind = new Proxy({}, {
    get: (target, prop) => {
      if (prop === 'config') return {};
      return () => {};
    },
    set: () => true
  });
}

import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Search, 
  Award, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Calendar, 
  FileText, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Menu, 
  X, 
  ChevronRight, 
  SlidersHorizontal, 
  Download, 
  Trash2, 
  User, 
  Compass, 
  Database, 
  Globe, 
  Linkedin, 
  Facebook, 
  Youtube, 
  Layers, 
  Clock, 
  Plus, 
  Eye, 
  Settings, 
  BarChart2, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  PlayCircle,
  Terminal,
  Play,
  RefreshCw,
  Bell,
  Check
} from 'lucide-react';

// Custom Banner / Logo component using Telegram color scheme & academic vibe
const Logo = () => (
  <div className="flex items-center space-x-2 cursor-pointer">
    <div className="bg-gradient-to-tr from-blue-600 to-indigo-800 text-white p-2 rounded-xl shadow-lg flex items-center justify-center">
      <GraduationCap className="h-6 w-6" />
    </div>
    <div>
      <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
        Fathi<span className="text-blue-600">-Lab</span>
      </span>
      <p className="text-[9px] uppercase tracking-widest font-semibold text-slate-500 block -mt-1">
        Learn • Research • Innovate
      </p>
    </div>
  </div>
);

export default function App() {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState('home'); // home, courses, research, store, community, dashboard, admin, contact
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Toast Notification State
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };
  
  // LMS State
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseFilter, setCourseFilter] = useState('All');
  const [enrolledCourses, setEnrolledCourses] = useState([1, 3]); // Initial enrolled course IDs
  const [quizState, setQuizState] = useState({
    active: false,
    courseId: null,
    currentQuestion: 0,
    answers: {},
    submitted: false,
    score: 0
  });

  // Simulated Interactive Code Sandbox State
  const [activeConsoleTab, setActiveConsoleTab] = useState('editor'); // editor, logs
  const [selectedConsoleScript, setSelectedConsoleScript] = useState('soil_analysis.py');
  const [consoleCode, setConsoleCode] = useState(
`# Fathi-Lab Interactive STEM Console v1.02
import numpy as np
import pandas as pd

def analyze_soil_moisture(pH_level, moisture_pct):
    print("Initializing organic soil evaluation telemetry...")
    if pH_level < 5.5:
        return "Critically Acidic Soil. Recommended Carbonate amendment."
    elif pH_level > 7.5:
        return "Alkaline Soil. Recommended elemental sulfur addition."
    else:
        return "Optimal pH balance identified for localized cereal crops."

# You can modify these values below to see dynamic compiler results!
result = analyze_soil_moisture(pH_level=6.2, moisture_pct=42.5)
print(f"Diagnostics: {result}")`
  );

  const [consoleOutput, setConsoleOutput] = useState([
    'Fathi-Lab virtual terminal loaded.',
    'System status: ONLINE | Regional hub: Addis Ababa',
    'Type "help" in the command line or choose a script to execute.'
  ]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [cliCommand, setCliCommand] = useState('');
  const terminalBottomRef = useRef(null);

  // Predefined Interactive Scripts Directory
  const consoleScripts = {
    'soil_analysis.py': {
      title: 'Agriculture: Soil Diagnostics (Python)',
      code: `# Fathi-Lab Interactive STEM Console v1.02
import numpy as np
import pandas as pd

def analyze_soil_moisture(pH_level, moisture_pct):
    print("Initializing organic soil evaluation telemetry...")
    if pH_level < 5.5:
        return "Critically Acidic Soil. Recommended Carbonate amendment."
    elif pH_level > 7.5:
        return "Alkaline Soil. Recommended elemental sulfur addition."
    else:
        return "Optimal pH balance identified for localized cereal crops."

# You can modify these values below to see dynamic compiler results!
result = analyze_soil_moisture(pH_level=6.2, moisture_pct=42.5)
print(f"Diagnostics: {result}")`
    },
    'neural_network_train.py': {
      title: 'AI: SVM Soil Prediction Model (Python)',
      code: `# Artificial Intelligence & SVM Classifier Core
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
import numpy as np

print("Generating synthetic crop telemetry array...")
X = np.random.rand(100, 4) # Features: pH, Nitrogen, Potassium, Phosphorous
y = np.random.randint(0, 2, 100) # Yield Success: 0 or 1

# Modifying test_size or C below changes output stats dynamically!
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20)
clf = SVC(kernel='linear', C=1.0)

print("Training Linear Support Vector Machine on agricultural inputs...")
clf.fit(X_train, y_train)

accuracy = clf.score(X_test, y_test)
print(f"Validation complete. Epoch accuracy: {accuracy * 100:.2f}%")`
    },
    'thesis_template.tex': {
      title: 'LaTeX: Research Formatting (TeX)',
      code: `% Fathi-Lab Academy - Overleaf Style Research Template
\\documentclass[11pt, a4paper]{article}
\\usepackage[utf8]{inputenc}

% Modify the Title or Author below and run simulation to compile!
\\title{Evaluating Soil Optimization under Automated Hydration Platforms}
\\author{Candidate: Kidus Tsegaye}
\\date{May 2026}

\\begin{document}
\\maketitle
\\section{Introduction}
Modern agricultural operations require hyper-targeted soil parameter tuning...
\\end{document}`
    },
    'calculus_integration.py': {
      title: 'Calculus: STEM Numerical Integration',
      code: `# STEM Calculus & Integral approximations
import numpy as np

def function_to_integrate(x):
    return np.sin(x) * np.exp(-x / 5.0)

# Modify integration limits (lower_bound, upper_bound) below:
lower_bound = 0.0
upper_bound = 10.0
steps = 1000

print(f"Calculating numerical Riemann sum integration...")
dx = (upper_bound - lower_bound) / steps
integral_sum = sum(function_to_integrate(lower_bound + i * dx) * dx for i in range(steps))
print(f"Resulting Integral Area approximation: {integral_sum:.6f}")`
    }
  };

  const handleScriptChange = (scriptName) => {
    setSelectedConsoleScript(scriptName);
    setConsoleCode(consoleScripts[scriptName].code);
    setConsoleOutput([
      `Switched context to: ${scriptName}`,
      'The virtual compiler is synchronized. Modify values in code editor and click "Run Simulation".'
    ]);
  };

  // ADVANCED DYNAMIC CODE PARSER AND SIMULATION RUNNER
  const runConsoleCode = () => {
    setIsCompiling(true);
    setActiveConsoleTab('logs');
    setConsoleOutput((prev) => [...prev, `>>> Initiating compiler pipelines for ${selectedConsoleScript}...`]);

    const simulatedProcessSteps = [];

    // Parse the actual text content of consoleCode dynamically using Regex
    if (selectedConsoleScript === 'soil_analysis.py') {
      // Find pH and moisture variables inside code
      const pHRegex = /pH_level\s*=\s*([\d\.]+)/;
      const moistureRegex = /moisture_pct\s*=\s*([\d\.]+)/;
      
      const pHMatch = consoleCode.match(pHRegex);
      const moistureMatch = consoleCode.match(moistureRegex);

      const pH = pHMatch ? parseFloat(pHMatch[1]) : 6.2;
      const moisture = moistureMatch ? parseFloat(moistureMatch[1]) : 42.5;

      let diagnosisResult = "Optimal pH balance identified for localized cereal crops.";
      if (pH < 5.5) {
        diagnosisResult = "Critically Acidic Soil. Recommended Carbonate amendment.";
      } else if (pH > 7.5) {
        diagnosisResult = "Alkaline Soil. Recommended elemental sulfur addition.";
      }

      simulatedProcessSteps.push(
        '>>> Executing soil_analysis.py...',
        'Importing numpy libraries...',
        'Importing pandas telemetry frameworks...',
        'Initializing organic soil evaluation telemetry...',
        `[SENSORS] Reading input: pH_level calculated at ${pH.toFixed(2)}`,
        `[SENSORS] Reading input: moisture_pct calculated at ${moisture.toFixed(2)}%`,
        'Analyzing chemical profile gradients...',
        `Diagnostics: ${diagnosisResult}`,
        'Process finished with exit code 0.'
      );

    } else if (selectedConsoleScript === 'neural_network_train.py') {
      // Find split size and C parameters
      const testSizeRegex = /test_size\s*=\s*([\d\.]+)/;
      const cParamRegex = /C\s*=\s*([\d\.]+)/;

      const testSizeMatch = consoleCode.match(testSizeRegex);
      const cParamMatch = consoleCode.match(cParamRegex);

      const testSize = testSizeMatch ? parseFloat(testSizeMatch[1]) : 0.20;
      const cParam = cParamMatch ? parseFloat(cParamMatch[1]) : 1.0;

      // Calculate pseudo accuracy and loss based on inputs
      const sampleSize = Math.round(100 * (1 - testSize));
      let pseudoAccuracy = 0.85 + (cParam * 0.02) - (testSize * 0.05);
      if (pseudoAccuracy > 0.99) pseudoAccuracy = 0.99;
      if (pseudoAccuracy < 0.50) pseudoAccuracy = 0.50;
      const pseudoLoss = (1 - pseudoAccuracy) * 0.45;

      simulatedProcessSteps.push(
        '>>> Executing neural_network_train.py...',
        'Generating synthetic crop telemetry array...',
        `Configured testing partition ratio: ${testSize.toFixed(2)} (${Math.round(100 * testSize)}% validation data)`,
        `Configured regularization constant C: ${cParam.toFixed(2)}`,
        'Initializing SVM optimization gradients...',
        `Dataset sliced into ${sampleSize} training elements. Fitting hyperplanes...`,
        `Training Linear Support Vector Machine on agricultural inputs...`,
        `Iteration 10/10 - Loss: ${pseudoLoss.toFixed(4)} - Epoch train accuracy: ${(pseudoAccuracy + 0.03).toFixed(3)}`,
        `Validation complete. Epoch accuracy: ${(pseudoAccuracy * 100).toFixed(2)}%`,
        'Model compiled successfully. Saved weights to /weights/svm_crop_v1.bin',
        'Process finished with exit code 0.'
      );

    } else if (selectedConsoleScript === 'thesis_template.tex') {
      // Extract title and author dynamically
      const titleRegex = /\\title\{([^\}]+)\}/;
      const authorRegex = /\\author\{([^\}]+)\}/;

      const titleMatch = consoleCode.match(titleRegex);
      const authorMatch = consoleCode.match(authorRegex);

      const currentTitle = titleMatch ? titleMatch[1] : 'Evaluating Soil Optimization under Automated Hydration';
      const currentAuthor = authorMatch ? authorMatch[1] : 'Candidate: Kidus Tsegaye';

      simulatedProcessSteps.push(
        '>>> Compiling LaTeX source using pdfTeX-3.14159...',
        'Document Class: standard article template loaded.',
        'Package utf8 inputenc verified.',
        `DOCUMENT TITLE: "${currentTitle}"`,
        `DOCUMENT AUTHOR: "${currentAuthor}"`,
        'Parsing Chapter Metadata: section {Introduction}...',
        'Generating dynamic Table of Contents...',
        'Rendering abstract block...',
        `Output compiled to: output_thesis.pdf [Size: 1.4 MB]`,
        'Compilation finished successfully with 0 warnings.'
      );

    } else if (selectedConsoleScript === 'calculus_integration.py') {
      // Extract lower, upper bound and steps
      const lowerRegex = /lower_bound\s*=\s*([\d\.\-]+)/;
      const upperRegex = /upper_bound\s*=\s*([\d\.\-]+)/;
      const stepsRegex = /steps\s*=\s*(\d+)/;

      const lowerMatch = consoleCode.match(lowerRegex);
      const upperMatch = consoleCode.match(upperRegex);
      const stepsMatch = consoleCode.match(stepsRegex);

      const lower = lowerMatch ? parseFloat(lowerMatch[1]) : 0.0;
      const upper = upperMatch ? parseFloat(upperMatch[1]) : 10.0;
      const stepsNum = stepsMatch ? parseInt(stepsMatch[1], 10) : 1000;

      // Real integration logic for dynamic outputs inside the simulator
      const f = (x) => Math.sin(x) * Math.exp(-x / 5.0);
      const dx = (upper - lower) / stepsNum;
      let riemannSum = 0;
      for (let i = 0; i < stepsNum; i++) {
        riemannSum += f(lower + i * dx) * dx;
      }

      simulatedProcessSteps.push(
        '>>> Executing calculus_integration.py...',
        `Setting integration interval limits: [${lower.toFixed(2)}, ${upper.toFixed(2)}]`,
        `Partition subdivisions count: ${stepsNum}`,
        `Calculating numerical Riemann sum integration...`,
        `Trapezoidal delta-x: ${dx.toFixed(6)}`,
        `Computing loop summation arrays...`,
        `Resulting Integral Area approximation: ${riemannSum.toFixed(6)}`,
        'Process finished with exit code 0.'
      );
    }

    // Output printing algorithm with timeline delay intervals
    let index = 0;
    const interval = setInterval(() => {
      if (index < simulatedProcessSteps.length) {
        setConsoleOutput((prev) => [...prev, simulatedProcessSteps[index]]);
        index++;
      } else {
        clearInterval(interval);
        setIsCompiling(false);
        addToast(`Executed ${selectedConsoleScript} with dynamic parameters!`, 'success');
        setTelemetryLogs((prev) => [`LMS Run: "${selectedConsoleScript}" compiled dynamically.`, ...prev]);
      }
    }, 350);
  };

  // INTERACTIVE BASH TERMINAL COMMAND EVALUATOR
  const handleCommandLineSubmit = (e) => {
    e.preventDefault();
    if (!cliCommand.trim()) return;

    const command = cliCommand.trim().toLowerCase();
    const commandLinePrint = `fathilab@stem:~$ ${cliCommand}`;
    let terminalResponse = [];

    if (command === 'help') {
      terminalResponse = [
        'Available terminal commands:',
        '  run              - Compiles and runs the currently active script tab.',
        '  ls               - Lists the files available in the virtual workspace.',
        '  cat [filename]   - Prints the raw file contents in the logs terminal.',
        '  clear            - Clears the terminal output logs completely.',
        '  sysinfo          - Displays details about the virtual runtime container.',
        '  credits          - Shows information about Fathi-Lab development team.'
      ];
    } else if (command === 'ls') {
      terminalResponse = [
        'Listing directory: /artifacts/fathilab/public/data',
        '  - soil_analysis.py            (Python Agricultural Script)',
        '  - neural_network_train.py     (AI Scikit-Learn Model)',
        '  - thesis_template.tex         (Scientific LaTeX Outline)',
        '  - calculus_integration.py     (Riemann SumSTEM Calculator)'
      ];
    } else if (command === 'clear') {
      setConsoleOutput([]);
      setCliCommand('');
      return;
    } else if (command === 'sysinfo') {
      terminalResponse = [
        'Fathi-Lab virtual STEM container runtime v1.0.2',
        'OS Platform  : GNU/Linux Debian Bullseye 11 (Noto-friendly core)',
        'Node Runtime : Node.js v18.15.0 with React context support',
        'CDN Assets   : Tailwind CSS, Lucide icons, Google Noto font-family',
        'Region       : Addis Ababa (EAT timezone sync)',
        'Memory usage : 42 MB / 512 MB active sandbox boundary'
      ];
    } else if (command === 'credits') {
      terminalResponse = [
        'Fathi-Lab Digital Academy - Learn • Research • Innovate',
        'Founding Director  : Dr. Ahmed Fathi',
        'Development Team   : STEM Platform Engineers, Addis Ababa',
        'Contact Email      : fathisore49@gmail.com',
        'Contact Phone      : +251922006873'
      ];
    } else if (command === 'run') {
      setConsoleOutput((prev) => [...prev, commandLinePrint]);
      setCliCommand('');
      runConsoleCode();
      return;
    } else if (command.startsWith('cat ')) {
      const fileName = cliCommand.trim().substring(4).toLowerCase();
      if (consoleScripts[fileName]) {
        terminalResponse = [
          `Printing raw contents of: ${fileName}`,
          '-------------------------------------------------------',
          ...consoleScripts[fileName].code.split('\n'),
          '-------------------------------------------------------'
        ];
      } else {
        terminalResponse = [`cat: ${fileName}: No such file in active directory workspace.`];
      }
    } else {
      terminalResponse = [
        `bash: ${command}: command not identified.`,
        'Type "help" to display the directory of available terminal commands.'
      ];
    }

    setConsoleOutput((prev) => [...prev, commandLinePrint, ...terminalResponse]);
    setCliCommand('');
  };

  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleOutput]);

  // Research Hub State
  const [researchTopic, setResearchTopic] = useState('');
  const [researchField, setResearchField] = useState('Data Science');
  const [researchStage, setResearchStage] = useState('Proposal Writing');
  const [analysisTool, setAnalysisTool] = useState('Python / Pandas');
  const [customGuideText, setCustomGuideText] = useState(null);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', date: '', time: '', topic: '' });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // E-Commerce Store State
  const [cart, setCart] = useState([]);
  const [storeFilter, setStoreFilter] = useState('All');
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('telebirr'); // telebirr, card, CBE
  const [checkoutForm, setCheckoutForm] = useState({ name: '', phone: '', email: '' });

  // Community & News State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Admin and Dynamic State (Easily editable by owners)
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Introduction to Artificial Intelligence & Data Science",
      category: "AI & Data Science",
      instructor: "Dr. Ahmed Fathi",
      duration: "12 Weeks",
      level: "Beginner to Intermediate",
      students: 2340,
      rating: 4.9,
      price: "Free",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop&q=60",
      description: "Master the fundamentals of AI, machine learning pipelines, and essential Python libraries for data analysis and visualization.",
      curriculum: [
        "Module 1: Introduction to Python for Data Analysis",
        "Module 2: Essential Mathematics for Machine Learning",
        "Module 3: Linear Regression & Supervised Algorithms",
        "Module 4: Practical Neural Networks & Deploying Models"
      ],
      quiz: {
        title: "AI & Data Science Readiness Quiz",
        questions: [
          { q: "What is the primary library used for data manipulation in Python?", options: ["NumPy", "Pandas", "Matplotlib", "Scikit-Learn"], correct: 1 },
          { q: "Which learning algorithm uses labeled training dataset?", options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Clustering"], correct: 0 },
          { q: "What does 'Epoch' mean in Deep Learning?", options: ["A mathematical constant", "One complete pass through the entire training dataset", "The rate of optimization descent", "A specific neural node structure"], correct: 1 }
        ]
      }
    },
    {
      id: 2,
      title: "Advanced Research Methods & Academic Writing",
      category: "Research Methods",
      instructor: "Prof. Helen Solomon",
      duration: "8 Weeks",
      level: "Advanced",
      students: 1120,
      rating: 4.8,
      price: "1,200 ETB",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=60",
      description: "Learn how to formulate hypothesis statements, perform academic literature review, structure thesis outlines, and handle citations.",
      curriculum: [
        "Module 1: Refining Research Questions & Proposals",
        "Module 2: Systematic Literature Mapping",
        "Module 3: Methodology Design & Statistical Sample Sizes",
        "Module 4: Avoiding Academic Plagiarism & Peer Review Prep"
      ],
      quiz: {
        title: "Academic Writing Assessment",
        questions: [
          { q: "Which style is most commonly used for scientific citations?", options: ["MLA", "APA", "Chicago", "Harvard/IEEE"], correct: 3 },
          { q: "A good research hypothesis should be:", options: ["Vague and highly descriptive", "Testable and falsifiable", "Indisputable and obvious", "Composed of at least three paragraphs"], correct: 1 }
        ]
      }
    },
    {
      id: 3,
      title: "Principles of Modern Agriculture & Soil Sciences",
      category: "Agriculture",
      instructor: "Dr. Mulugheta Abebe",
      duration: "10 Weeks",
      level: "Intermediate",
      students: 890,
      rating: 4.7,
      price: "900 ETB",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&auto=format&fit=crop&q=60",
      description: "Examine Ethiopian soil types, contemporary irrigation designs, crop rotation algorithms, and agricultural tech integrations.",
      curriculum: [
        "Module 1: Soil pH and Mineral Content Optimization",
        "Module 2: Sustainable Hydroponics & Crop Rotation",
        "Module 3: Climate-Smart Agricultural Tech Tools",
        "Module 4: Managing Agri-Business Distribution Chains"
      ],
      quiz: {
        title: "Soil Science & Crop Management Basics",
        questions: [
          { q: "Which major nutrient is responsible for leafy green vegetative growth?", options: ["Nitrogen", "Phosphorus", "Potassium", "Calcium"], correct: 0 },
          { q: "What is the main benefit of crop rotation?", options: ["Decreasing land tax", "Improving soil nutrient structure and breaking pest cycles", "Eliminating the need for regular watering", "Making harvesting processes fully automated"], correct: 1 }
        ]
      }
    },
    {
      id: 4,
      title: "Biotechnology & Advanced Laboratory Genetics",
      category: "Biology",
      instructor: "Dr. Ahmed Fathi",
      duration: "14 Weeks",
      level: "Advanced",
      students: 650,
      rating: 4.9,
      price: "1,500 ETB",
      image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=500&auto=format&fit=crop&q=60",
      description: "Dive deep into modern molecular biology, CRISPR gene editing techniques, DNA replication modeling, and PCR setups.",
      curriculum: [
        "Module 1: Structure of Genomes & DNA Transcription",
        "Module 2: Recombinant DNA Technologies",
        "Module 3: CRISPR Case Studies and Technical Protocols",
        "Module 4: Bioinformatics and Molecular Modeling Software"
      ]
    },
    {
      id: 5,
      title: "Comprehensive STEM Calculus & Mathematical Modeling",
      category: "Mathematics",
      instructor: "Ato Dawit Birru",
      duration: "12 Weeks",
      level: "Intermediate",
      students: 1540,
      rating: 4.6,
      price: "Free",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=60",
      description: "Master differential equations, Fourier transforms, linear systems, and computational calculus used extensively in physics and data science.",
      curriculum: [
        "Module 1: Limits, Continuity and Derivatives",
        "Module 2: Integration Techniques and Area Approximations",
        "Module 3: Differential Equations & Real-World Simulations",
        "Module 4: Matrix Calculations and Multi-Variable Vectors"
      ]
    },
    {
      id: 6,
      title: "Chemistry of Organic Compounds & Lab Synthesis",
      category: "Chemistry",
      instructor: "Prof. Helen Solomon",
      duration: "10 Weeks",
      level: "Intermediate",
      students: 720,
      rating: 4.8,
      price: "1,100 ETB",
      image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=500&auto=format&fit=crop&q=60",
      description: "Explore hybridization, functional group properties, stereochemistry mechanisms, and practical chemical lab security operations.",
      curriculum: [
        "Module 1: Alkanes, Alkenes, and Aromatic Hydrocarbons",
        "Module 2: Functional Groups: Alcohols, Esters, and Ketones",
        "Module 3: Reaction Mechanisms: Nucleophilic Substitutions",
        "Module 4: Organic Synthesis Planning and Lab Equipment Rules"
      ]
    }
  ]);

  const [products, setProducts] = useState([
    {
      id: 101,
      title: "Scientific Thesis Proposal Template (APA & IEEE)",
      category: "Templates",
      type: "digital",
      price: 250,
      rating: 4.9,
      downloads: 412,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60",
      description: "A fully formatted, professional template with dynamic Table of Contents, citation layouts, and methodology frameworks formatted in both APA 7th edition and IEEE standards."
    },
    {
      id: 102,
      title: "Python for Data Analysis - Comprehensive E-Book",
      category: "Books",
      type: "digital",
      price: 400,
      rating: 4.8,
      downloads: 689,
      image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=500&auto=format&fit=crop&q=60",
      description: "Over 350 pages of clean, production-ready python implementations for numerical integration, mathematical graphs, data parsing, Pandas manipulation, and machine learning structures."
    },
    {
      id: 103,
      title: "Premium Scientific LaTeX Document Kit",
      category: "Software",
      type: "digital",
      price: 550,
      rating: 5.0,
      downloads: 184,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60",
      description: "Ready-to-compile modern scientific report structures, custom CV frameworks, and presentation slide models pre-loaded with necessary Noto-friendly configurations."
    },
    {
      id: 104,
      title: "Premium Lab Safety Equipment Kit",
      category: "Equipment",
      type: "physical",
      price: 1850,
      rating: 4.6,
      downloads: 45,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60",
      description: "Shipped physical package of protective goggles, professional level cotton lab coat, basic chemical testing strips, and clean storage containers. (Delivery within Addis Ababa)."
    },
    {
      id: 105,
      title: "Bioinformatics Research Paper Suite",
      category: "Templates",
      type: "digital",
      price: 350,
      rating: 4.7,
      downloads: 98,
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=500&auto=format&fit=crop&q=60",
      description: "Includes standardized templates for genes modeling diagrams, sequence mapping tables, and ready statistical charts configurations to accelerate scientific publications."
    }
  ]);

  const [events] = useState([
    {
      id: 201,
      title: "Scientific Paper Formatting & High-Impact Journal Submission",
      speaker: "Dr. Ahmed Fathi",
      date: "June 10, 2026",
      time: "2:00 PM - 4:00 PM EAT",
      mode: "Online (Zoom & YouTube Live)",
      description: "A comprehensive masterclass on how to format your thesis, write catchy abstracts, communicate with journal editors, and handle peer feedback without rejections.",
      tag: "Writing Masterclass"
    },
    {
      id: 202,
      title: "Data Analytics, R, and SPSS in Medical Research",
      speaker: "Prof. Helen Solomon & AI Team",
      date: "June 25, 2026",
      time: "10:00 AM - 1:00 PM EAT",
      mode: "Fathi-Lab Classroom (Addis Ababa) & Streamed",
      description: "Hands-on statistical workshop covering ANOVA, chi-square tests, correlation analysis, and regression modeling with real medical study datasets.",
      tag: "Statistics"
    }
  ]);

  const [blogs] = useState([
    {
      id: 301,
      title: "How to Secure Full Scholarships for Academic Research in STEM",
      author: "Admin Team",
      date: "May 20, 2026",
      readTime: "6 min read",
      category: "Scholarships",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&auto=format&fit=crop&q=60",
      excerpt: "Step-by-step guide to crafting research proposals that convince scholarship boards, with templates and direct email advice tips."
    },
    {
      id: 302,
      title: "Integrating Machine Learning Models in Agritech Solutions",
      author: "Dr. Ahmed Fathi",
      date: "May 14, 2026",
      readTime: "8 min read",
      category: "AI & Agriculture",
      image: "https://images.unsplash.com/photo-1625246373973-100a3407e3df?w=400&auto=format&fit=crop&q=60",
      excerpt: "How remote sensing, satellite images, and basic regression algorithms are predicting soil health indices and moisture content across Ethiopia."
    }
  ]);

  const [ownerMetrics, setOwnerMetrics] = useState({
    totalStudents: 10452,
    totalRevenue: 284300,
    activeProjects: 524,
    consultationsBooked: 112
  });

  const [telemetryLogs, setTelemetryLogs] = useState([
    "System Startup: Fathi-Lab Command Center initialized successfully.",
    "LMS Sync: Connected to Addis Ababa regional server hub.",
    "Store telemetry initialized: Telebirr endpoint set to dynamic routing."
  ]);

  // Track Simulated Course Progress
  const [courseProgress, setCourseProgress] = useState({
    1: 75, // 75% complete
    3: 20  // 20% complete
  });

  // Generate Personalized Scientific Research Advice
  const generateResearchGuide = (e) => {
    e.preventDefault();
    if (!researchTopic.trim()) {
      addToast("Please provide a valid thesis topic first!", "warning");
      return;
    }
    
    // Generate tailored, scientific response based on fields
    const methodology = analysisTool.includes('Python') || analysisTool.includes('R') ? 'quantitative and computational' : 'empirical and statistical';
    const guidance = {
      title: `Fathi-Lab Guided Blueprint: ${researchTopic}`,
      recommendedStructure: [
        "1. Abstract & Local Significance",
        `2. Theoretical Literature Review: Current landscape of ${researchField}`,
        `3. Methodology Blueprint: ${methodology} strategy using ${analysisTool}`,
        `4. Analysis & Result Hypotheses based on ${researchStage} guidelines`,
        "5. Ethical approvals, citation validation, and submission blueprints"
      ],
      steps: [
        `Refine your current status in [${researchStage}] by setting up a clear hypothesis framework.`,
        `Employ [${analysisTool}] to model data points. For optimal outputs, ensure sample data sizes exceed 100 entries.`,
        `Format citation using APA format. Leverage our Fathi-Lab templates in the digital store to automate Word/LaTeX compiling.`,
        `Schedule a 1-on-1 peer review consultation with our research wing for custom publication support.`
      ]
    };
    setCustomGuideText(guidance);
    addToast("Thesis blueprint compiled successfully!", "success");
    setTelemetryLogs(prev => [`Research: Blueprint generated for "${researchTopic}"`, ...prev]);
  };

  // Cart operations
  const addToCart = (product) => {
    if (cart.find(item => item.id === product.id)) {
      addToast("This item is already inside your cart basket!", "warning");
      return;
    }
    setCart([...cart, product]);
    addToast(`Added "${product.title}" to cart successfully!`, "success");
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    addToast("Item removed from your cart.", "info");
  };

  const calculateTotal = () => {
    return cart.reduce((acc, curr) => acc + curr.price, 0);
  };

  // Submit checkout
  const handleCheckout = (e) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone) {
      addToast("Please enter a valid Name and Mobile Phone Number", "warning");
      return;
    }
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutModal(false);
      setCheckoutSuccess(false);
      setCart([]);
      addToast("Payment authorized successfully! Your dynamic download keys have been compiled.", "success");
      setTelemetryLogs(prev => [`Revenue: Received ${calculateTotal()} ETB from standard user.`, ...prev]);
    }, 2200);
  };

  // Handle Quiz Submissions
  const handleQuizAnswer = (questionIdx, optionIdx) => {
    setQuizState({
      ...quizState,
      answers: {
        ...quizState.answers,
        [questionIdx]: optionIdx
      }
    });
  };

  const submitQuiz = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course || !course.quiz) return;

    let score = 0;
    course.quiz.questions.forEach((q, idx) => {
      if (quizState.answers[idx] === q.correct) {
        score++;
      }
    });

    const calculatedScore = Math.round((score / course.quiz.questions.length) * 100);

    setQuizState({
      ...quizState,
      submitted: true,
      score: calculatedScore
    });

    if (calculatedScore >= 50) {
      setCourseProgress({
        ...courseProgress,
        [courseId]: 100
      });
      addToast("Course assessment passed! Certificate unlocked.", "success");
    } else {
      addToast("Syllabus score was below 50%. You can try again.", "info");
    }
  };

  // Handle consultation bookings
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setOwnerMetrics(prev => ({
      ...prev,
      consultationsBooked: prev.consultationsBooked + 1
    }));
    addToast("Academic Booking received! Support team scheduled.", "success");
    setTelemetryLogs(prev => [`Mentorship: New booking request from ${bookingForm.name}`, ...prev]);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingForm({ name: '', email: '', date: '', time: '', topic: '' });
    }, 4000);
  };

  // Add course command for "Owners"
  const addNewCourse = (newCourse) => {
    setCourses([...courses, { ...newCourse, id: Date.now(), students: 0, rating: 5.0 }]);
    setTelemetryLogs(prev => [`Admin: New course published - "${newCourse.title}"`, ...prev]);
  };

  // Filter items helper
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = courseFilter === 'All' || course.category === courseFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = storeFilter === 'All' || product.category === storeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      
      {/* Dynamic Slide-in Toast Banner Notification Center */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`p-4 rounded-xl shadow-2xl border flex items-start gap-3 transform translate-y-0 transition-all duration-300 animate-slide-in ${
              toast.type === 'success' 
                ? 'bg-emerald-500 border-emerald-400 text-white' 
                : toast.type === 'warning'
                ? 'bg-amber-500 border-amber-400 text-white'
                : 'bg-indigo-600 border-indigo-500 text-white'
            }`}
          >
            <div className="p-1 bg-white/20 rounded-full flex-shrink-0">
              <Check className="h-4 w-4" />
            </div>
            <div className="flex-grow">
              <p className="text-xs font-bold leading-tight">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-white/60 hover:text-white font-extrabold text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* 1. Header & Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div onClick={() => setActiveTab('home')}>
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'courses', label: 'LMS Academy' },
                { id: 'research', label: 'Research Hub' },
                { id: 'store', label: 'Store & Library' },
                { id: 'community', label: 'Community' },
                { id: 'dashboard', label: 'My Dashboard' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedCourse(null);
                    setQuizState({ ...quizState, active: false });
                  }}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id 
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-400 font-semibold' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Icons / Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Shopping Cart Indicator */}
              <button 
                onClick={() => setActiveTab('store')} 
                className="relative p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="View Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center animate-bounce">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Owner Admin Access Button */}
              <button
                onClick={() => setActiveTab('admin')}
                className="flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs font-semibold shadow-md transition-all"
              >
                <Settings className="h-3.5 w-3.5" />
                <span>Lab Owner Hub</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center space-x-4 lg:hidden">
              <button 
                onClick={() => setActiveTab('store')} 
                className="relative p-2 text-slate-600 dark:text-slate-300"
              >
                <ShoppingCart className="h-5.5 w-5.5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2">
            {[
              { id: 'home', label: 'Home' },
              { id: 'courses', label: 'LMS Academy' },
              { id: 'research', label: 'Research Hub' },
              { id: 'store', label: 'Store & Library' },
              { id: 'community', label: 'Community' },
              { id: 'dashboard', label: 'My Dashboard' },
              { id: 'admin', label: 'Lab Owner Hub (Control Panel)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                  setSelectedCourse(null);
                  setQuizState({ ...quizState, active: false });
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                  activeTab === tab.id 
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-grow">

        {/* ==================== PAGE 1: HOME ==================== */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 lg:py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Hero Text Column */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-sm">
                      <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 animate-spin" />
                      <span>Empowering Ethiopia & Beyond</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
                      Empowering Minds To <br className="hidden sm:inline" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                        Learn, Research, Innovate
                      </span>
                    </h1>

                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
                      Fathi-Lab is Ethiopia's comprehensive academic platform. We support university students, researchers, and technical builders with master-level courses, direct thesis formulation, e-books, and expert statistical mentorship.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                      <button 
                        onClick={() => setActiveTab('courses')}
                        className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                      >
                        <span>Explore Courses</span>
                        <ArrowRight className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => setActiveTab('research')}
                        className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex items-center justify-center space-x-2"
                      >
                        <Compass className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span>Thesis Support Hub</span>
                      </button>
                    </div>

                    {/* Quick trust metrics */}
                    <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/60 dark:border-slate-800/60 max-w-md mx-auto lg:mx-0">
                      <div>
                        <span className="block text-2xl font-bold text-slate-900 dark:text-white">10,000+</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Active Students</span>
                      </div>
                      <div>
                        <span className="block text-2xl font-bold text-slate-900 dark:text-white">500+</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Projects Completed</span>
                      </div>
                      <div>
                        <span className="block text-2xl font-bold text-slate-900 dark:text-white">99%</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Satisfaction Rate</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Hero Visual Board */}
                  <div className="lg:col-span-5 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-3xl blur-2xl transform rotate-6"></div>
                    <div className="relative bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-6">
                      
                      {/* Interactive Platform Feature Cards */}
                      <div className="flex items-center space-x-4 p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:scale-105 transition-transform">
                        <div className="bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl">
                          <BookOpen className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Online Learning Platform (LMS)</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Advanced study modules, active quizzes, and verifiable certificates.</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:scale-105 transition-transform">
                        <div className="bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 p-3 rounded-xl">
                          <Database className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Thesis & Analysis Center</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Expert guidance using Python, SPSS, and structural methodologies.</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:scale-105 transition-transform">
                        <div className="bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 p-3 rounded-xl">
                          <ShoppingCart className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Scientific Bookstore & Downloads</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Secure digital library filled with LaTeX kits and research manuals.</p>
                        </div>
                      </div>

                      {/* Interactive Student Quote */}
                      <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl relative shadow-md">
                        <p className="text-xs italic text-slate-300">
                          "Fathi-Lab's templates cut my bibliography formatting time in half, while the data science curriculum guided me to secure my research internship."
                        </p>
                        <div className="mt-2.5 flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-400">Yared Demeke</span>
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">AAU Postgrad</span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Core Values Section (Learn - Research - Innovate) */}
            <section className="py-16 bg-white dark:bg-slate-950 border-t border-b border-slate-100 dark:border-slate-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Our Tri-Core Focus Areas</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Every program, store download, and consultation we coordinate follows this comprehensive framework.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Learn */}
                  <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all text-center">
                    <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <GraduationCap className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">1. LEARN</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      Rigorous curricula spanning Data Science, modern Agriculture, Biology, Chemistry, advanced Mathematics, and modern research theories to build high-level local skillsets.
                    </p>
                    <button 
                      onClick={() => setActiveTab('courses')}
                      className="mt-6 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline inline-flex items-center"
                    >
                      <span>Explore Academy</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Research */}
                  <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all text-center">
                    <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <Compass className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">2. RESEARCH</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      Practical, end-to-end guidance for your university thesis. Acquire templates, access peer review, and harness analytical tools like SPSS or Python for flawless findings.
                    </p>
                    <button 
                      onClick={() => setActiveTab('research')}
                      className="mt-6 text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:underline inline-flex items-center"
                    >
                      <span>Thesis Support Hub</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Innovate */}
                  <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all text-center">
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">3. INNOVATE</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      Convert research hypotheses into modern products. Network inside events, digest our technology blog updates, and construct solutions to regional issues.
                    </p>
                    <button 
                      onClick={() => setActiveTab('community')}
                      className="mt-6 text-sm text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center"
                    >
                      <span>Join Community</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Courses Showcase */}
            <section className="py-16 bg-slate-50 dark:bg-slate-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
                  <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Scientific & Academic Curriculums</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Take self-paced lessons crafted by master educators.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('courses')}
                    className="mt-4 md:mt-0 text-blue-600 dark:text-blue-400 font-semibold flex items-center hover:underline"
                  >
                    <span>View all courses ({courses.length})</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {courses.slice(0, 3).map((course) => (
                    <div key={course.id} className="bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-800 transition-all flex flex-col h-full">
                      <div className="relative h-48 bg-slate-200">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60';
                          }}
                        />
                        <span className="absolute top-4 right-4 bg-slate-900/85 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                          {course.category}
                        </span>
                      </div>
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                            <span className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" /> {course.duration}
                            </span>
                            <span className="font-semibold text-amber-500">★ {course.rating}</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                            {course.title}
                          </h3>
                          <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-3 mb-4">
                            {course.description}
                          </p>
                        </div>
                        <div>
                          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                            <span className="text-blue-600 dark:text-blue-400 font-extrabold text-lg">{course.price}</span>
                            <button 
                              onClick={() => {
                                setSelectedCourse(course);
                                setActiveTab('courses');
                              }}
                              className="px-4 py-2 bg-slate-100 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-800 dark:text-white text-xs font-bold rounded-lg transition-colors"
                            >
                              Explore Syllabus
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Interactive FAQ & Trust Section */}
            <section className="py-16 bg-white dark:bg-slate-950">
              <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
                  <p className="text-slate-500 mt-2">Everything you need to know about Fathi-Lab Academy.</p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      q: "How do I access digital resources and templates after payment?",
                      a: "As soon as checkout is cleared via Telebirr or bank transfer, a secure download connection link is sent directly via SMS and email. It is also permanently accessible in your student dashboard under 'Purchased Assets'."
                    },
                    {
                      q: "Can I receive direct support for my university Master's or PhD thesis?",
                      a: "Yes! Our specialized Research & Innovation Hub provides custom proposal critiques, sample-size calculations, database organization advice, and scientific journal guidelines. You can book an appointment directly."
                    },
                    {
                      q: "Who updates and monitors courses on the Fathi-Lab Academy?",
                      a: "The academy is primarily coordinated by Dr. Ahmed Fathi alongside vetted senior STEM researchers, ensuring our curriculum matches current industrial and global scientific standards."
                    },
                    {
                      q: "Is there support for offline or hybrid classes inside Ethiopia?",
                      a: "We occasionally host live labs, coding workshops, and scientific events in Addis Ababa. Watch the Events section for upcoming registration forms."
                    }
                  ].map((faq, index) => (
                    <details key={index} className="group bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-100 dark:border-slate-800 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                        <h3 className="font-bold text-slate-900 dark:text-white flex items-center text-sm md:text-base">
                          <HelpCircle className="h-5 w-5 text-blue-500 mr-2.5 flex-shrink-0" />
                          {faq.q}
                        </h3>
                        <span className="transition duration-300 group-open:-rotate-180 text-slate-400">
                          <ChevronRight className="h-5 w-5" />
                        </span>
                      </summary>
                      <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed pl-7 border-l-2 border-blue-500">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== PAGE 2: COURSES (LMS) ==================== */}
        {activeTab === 'courses' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* If a specific course is not selected, show listing */}
            {!selectedCourse && (
              <div>
                <div className="text-center md:text-left mb-10 space-y-4">
                  <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">LMS Academy</h1>
                  <p className="text-slate-500 max-w-2xl">
                    Browse our high-level academic classes. Enroll in free models or unlock comprehensive paid certification courses.
                  </p>

                  {/* Search and Category Filters */}
                  <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <input 
                        type="text" 
                        placeholder="Search courses, modules, or fields..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    
                    {/* Category quick selectors */}
                    <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                      {['All', 'AI & Data Science', 'Research Methods', 'Biology', 'Chemistry', 'Mathematics', 'Agriculture'].map((category) => (
                        <button
                          key={category}
                          onClick={() => setCourseFilter(category)}
                          className={`px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                            courseFilter === category
                              ? 'bg-blue-600 text-white'
                              : 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Course Grid */}
                {filteredCourses.length === 0 ? (
                  <div className="text-center py-20 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                    <HelpCircle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No courses match your parameters</h3>
                    <p className="text-slate-400 text-sm mt-1">Try resetting filters or expanding search terms.</p>
                    <button 
                      onClick={() => { setCourseFilter('All'); setSearchQuery(''); }}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map((course) => {
                      const isEnrolled = enrolledCourses.includes(course.id);
                      const progress = courseProgress[course.id] || 0;

                      return (
                        <div key={course.id} className="bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 dark:border-slate-800 transition-all flex flex-col h-full">
                          <div className="relative h-48 bg-slate-200">
                            <img 
                              src={course.image} 
                              alt={course.title} 
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-4 right-4 bg-slate-900/85 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                              {course.category}
                            </span>
                          </div>

                          <div className="p-6 flex-grow flex flex-col justify-between">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-xs text-slate-400">
                                <span>Instructor: {course.instructor}</span>
                                <span className="font-semibold text-amber-500">★ {course.rating}</span>
                              </div>
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2">
                                {course.title}
                              </h3>
                              <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-3">
                                {course.description}
                              </p>

                              {/* Progress bar if enrolled */}
                              {isEnrolled && (
                                <div className="space-y-1 pt-2">
                                  <div className="flex justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                                    <span>Course Progress</span>
                                    <span>{progress}%</span>
                                  </div>
                                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-blue-600 h-full transition-all" style={{ width: `${progress}%` }}></div>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-slate-400 text-[10px] uppercase font-bold">Course Fee</span>
                                <span className="text-blue-600 dark:text-blue-400 font-extrabold text-lg">{course.price}</span>
                              </div>
                              
                              <button
                                onClick={() => setSelectedCourse(course)}
                                className={`px-5 py-2.5 rounded-lg text-xs font-bold shadow-sm flex items-center space-x-1.5 transition-all ${
                                  isEnrolled 
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                              >
                                <span>{isEnrolled ? 'Open Classroom' : 'Explore Course'}</span>
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Detailed Course Classroom View */}
            {selectedCourse && (
              <div className="space-y-8 animate-fade-in">
                {/* Back Link */}
                <button 
                  onClick={() => {
                    setSelectedCourse(null);
                    setQuizState({ ...quizState, active: false });
                  }} 
                  className="inline-flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  <span>Back to Academy Catalog</span>
                </button>

                {/* Grid Structure */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Syllabus details or Active Lecture Video / Quiz */}
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* Simulated Lecture Screen */}
                    <div className="bg-slate-950 rounded-2xl overflow-hidden aspect-video relative flex flex-col items-center justify-center text-center p-8 border border-slate-800 shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 z-10"></div>
                      
                      {/* Video Wallpaper */}
                      <img 
                        src={selectedCourse.image} 
                        alt="lecture wallpaper" 
                        className="absolute inset-0 w-full h-full object-cover opacity-25"
                      />

                      <div className="relative z-20 space-y-4 max-w-lg">
                        <span className="inline-block bg-blue-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Interactive Lab Stream
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          Syllabus: {selectedCourse.title}
                        </h3>
                        <p className="text-sm text-slate-300">
                          Learn with Dr. Ahmed Fathi and guest experts. Fully optimized curriculum equipped with digital code outputs, downloadable checklists, and auto-graded assessments.
                        </p>
                        <div className="flex justify-center pt-2">
                          <button 
                            onClick={() => {
                              addToast("Streaming initial connection nodes... Stream active.", "info");
                              setTelemetryLogs(prev => ["LMS: Stream started for course session.", ...prev]);
                            }}
                            className="bg-white hover:bg-slate-100 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 shadow-lg transition-transform hover:scale-105"
                          >
                            <PlayCircle className="h-5 w-5 text-blue-600" />
                            <span>Play Lecture Session</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Tabs for details */}
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">About this course</h2>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                          {selectedCourse.description}
                        </p>
                      </div>

                      {/* Course Curriculum Checklist */}
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Structured Curriculum Modules</h3>
                        <div className="space-y-2.5">
                          {selectedCourse.curriculum ? (
                            selectedCourse.curriculum.map((module, mIdx) => (
                              <div key={mIdx} className="flex items-center space-x-3 p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-sm">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                <span className="font-semibold text-slate-700 dark:text-slate-300">{module}</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-slate-400 text-xs">Standardized Syllabus. Connect with research hub to schedule additional lessons.</p>
                          )}
                        </div>
                      </div>

                      {/* Download Materials Box */}
                      <div className="bg-blue-50/50 dark:bg-blue-950/40 p-4.5 rounded-2xl border border-blue-100/60 dark:border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center space-x-3 text-center sm:text-left">
                          <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Download Course Resource Toolkit</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Lab notebooks, assignments outlines, and handbook code templates.</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => addToast("Toolkit PDF saved to downloads!", "success")}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center space-x-1 whitespace-nowrap"
                        >
                          <Download className="h-4 w-4" />
                          <span>Save PDF Toolkit</span>
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Right Column: Classroom Controls, Interactive Console Sandbox & Quiz Widget */}
                  <div className="lg:col-span-4 space-y-6">
                    
                    {/* Enrollment Status Box */}
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enrollment Status</h3>
                      
                      {enrolledCourses.includes(selectedCourse.id) ? (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/60 text-xs font-bold">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>You are fully registered in this Course</span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-slate-500 font-bold">
                              <span>Syllabus Progress</span>
                              <span>{courseProgress[selectedCourse.id] || 0}%</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-blue-600 h-full transition-all duration-300" 
                                style={{ width: `${courseProgress[selectedCourse.id] || 0}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Certificate Generation Action */}
                          {(courseProgress[selectedCourse.id] || 0) >= 100 ? (
                            <div className="bg-gradient-to-tr from-amber-500/10 to-yellow-500/15 p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 space-y-3">
                              <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
                                <Award className="h-5 w-5" />
                                <span className="font-extrabold text-xs uppercase tracking-wider">Honorary Certificate Earned!</span>
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-slate-300">You successfully passed all required modules & assessments.</p>
                              <button 
                                onClick={() => {
                                  addToast("Compiling personalized dynamic PDF certificate...", "success");
                                }}
                                className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold rounded-lg flex items-center justify-center space-x-1 shadow-md"
                              >
                                <Award className="h-4 w-4" />
                                <span>Get Certificate</span>
                              </button>
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400">Complete the syllabus quiz (at least 50% score) below to claim your verified certificate!</p>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Unlock full lifetime dashboard status, discussion forums access, direct peer messaging and assignments grading.
                          </p>
                          <button
                            onClick={() => {
                              setEnrolledCourses([...enrolledCourses, selectedCourse.id]);
                              addToast(`Successfully enrolled in: ${selectedCourse.title}!`, "success");
                            }}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors"
                          >
                            Enroll In Course Now ({selectedCourse.price})
                          </button>
                        </div>
                      )}
                    </div>

                    {/* INTERACTIVE COMPILER CONSOLE SANDBOX */}
                    {enrolledCourses.includes(selectedCourse.id) && (
                      <div className="bg-slate-900 dark:bg-slate-950 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-xl flex flex-col h-[420px]">
                        
                        {/* Terminal Header */}
                        <div className="bg-slate-800 dark:bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-700/50">
                          <div className="flex items-center space-x-2">
                            <Terminal className="h-4.5 w-4.5 text-blue-400" />
                            <span className="font-mono text-xs font-bold tracking-wider text-slate-300">Fathi-Lab STEM Console</span>
                          </div>
                          
                          {/* Script Quick Selector */}
                          <select 
                            value={selectedConsoleScript}
                            onChange={(e) => handleScriptChange(e.target.value)}
                            className="bg-slate-950 text-emerald-400 border border-slate-800 text-[10px] font-mono rounded px-1.5 py-0.5 focus:outline-none"
                          >
                            <option value="soil_analysis.py">soil_analysis.py</option>
                            <option value="neural_network_train.py">neural_network_train.py</option>
                            <option value="thesis_template.tex">thesis_template.tex</option>
                            <option value="calculus_integration.py">calculus_integration.py</option>
                          </select>
                        </div>

                        {/* Editor/Console Tabs */}
                        <div className="flex bg-slate-850 text-[11px] font-mono border-b border-slate-800">
                          <button 
                            onClick={() => setActiveConsoleTab('editor')}
                            className={`px-4 py-2 flex items-center space-x-1 ${activeConsoleTab === 'editor' ? 'bg-slate-900 text-white border-b-2 border-blue-500' : 'text-slate-400'}`}
                          >
                            <span>Source Editor</span>
                          </button>
                          <button 
                            onClick={() => setActiveConsoleTab('logs')}
                            className={`px-4 py-2 flex items-center space-x-1.5 ${activeConsoleTab === 'logs' ? 'bg-slate-900 text-white border-b-2 border-blue-500' : 'text-slate-400'}`}
                          >
                            <span>Console Logs ({consoleOutput.length})</span>
                          </button>
                        </div>

                        {/* Sandbox Tab Contents */}
                        <div className="flex-grow p-4 font-mono text-[11px] overflow-auto select-text flex flex-col justify-between">
                          {activeConsoleTab === 'editor' ? (
                            <div className="space-y-2 h-full flex flex-col justify-between">
                              <textarea
                                value={consoleCode}
                                onChange={(e) => setConsoleCode(e.target.value)}
                                className="w-full flex-grow bg-transparent text-emerald-300 focus:outline-none resize-none font-mono whitespace-pre overflow-y-auto"
                              />
                              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                                <span className="text-[9px] text-slate-500">Modify values inside editor & execute</span>
                                <button
                                  onClick={runConsoleCode}
                                  disabled={isCompiling}
                                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-3 py-1.5 rounded font-bold text-[10px] flex items-center space-x-1"
                                >
                                  {isCompiling ? (
                                    <>
                                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                      <span>Running...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Play className="h-3 w-3 fill-current" />
                                      <span>Run Simulation</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col h-full justify-between">
                              <div className="flex-grow overflow-y-auto space-y-1 max-h-52 mb-2">
                                {consoleOutput.map((log, lIdx) => (
                                  <p 
                                    key={lIdx} 
                                    className={`leading-relaxed break-all ${
                                      log.startsWith('>>>') 
                                        ? 'text-blue-400 font-bold' 
                                        : log.startsWith('[SENSORS]')
                                        ? 'text-amber-400 font-semibold'
                                        : log.includes('error') || log.includes('Critically') || log.includes('Acidic')
                                        ? 'text-rose-400' 
                                        : log.includes('complete') || log.includes('compiled') || log.includes('exit code 0') || log.includes('Optimal')
                                        ? 'text-emerald-400 font-semibold'
                                        : 'text-slate-300'
                                    }`}
                                  >
                                    {log}
                                  </p>
                                ))}
                                <div ref={terminalBottomRef} />
                              </div>

                              {/* Interactive Command Input Box */}
                              <form onSubmit={handleCommandLineSubmit} className="flex items-center space-x-2 pt-2 border-t border-slate-800">
                                <span className="text-blue-400 font-bold">fathilab@stem:~$</span>
                                <input 
                                  type="text"
                                  value={cliCommand}
                                  onChange={(e) => setCliCommand(e.target.value)}
                                  placeholder="Type 'help' or commands here..."
                                  className="bg-transparent text-white flex-grow focus:outline-none font-mono text-[11px]"
                                />
                                <button type="submit" className="hidden">Submit</button>
                              </form>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Interactive Quiz Section */}
                    {enrolledCourses.includes(selectedCourse.id) && selectedCourse.quiz && (
                      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/85 dark:border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-slate-900 dark:text-white flex items-center text-sm">
                            <Award className="h-5 w-5 text-blue-500 mr-1.5" />
                            <span>Module Quiz Tracker</span>
                          </h3>
                          <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                            Interactive
                          </span>
                        </div>

                        {!quizState.active ? (
                          <div className="space-y-2">
                            <p className="text-xs text-slate-500">
                              Assess your retention with our auto-graded challenge questions.
                            </p>
                            <button
                              onClick={() => {
                                setQuizState({
                                  active: true,
                                  courseId: selectedCourse.id,
                                  currentQuestion: 0,
                                  answers: {},
                                  submitted: false,
                                  score: 0
                                });
                              }}
                              className="w-full py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors"
                            >
                              Launch Assessment
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                              {selectedCourse.quiz.title}
                            </h4>

                            {!quizState.submitted ? (
                              <div className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] text-slate-400">
                                  <span>Question {quizState.currentQuestion + 1} of {selectedCourse.quiz.questions.length}</span>
                                </div>
                                
                                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                  {selectedCourse.quiz.questions[quizState.currentQuestion].q}
                                </p>

                                <div className="space-y-1.5">
                                  {selectedCourse.quiz.questions[quizState.currentQuestion].options.map((option, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => handleQuizAnswer(quizState.currentQuestion, idx)}
                                      className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors border ${
                                        quizState.answers[quizState.currentQuestion] === idx
                                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold'
                                          : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                  <button
                                    onClick={() => setQuizState({ ...quizState, currentQuestion: Math.max(0, quizState.currentQuestion - 1) })}
                                    disabled={quizState.currentQuestion === 0}
                                    className="px-2.5 py-1 text-[11px] text-slate-500 hover:underline disabled:opacity-40"
                                  >
                                    Previous
                                  </button>

                                  {quizState.currentQuestion < selectedCourse.quiz.questions.length - 1 ? (
                                    <button
                                      onClick={() => setQuizState({ ...quizState, currentQuestion: quizState.currentQuestion + 1 })}
                                      className="px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold rounded-md"
                                    >
                                      Next Question
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => submitQuiz(selectedCourse.id)}
                                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-md"
                                    >
                                      Submit Quiz
                                    </button>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-4 space-y-3">
                                <Award className="h-10 w-10 text-emerald-500 mx-auto" />
                                <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Assessment Score: {quizState.score}%</h4>
                                <p className="text-xs text-slate-400">
                                  {quizState.score >= 50 
                                    ? "Congratulations! You have passed this course assessment. Click above to view/save your verified Academy certificate." 
                                    : "You scored less than 50%. Feel free to restart and take the assessment again."}
                                </p>
                                <button
                                  onClick={() => setQuizState({ ...quizState, active: false, submitted: false })}
                                  className="px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg"
                                >
                                  Close Assessment
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================== PAGE 3: RESEARCH & INNOVATION HUB ==================== */}
        {activeTab === 'research' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
            
            {/* Header Area */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Research & Innovation Hub
              </h1>
              <p className="text-slate-500">
                Fathi-Lab's physical & digital research command center. Accelerate your academic publishing, organize statistics, and map your university thesis steps.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Proposal & Method Generator */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-sm">
                
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  <SlidersHorizontal className="h-5 w-5" />
                  <span className="font-extrabold uppercase tracking-wide text-xs">AI Thesis Assistant</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Formulate Your Project Blueprint</h3>
                  <p className="text-slate-500 text-xs mt-1">Select your parameters to receive standard academic outlines and tool advice.</p>
                </div>

                <form onSubmit={generateResearchGuide} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                      1. Thesis Working Title or Area
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g., Analyzing Crop Yield Predictions using Machine Learning Models in East Gojjam"
                      value={researchTopic}
                      onChange={(e) => setResearchTopic(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                        Academic Field
                      </label>
                      <select 
                        value={researchField}
                        onChange={(e) => setResearchField(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                      >
                        <option>Data Science</option>
                        <option>Agriculture</option>
                        <option>Biology & Medicine</option>
                        <option>Chemistry</option>
                        <option>STEM Mathematics</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                        Current Stage
                      </label>
                      <select 
                        value={researchStage} 
                        onChange={(e) => setResearchStage(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                      >
                        <option>Proposal Writing</option>
                        <option>Methodology Design</option>
                        <option>Statistical Analysis</option>
                        <option>Peer Reviewing & Journal Format</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                        Analytical Tools
                      </label>
                      <select 
                        value={analysisTool} 
                        onChange={(e) => setAnalysisTool(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                      >
                        <option>Python / Pandas</option>
                        <option>R-Project Suite</option>
                        <option>SPSS & SPSS Modeler</option>
                        <option>LaTeX / Overleaf Kits</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md"
                  >
                    Generate Custom Research Blueprint
                  </button>
                </form>

                {/* Display Output from Assistant Blueprint Generator */}
                {customGuideText && (
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border-2 border-dashed border-blue-200 dark:border-blue-900 space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
                        {customGuideText.title}
                      </h4>
                      <span className="text-[9px] bg-blue-100 text-blue-700 font-bold uppercase px-2 py-0.5 rounded-full">
                        Generated Guide
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="block text-xs font-extrabold text-blue-600 uppercase mb-1">Recommended Chapter Sequence:</span>
                        <ul className="space-y-1 pl-4 list-disc text-xs text-slate-600 dark:text-slate-300">
                          {customGuideText.recommendedStructure.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="block text-xs font-extrabold text-indigo-600 uppercase mb-1">Key Action Points:</span>
                        <div className="space-y-1.5">
                          {customGuideText.steps.map((step, idx) => (
                            <p key={idx} className="text-xs text-slate-600 dark:text-slate-300 pl-3 border-l-2 border-indigo-400">
                              {step}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                      <span className="text-[10px] text-slate-400">Blueprint ID: FL-{Math.floor(Math.random()*10000)}</span>
                      <button 
                        onClick={() => addToast("Syllabus outline blueprint exported successfully!", "success")}
                        className="text-xs font-bold text-blue-600 hover:underline flex items-center"
                      >
                        <span>Export Outline</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Expert Mentorship & 1-on-1 Consult Booking */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Peer Review Status Badge */}
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-900 text-white p-6 rounded-2xl shadow-lg space-y-3">
                  <div className="flex items-center space-x-2 text-indigo-200">
                    <Award className="h-5 w-5" />
                    <span className="text-xs uppercase font-extrabold tracking-widest">End-to-End Peer Review</span>
                  </div>
                  <h3 className="text-xl font-bold">Scientific Publication Support</h3>
                  <p className="text-xs text-indigo-100 leading-relaxed">
                    We help researchers format, peer-review, and correct statistical frameworks before submitting their publications to international and local journals.
                  </p>
                  <div className="pt-2">
                    <span className="inline-block bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                      50+ Journals Submitted
                    </span>
                  </div>
                </div>

                {/* 1-on-1 Consultation Booking Form */}
                <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white">Book 1-on-1 Academic Consultation</h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Schedule a specialized session with Dr. Ahmed Fathi or senior thesis statisticians (Virtual or in Addis Ababa).
                  </p>

                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Full Name"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        required
                        className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Email Address"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        required
                        className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg text-xs"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <input 
                          type="date" 
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                          required
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <input 
                          type="time" 
                          value={bookingForm.time}
                          onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                          required
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <input 
                        type="text" 
                        placeholder="Research Topic (or Help Required)"
                        value={bookingForm.topic}
                        onChange={(e) => setBookingForm({ ...bookingForm, topic: e.target.value })}
                        required
                        className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg text-xs"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold rounded-lg text-xs transition-colors"
                    >
                      Schedule Consultation Session
                    </button>
                  </form>

                  {bookingSuccess && (
                    <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/40 text-center text-xs animate-pulse">
                      <strong>Booking request sent!</strong> We will call you within 24 hours to confirm date and time.
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ==================== PAGE 4: E-COMMERCE & RESOURCE LIBRARY ==================== */}
        {activeTab === 'store' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
            
            {/* Header with Cart summary button */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
              <div className="text-center md:text-left space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Store & Library</h1>
                <p className="text-slate-500 max-w-xl text-sm">
                  Acquire professional LaTeX templates, academic guidelines, scientific e-books, and high-performance programming outlines.
                </p>
              </div>

              {/* Responsive Category Switcher & Cart Panel Trigger */}
              <div className="flex items-center space-x-3 w-full md:w-auto overflow-x-auto">
                {['All', 'Templates', 'Books', 'Software', 'Equipment'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setStoreFilter(cat)}
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                      storeFilter === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Screen Grid (Library + Cart Sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Product Store Catalog - Left Column */}
              <div className="lg:col-span-8">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <ShoppingCart className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-bold">No digital resources available in this category.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="bg-white dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
                        <div>
                          <div className="relative h-44 bg-slate-100">
                            <img 
                              src={product.image} 
                              alt={product.title} 
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-3 left-3 bg-slate-900/85 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {product.category}
                            </span>
                          </div>
                          
                          <div className="p-5 space-y-2">
                            <div className="flex justify-between items-center text-[10px] text-slate-400">
                              <span className="uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                                {product.type === 'digital' ? '✓ Digital Download' : 'Physical Delivery'}
                              </span>
                              <span>{product.downloads} units acquired</span>
                            </div>

                            <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-2">
                              {product.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-3">
                              {product.description}
                            </p>
                          </div>
                        </div>

                        <div className="p-5 pt-0">
                          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                              {product.price} ETB
                            </span>
                            
                            <button
                              onClick={() => addToCart(product)}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center space-x-1 transition-all"
                            >
                              <Plus className="h-4 w-4" />
                              <span>Add to Basket</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Shopping Cart Drawer - Right Column */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/85 dark:border-slate-800 shadow-sm sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center">
                    <ShoppingCart className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Your Resource Cart</span>
                  </h3>
                  <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-0.5 rounded-full font-bold">
                    {cart.length} Assets
                  </span>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-10 space-y-2">
                    <p className="text-xs text-slate-400">Your shopping cart is currently empty.</p>
                    <p className="text-[10px] text-slate-500">Pick any academic guides or scientific tools on the left to queue for instant download.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs border border-slate-100 dark:border-slate-800">
                          <div className="max-w-[75%]">
                            <span className="font-bold text-slate-900 dark:text-white line-clamp-1">{item.title}</span>
                            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{item.price} ETB</span>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-500 p-1.5 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      <div className="flex justify-between font-bold text-sm text-slate-700 dark:text-slate-300">
                        <span>Subtotal:</span>
                        <span>{calculateTotal()} ETB</span>
                      </div>
                      <p className="text-[10px] text-slate-400">Simulated secure checkout utilizing automated instant Ethiopian payment protocols.</p>
                    </div>

                    <button
                      onClick={() => setCheckoutModal(true)}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md"
                    >
                      Proceed to Secure Checkout
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Custom Modern Checkout Simulation Dialog Overlay */}
            {checkoutModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                <div className="bg-white dark:bg-slate-950 rounded-2xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-6">
                  
                  <button 
                    onClick={() => setCheckoutModal(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Secure Platform Checkout</h3>
                    <p className="text-xs text-slate-400">Receive immediate download keys upon payment authorization.</p>
                  </div>

                  <form onSubmit={handleCheckout} className="space-y-4">
                    {/* Select Payment Type */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Select Payment Service Provider</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'telebirr', name: 'Telebirr', desc: 'Instant OTP SMS' },
                          { id: 'cbe', name: 'CBE Birr', desc: 'Direct Transfer' },
                          { id: 'card', name: 'Card Pay', desc: 'Visa / Mastercard' }
                        ].map((p) => (
                          <div 
                            key={p.id}
                            onClick={() => setPaymentMethod(p.id)}
                            className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                              paymentMethod === p.id 
                                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold' 
                                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                            }`}
                          >
                            <span className="block text-xs">{p.name}</span>
                            <span className="text-[8px] text-slate-400 font-normal">{p.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Full Name</label>
                        <input 
                          type="text" 
                          required 
                          value={checkoutForm.name}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                          placeholder="Abebe Kebede" 
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Mobile Number (Receive SMS Link)</label>
                        <input 
                          type="tel" 
                          required 
                          value={checkoutForm.phone}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                          placeholder="+2519..." 
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">E-mail Address</label>
                        <input 
                          type="email" 
                          value={checkoutForm.email}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                          placeholder="abebe@example.com" 
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Submit Checkout Form Button */}
                    <button
                      type="submit"
                      disabled={checkoutSuccess}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
                    >
                      {checkoutSuccess ? (
                        <>
                          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                          <span>Processing Telebirr OTP...</span>
                        </>
                      ) : (
                        <span>Pay {calculateTotal()} ETB Now</span>
                      )}
                    </button>

                    <p className="text-[10px] text-center text-slate-400">
                      By proceeding you agree to our terms of digital resource usage. Download keys are valid for 180 days.
                    </p>
                  </form>

                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================== PAGE 5: COMMUNITY, EVENTS & BLOGS ==================== */}
        {activeTab === 'community' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
            
            {/* Header Section */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Community, Events & Blog</h1>
              <p className="text-slate-500 text-sm">
                Connect with professional networks in East Africa. Explore upcoming scientific seminars, research breakthroughs, and academic success stories.
              </p>
            </div>

            {/* Split Content: Webinars + Blog Articles */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Upcoming Virtual Webinars & Conferences */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 flex items-center">
                    <Calendar className="h-6 w-6 text-blue-500 mr-2" />
                    <span>Scientific Seminars</span>
                  </h3>
                  <p className="text-xs text-slate-400">Save your seat for high-value interactive masterclasses.</p>
                </div>

                <div className="space-y-4">
                  {events.map((event) => {
                    const isRegistered = registeredEvents.includes(event.id);
                    return (
                      <div key={event.id} className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] uppercase tracking-wider font-bold bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
                            {event.tag}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {event.time}
                          </span>
                        </div>

                        <h4 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">
                          {event.title}
                        </h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">
                          {event.description}
                        </p>

                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                          <div className="text-xs">
                            <span className="block font-bold text-slate-900 dark:text-white">Host: {event.speaker}</span>
                            <span className="text-[10px] text-slate-400">{event.mode}</span>
                          </div>

                          <button
                            onClick={() => {
                              if (isRegistered) {
                                setRegisteredEvents(registeredEvents.filter(id => id !== event.id));
                                addToast("Cancelled event registration.", "info");
                              } else {
                                setRegisteredEvents([...registeredEvents, event.id]);
                                addToast(`Registered for webinar: "${event.title}"! Check your email.`, "success");
                              }
                            }}
                            className={`px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition-colors ${
                              isRegistered 
                                ? 'bg-emerald-500 text-white' 
                                : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white'
                            }`}
                          >
                            {isRegistered ? 'Seat Saved ✓' : 'Register Free'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Newsletter Box */}
                <div className="bg-slate-900 dark:bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Mail className="h-5 w-5" />
                    <span className="font-extrabold uppercase tracking-widest text-xs">Fathi-Lab Weekly Newsletter</span>
                  </div>
                  <h4 className="font-bold text-lg">Receive High-Rank Research Insights Directly</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Once a week, we dispatch scholarship announcements, practical machine learning templates, and upcoming STEM webinar details to your inbox.
                  </p>

                  <div className="pt-2">
                    {newsletterSuccess ? (
                      <div className="text-xs font-bold text-emerald-400 text-center bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
                        Awesome! Welcome to the scientific inner circle.
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <input 
                          type="email" 
                          placeholder="name@email.com" 
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          className="flex-grow px-3.5 py-2 bg-slate-800 text-white border border-slate-700 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                        <button 
                          onClick={() => {
                            if (!newsletterEmail.trim()) { addToast("Enter a valid email!", "warning"); return; }
                            setNewsletterSuccess(true);
                            addToast("Subscribed to Fathi-Lab newsletters!", "success");
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
                        >
                          Subscribe
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Dynamic Technology and Academic Blog */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    The Science Blog
                  </h3>
                  <p className="text-xs text-slate-400">Insightful research, technology breakdowns, and scholarship paths.</p>
                </div>

                <div className="space-y-6">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row shadow-sm hover:shadow-md transition-all">
                      <div className="md:w-1/3 h-48 md:h-auto bg-slate-100">
                        <img 
                          src={blog.image} 
                          alt={blog.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span className="text-blue-600 dark:text-blue-400">{blog.category}</span>
                            <span>{blog.date}</span>
                          </div>
                          
                          <h4 className="font-extrabold text-slate-900 dark:text-white text-lg leading-snug hover:text-blue-600 transition-colors cursor-pointer">
                            {blog.title}
                          </h4>

                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {blog.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                          <span className="text-[10px] text-slate-400 font-semibold">Written by: {blog.author}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{blog.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================== PAGE 6: STUDENT DASHBOARD ==================== */}
        {activeTab === 'dashboard' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
            
            {/* Header / Intro */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 gap-4 shadow-sm">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Welcome back to Fathi-Lab Academy</span>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Student Dashboard</h1>
                <p className="text-xs text-slate-500">Track and monitor your learning speed, active thesis outline processes, and purchased assets.</p>
              </div>

              <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 p-2 rounded-lg">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-bold text-xs text-slate-900 dark:text-white">Candidate: Student Demo</span>
                  <span className="text-[10px] text-slate-400">UID: FL-958273</span>
                </div>
              </div>
            </div>

            {/* Split Info Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Active Enrolled Academic Course List */}
              <div className="lg:col-span-8 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-sm">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center text-sm md:text-base">
                    <BookOpen className="h-5.5 w-5.5 text-blue-600 mr-2" />
                    <span>My Active Enrolled Courses</span>
                  </h3>
                  <span className="text-[10px] bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">
                    {enrolledCourses.length} Registered
                  </span>
                </div>

                {enrolledCourses.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-xs text-slate-400">You are not registered in any learning path.</p>
                    <button 
                      onClick={() => setActiveTab('courses')}
                      className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
                    >
                      Browse Academy Courses
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {courses.filter(c => enrolledCourses.includes(c.id)).map((course) => {
                      const progress = courseProgress[course.id] || 0;
                      return (
                        <div key={course.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 gap-4">
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-bold">
                              {course.category}
                            </span>
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                              {course.title}
                            </h4>
                            <p className="text-xs text-slate-400">By {course.instructor}</p>
                          </div>

                          <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="space-y-1 w-28">
                              <span className="block text-[10px] font-bold text-slate-400 text-right">{progress}% Done</span>
                              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full transition-all" style={{ width: `${progress}%` }}></div>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                setSelectedCourse(course);
                                setActiveTab('courses');
                              }}
                              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-md"
                            >
                              Launch
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Private Download Library Keys */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center">
                  <FileText className="h-5 w-5 text-indigo-500 mr-2" />
                  <span>My Purchased Asset Library</span>
                </h3>
                
                <p className="text-[11px] text-slate-400">
                  Instant secure links. Re-download your acquired scientific templates or analytical books at any time.
                </p>

                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs border border-slate-100 dark:border-slate-800 space-y-1.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block line-clamp-1">Scientific Thesis Outline Standard APA</span>
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span>Purchased: Lifetime</span>
                      <button 
                        onClick={() => addToast("Thesis template downloaded successfully!", "success")}
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        <Download className="h-3 w-3 mr-1" /> Re-Download
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs border border-slate-100 dark:border-slate-800 space-y-1.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block line-clamp-1">Python Numerical Analysis Guideline Pack</span>
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span>Purchased: Lifetime</span>
                      <button 
                        onClick={() => addToast("Python analysis booklet downloaded successfully!", "success")}
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        <Download className="h-3 w-3 mr-1" /> Re-Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================== PAGE 7: ADMIN CONTROL CENTER (For Owners) ==================== */}
        {activeTab === 'admin' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl space-y-2 shadow-xl">
              <span className="text-xs uppercase font-extrabold tracking-widest text-blue-400">Owner Command System</span>
              <h1 className="text-3xl font-extrabold">Fathi-Lab Admin Dashboard</h1>
              <p className="text-slate-400 text-xs">Overview and dynamic management controls for Fathi-Lab platforms. Easily create curriculum items or update metrics.</p>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Total Active Learners</span>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 block">{ownerMetrics.totalStudents}</span>
              </div>
              <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Estimated Revenue</span>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 block">{ownerMetrics.totalRevenue} ETB</span>
              </div>
              <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Thesis Consultations</span>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 block">{ownerMetrics.consultationsBooked}</span>
              </div>
              <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Scientific Papers</span>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 block">{ownerMetrics.activeProjects}</span>
              </div>
            </div>

            {/* Dynamic Operations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Form: Add dynamic new course to LMS */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Add New Academy Course</h3>
                  <p className="text-xs text-slate-400">Instantly populate a new syllabus into the live LMS listing.</p>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  const newCourse = {
                    title: form.title.value,
                    category: form.category.value,
                    instructor: form.instructor.value,
                    duration: form.duration.value,
                    level: form.level.value,
                    price: form.price.value,
                    image: form.image.value || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60",
                    description: form.description.value
                  };
                  addNewCourse(newCourse);
                  form.reset();
                  addToast(`Published course: "${newCourse.title}" successfully!`, "success");
                }} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Course Title</label>
                      <input name="title" required placeholder="e.g. Linear Programming in Economics" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Category</label>
                      <select name="category" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs">
                        <option>AI & Data Science</option>
                        <option>Research Methods</option>
                        <option>Biology</option>
                        <option>Chemistry</option>
                        <option>Mathematics</option>
                        <option>Agriculture</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Lead Instructor</label>
                      <input name="instructor" required placeholder="Dr. Ahmed Fathi" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Duration</label>
                      <input name="duration" required placeholder="10 Weeks" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Enrollment Price</label>
                      <input name="price" required placeholder="Free or e.g. 1,100 ETB" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Difficulty Level</label>
                      <select name="level" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Image URL fallback</label>
                      <input name="image" placeholder="Leave empty for generic scientific cover" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Short Description</label>
                    <textarea name="description" required rows="3" placeholder="Provide syllabus targets and specific guidelines..." className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"></textarea>
                  </div>

                  <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors">
                    Publish Course Live
                  </button>
                </form>
              </div>

              {/* Right Panel: Live Owner Telemetry Console Terminal */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Simulated Telemetry System Log Console */}
                <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-slate-100 flex flex-col h-80 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">Platform System Logs</span>
                    </div>
                    <button 
                      onClick={() => setTelemetryLogs(["Telemetry flushed. Live diagnostic feed active.", `Audit initialized at: ${new Date().toLocaleTimeString()}`])}
                      className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 font-mono hover:underline"
                    >
                      <RefreshCw className="h-3 w-3" /> Clear
                    </button>
                  </div>
                  
                  <div className="flex-grow font-mono text-[10px] overflow-y-auto space-y-2 select-text text-slate-300">
                    {telemetryLogs.map((log, index) => (
                      <p key={index} className="pl-3 border-l-2 border-indigo-500">
                        <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> {log}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Active bookings review tracker */}
                <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Booked Mentorship Requests</h3>
                  <p className="text-xs text-slate-400">Incoming 1-on-1 thesis session schedules submitted by students.</p>

                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs border border-slate-100 dark:border-slate-800 space-y-1">
                      <span className="font-bold text-slate-950 dark:text-slate-100 block">Kidus Tsegaye</span>
                      <p className="text-slate-400 text-[10px]">Topic: Soil Moisture Prediction Models</p>
                      <span className="text-[9px] text-blue-600 font-bold bg-blue-50 dark:bg-blue-900 px-2 py-0.5 rounded-full inline-block mt-1">Pending Confirmation</span>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs border border-slate-100 dark:border-slate-800 space-y-1">
                      <span className="font-bold text-slate-950 dark:text-slate-100 block">Tsion Hailu</span>
                      <p className="text-slate-400 text-[10px]">Topic: Peer Review Guidelines for Bio-Medical Papers</p>
                      <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full inline-block mt-1">Approved & Emailed</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* Modern High-Value Contact Section (Available at the bottom on all pages except checkout) */}
      <section className="bg-slate-100 dark:bg-slate-950 py-16 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Details Grid */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <Logo />
                <p className="text-xs text-slate-400 tracking-widest uppercase font-semibold">Learn • Research • Innovate</p>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Have individual questions regarding syllabus pricing, corporate academic partnerships, or private thesis analysis mentorship? Send us a message or contact us directly. We operate both digital services and a physical classroom setup.
              </p>

              <div className="space-y-3 pt-2">
                <a href="mailto:fathisore49@gmail.com" className="flex items-center space-x-3 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                  <div className="bg-slate-200 dark:bg-slate-900 p-2 rounded-lg text-slate-500">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold">fathisore49@gmail.com</span>
                </a>

                <a href="tel:+251922006873" className="flex items-center space-x-3 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                  <div className="bg-slate-200 dark:bg-slate-900 p-2 rounded-lg text-slate-500">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold">+251 922 006873</span>
                </a>

                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                  <div className="bg-slate-200 dark:bg-slate-900 p-2 rounded-lg text-slate-500">
                    <Globe className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold">Addis Ababa, Ethiopia</span>
                </div>
              </div>

              {/* Active Social Channels */}
              <div className="space-y-3 pt-4">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connect with our Scientific Network</span>
                <div className="flex space-x-3">
                  {[
                    { icon: <Linkedin className="h-4 w-4" />, name: 'LinkedIn', url: '#linkedin' },
                    { icon: <Facebook className="h-4 w-4" />, name: 'Facebook', url: '#facebook' },
                    { icon: <Youtube className="h-4 w-4" />, name: 'YouTube', url: '#youtube' }
                  ].map((social, idx) => (
                    <button
                      key={idx}
                      onClick={() => addToast(`Redirecting to Fathi-Lab's ${social.name} channel...`, "info")}
                      className="p-2.5 bg-slate-200 dark:bg-slate-900 hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-600 dark:text-slate-300 hover:text-white rounded-xl transition-all"
                      title={social.name}
                    >
                      {social.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Send Direct Message</h3>
                <p className="text-xs text-slate-500">Our administrative support center responds within a working business day.</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                setContactSuccess(true);
                addToast("Your contact ticket has been successfully created!", "success");
                setTelemetryLogs(prev => [`Support: Received ticket from ${contactForm.name}`, ...prev]);
                setTimeout(() => {
                  setContactSuccess(false);
                  setContactForm({ name: '', email: '', subject: '', message: '' });
                }, 4000);
              }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Almaz" 
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="almaz@example.com" 
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Subject</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    placeholder="e.g. Thesis Guidance Assistance Inquiry" 
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Message</label>
                  <textarea 
                    rows="4" 
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Details about your academic background or research targets..." 
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  Send Message
                </button>
              </form>

              {contactSuccess && (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/40 text-center text-xs">
                  <strong>Message sent!</strong> Thank you for contacting Fathi-Lab Academy.
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Footer copyright */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Fathi-Lab Digital Academy. All Rights Reserved.</p>
          <div className="mt-2 flex justify-center space-x-4 text-[11px] text-slate-400">
            <span className="hover:underline cursor-pointer" onClick={() => addToast("Simulated: Privacy Policy agreement verified.", "info")}>Privacy Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer" onClick={() => addToast("Simulated: Platform Terms of Service verified.", "info")}>Terms of Service</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer" onClick={() => addToast("Simulated: 15-day refund terms verified.", "info")}>Refund Policy</span>
          </div>
        </div>
      </footer>

    </div>
  );
}