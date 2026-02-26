import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useContent } from '@/hooks/useContent';

type GalleryItem = {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  tag?: string;
};

type GalleryContent = {
  items: GalleryItem[];
};

type PromoVideo = {
  id: string;
  youtubeUrl: string;
  title: string;
  description?: string;
  displayOrder?: number;
  active?: boolean;
};

type PromoVideosContent = {
  videos: PromoVideo[];
};

const defaultGallery: GalleryContent = {
  items: [],
};

const defaultPromoVideos: PromoVideosContent = {
  videos: [],
};

export default function Gallery() {
  const { data } = useContent<GalleryContent>('gallery', defaultGallery);
  const { data: promoData } = useContent<PromoVideosContent>('promoVideos', defaultPromoVideos);

  const items = data.items || [];
  const videos = (promoData.videos || [])
    .filter((v) => v.active !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-10 bg-gradient-to-b from-slate-50 via-white to-teal-50/30">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full text-sm mb-6">
              GALLERY
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-secondary mb-4">
              Campus & <span className="text-gradient-teal">Program Moments</span>
            </h1>
            <p className="text-xl text-foreground/90 leading-relaxed">
              Photos from classrooms, events, teacher training sessions, and student achievements. This
              gallery is fully managed from the admin dashboard.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center">
              No gallery items yet. Add images from the admin dashboard.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] bg-muted overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title || 'Gallery image'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    {item.tag && (
                      <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {item.tag}
                      </span>
                    )}
                    {item.title && (
                      <h2 className="text-base font-semibold text-secondary">{item.title}</h2>
                    )}
                    {item.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {item.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promotional videos */}
      <section className="pb-20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full text-sm mb-4">
              PROMOTIONAL VIDEOS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
              Watch Our <span className="text-gradient-teal">Programs in Action</span>
            </h2>
            <p className="text-muted-foreground">
              Short clips showcasing classrooms, events, teacher training, and success stories. Managed
              fully from the admin dashboard by adding YouTube links.
            </p>
          </div>

          {videos.length === 0 ? (
            <p className="text-muted-foreground text-center">
              No videos yet. Add promotional videos from the admin dashboard.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {videos.map((video) => (
                <article
                  key={video.id}
                  className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
                >
                  <div className="aspect-video bg-black">
                    <iframe
                      className="w-full h-full"
                      src={video.youtubeUrl}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-semibold text-secondary">{video.title}</h3>
                    {video.description && (
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

