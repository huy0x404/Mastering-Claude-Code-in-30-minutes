/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { 
  Terminal, 
  BookOpen, 
  Cpu, 
  Command, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  ExternalLink,
  Info,
  Clock,
  Zap,
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Step {
  id: string;
  title: string;
  duration: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

// --- Components ---

const Quiz = ({ onComplete }: { onComplete: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      q: "What is the primary way Claude Code accesses external private data?",
      a: ["OAuth 2.0", "Model Context Protocol (MCP)", "Direct SSH Tunneling"],
      correct: 1
    },
    {
      q: "Which command flushes the current conversation context?",
      a: ["/clear", "/reset", "/compact"],
      correct: 1
    },
    {
      q: "True or False: Claude Code runs exclusively in the cloud and cannot read local files.",
      a: ["True", "False"],
      correct: 1
    }
  ];

  const handleAnswer = (idx: number) => {
    if (idx === questions[currentQuestion].correct) setScore(score + 1);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      onComplete();
    }
  };

  if (showResults) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-center py-12 space-y-6"
      >
        <div className="w-24 h-24 bg-brand rounded-full mx-auto flex items-center justify-center text-black">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h4 className="text-4xl font-black">Certification Complete</h4>
        <p className="text-white/60">Final Score: {score}/{questions.length}</p>
        <p className="text-brand font-bold uppercase tracking-[0.2em] text-xs">You are now ready to deploy Claude Code in production.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">Question 0{currentQuestion + 1}</span>
        <h4 className="text-3xl font-bold text-white">{questions[currentQuestion].q}</h4>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {questions[currentQuestion].a.map((ans, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="p-6 text-left border border-white/10 bg-white/5 hover:bg-brand hover:text-black transition-all font-bold text-sm uppercase tracking-widest"
          >
            {ans}
          </button>
        ))}
      </div>
    </div>
  );
};

function DatabaseIcon(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

const TerminalMock = ({ command, output }: { command: string, output: string[] }) => {
  return (
    <div className="bg-[#050505] rounded-sm border border-white/10 font-mono text-sm overflow-hidden shadow-2xl">
      <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <span className="text-[10px] uppercase tracking-widest text-white/40">claude-terminal</span>
        </div>
        <div className="text-[8px] font-bold text-brand uppercase px-1.5 py-0.5 border border-brand/30 rounded-sm">
          Active
        </div>
      </div>
      <div className="p-6 space-y-3 bg-white/[0.02]">
        <div className="flex gap-3">
          <span className="text-brand font-bold">$</span>
          <span className="text-white font-medium">{command}</span>
        </div>
        <div className="space-y-1 ml-6">
          {output.map((line, i) => (
            <div key={i} className="text-white/60 leading-relaxed tabular-nums">{line}</div>
          ))}
        </div>
        <div className="flex gap-3 ml-6 animate-pulse">
          <span className="w-1.5 h-4 bg-brand" />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps: Step[] = [
    {
      id: 'intro',
      title: 'Accelerated Onboarding',
      duration: '5m',
      icon: <BookOpen className="w-5 h-5" />,
      content: (
        <div className="space-y-12">
          <div className="flex flex-col items-center justify-center py-12 border border-white/5 bg-white/[0.02] rounded-sm relative overflow-hidden">
            <div className="z-10 text-center">
              <h2 className="text-[10rem] md:text-[14rem] font-black leading-[0.8] tracking-tighter text-brand">30</h2>
              <p className="text-2xl md:text-[2rem] font-bold uppercase tracking-[0.5em] mt-2 text-white">Minutes</p>
            </div>
            <div className="mt-8 flex items-center gap-4 opacity-40">
              <div className="h-[1px] w-12 bg-white"></div>
              <span className="italic font-serif text-xl">The Fast-Track CLI Course</span>
              <div className="h-[1px] w-12 bg-white"></div>
            </div>
            {/* Background decorative text for the component */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
               <span className="text-[20rem] font-black tracking-tighter">FAST</span>
            </div>
          </div>

          <div className="max-w-2xl">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-brand font-black mb-6">The Evolution</h3>
            <p className="text-xl font-light text-white/80 leading-relaxed mb-8 border-l-2 border-brand/30 pl-8">
              Claude Code is the high-performance terminal interface for Anthropic\'s AI. It operates natively in your shell, bridging the gap between reasoning and execution.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
              <div className="p-8 bg-bg-dark hover:bg-white/[0.02] transition-colors">
                <span className="text-[10px] font-mono text-white/30 block mb-4">01. LATENCY</span>
                <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                  Interactive Speed
                </h4>
                <p className="text-sm text-white/50 leading-relaxed">Near-zero latency compared to web interfaces for rapid multi-file refactoring.</p>
              </div>
              <div className="p-8 bg-bg-dark hover:bg-white/[0.02] transition-colors">
                <span className="text-[10px] font-mono text-white/30 block mb-4">02. CONTEXT</span>
                <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                  System Native
                </h4>
                <p className="text-sm text-white/50 leading-relaxed">Direct access to your local file system, git history, and build tools.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'installation',
      title: 'Initializing the CLI',
      duration: '5m',
      icon: <Terminal className="w-5 h-5" />,
      content: (
        <div className="space-y-8">
          <div className="max-w-2xl">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-brand font-black mb-6">Setup Sequence</h3>
            <p className="text-sm text-white/60 mb-8 uppercase tracking-widest">Global installation via Node Package Manager</p>
            
            <TerminalMock 
              command="npm install -g @anthropic-ai/claude-code" 
              output={[
                "added 24 packages in 2.1s",
                "✓ Security audit passed",
                "🚀 Successfully linked: claude"
              ]} 
            />
            
            <div className="mt-8 p-6 bg-white/5 border-l-4 border-brand rounded-sm">
              <p className="text-xs font-mono text-white/80 italic leading-loose">
                "CLI-first development reduces the mental overhead of switching windows, maintaining state within the terminal session."
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'commands',
      title: 'Prompt Engineering Tools',
      duration: '10m',
      icon: <Command className="w-5 h-5" />,
      content: (
        <div className="space-y-8">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-brand font-black mb-6">Core Operations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { cmd: 'claude', desc: 'Initialize local session' },
              { cmd: '/reset', desc: 'Flush context memory' },
              { cmd: '/compact', desc: 'Token optimization' },
              { cmd: '/mcp', desc: 'Protocol status' }
            ].map((c) => (
              <div key={c.cmd} className="flex items-center justify-between p-5 bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <code className="text-brand font-mono text-sm">claude {c.cmd}</code>
                <span className="text-white/40 text-[10px] uppercase tracking-widest">{c.desc}</span>
              </div>
            ))}
          </div>

          <TerminalMock 
            command={'claude "Review security in /src/lib"'} 
            output={[
              "⚙️ Analyzing dependency tree...",
              "📁 Scanning 14 files in /src/lib",
              "⚠️ Potential leak: API key detected in line 42 of storage.ts",
              "🤖 Fix: Recommended to move to .env variable"
            ]} 
          />
        </div>
      )
    },
    {
      id: 'mcp',
      title: 'MCP Integration',
      duration: '10m',
      icon: <Cpu className="w-5 h-5" />,
      content: (
        <div className="space-y-12">
          <div className="max-w-2xl">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-brand font-black mb-6">Protocol Layer</h3>
            <p className="text-white/60 mb-8 leading-relaxed">
              The Model Context Protocol (MCP) is the industrial standard for connecting AI with external data. It enables safe, structured access to local and remote resources.
            </p>

            <div className="relative p-12 bg-white/5 border border-white/10 rounded-sm flex flex-col items-center">
               <div className="grid grid-cols-3 gap-12 w-full max-w-md relative">
                  <div className="border border-white/10 p-4 aspect-square flex flex-col items-center justify-center gap-2 group hover:bg-white/5 transition-colors">
                    <DatabaseIcon className="w-6 h-6 text-white/30 group-hover:text-white" />
                    <span className="text-[8px] font-mono uppercase text-white/20">Data</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-brand/10 border border-brand rounded-full flex items-center justify-center animate-pulse">
                      <Cpu className="w-8 h-8 text-brand" />
                    </div>
                  </div>
                  <div className="border border-white/10 p-4 aspect-square flex flex-col items-center justify-center gap-2 group hover:bg-white/5 transition-colors">
                    <Terminal className="w-6 h-6 text-white/30 group-hover:text-white" />
                    <span className="text-[8px] font-mono uppercase text-white/20">Client</span>
                  </div>
                  
                  {/* Decorative lines */}
                  <div className="absolute top-1/2 left-1/4 w-[12%] h-[1px] bg-white/20 -translate-y-1/2" />
                  <div className="absolute top-1/2 right-1/4 w-[12%] h-[1px] bg-white/20 -translate-y-1/2" />
               </div>
               <p className="mt-8 text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Standardized Middleware Architecture</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'search',
      title: 'Search Grounding',
      duration: '5m',
      icon: <Layers className="w-5 h-5" />,
      content: (
        <div className="space-y-8">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-brand font-black mb-6">Real-time Intelligence</h3>
          <p className="text-white/60 mb-8 leading-relaxed">
            Claude Code isn't limited to its training data. By integrating with Google Search, it can pull in the latest documentation, security advisories, and API changes.
          </p>
          
          <div className="p-8 bg-white/5 border border-white/10 rounded-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-brand">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Always Current</span>
                </div>
                <p className="text-sm text-white/80">Claude automatically triggers a search if it detects a query about a library released after its cutoff or a specific vendor-specific update.</p>
              </div>
              <div className="w-full md:w-64 h-32 border border-white/10 flex items-center justify-center relative bg-bg-dark">
                 <div className="absolute inset-0 bg-brand/5 animate-pulse" />
                 <span className="text-[10px] font-mono text-white/40 uppercase">Searching official docs...</span>
              </div>
            </div>
          </div>

          <TerminalMock 
            command={'claude "How do I upgrade to the latest experimental React features?"'} 
            output={[
              "🌐 Searching: React 'Canary' documentation 2026...",
              "📄 Found: React v19.x Release Notes",
              "🤖 Strategy: Update package.json to @canary and use specific use() hook...",
              "📦 Applying changes to App.tsx..."
            ]} 
          />
        </div>
      )
    },
    {
      id: 'advanced',
      title: 'Advanced Workflows',
      duration: '10m',
      icon: <Zap className="w-5 h-5" />,
      content: (
        <div className="space-y-8">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-brand font-black mb-6">Production Mastery</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            <div className="p-8 bg-bg-dark">
              <h4 className="text-white font-bold mb-2">Automated PRs</h4>
              <p className="text-sm text-white/50">Claude can stage changes, write meaningful commit messages, and even open GitHub PRs using standard CLI tools.</p>
            </div>
            <div className="p-8 bg-bg-dark">
              <h4 className="text-white font-bold mb-2">Multi-File Refactor</h4>
              <p className="text-sm text-white/50">Refactor an entire directory's state management or architecture in a single, verified pass.</p>
            </div>
          </div>

           <div className="p-6 bg-brand/5 border border-brand/20">
             <div className="flex items-center gap-3 mb-2">
               <Zap className="w-4 h-4 text-brand" />
               <span className="text-xs font-black uppercase tracking-widest text-brand">Expert Pattern</span>
             </div>
             <p className="text-sm text-white/80 font-mono italic">"claude --execute 'npm test && git commit -am \"Fix unit tests\"'"</p>
           </div>
        </div>
      )
    },
    {
      id: 'lab',
      title: 'Recursive Debugging',
      duration: 'Interactive',
      icon: <Terminal className="w-5 h-5" />,
      content: (
        <div className="space-y-8">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-brand font-black mb-6">Tactical Lab</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
            <button className="p-8 bg-bg-dark text-left hover:bg-brand/5 group transition-colors">
              <span className="block text-brand text-[10px] font-bold uppercase tracking-widest mb-4">Case 01</span>
              <span className="text-xl font-bold text-white block mb-2">Build Failure</span>
              <span className="text-sm text-white/40">Claude traces V8 errors and auto-patches tsconfig mismatch.</span>
            </button>
            <button className="p-8 bg-bg-dark text-left hover:bg-brand/5 group transition-colors">
              <span className="block text-white/30 text-[10px] font-bold uppercase tracking-widest mb-4">Case 02</span>
              <span className="text-xl font-bold text-white block mb-2">Schema Migration</span>
              <span className="text-sm text-white/40">Automated SQL generation via deep directory analysis.</span>
            </button>
          </div>

          <TerminalMock 
            command={'claude "Debug why the test suite is hanging"'} 
            output={[
              "🔍 Investigating process list...",
              "📍 Found orphaned database connection in teardown()",
              "📦 Patching /tests/setup.ts...",
              "✓ Verification: Tests now exit in 1.2s",
              "🤖 Fixed. Recommended to add await db.close() in line 89."
            ]} 
          />
        </div>
      )
    },
    {
      id: 'quiz',
      title: 'Knowledge Certification',
      duration: '5m',
      icon: <CheckCircle className="w-5 h-5" />,
      content: <Quiz onComplete={() => {
        const id = 'quiz';
        if (!completedSteps.includes(id)) {
          setCompletedSteps(prev => [...prev, id]);
        }
      }} />
    }
  ];

  const handleNext = () => {
    const currentStepId = steps[activeStep].id;
    if (!completedSteps.includes(currentStepId)) {
      setCompletedSteps([...completedSteps, currentStepId]);
    }
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const progressPerc = Math.round(((completedSteps.length) / steps.length) * 100);

  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans selection:bg-brand/30 flex flex-col">
      {/* Heavy Typography Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
        <h1 className="absolute -top-20 -left-20 text-[25vw] font-black leading-none tracking-tighter text-white opacity-[0.02]">
          CLAUDE
        </h1>
        <h1 className="absolute -bottom-20 -right-20 text-[20vw] font-black leading-none tracking-tighter text-brand opacity-[0.03]">
          CODE
        </h1>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-bg-dark/80 backdrop-blur-md px-12 py-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand rounded-sm flex items-center justify-center">
            <Command className="w-5 h-5 text-black" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.4em]">Mastering Claude Code</span>
        </div>
        
        <nav className="hidden lg:flex gap-12 font-mono text-[11px] uppercase tracking-widest">
           {steps.map((step, i) => (
             <button 
              key={step.id} 
              onClick={() => setActiveStep(i)}
              className={`transition-colors ${activeStep === i ? 'text-brand' : 'opacity-40 hover:opacity-100'}`}
             >
               {String(i + 1).padStart(2, '0')}. {step.title.split(' ')[0]}
             </button>
           ))}
        </nav>

        <div className="flex items-center gap-8">
          <div className="text-[11px] uppercase tracking-widest font-bold">
            <span className="opacity-40 mr-2">Progress:</span>
            <span className="text-brand">{progressPerc}%</span>
          </div>
          <button className="opacity-40 hover:opacity-100 transition-opacity">
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1440px] mx-auto w-full grid grid-cols-12 gap-0 relative">
        {/* Left Sidebar: Modules */}
        <aside className="col-span-12 lg:col-span-3 border-r border-white/10 p-12 flex flex-col justify-between min-h-[600px] lg:sticky lg:top-[97px] lg:h-[calc(100vh-97px)]">
          <div className="space-y-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-brand font-black mb-6">The Curriculum</p>
              <h3 className="text-4xl font-light leading-tight tracking-tight text-white/90">
                Accelerated <br/>Technical <br/>Onboarding
              </h3>
            </div>
            
            <div className="space-y-4">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = completedSteps.includes(step.id);
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full flex items-baseline gap-6 transition-all duration-300 group ${isActive ? 'opacity-100' : 'opacity-30 hover:opacity-100'}`}
                  >
                    <span className="text-xs font-mono tabular-nums leading-none">{String(idx + 1).padStart(2, '0')}</span>
                    <span className={`text-base font-medium flex-1 text-left pb-2 border-b transition-colors ${isActive ? 'border-brand text-white' : 'border-white/5 text-white/80'}`}>
                      {step.title}
                    </span>
                    {isCompleted && <CheckCircle className="w-3 h-3 text-brand" />}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-3 font-bold">Current Tooling</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-white/80">v0.29.4-stable</span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
        </aside>

        {/* Center: Dynamic Content */}
        <section className="col-span-12 lg:col-span-9 p-12 lg:p-24 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="relative z-10"
            >
              <header className="mb-16">
                 <div className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-brand mb-4 select-none pointer-events-none opacity-10 absolute -top-40 -left-10 -z-10">
                   {String(activeStep + 1).padStart(2, '0')}
                 </div>
                 <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-6">
                   {steps[activeStep].title.split(' ').map((word, i) => (
                     <span key={i} className="block">{word}</span>
                   ))}
                 </h2>
                 <div className="flex items-center gap-6 mt-8">
                    <div className="h-px w-16 bg-brand/40" />
                    <span className="italic font-serif text-2xl text-white/40">Estimated duration: {steps[activeStep].duration}</span>
                 </div>
              </header>

              <div className="min-h-[400px]">
                {steps[activeStep].content}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action Footer */}
          <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="text-left group cursor-pointer">
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold mb-2 group-hover:text-brand transition-colors">Session Context</p>
                <p className="text-xl font-medium flex items-center gap-2">
                  {activeStep < steps.length - 1 ? steps[activeStep + 1].title : 'Final Review Completion'}
                  <ChevronRight className="w-5 h-5 text-brand" />
                </p>
             </div>
             
             <div className="flex gap-4 w-full md:w-auto">
               <button 
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep - 1)}
                className="flex-1 md:flex-none px-10 py-5 border border-white/10 hover:bg-white/5 text-[11px] uppercase tracking-[0.2em] font-bold transition-all disabled:opacity-20 disabled:pointer-events-none"
               >
                 Previous
               </button>
               <button 
                onClick={handleNext}
                className="flex-1 md:flex-none px-12 py-5 bg-brand hover:bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 group"
               >
                 {activeStep === steps.length - 1 ? 'End Session' : 'Continue Sequence'}
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
             </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 px-12 bg-bg-panel/50">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center opacity-40">
           <div className="md:col-span-3 text-[10px] uppercase tracking-[0.4em] font-bold">
             © Anthropic Protocol 2026
           </div>
           <div className="md:col-span-6 flex justify-center gap-10 font-mono text-[9px] uppercase tracking-widest">
             <span>Latency: 12ms</span>
             <span>Status: Optimized</span>
             <span>Encryption: AES-256</span>
           </div>
           <div className="md:col-span-3 flex justify-end gap-6">
             <Play className="w-4 h-4 cursor-pointer hover:text-brand transition-colors" />
             <Clock className="w-4 h-4 cursor-pointer hover:text-brand transition-colors" />
             <Zap className="w-4 h-4 cursor-pointer hover:text-brand transition-colors" />
           </div>
        </div>
      </footer>
    </div>
  );
}
