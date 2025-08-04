// app/page.js
import GreetingSection from './components/GreetingSection';
import ProjectSection from './components/ProjectSection';
import TeamSection from './components/TeamSection';
import FooterGallery from './components/FooterGallery';
import FeedbackSection from './components/FeedbackSection';
import FeedbackButton from './components/FeedbackButton'; // Import komponen button

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <GreetingSection />
      <ProjectSection />
      <TeamSection />
      <FooterGallery />
      <FeedbackSection />
      {/* Tombol floating untuk Feedback */}
      <FeedbackButton />
    </main>
  );
}
