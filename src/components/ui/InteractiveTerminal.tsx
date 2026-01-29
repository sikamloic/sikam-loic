import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

const COMMANDS = {
  help: {
    fr: `Commandes disponibles:
  help     - Affiche cette aide
  about    - Qui suis-je ?
  skills   - Mes compétences
  contact  - Me contacter
  projects - Mes projets
  hire     - Pourquoi me recruter ?
  clear    - Effacer le terminal
  secret   - ???`,
    en: `Available commands:
  help     - Show this help
  about    - Who am I?
  skills   - My skills
  contact  - Contact me
  projects - My projects
  hire     - Why hire me?
  clear    - Clear terminal
  secret   - ???`,
  },
  about: {
    fr: `👋 Loic Sikam - Développeur Full Stack Freelance

🎯 3+ ans d'expérience en développement web & mobile
🌍 Basé au Cameroun, disponible en remote
💼 Spécialisé en React, Angular, Node.js, Laravel
🚀 Passionné par les nouvelles technologies et l'IA`,
    en: `👋 Loic Sikam - Full Stack Freelance Developer

🎯 3+ years of experience in web & mobile development
🌍 Based in Cameroon, available for remote work
💼 Specialized in React, Angular, Node.js, Laravel
🚀 Passionate about new technologies and AI`,
  },
  skills: {
    fr: `⚡ Frontend: React, Angular, Vue.js, TypeScript
⚡ Backend: Node.js, Laravel, NestJS, Spring Boot
⚡ Database: PostgreSQL, MySQL, MongoDB
⚡ DevOps: Docker, CI/CD, Git
⚡ Soft Skills: Problem Solving, Team Collaboration`,
    en: `⚡ Frontend: React, Angular, Vue.js, TypeScript
⚡ Backend: Node.js, Laravel, NestJS, Spring Boot
⚡ Database: PostgreSQL, MySQL, MongoDB
⚡ DevOps: Docker, CI/CD, Git
⚡ Soft Skills: Problem Solving, Team Collaboration`,
  },
  contact: {
    fr: `📧 Email: loicsikam272@gmail.com
📱 WhatsApp: +237 683 264 591
💼 LinkedIn: linkedin.com/in/loicsikam
🐙 GitHub: github.com/sikamloic

💡 Tapez "hire" pour savoir pourquoi me recruter !`,
    en: `📧 Email: loicsikam272@gmail.com
📱 WhatsApp: +237 683 264 591
💼 LinkedIn: linkedin.com/in/loicsikam
🐙 GitHub: github.com/sikamloic

💡 Type "hire" to know why you should hire me!`,
  },
  projects: {
    fr: `🚀 Projets notables:

📦 Coliturage - Plateforme de covoiturage de colis
💰 Finance IQ - App de gestion financière personnelle
⚡ ENEO Portal - Portail client entreprise (1000+ requêtes/mois)
🗳️ Miss Ayoba - Système de vote (50,000+ votes)
🎵 MutzigStar - Concours musical national

→ Visitez /projects pour plus de détails`,
    en: `🚀 Notable projects:

📦 Coliturage - Package carpooling platform
💰 Finance IQ - Personal finance management app
⚡ ENEO Portal - Enterprise customer portal (1000+ requests/month)
🗳️ Miss Ayoba - Voting system (50,000+ votes)
🎵 MutzigStar - National music contest

→ Visit /projects for more details`,
  },
  hire: {
    fr: `🎯 POURQUOI ME RECRUTER ?

✅ Livraison rapide et code de qualité
✅ Communication claire et proactive
✅ Expérience avec des clients majeurs (ENEO, MTN, SABC)
✅ Autonome mais excellent en équipe
✅ Tarifs compétitifs pour une qualité premium
✅ Disponible immédiatement pour vos projets

📞 Contactez-moi: loicsikam272@gmail.com
🚀 Transformons vos idées en réalité !`,
    en: `🎯 WHY HIRE ME?

✅ Fast delivery and quality code
✅ Clear and proactive communication
✅ Experience with major clients (ENEO, MTN, SABC)
✅ Autonomous but excellent team player
✅ Competitive rates for premium quality
✅ Immediately available for your projects

📞 Contact me: loicsikam272@gmail.com
🚀 Let's turn your ideas into reality!`,
  },
  secret: {
    fr: `🎮 Vous avez trouvé l'easter egg !

"Le code est comme l'humour. Quand on doit l'expliquer, c'est mauvais."
- Cory House

🎉 Bonus: Tapez "matrix" pour une surprise...`,
    en: `🎮 You found the easter egg!

"Code is like humor. When you have to explain it, it's bad."
- Cory House

🎉 Bonus: Type "matrix" for a surprise...`,
  },
  matrix: {
    fr: `
 ██╗      ██████╗ ██╗ ██████╗
 ██║     ██╔═══██╗██║██╔════╝
 ██║     ██║   ██║██║██║     
 ██║     ██║   ██║██║██║     
 ███████╗╚██████╔╝██║╚██████╗
 ╚══════╝ ╚═════╝ ╚═╝ ╚═════╝
                              
 🔥 Wake up, Neo... The Matrix has you. 🔥
 
 Suivez le lapin blanc → /contact`,
    en: `
 ██╗      ██████╗ ██╗ ██████╗
 ██║     ██╔═══██╗██║██╔════╝
 ██║     ██║   ██║██║██║     
 ██║     ██║   ██║██║██║     
 ███████╗╚██████╔╝██║╚██████╗
 ╚══════╝ ╚═════╝ ╚═╝ ╚═════╝
                              
 🔥 Wake up, Neo... The Matrix has you. 🔥
 
 Follow the white rabbit → /contact`,
  },
};

export function InteractiveTerminal() {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'fr' ? 'fr' : 'en';
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: lang === 'fr' ? '👋 Bienvenue dans mon terminal ! Tapez "help" pour commencer.' : '👋 Welcome to my terminal! Type "help" to get started.' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const typeOutput = async (output: string) => {
    setIsTyping(true);
    const outputLines = output.split('\n');
    
    for (const line of outputLines) {
      await new Promise(resolve => setTimeout(resolve, 30));
      setLines(prev => [...prev, { type: 'output', content: line }]);
    }
    setIsTyping(false);
    // Redonner le focus a l'input apres l'animation
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    setLines(prev => [...prev, { type: 'input', content: `$ ${cmd}` }]);
    setCurrentInput('');

    if (trimmedCmd === 'clear') {
      setLines([{ type: 'output', content: lang === 'fr' ? '👋 Terminal effacé. Tapez "help" pour l\'aide.' : '👋 Terminal cleared. Type "help" for help.' }]);
      setTimeout(() => inputRef.current?.focus(), 50);
      return;
    }

    const command = COMMANDS[trimmedCmd as keyof typeof COMMANDS];
    
    if (command) {
      await typeOutput(command[lang]);
    } else if (trimmedCmd === '') {
      setTimeout(() => inputRef.current?.focus(), 50);
      return;
    } else {
      setLines(prev => [...prev, { 
        type: 'error', 
        content: lang === 'fr' 
          ? `Commande non reconnue: "${trimmedCmd}". Tapez "help" pour la liste des commandes.`
          : `Command not found: "${trimmedCmd}". Type "help" for available commands.`
      }]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTyping) {
      handleCommand(currentInput);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="rounded-xl overflow-hidden shadow-2xl border border-surface-200 dark:border-surface-700">
        {/* Terminal Header */}
        <div className="bg-surface-200 dark:bg-surface-800 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-4 text-sm text-surface-600 dark:text-surface-400 font-mono">
            loic@portfolio ~ {lang === 'fr' ? 'terminal interactif' : 'interactive terminal'}
          </span>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          onClick={focusInput}
          className="bg-surface-900 dark:bg-surface-950 p-4 h-80 overflow-y-auto font-mono text-sm cursor-text"
        >
          <AnimatePresence>
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`mb-1 whitespace-pre-wrap ${
                  line.type === 'input'
                    ? 'text-primary-400'
                    : line.type === 'error'
                    ? 'text-red-400'
                    : 'text-surface-300'
                }`}
              >
                {line.content}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input Line */}
          <div className="flex items-center text-primary-400">
            <span className="mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              className="flex-1 bg-transparent outline-none text-surface-100 caret-primary-400 text-base"
              style={{ fontSize: '16px' }}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-surface-500 dark:text-surface-400 mt-3">
        {lang === 'fr' ? '💡 Essayez: help, about, skills, hire, secret' : '💡 Try: help, about, skills, hire, secret'}
      </p>
    </motion.div>
  );
}
