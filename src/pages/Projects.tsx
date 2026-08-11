
import { useEffect, useRef, useState } from 'react';
import ScrollProgress from '../components/ScrollProgress';
import ParticleBackground from '../components/ParticleBackground';
import Header from '../components/Header';
import ImageModal from '../components/ImageModal';
import ProjectsHeader from '../components/projects/ProjectsHeader';
import ProjectCard from '../components/projects/ProjectCard';
import { ExamGeniusDashboard, ExamGeniusScan, ExamGeniusBuilder, ExamGeniusNotas } from '../components/projects/previews/ExamGeniusPreviews';
import { PokeCheckCookbook, PokeCheckTimeline } from '../components/projects/previews/PokeCheckPreviews';

const Projects = () => {
  useEffect(() => {
    document.title = "AI Projects - Daniel C. Brown";
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('animate-fade-in');
            }, i * 200);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const openImageModal = (src: string, alt: string) => setModalImage({ src, alt });
  const closeImageModal = () => setModalImage(null);

  const examGeniusProject = {
    title: "ExamGenius, AI-Assisted Exam Generation and Auto-Grading",
    description: [
      "A teacher platform I built that creates exams with AI, prints a per-student answer sheet carrying fiducial markers and a unique code, and grades the filled-in sheets from a single phone photo using computer vision. No dedicated scanner, no manual grading.",
      "Data lives in Postgres with row-level security, so each teacher only ever sees their own classes. Live and field-tested on real devices ahead of a classroom pilot. Bilingual in English and Portuguese, built for both Brazilian and US school systems."
    ],
    features: [
      { icon: 'bot' as const, title: 'AI Exam Generation', description: 'Builds assessments with AI, including from an uploaded book or PDF.' },
      { icon: 'activity' as const, title: 'Phone-Camera Grading', description: 'Computer vision locks onto printed fiducial markers and reads a filled-in sheet from one photo.' },
      { icon: 'lock' as const, title: 'Row-Level Security', description: 'Postgres row-level security scopes every record to the teacher who owns it.' },
      { icon: 'dashboard' as const, title: 'Per-Student Sheets and Grade Book', description: 'Unique-coded sheets self-route into a class grade book with CSV export.' },
    ],
    technologies: ['React', 'TypeScript', 'Supabase', 'Postgres', 'Computer Vision', 'PWA'],
    impactText: "A production computer-vision pipeline shipped end to end: generate, print, capture, grade. Full-stack and mobile-first, proven on real hardware before a classroom used it.",
    externalUrl: 'https://exam.deepfrog.app',
    externalLabel: 'View live app',
    externalNote: 'login-gated, demo on request',
    previewPanels: [
      { node: <ExamGeniusDashboard />, caption: 'One place to create, print, scan, and grade.' },
      { node: <ExamGeniusScan />, caption: 'The core feature: a phone photo in, a grade out.' },
      { node: <ExamGeniusBuilder />, caption: 'AI builds it, and every sheet is per-student and self-routing.' },
      { node: <ExamGeniusNotas />, caption: 'Auto-graded results land in a class grade book.' },
    ],
    screenshots: [
      { label: 'Exam builder', alt: 'ExamGenius exam builder screen where a teacher assembles questions with AI assistance' },
      { label: 'Printed answer sheet with fiducial markers', alt: 'A printed per-student ExamGenius answer sheet showing the corner fiducial markers used for alignment' },
      { label: 'Phone-photo grading result', alt: 'Graded ExamGenius answer sheet result captured from a phone photo, showing detected answers and the final score' },
    ],
  };

  const pokeCheckProject = {
    title: "PokeCheck, Glucose Tracking and Meal Planning",
    logoUrl: "https://pokecheck.deepfrog.app/icon-512.png",
    description: [
      "A glucose tracking app I built on the Libre CGM API for my family's Type 1 Diabetes management. It records and visualizes readings, overlays real finger-prick values and meal markers on the continuous glucose graph, and gives a physician a clear view of what the patient actually ate against what the monitor saw.",
      "It is deliberately scoped to recording and visualizing, and it never calculates a dose. That is an explicit safety boundary set on purpose, not a missing feature. It also pairs a low-carb recipe book with a printable purchase list so a week of meals turns straight into a shopping trip."
    ],
    features: [
      { icon: 'activity' as const, title: 'Libre CGM Data', description: 'Pulls continuous glucose readings through the Libre API and charts them over time.' },
      { icon: 'chart' as const, title: 'Fingerstick and Meals Overlay', description: 'Real finger-prick readings and meal markers layered on the CGM graph for the doctor.' },
      { icon: 'book' as const, title: 'Recipe Book and Purchase List', description: 'Low-carb meals with a printable purchase list generated from the week you plan.' },
      { icon: 'lock' as const, title: 'No Dose Calculation, By Design', description: 'Records and visualizes only. It never suggests or calculates insulin doses.' },
    ],
    technologies: ['React', 'TypeScript', 'Postgres', 'Libre CGM API', 'Auth'],
    impactText: "A safe, family-facing companion for Type 1 Diabetes: visualization a physician can read at a glance, meal planning that reaches the grocery store, and a hard no-dosing safety boundary held on purpose.",
    externalUrl: 'https://pokecheck.deepfrog.app',
    externalLabel: 'View live app',
    externalNote: 'login-gated, access on request',
    previewPanels: [
      { node: <PokeCheckCookbook />, caption: 'Bilingual low-carb cookbook, net-carb-led.' },
      { node: <PokeCheckTimeline />, caption: 'Real finger-prick readings and meals overlaid on the CGM graph, for the doctor. Demo data.' },
    ],
    screenshots: [
      { label: 'Glucose dashboard', alt: 'PokeCheck glucose dashboard showing current reading, daily range and recent entries' },
      { label: 'Trend visualization', alt: 'PokeCheck trend chart showing continuous glucose data with finger-prick and meal markers overlaid' },
      { label: 'Printable shopping list', alt: 'PokeCheck printable purchase list generated from a planned week of low-carb meals' },
    ],
  };

  const agentFleetProject = {
    title: "Self-Hosted Multi-Agent System and MCP Taxonomy",
    description: [
      "A personal system of five independent agents that share one common skills repository and a centralized memory layer with per-user isolation, all running on Docker on a private VPS.",
      "It is a working answer to a real question: how do you standardize agent behavior once and then scale that behavior across many users without rewriting it for each one. Each agent does real work on its own host while drawing on the same skills and the same memory service."
    ],
    features: [
      { icon: 'network' as const, title: 'Five Independent Agents', description: 'Separate agents across machines, each acting on its own local host.' },
      { icon: 'bot' as const, title: 'Shared Skills Repository', description: 'Define an agent skill once and every agent in the fleet inherits it.' },
      { icon: 'activity' as const, title: 'Centralized Memory, Isolated Per User', description: 'One memory layer serving the fleet, with strict per-user isolation.' },
    ],
    technologies: ['Docker', 'VPS', 'Python', 'MCP', 'Vector DB'],
    impactText: "A working proof that agent behavior can be standardized once, kept in a shared skills repository, and scaled across users with isolated memory.",
    videoUrl: "/lovable-uploads/hermes_family_explainer.mp4",
    posterUrl: "/lovable-uploads/hermes_family_explainer.jpg",
    screenshots: [
      { label: 'Architecture diagram', alt: 'Architecture diagram of the self-hosted multi-agent system showing five agents, the shared skills repository and the centralized per-user memory layer on Docker' },
    ],
  };

  const voiceAgentProject = {
    title: "Production Voice AI Agent",
    description: [
      "An autonomous voice agent that handles inbound support calls after hours. It authenticates the caller before it will take any action, separates a genuine emergency from a routine request, escalates the emergency to a human responder, and opens a tracked ticket for everything else.",
      "The human-in-the-loop boundary is explicit and deliberate: the agent never takes an irreversible action on its own. The agent behavior, the escalation logic and that human-in-the-loop design are my own work."
    ],
    features: [
      { icon: 'phone' as const, title: 'Caller Authenticated First', description: 'No action is taken until the caller is verified. A failed check ends the call.' },
      { icon: 'bot' as const, title: 'Emergency vs. Routine Triage', description: 'Separates a genuine emergency from a routine request in real time.' },
      { icon: 'lock' as const, title: 'Explicit Human-in-the-Loop', description: 'Emergencies go to a human responder. The agent never takes an irreversible action alone.' },
    ],
    technologies: ['Voice AI', 'LLMs', 'Workflow Automation'],
    impactText: "Non-emergency after-hours call volume down by roughly 90 percent, so the on-call responder is woken only for things that are genuinely urgent.",
    ctaNote: 'Happy to walk through it on a call',
  };

  const mcpServerProject = {
    title: "Self-Hosted MCP Server",
    description: [
      "The enterprise platform in question ships no MCP server, so I built one and self-hosted it in Docker. It gives AI agents authenticated read and write access to the underlying system of record instead of brittle scraping or manual re-entry.",
      "The real work was not the code. It was the judgement call about when a workflow actually justifies a genuine integration layer and when something far simpler is the correct answer."
    ],
    features: [
      { icon: 'network' as const, title: 'Built Where None Existed', description: 'A first-party MCP server for a platform that does not provide one.' },
      { icon: 'lock' as const, title: 'Authenticated Read and Write', description: 'Agents reach the system of record through an authenticated, auditable layer.' },
      { icon: 'bot' as const, title: 'Right-Sized Integration', description: 'Knowing when a workflow earns a real integration layer, and when it does not.' },
    ],
    technologies: ['Docker', 'MCP', 'Self-Hosted', 'APIs'],
    impactText: "Agents can act on the system of record safely and repeatably, without a fragile workaround sitting in the middle of a production workflow.",
    ctaNote: 'Happy to walk through it on a call',
  };

  const complianceProject = {
    title: "Compliance Screening Automation",
    description: [
      "A scheduled pipeline that keeps a legally mandated screening list continuously current between two systems that were required to share data and had no supported way to do it directly.",
      "I built it to take the safe path rather than open a risky direct link into production, and the result was verified by a compliance function. In this environment a lapse carries six-figure per-incident fines, so the design bias was toward the boring, auditable option."
    ],
    features: [
      { icon: 'activity' as const, title: 'Continuously Current', description: 'A scheduled pipeline keeps the mandated list in step across both systems.' },
      { icon: 'lock' as const, title: 'Safe Path By Choice', description: 'Deliberately avoided a direct link into production in favor of an auditable route.' },
      { icon: 'dashboard' as const, title: 'Compliance Verified', description: 'The outcome was reviewed and signed off by a compliance function.' },
    ],
    technologies: ['Scheduled Pipelines', 'Workflow Automation', 'Data Integration'],
    impactText: "A legally mandated screening obligation is met continuously and provably, in a setting where a single lapse carries six-figure per-incident fines.",
    ctaNote: 'Happy to walk through it on a call',
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <ParticleBackground />
      <Header />

      <main>
        <section className="pt-20 pb-8 text-white">
          <div className="section-container">
            <ProjectsHeader
              title="Live AI Projects"
              subtitle="Production AI automation and the systems behind it. Everything here is running right now, not slideware."
              badgeText="AI Automation Projects"
            />
          </div>
        </section>

        <section ref={sectionRef} className="pb-12 md:pb-24">
          <div className="section-container">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white heading-underline">Independent Products</h2>
              <p className="text-gray-400 mt-4 max-w-3xl">
                My own products, built and run end to end. Full detail, live links and screenshots.
              </p>
            </div>

            <ProjectCard {...examGeniusProject} onImageClick={openImageModal} />
            <ProjectCard {...pokeCheckProject} onImageClick={openImageModal} />
            <ProjectCard {...agentFleetProject} onImageClick={openImageModal} />

            <div className="mb-10 pt-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white heading-underline">Professional Work</h2>
              <p className="text-gray-400 italic mt-4 max-w-3xl">
                These systems run in production inside a regulated 24/7 enterprise. I describe the problem and the outcome here, not my employer's internal architecture. I am happy to walk through any of it on a call.
              </p>
            </div>

            <ProjectCard {...voiceAgentProject} onImageClick={openImageModal} />
            <ProjectCard {...mcpServerProject} onImageClick={openImageModal} />
            <ProjectCard {...complianceProject} onImageClick={openImageModal} />
          </div>
        </section>
      </main>


      <footer className="py-8 bg-gray-50 dark:bg-tech-dark/50 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Daniel C. Brown. All rights reserved.
          </p>
        </div>
      </footer>

      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          onClose={closeImageModal}
          imageSrc={modalImage.src}
          imageAlt={modalImage.alt}
        />
      )}
    </div>
  );
};

export default Projects;
