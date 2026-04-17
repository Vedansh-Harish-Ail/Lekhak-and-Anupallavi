import { notFound } from 'next/navigation';
import { getWeddingData } from '@/lib/data';
import { HeroSection } from '@/components/HeroSection';
import { InvitationMessage } from '@/components/InvitationMessage';
import { EventsSection } from '@/components/EventsSection';
import { GallerySection } from '@/components/GallerySection';
import { RSVPSection } from '@/components/RSVPSection';
import { MusicPlayer } from '@/components/MusicPlayer';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { LandingPageWrapper } from '@/components/LandingPageWrapper';

// Generate dynamic metadata for the slug
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await getWeddingData(resolvedParams.slug);

  if (!data) {
    return {
      title: 'Digital Heirloom',
      description: 'Wedding Invitation Not Found',
    };
  }

  const title = `${data.bride} weds ${data.groom}`;

  return {
    title,
    description: data.heroMessage || `Join us to celebrate the wedding of ${data.bride} and ${data.groom}.`,
    openGraph: {
      title,
      description: data.heroMessage || `Join us to celebrate the wedding of ${data.bride} and ${data.groom}.`,
      images: [
        {
          url: data.heroImage,
          width: 1200,
          height: 630,
          alt: `${title} Wedding Invitation`,
        },
      ],
    },
  };
}

export default async function WeddingPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await getWeddingData(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  return (
    <LandingPageWrapper bride={data.bride} groom={data.groom}>
      <main className="w-full mx-auto overflow-hidden pb-32 md:pb-0 pt-0">
        <Navigation />
        <HeroSection 
          bride={data.bride} 
          groom={data.groom} 
          date={data.date} 
          heroImage={data.heroImage} 
        />
        <InvitationMessage message={data.heroMessage} />
        <EventsSection events={data.events} />
        <GallerySection images={data.gallery} />
        <RSVPSection phone={data.rsvp.phone} message={data.rsvp.message} />
        <Footer />
        <MusicPlayer />
      </main>
    </LandingPageWrapper>
  );
}
