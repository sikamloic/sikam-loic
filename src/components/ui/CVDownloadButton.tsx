import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Loader2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface CVDownloadButtonProps {
  className?: string;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const CV_CONTENT_FR = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; padding: 40px; max-width: 800px;">
  <div style="display: flex; justify-content: space-between; border-bottom: 3px solid #10b981; padding-bottom: 20px; margin-bottom: 25px;">
    <div>
      <h1 style="font-size: 28px; color: #1e293b; margin: 0 0 5px 0;">Loic Sikam</h1>
      <div style="font-size: 16px; color: #10b981; font-weight: 600; margin-bottom: 10px;">Developpeur Full Stack Freelance</div>
      <div style="font-size: 13px; color: #64748b; max-width: 350px;">3+ ans d'experience en developpement web et mobile. Specialise en React, Angular, Node.js et Laravel. Disponible pour des missions freelance.</div>
    </div>
    <div style="text-align: right; font-size: 13px; color: #475569;">
      <div>loicsikam272@gmail.com</div>
      <div>+237 683 264 591</div>
      <div>Cameroun (Remote OK)</div>
      <div>github.com/sikamloic</div>
      <div>linkedin.com/in/loicsikam</div>
      <div>sikam-loic.vercel.app</div>
    </div>
  </div>

  <div style="margin-bottom: 25px;">
    <h2 style="font-size: 14px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px;">Competences Techniques</h2>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
      <div>
        <div style="font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 5px;">Frontend</div>
        <div style="font-size: 11px; color: #475569;">React, TypeScript, Angular, Vue.js, React Native, TailwindCSS</div>
      </div>
      <div>
        <div style="font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 5px;">Backend</div>
        <div style="font-size: 11px; color: #475569;">Node.js, Laravel, NestJS, REST API, Spring Boot</div>
      </div>
      <div>
        <div style="font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 5px;">Base de donnees</div>
        <div style="font-size: 11px; color: #475569;">PostgreSQL, MySQL, MongoDB</div>
      </div>
      <div>
        <div style="font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 5px;">DevOps et Outils</div>
        <div style="font-size: 11px; color: #475569;">Git, Docker, CI/CD, Jira, Figma</div>
      </div>
    </div>
  </div>

  <div style="margin-bottom: 25px;">
    <h2 style="font-size: 14px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px;">Experiences Professionnelles</h2>
    
    <div style="margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <div>
          <div style="font-size: 14px; font-weight: 600; color: #1e293b;">Developpeur Full Stack</div>
          <div style="font-size: 13px; color: #10b981; font-weight: 500;">ZEN-AFRICA (Adfreak Agency)</div>
        </div>
        <div style="font-size: 12px; color: #64748b;">Dec. 2023 - Present</div>
      </div>
      <div style="font-size: 12px; color: #475569; margin-bottom: 8px;">
        Developpement de solutions logicielles pour des clients majeurs (ENEO, MTN, SABC). Participation aux reunions de cadrage, analyse fonctionnelle, implementation et tests.
      </div>
      <div style="font-size: 11px; color: #64748b;">
        <strong style="color: #475569;">Projets cles:</strong> Portail client ENEO (1000+ requetes/mois), Miss Ayoba (50,000+ votes), MutzigStar, Heineken Live Quizz
      </div>
    </div>

    <div style="margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <div>
          <div style="font-size: 14px; font-weight: 600; color: #1e293b;">Developpeur Full Stack</div>
          <div style="font-size: 13px; color: #10b981; font-weight: 500;">TSA (Technologies des Systemes Avancees)</div>
        </div>
        <div style="font-size: 12px; color: #64748b;">Sept. 2022 - Dec. 2023</div>
      </div>
      <div style="font-size: 12px; color: #475569; margin-bottom: 8px;">
        Developpement d'applications internes, maintenance IT pour clients (Laborex, SCDP, SUNU Assurance), configuration reseaux.
      </div>
    </div>

    <div style="margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <div>
          <div style="font-size: 14px; font-weight: 600; color: #1e293b;">Developpeur Full Stack</div>
          <div style="font-size: 13px; color: #10b981; font-weight: 500;">Agyl Tech (Bigoodee)</div>
        </div>
        <div style="font-size: 12px; color: #64748b;">Sept. 2021 - Jan. 2022</div>
      </div>
      <div style="font-size: 12px; color: #475569;">
        Developpement d'une marketplace cross-platform pour le soin capillaire. Integration web et mobile, APIs REST.
      </div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
    <div>
      <h2 style="font-size: 14px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px;">Projets Personnels</h2>
      <div style="font-size: 12px; margin-bottom: 10px;">
        <div style="font-weight: 600; color: #1e293b;">Coliturage</div>
        <div style="color: #64748b;">Plateforme de covoiturage de colis (Laravel, Vue.js)</div>
      </div>
      <div style="font-size: 12px;">
        <div style="font-weight: 600; color: #1e293b;">Finance IQ</div>
        <div style="color: #64748b;">App de gestion financiere (React, TypeScript)</div>
      </div>
    </div>
    <div>
      <h2 style="font-size: 14px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px;">Formation</h2>
      <div style="font-size: 12px; margin-bottom: 8px;">
        <div style="font-weight: 600; color: #1e293b;">Licence en Genie Logiciel</div>
        <div style="color: #64748b;">En cours</div>
      </div>
      <div style="font-size: 12px; margin-bottom: 8px;">
        <div style="font-weight: 600; color: #1e293b;">BTS Informatique</div>
        <div style="color: #64748b;">Institut Universitaire de la Cote - 2021</div>
      </div>
      <h2 style="font-size: 14px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin: 15px 0;">Langues</h2>
      <div style="font-size: 12px;">
        <span style="font-weight: 600; color: #1e293b;">Francais</span> - Natif | 
        <span style="font-weight: 600; color: #1e293b;">Anglais</span> - Professionnel
      </div>
    </div>
  </div>

  <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8;">
    Portfolio: sikam-loic.vercel.app | Disponible immediatement pour des missions freelance
  </div>
</div>
`;

const CV_CONTENT_EN = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; padding: 40px; max-width: 800px;">
  <div style="display: flex; justify-content: space-between; border-bottom: 3px solid #10b981; padding-bottom: 20px; margin-bottom: 25px;">
    <div>
      <h1 style="font-size: 28px; color: #1e293b; margin: 0 0 5px 0;">Loic Sikam</h1>
      <div style="font-size: 16px; color: #10b981; font-weight: 600; margin-bottom: 10px;">Full Stack Freelance Developer</div>
      <div style="font-size: 13px; color: #64748b; max-width: 350px;">3+ years of experience in web & mobile development. Specialized in React, Angular, Node.js and Laravel. Available for freelance missions.</div>
    </div>
    <div style="text-align: right; font-size: 13px; color: #475569;">
      <div>loicsikam272@gmail.com</div>
      <div>+237 683 264 591</div>
      <div>Cameroon (Remote OK)</div>
      <div>github.com/sikamloic</div>
      <div>linkedin.com/in/loicsikam</div>
      <div>sikam-loic.vercel.app</div>
    </div>
  </div>

  <div style="margin-bottom: 25px;">
    <h2 style="font-size: 14px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px;">Technical Skills</h2>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
      <div>
        <div style="font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 5px;">Frontend</div>
        <div style="font-size: 11px; color: #475569;">React, TypeScript, Angular, Vue.js, React Native, TailwindCSS</div>
      </div>
      <div>
        <div style="font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 5px;">Backend</div>
        <div style="font-size: 11px; color: #475569;">Node.js, Laravel, NestJS, REST API, Spring Boot</div>
      </div>
      <div>
        <div style="font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 5px;">Database</div>
        <div style="font-size: 11px; color: #475569;">PostgreSQL, MySQL, MongoDB</div>
      </div>
      <div>
        <div style="font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 5px;">DevOps & Tools</div>
        <div style="font-size: 11px; color: #475569;">Git, Docker, CI/CD, Jira, Figma</div>
      </div>
    </div>
  </div>

  <div style="margin-bottom: 25px;">
    <h2 style="font-size: 14px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px;">Professional Experience</h2>
    
    <div style="margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <div>
          <div style="font-size: 14px; font-weight: 600; color: #1e293b;">Full Stack Developer</div>
          <div style="font-size: 13px; color: #10b981; font-weight: 500;">ZEN-AFRICA (Adfreak Agency)</div>
        </div>
        <div style="font-size: 12px; color: #64748b;">Dec. 2023 - Present</div>
      </div>
      <div style="font-size: 12px; color: #475569; margin-bottom: 8px;">
        Development of software solutions for major clients (ENEO, MTN, SABC). Participation in project meetings, functional analysis, implementation and testing.
      </div>
      <div style="font-size: 11px; color: #64748b;">
        <strong style="color: #475569;">Key projects:</strong> ENEO Customer Portal (1000+ requests/month), Miss Ayoba (50,000+ votes), MutzigStar, Heineken Live Quizz
      </div>
    </div>

    <div style="margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <div>
          <div style="font-size: 14px; font-weight: 600; color: #1e293b;">Full Stack Developer</div>
          <div style="font-size: 13px; color: #10b981; font-weight: 500;">TSA (Technologies des Systemes Avancees)</div>
        </div>
        <div style="font-size: 12px; color: #64748b;">Sept. 2022 - Dec. 2023</div>
      </div>
      <div style="font-size: 12px; color: #475569; margin-bottom: 8px;">
        Internal application development, IT maintenance for clients (Laborex, SCDP, SUNU Assurance), network configuration.
      </div>
    </div>

    <div style="margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <div>
          <div style="font-size: 14px; font-weight: 600; color: #1e293b;">Full Stack Developer</div>
          <div style="font-size: 13px; color: #10b981; font-weight: 500;">Agyl Tech (Bigoodee)</div>
        </div>
        <div style="font-size: 12px; color: #64748b;">Sept. 2021 - Jan. 2022</div>
      </div>
      <div style="font-size: 12px; color: #475569;">
        Development of a cross-platform marketplace for hair care. Web and mobile integration, REST APIs.
      </div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
    <div>
      <h2 style="font-size: 14px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px;">Personal Projects</h2>
      <div style="font-size: 12px; margin-bottom: 10px;">
        <div style="font-weight: 600; color: #1e293b;">Coliturage</div>
        <div style="color: #64748b;">Package carpooling platform (Laravel, Vue.js)</div>
      </div>
      <div style="font-size: 12px;">
        <div style="font-weight: 600; color: #1e293b;">Finance IQ</div>
        <div style="color: #64748b;">Personal finance app (React, TypeScript)</div>
      </div>
    </div>
    <div>
      <h2 style="font-size: 14px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px;">Education</h2>
      <div style="font-size: 12px; margin-bottom: 8px;">
        <div style="font-weight: 600; color: #1e293b;">Bachelor in Software Engineering</div>
        <div style="color: #64748b;">In progress</div>
      </div>
      <div style="font-size: 12px; margin-bottom: 8px;">
        <div style="font-weight: 600; color: #1e293b;">BTS Computer Science</div>
        <div style="color: #64748b;">Institut Universitaire de la Cote - 2021</div>
      </div>
      <h2 style="font-size: 14px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin: 15px 0;">Languages</h2>
      <div style="font-size: 12px;">
        <span style="font-weight: 600; color: #1e293b;">French</span> - Native | 
        <span style="font-weight: 600; color: #1e293b;">English</span> - Professional
      </div>
    </div>
  </div>

  <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8;">
    Portfolio: sikam-loic.vercel.app | Immediately available for freelance missions
  </div>
</div>
`;

export function CVDownloadButton({ className, variant = 'outline', size = 'lg' }: CVDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const element = document.createElement('div');
      element.innerHTML = lang === 'fr' ? CV_CONTENT_FR : CV_CONTENT_EN;
      document.body.appendChild(element);

      const opt = {
        margin: 0,
        filename: `CV_Loic_Sikam_${lang.toUpperCase()}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(element).save();
      
      document.body.removeChild(element);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    outline: 'border-2 border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:border-primary-500 hover:text-primary-600 dark:hover:border-primary-400 dark:hover:text-primary-400',
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className={`inline-flex items-center gap-2 rounded-xl font-medium transition-all duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''} ${className || ''}`}
    >
      {isGenerating ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Download className="w-5 h-5" />
      )}
      {isGenerating ? t('common.generating') : t('common.downloadCV')}
    </button>
  );
}
