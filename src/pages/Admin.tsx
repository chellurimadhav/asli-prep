import { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  LayoutDashboard,
  FileText,
  Image,
  MessageSquareQuote,
  FileDown,
  Mail,
  Rocket,
  LogOut,
  Upload,
  Trash2,
  Plus,
  Save,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronRight,
  Eye,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// ── Types ──

type HeroContent = {
  title: string;
  subtitle: string;
  tagline: string;
  ctaText: string;
  heroImageUrl: string;
};

type AboutContent = {
  description: string;
  imageUrl: string;
  mission: string;
  vision: string;
  milestones: { year: string; title: string; desc: string }[];
};

type VidyaContent = {
  sectionTitle: string;
  description: string;
  highlightText: string;
  imageUrl: string;
  yearWise: { year: string; content: string }[];
};

type BusinessInfo = {
  name: string;
  addressLines: string[];
  cityStatePin: string;
  phoneDisplay: string;
  phoneTelHref: string;
  primaryEmail: string;
  secondaryEmail?: string;
  whatsappNumber: string;
  submitFormWhatsappNumber?: string;
  websiteUrl: string;
  googleMapsUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  footerDescription?: string;
};

type TestimonialItem = {
  id: string;
  name: string;
  designation: string;
  schoolName: string;
  photoUrl: string;
  text: string;
  rating: number;
  active: boolean;
};

type DownloadablesContent = {
  sectionBadge: string;
  sectionTitle: string;
  sectionHighlight: string;
  sectionDescription: string;
  brochureTitle: string;
  brochureDescription: string;
  brochureUrl: string;
  imageUrl: string;
  buttonLabel: string;
};

type NewsletterSettings = {
  email: string;
};

type Subscriber = {
  _id: string;
  email: string;
  createdAt: string;
};

type PromoVideo = {
  id: string;
  youtubeUrl: string;
  title: string;
  description?: string;
  displayOrder?: number;
  active: boolean;
};

type ResourcesItem = { title: string; desc: string; action: string };
type ResourcesPageContent = {
  sectionBadge: string;
  sectionTitle: string;
  sectionTitleHighlight: string;
  sectionDescription: string;
  downloadablesBadge: string;
  downloadablesTitle: string;
  downloadablesTitleHighlight: string;
  items: ResourcesItem[];
  newsletterTitle: string;
  newsletterDescription: string;
};

type AdminSection =
  | "hero"
  | "about"
  | "vidya"
  | "testimonials"
  | "downloadables"
  | "business"
  | "promoVideos"
  | "resources"
  | "newsletter";

// ── Sidebar items ──
const sidebarItems: { id: AdminSection; label: string; icon: any }[] = [
  { id: "hero", label: "Hero Section", icon: LayoutDashboard },
  { id: "about", label: "About Section", icon: FileText },
  { id: "vidya", label: "VIDYA Launch", icon: Rocket },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "downloadables", label: "Brochure / Files", icon: FileDown },
  { id: "business", label: "Contact & Footer", icon: Mail },
  { id: "promoVideos", label: "Gallery – Promo Videos", icon: Image },
  { id: "resources", label: "Resources Page", icon: FileText },
  { id: "newsletter", label: "Newsletter", icon: Mail },
];

// ── Helpers ──
function StatusToast({ message, type }: { message: string; type: "success" | "error" | "info" }) {
  const base =
    "fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium animate-in slide-in-from-bottom-4 duration-300";
  const colourMap = {
    success: "bg-emerald-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-slate-800 text-white",
  };
  const iconMap = {
    success: <CheckCircle2 className="h-4 w-4" />,
    error: <XCircle className="h-4 w-4" />,
    info: <Loader2 className="h-4 w-4 animate-spin" />,
  };
  return (
    <div className={`${base} ${colourMap[type]}`}>
      {iconMap[type]}
      {message}
    </div>
  );
}

// ── File upload helper ──
async function uploadFile(file: File, token: string): Promise<string | null> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) return null;
  const json = await res.json();
  return `${API_BASE}${json.url}`;
}

// ── Reusable image upload component ──
function ImageUploader({
  label,
  currentUrl,
  onUploaded,
  token,
}: {
  label: string;
  currentUrl: string;
  onUploaded: (url: string) => void;
  token: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setUploading(true);
    const url = await uploadFile(file, token);
    if (url) onUploaded(url);
    setUploading(false);
    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div className="flex items-center gap-3">
        {currentUrl && (
          <img
            src={currentUrl}
            alt="preview"
            className="h-16 w-16 rounded-lg object-cover border border-slate-200 shadow-sm"
          />
        )}
        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-sm text-slate-600 transition-colors">
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {uploading ? "Uploading…" : "Choose File"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
      </div>
      <Input
        value={currentUrl}
        onChange={(e) => onUploaded(e.target.value)}
        placeholder="Or paste image URL"
        className="mt-1"
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
//  MAIN ADMIN COMPONENT
// ════════════════════════════════════════════════════════════════════

export default function Admin() {
  // Auth state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("adminToken")
  );

  // Status toast
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      setToast({ message, type });
      if (type !== "info") setTimeout(() => setToast(null), 3000);
    },
    []
  );

  const [activeSection, setActiveSection] = useState<AdminSection>("hero");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ── Section states ──
  const [hero, setHero] = useState<HeroContent>({
    title: "Elevate Your School's Academic Excellence",
    subtitle: "Partner with us for IIT/NEET/Olympiad Success",
    tagline:
      "Partner with us for comprehensive preparation programs that bridge the gap between school learning and competitive exam success.",
    ctaText: "Schedule Institutional Partnership Meeting",
    heroImageUrl: "/images/mainImage.png",
  });

  const [about, setAbout] = useState<AboutContent>({
    description:
      "Asli Prep Foundation empowers Indian school students (Grades VI to X) with the knowledge, skills, and resources to excel in IIT-JEE, NEET, and Olympiads through high-quality academic support.",
    imageUrl: "",
    mission:
      "To empower Indian school students with the knowledge, skills, and resources to excel in competitive exams like IIT-JEE, NEET, and Olympiads by offering high-quality academic support through their schools.",
    vision:
      "To be the leading educational foundation that bridges the gap between school learning and competitive exam preparation, ensuring every student has the opportunity to reach their full potential.",
    milestones: [
      {
        year: "2019",
        title: "Foundation",
        desc: "Asli Prep Foundation established with a vision to bridge school and competitive exam preparation",
      },
      {
        year: "2021",
        title: "Growth",
        desc: "Expanded to 200+ partner schools across India",
      },
      {
        year: "2023",
        title: "VIDYA Launch",
        desc: "AI-powered learning assistant VIDYA introduced at aslilearn.ai",
      },
      {
        year: "2025",
        title: "500+ Schools",
        desc: "Reached 500+ partner schools and 10,000+ students enrolled",
      },
    ],
  });

  const [vidya, setVidya] = useState<VidyaContent>({
    sectionTitle: "Meet our AI Assistant VIDYA",
    description:
      "Our AI Assistant helps students with features and capabilities for JEE, NEET, and Olympiads. Demo or trial access at www.aslilearn.ai",
    highlightText: "2025–2026 – 500+ Schools",
    imageUrl: "/images/meet-vidya-classroom.png",
    yearWise: [],
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  const [downloadables, setDownloadables] = useState<DownloadablesContent>({
    sectionBadge: "DOWNLOADABLE RESOURCES",
    sectionTitle: "Download Our",
    sectionHighlight: "Brochure",
    sectionDescription:
      "Get detailed information about our courses, curriculum, and programs. Free sample study materials, downloadable guides, success stories and case studies.",
    brochureTitle: "Program Brochure",
    brochureDescription:
      "Complete overview of our courses, curriculum, and programs.",
    brochureUrl: "/brochure.pdf",
    imageUrl: "/images/brocher.png",
    buttonLabel: "Download Brochure",
  });

  const [newsletterSettings, setNewsletterSettings] =
    useState<NewsletterSettings>({ email: "" });
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [promoVideos, setPromoVideos] = useState<PromoVideo[]>([]);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: "Asli Prep Foundation",
    addressLines: [
      "Plot No. 47, Rd No: 4A,",
      "Golden Tulip Estates, Kondapur,",
    ],
    cityStatePin: "Hyderabad, Telangana - 500 084",
    phoneDisplay: "+91 9346832477",
    phoneTelHref: "tel:+919346832477",
    primaryEmail: "info@asliprep.com",
    secondaryEmail: "asliprep@gmail.com",
    whatsappNumber: "919346832477",
    submitFormWhatsappNumber: "919346832477",
    websiteUrl: "https://www.asliprep.com",
    googleMapsUrl:
      "https://maps.google.com/?q=Plot+No.+47,+Rd+No:+4A,+Golden+Tulip+Estates,+Kondapur,+Hyderabad,+Telangana+500084",
    facebookUrl: "https://www.facebook.com/share/1CGbSL2NXE/",
    instagramUrl: "https://www.instagram.com/asliprep?igsh=YXk2ZzNqdG05ZzBr",
    linkedinUrl: "https://www.linkedin.com/company/asli-prep-foundation/",
    youtubeUrl: "https://www.youtube.com",
    footerDescription:
      "Your Right School Partner for JEE | NEET | OLYMPIAD FOUNDATIONS!",
  });

  const defaultResourcesContent: ResourcesPageContent = {
    sectionBadge: "RESOURCES",
    sectionTitle: "Free",
    sectionTitleHighlight: "Resources",
    sectionDescription:
      "Free sample study materials, blog articles on exam preparation, parenting tips for competitive exam prep, latest exam updates and news, video library (sample lectures), downloadable guides, success stories and case studies.",
    downloadablesBadge: "DOWNLOADABLES",
    downloadablesTitle: "Request",
    downloadablesTitleHighlight: "Resources",
    items: [
      { title: "Free Sample Study Materials", desc: "Comprehensive, exam-aligned content", action: "Download" },
      { title: "Downloadable Guides", desc: "Blog articles on exam preparation, parenting tips for competitive exam prep", action: "View" },
      { title: "Video Library", desc: "Sample lectures. Latest exam updates and news", action: "Watch" },
      { title: "Success Stories & Case Studies", desc: "Testimonials from students, teachers, and administrators", action: "Read" },
    ],
    newsletterTitle: "Stay Updated",
    newsletterDescription: "Newsletter signup for updates. Latest exam updates and news, parenting tips for competitive exam prep.",
  };
  const [resourcesPage, setResourcesPage] = useState<ResourcesPageContent>(defaultResourcesContent);

  // ── Fetch all content on login ──
  useEffect(() => {
    if (!token) return;
    (async () => {
      const keys: [string, (data: any) => void][] = [
        [
          "hero",
          (d) => setHero((p) => ({ ...p, ...d })),
        ],
        [
          "about",
          (d) => setAbout((p) => ({ ...p, ...d })),
        ],
        [
          "vidya",
          (d) => setVidya((p) => ({ ...p, ...d })),
        ],
        [
          "testimonials",
          (d) => {
            if (d?.items) setTestimonials(d.items);
          },
        ],
        [
          "downloadables",
          (d) => setDownloadables((p) => ({ ...p, ...d })),
        ],
        [
          "newsletterSettings",
          (d) => setNewsletterSettings((p) => ({ ...p, ...d })),
        ],
        [
          "businessInfo",
          (d) =>
            setBusinessInfo((p) => ({
              ...p,
              ...d,
            })),
        ],
        [
          "promoVideos",
          (d) => {
            if (d?.videos) setPromoVideos(d.videos as PromoVideo[]);
          },
        ],
        [
          "resources",
          (d) => setResourcesPage((p) => ({ ...defaultResourcesContent, ...p, ...d })),
        ],
      ];
      for (const [key, setter] of keys) {
        try {
          const res = await fetch(`${API_BASE}/api/content/${key}`);
          if (res.ok) {
            const json = await res.json();
            if (json?.data) setter(json.data);
          }
        } catch {
          // ignore
        }
      }
      // Newsletter subscribers
      try {
        const res = await fetch(`${API_BASE}/api/newsletter/subscribers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) setSubscribers(await res.json());
      } catch {
        // ignore
      }
    })();
  }, [token]);

  // ── Save helper ──
  const saveContent = async (key: string, data: any) => {
    if (!token) {
      showToast("Please log in first", "error");
      return;
    }
    showToast("Saving…", "info");
    try {
      const res = await fetch(`${API_BASE}/api/content/${key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        showToast(json.error || "Failed to save", "error");
        return;
      }
      showToast(`Saved ${key} successfully!`, "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to save", "error");
    }
  };

  // ── Auth handlers ──
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Logging in…", "info");
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        showToast(json.error || "Login failed", "error");
        return;
      }
      const json = await res.json();
      if (json.token) {
        localStorage.setItem("adminToken", json.token);
        setToken(json.token);
        showToast("Logged in!", "success");
      }
    } catch (err) {
      console.error(err);
      showToast("Login failed", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  // ── Delete subscriber ──
  const deleteSubscriber = async (id: string) => {
    if (!token) return;
    try {
      await fetch(`${API_BASE}/api/newsletter/subscribers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
      showToast("Subscriber removed", "success");
    } catch {
      showToast("Failed to delete", "error");
    }
  };

  // ════════════════════════════════════════════════
  //         LOGIN SCREEN
  // ════════════════════════════════════════════════

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg shadow-teal-500/30 mb-4">
              <LayoutDashboard className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">ASLIPREP Admin</h1>
            <p className="text-slate-400 text-sm mt-1">
              Content Management System
            </p>
          </div>
          <form
            onSubmit={handleLogin}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-5 shadow-2xl"
          >
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Email
              </label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-11"
                placeholder="admin@asliprep.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-11"
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-teal-500/25 transition-all"
            >
              Sign In
            </Button>
          </form>
        </div>
        {toast && <StatusToast {...toast} />}
      </div>
    );
  }

  // ════════════════════════════════════════════════
  //         DASHBOARD LAYOUT
  // ════════════════════════════════════════════════

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col ${sidebarOpen ? "w-64" : "w-[72px]"
          }`}
      >
        {/* Logo / Header */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-slate-800">
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          {sidebarOpen && (
            <span className="text-white font-bold text-sm whitespace-nowrap">
              ASLIPREP CMS
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                    ? "bg-gradient-to-r from-teal-500/20 to-emerald-500/10 text-teal-400 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                title={item.label}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
                {sidebarOpen && isActive && (
                  <ChevronRight className="ml-auto h-4 w-4 text-teal-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-300 text-xs transition-colors"
          >
            <ChevronRight
              className={`h-4 w-4 transition-transform ${sidebarOpen ? "rotate-180" : ""
                }`}
            />
            {sidebarOpen && "Collapse"}
          </button>
        </div>
      </aside>

      {/* ── Main content area ── */}
      <div
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-[72px]"
          }`}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-6">
          <h1 className="text-lg font-bold text-slate-800">
            {sidebarItems.find((i) => i.id === activeSection)?.label ||
              "Dashboard"}
          </h1>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              <Eye className="h-4 w-4" /> View Site
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-slate-600"
            >
              <LogOut className="h-4 w-4 mr-1.5" /> Sign Out
            </Button>
          </div>
        </header>

        {/* Content panels */}
        <main className="p-6 max-w-5xl">
          {/* ──────────────────────────────────────
               HERO SECTION
          ────────────────────────────────────── */}
          {activeSection === "hero" && (
            <SectionCard
              title="Hero Section"
              description="Edit the main heading, sub heading, and left side image for the homepage hero."
              onSave={() => saveContent("hero", hero)}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="Main Heading">
                  <Input
                    value={hero.title}
                    onChange={(e) =>
                      setHero((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="Elevate Your School's Academic Excellence"
                  />
                </Field>
                <Field label="Sub Heading">
                  <Input
                    value={hero.subtitle}
                    onChange={(e) =>
                      setHero((p) => ({ ...p, subtitle: e.target.value }))
                    }
                    placeholder="Partner with us for IIT/NEET/Olympiad Success"
                  />
                </Field>
              </div>
              <Field label="Tagline / Description">
                <Textarea
                  rows={3}
                  value={hero.tagline}
                  onChange={(e) =>
                    setHero((p) => ({ ...p, tagline: e.target.value }))
                  }
                />
              </Field>
              <Field label="CTA Button Text">
                <Input
                  value={hero.ctaText}
                  onChange={(e) =>
                    setHero((p) => ({ ...p, ctaText: e.target.value }))
                  }
                />
              </Field>
              <ImageUploader
                label="Left Side Hero Image"
                currentUrl={hero.heroImageUrl}
                onUploaded={(url) =>
                  setHero((p) => ({ ...p, heroImageUrl: url }))
                }
                token={token}
              />
            </SectionCard>
          )}

          {/* ──────────────────────────────────────
               ABOUT SECTION
          ────────────────────────────────────── */}
          {activeSection === "about" && (
            <SectionCard
              title="About Section"
              description="Manage the About page description, image, mission, vision, and milestones."
              onSave={() => saveContent("about", about)}
            >
              <Field label="About Description (Rich Text)">
                <Textarea
                  rows={5}
                  value={about.description}
                  onChange={(e) =>
                    setAbout((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Asli Prep Foundation empowers Indian school students…"
                />
              </Field>
              <ImageUploader
                label="About Image"
                currentUrl={about.imageUrl}
                onUploaded={(url) =>
                  setAbout((p) => ({ ...p, imageUrl: url }))
                }
                token={token}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="Mission Statement">
                  <Textarea
                    rows={3}
                    value={about.mission}
                    onChange={(e) =>
                      setAbout((p) => ({ ...p, mission: e.target.value }))
                    }
                  />
                </Field>
                <Field label="Vision Statement">
                  <Textarea
                    rows={3}
                    value={about.vision}
                    onChange={(e) =>
                      setAbout((p) => ({ ...p, vision: e.target.value }))
                    }
                  />
                </Field>
              </div>

              <div className="border-t border-slate-200 pt-6 mt-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-700">
                    Achievements & Milestones
                  </h3>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setAbout((p) => ({
                        ...p,
                        milestones: [
                          ...p.milestones,
                          { year: "", title: "", desc: "" },
                        ],
                      }))
                    }
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Milestone
                  </Button>
                </div>
                <div className="space-y-4">
                  {about.milestones.map((m, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[80px_1fr_2fr_auto] gap-3 items-start bg-slate-50 rounded-xl p-4 border border-slate-200"
                    >
                      <Input
                        value={m.year}
                        onChange={(e) => {
                          const arr = [...about.milestones];
                          arr[i] = { ...arr[i], year: e.target.value };
                          setAbout((p) => ({ ...p, milestones: arr }));
                        }}
                        placeholder="Year"
                        className="text-sm"
                      />
                      <Input
                        value={m.title}
                        onChange={(e) => {
                          const arr = [...about.milestones];
                          arr[i] = { ...arr[i], title: e.target.value };
                          setAbout((p) => ({ ...p, milestones: arr }));
                        }}
                        placeholder="Title"
                        className="text-sm"
                      />
                      <Input
                        value={m.desc}
                        onChange={(e) => {
                          const arr = [...about.milestones];
                          arr[i] = { ...arr[i], desc: e.target.value };
                          setAbout((p) => ({ ...p, milestones: arr }));
                        }}
                        placeholder="Description"
                        className="text-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setAbout((p) => ({
                            ...p,
                            milestones: p.milestones.filter(
                              (_, idx) => idx !== i
                            ),
                          }));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>
          )}

          {/* ──────────────────────────────────────
               VIDYA LAUNCH SECTION
          ────────────────────────────────────── */}
          {activeSection === "vidya" && (
            <SectionCard
              title="VIDYA Launch Section"
              description="Manage the VIDYA AI section title, description, year-wise content, and image."
              onSave={() => saveContent("vidya", vidya)}
            >
              <Field label="Section Title">
                <Input
                  value={vidya.sectionTitle}
                  onChange={(e) =>
                    setVidya((p) => ({ ...p, sectionTitle: e.target.value }))
                  }
                  placeholder="Meet our AI Assistant VIDYA"
                />
              </Field>
              <Field label="Description">
                <Textarea
                  rows={4}
                  value={vidya.description}
                  onChange={(e) =>
                    setVidya((p) => ({ ...p, description: e.target.value }))
                  }
                />
              </Field>
              <Field label="Highlight Text">
                <Input
                  value={vidya.highlightText}
                  onChange={(e) =>
                    setVidya((p) => ({ ...p, highlightText: e.target.value }))
                  }
                  placeholder="2025–2026 – 500+ Schools"
                />
              </Field>
              <ImageUploader
                label="VIDYA Section Image"
                currentUrl={vidya.imageUrl}
                onUploaded={(url) =>
                  setVidya((p) => ({ ...p, imageUrl: url }))
                }
                token={token}
              />

              <div className="border-t border-slate-200 pt-6 mt-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-700">
                    Year-wise Content
                  </h3>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setVidya((p) => ({
                        ...p,
                        yearWise: [...p.yearWise, { year: "", content: "" }],
                      }))
                    }
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Year
                  </Button>
                </div>
                <div className="space-y-3">
                  {vidya.yearWise.map((yw, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[120px_1fr_auto] gap-3 items-start bg-slate-50 rounded-xl p-4 border border-slate-200"
                    >
                      <Input
                        value={yw.year}
                        onChange={(e) => {
                          const arr = [...vidya.yearWise];
                          arr[i] = { ...arr[i], year: e.target.value };
                          setVidya((p) => ({ ...p, yearWise: arr }));
                        }}
                        placeholder="2025–2026"
                        className="text-sm"
                      />
                      <Textarea
                        rows={2}
                        value={yw.content}
                        onChange={(e) => {
                          const arr = [...vidya.yearWise];
                          arr[i] = { ...arr[i], content: e.target.value };
                          setVidya((p) => ({ ...p, yearWise: arr }));
                        }}
                        placeholder="Content for this year…"
                        className="text-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setVidya((p) => ({
                            ...p,
                            yearWise: p.yearWise.filter((_, idx) => idx !== i),
                          }))
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>
          )}

          {/* ──────────────────────────────────────
               TESTIMONIALS SECTION
          ────────────────────────────────────── */}
          {activeSection === "testimonials" && (
            <SectionCard
              title="Testimonials"
              description="Add, edit, or delete testimonials. Toggle status to show/hide on the website."
              onSave={() =>
                saveContent("testimonials", { items: testimonials })
              }
              extraHeaderAction={
                <Button
                  type="button"
                  size="sm"
                  onClick={() =>
                    setTestimonials((prev) => [
                      ...prev,
                      {
                        id: Date.now().toString(),
                        name: "",
                        designation: "",
                        schoolName: "",
                        photoUrl: "",
                        text: "",
                        rating: 5,
                        active: true,
                      },
                    ])
                  }
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Testimonial
                </Button>
              }
            >
              {testimonials.length === 0 && (
                <p className="text-sm text-slate-400 py-8 text-center">
                  No testimonials yet. Click "Add Testimonial" to create one.
                </p>
              )}
              <div className="space-y-6">
                {testimonials.map((t, idx) => (
                  <div
                    key={t.id}
                    className={`rounded-2xl border p-5 transition-all ${t.active
                        ? "bg-white border-slate-200 shadow-sm"
                        : "bg-slate-100 border-slate-200 opacity-70"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Testimonial #{idx + 1}
                      </span>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                          <Switch
                            checked={t.active}
                            onCheckedChange={(val) =>
                              setTestimonials((prev) =>
                                prev.map((item) =>
                                  item.id === t.id
                                    ? { ...item, active: val }
                                    : item
                                )
                              )
                            }
                          />
                          {t.active ? "Active" : "Hidden"}
                        </label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setTestimonials((prev) =>
                              prev.filter((item) => item.id !== t.id)
                            )
                          }
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Field label="Name">
                        <Input
                          value={t.name}
                          onChange={(e) =>
                            setTestimonials((prev) =>
                              prev.map((item) =>
                                item.id === t.id
                                  ? { ...item, name: e.target.value }
                                  : item
                              )
                            )
                          }
                        />
                      </Field>
                      <Field label="Designation">
                        <Input
                          value={t.designation}
                          onChange={(e) =>
                            setTestimonials((prev) =>
                              prev.map((item) =>
                                item.id === t.id
                                  ? { ...item, designation: e.target.value }
                                  : item
                              )
                            )
                          }
                        />
                      </Field>
                      <Field label="School Name">
                        <Input
                          value={t.schoolName}
                          onChange={(e) =>
                            setTestimonials((prev) =>
                              prev.map((item) =>
                                item.id === t.id
                                  ? { ...item, schoolName: e.target.value }
                                  : item
                              )
                            )
                          }
                        />
                      </Field>
                    </div>
                    <div className="grid md:grid-cols-[1fr_auto] gap-4 mt-4">
                      <Field label="Testimonial Text">
                        <Textarea
                          rows={3}
                          value={t.text}
                          onChange={(e) =>
                            setTestimonials((prev) =>
                              prev.map((item) =>
                                item.id === t.id
                                  ? { ...item, text: e.target.value }
                                  : item
                              )
                            )
                          }
                        />
                      </Field>
                      <Field label="Rating (1-5)">
                        <Input
                          type="number"
                          min={1}
                          max={5}
                          value={t.rating}
                          onChange={(e) =>
                            setTestimonials((prev) =>
                              prev.map((item) =>
                                item.id === t.id
                                  ? {
                                    ...item,
                                    rating: Number(e.target.value) || 5,
                                  }
                                  : item
                              )
                            )
                          }
                          className="w-20"
                        />
                      </Field>
                    </div>
                    <div className="mt-4">
                      <ImageUploader
                        label="Photo"
                        currentUrl={t.photoUrl}
                        onUploaded={(url) =>
                          setTestimonials((prev) =>
                            prev.map((item) =>
                              item.id === t.id
                                ? { ...item, photoUrl: url }
                                : item
                            )
                          )
                        }
                        token={token}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* ──────────────────────────────────────
               DOWNLOADABLES / BROCHURE
          ────────────────────────────────────── */}
          {activeSection === "downloadables" && (
            <SectionCard
              title="Brochure & Downloads"
              description="Upload / replace the brochure PDF and manage section text."
              onSave={() => saveContent("downloadables", downloadables)}
            >
              <div className="grid md:grid-cols-3 gap-4">
                <Field label="Section Badge">
                  <Input
                    value={downloadables.sectionBadge}
                    onChange={(e) =>
                      setDownloadables((p) => ({
                        ...p,
                        sectionBadge: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="Section Title">
                  <Input
                    value={downloadables.sectionTitle}
                    onChange={(e) =>
                      setDownloadables((p) => ({
                        ...p,
                        sectionTitle: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="Highlight Word">
                  <Input
                    value={downloadables.sectionHighlight}
                    onChange={(e) =>
                      setDownloadables((p) => ({
                        ...p,
                        sectionHighlight: e.target.value,
                      }))
                    }
                  />
                </Field>
              </div>
              <Field label="Section Description">
                <Textarea
                  rows={3}
                  value={downloadables.sectionDescription}
                  onChange={(e) =>
                    setDownloadables((p) => ({
                      ...p,
                      sectionDescription: e.target.value,
                    }))
                  }
                />
              </Field>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Brochure Title">
                  <Input
                    value={downloadables.brochureTitle}
                    onChange={(e) =>
                      setDownloadables((p) => ({
                        ...p,
                        brochureTitle: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="Button Label">
                  <Input
                    value={downloadables.buttonLabel}
                    onChange={(e) =>
                      setDownloadables((p) => ({
                        ...p,
                        buttonLabel: e.target.value,
                      }))
                    }
                  />
                </Field>
              </div>
              <Field label="Brochure Description">
                <Textarea
                  rows={2}
                  value={downloadables.brochureDescription}
                  onChange={(e) =>
                    setDownloadables((p) => ({
                      ...p,
                      brochureDescription: e.target.value,
                    }))
                  }
                />
              </Field>

              {/* PDF Upload */}
              <div className="border-t border-slate-200 pt-6 mt-2">
                <h3 className="text-sm font-bold text-slate-700 mb-3">
                  Brochure PDF File
                </h3>
                <div className="flex items-center gap-4 flex-wrap">
                  {downloadables.brochureUrl && (
                    <a
                      href={downloadables.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-teal-600 hover:underline"
                    >
                      <FileDown className="h-4 w-4" />
                      Current: {downloadables.brochureUrl.split("/").pop()}
                    </a>
                  )}
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-sm text-slate-600 transition-colors">
                    <Upload className="h-4 w-4" />
                    Upload / Replace PDF
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file || !token) return;
                        showToast("Uploading PDF…", "info");
                        const url = await uploadFile(file, token);
                        if (url) {
                          setDownloadables((p) => ({
                            ...p,
                            brochureUrl: url,
                          }));
                          showToast("PDF uploaded!", "success");
                        } else {
                          showToast("PDF upload failed", "error");
                        }
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
                <div className="mt-3">
                  <Input
                    value={downloadables.brochureUrl}
                    onChange={(e) =>
                      setDownloadables((p) => ({
                        ...p,
                        brochureUrl: e.target.value,
                      }))
                    }
                    placeholder="Or paste PDF URL"
                  />
                </div>
              </div>

              <ImageUploader
                label="Preview Image"
                currentUrl={downloadables.imageUrl}
                onUploaded={(url) =>
                  setDownloadables((p) => ({ ...p, imageUrl: url }))
                }
                token={token}
              />
            </SectionCard>
          )}

          {/* ──────────────────────────────────────
               CONTACT & FOOTER (BUSINESS INFO)
          ────────────────────────────────────── */}
          {activeSection === "business" && (
            <SectionCard
              title="Contact & Footer"
              description="Manage office address, contact details, social links, WhatsApp number, and footer description."
              onSave={() => saveContent("businessInfo", businessInfo)}
            >
              <Field label="Business / Brand Name">
                <Input
                  value={businessInfo.name}
                  onChange={(e) =>
                    setBusinessInfo((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </Field>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Office Address – Line 1">
                  <Input
                    value={businessInfo.addressLines[0] || ""}
                    onChange={(e) =>
                      setBusinessInfo((p) => ({
                        ...p,
                        addressLines: [e.target.value, p.addressLines[1] || ""],
                      }))
                    }
                  />
                </Field>
                <Field label="Office Address – Line 2">
                  <Input
                    value={businessInfo.addressLines[1] || ""}
                    onChange={(e) =>
                      setBusinessInfo((p) => ({
                        ...p,
                        addressLines: [p.addressLines[0] || "", e.target.value],
                      }))
                    }
                  />
                </Field>
              </div>

              <Field label="City / State / PIN">
                <Input
                  value={businessInfo.cityStatePin}
                  onChange={(e) =>
                    setBusinessInfo((p) => ({
                      ...p,
                      cityStatePin: e.target.value,
                    }))
                  }
                />
              </Field>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Phone Number (display)">
                  <Input
                    value={businessInfo.phoneDisplay}
                    onChange={(e) =>
                      setBusinessInfo((p) => ({
                        ...p,
                        phoneDisplay: e.target.value,
                      }))
                    }
                    placeholder="+91 9346832477"
                  />
                </Field>
                <Field label="Phone Link (tel: URL)">
                  <Input
                    value={businessInfo.phoneTelHref}
                    onChange={(e) =>
                      setBusinessInfo((p) => ({
                        ...p,
                        phoneTelHref: e.target.value,
                      }))
                    }
                    placeholder="tel:+919346832477"
                  />
                </Field>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Primary Email ID">
                  <Input
                    value={businessInfo.primaryEmail}
                    onChange={(e) =>
                      setBusinessInfo((p) => ({
                        ...p,
                        primaryEmail: e.target.value,
                      }))
                    }
                    placeholder="info@asliprep.com"
                  />
                </Field>
                <Field label="Secondary Email ID (optional)">
                  <Input
                    value={businessInfo.secondaryEmail || ""}
                    onChange={(e) =>
                      setBusinessInfo((p) => ({
                        ...p,
                        secondaryEmail: e.target.value,
                      }))
                    }
                    placeholder="asliprep@gmail.com"
                  />
                </Field>
              </div>

              <Field label="Google Map Link">
                <Input
                  value={businessInfo.googleMapsUrl}
                  onChange={(e) =>
                    setBusinessInfo((p) => ({
                      ...p,
                      googleMapsUrl: e.target.value,
                    }))
                  }
                  placeholder="https://maps.google.com/?q=..."
                />
              </Field>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Website URL">
                  <Input
                    value={businessInfo.websiteUrl}
                    onChange={(e) =>
                      setBusinessInfo((p) => ({
                        ...p,
                        websiteUrl: e.target.value,
                      }))
                    }
                    placeholder="https://www.asliprep.com"
                  />
                </Field>
                <Field label="Submit-form WhatsApp Number (no +, e.g. 919346832477)">
                  <Input
                    value={businessInfo.submitFormWhatsappNumber || ""}
                    onChange={(e) =>
                      setBusinessInfo((p) => ({
                        ...p,
                        submitFormWhatsappNumber: e.target.value,
                      }))
                    }
                    placeholder="919346832477"
                  />
                </Field>
              </div>

              <div className="border-t border-slate-200 pt-6 mt-4 space-y-4">
                <h3 className="text-sm font-bold text-slate-700">
                  Social Media Links
                </h3>
                <Field label="Facebook URL">
                  <Input
                    value={businessInfo.facebookUrl || ""}
                    onChange={(e) =>
                      setBusinessInfo((p) => ({
                        ...p,
                        facebookUrl: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="Instagram URL">
                  <Input
                    value={businessInfo.instagramUrl || ""}
                    onChange={(e) =>
                      setBusinessInfo((p) => ({
                        ...p,
                        instagramUrl: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="LinkedIn URL">
                  <Input
                    value={businessInfo.linkedinUrl || ""}
                    onChange={(e) =>
                      setBusinessInfo((p) => ({
                        ...p,
                        linkedinUrl: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="YouTube URL">
                  <Input
                    value={businessInfo.youtubeUrl || ""}
                    onChange={(e) =>
                      setBusinessInfo((p) => ({
                        ...p,
                        youtubeUrl: e.target.value,
                      }))
                    }
                  />
                </Field>
              </div>

              <Field label="Footer Description Text">
                <Textarea
                  rows={3}
                  value={businessInfo.footerDescription || ""}
                  onChange={(e) =>
                    setBusinessInfo((p) => ({
                      ...p,
                      footerDescription: e.target.value,
                    }))
                  }
                  placeholder="Your Right School Partner for JEE | NEET | OLYMPIAD FOUNDATIONS!"
                />
              </Field>
            </SectionCard>
          )}

          {/* ──────────────────────────────────────
               GALLERY – PROMOTIONAL VIDEOS
          ────────────────────────────────────── */}
          {activeSection === "promoVideos" && (
            <SectionCard
              title="Gallery – Promotional Videos"
              description="Add and manage YouTube promotional videos for the Gallery page."
              onSave={() =>
                saveContent("promoVideos", {
                  videos: promoVideos,
                })
              }
            >
              {promoVideos.length === 0 && (
                <p className="text-sm text-slate-500 mb-4">
                  No videos added yet. Click &quot;Add Video&quot; to create the first one.
                </p>
              )}
              <div className="flex justify-end mb-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPromoVideos((prev) => [
                      ...prev,
                      {
                        id: crypto.randomUUID(),
                        youtubeUrl: "",
                        title: "",
                        description: "",
                        displayOrder:
                          prev.length > 0
                            ? Math.max(
                                ...prev.map((v) => v.displayOrder || 0)
                              ) + 1
                            : 1,
                        active: true,
                      },
                    ])
                  }
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Video
                </Button>
              </div>

              <div className="space-y-4">
                {promoVideos
                  .slice()
                  .sort(
                    (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
                  )
                  .map((video, index) => (
                    <div
                      key={video.id}
                      className="border border-slate-200 rounded-xl p-4 bg-slate-50/60"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-slate-700">
                          Video #{index + 1}
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-xs text-slate-600">
                            <span>Active</span>
                            <Switch
                              checked={video.active}
                              onCheckedChange={(checked) =>
                                setPromoVideos((prev) =>
                                  prev.map((v) =>
                                    v.id === video.id
                                      ? { ...v, active: checked }
                                      : v
                                  )
                                )
                              }
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-500 hover:text-red-500"
                            onClick={() =>
                              setPromoVideos((prev) =>
                                prev.filter((v) => v.id !== video.id)
                              )
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <Field label="YouTube Video Link">
                        <Input
                          value={video.youtubeUrl}
                          onChange={(e) =>
                            setPromoVideos((prev) =>
                              prev.map((v) =>
                                v.id === video.id
                                  ? { ...v, youtubeUrl: e.target.value }
                                  : v
                              )
                            )
                          }
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                      </Field>

                      <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Video Title">
                          <Input
                            value={video.title}
                            onChange={(e) =>
                              setPromoVideos((prev) =>
                                prev.map((v) =>
                                  v.id === video.id
                                    ? { ...v, title: e.target.value }
                                    : v
                                )
                              )
                            }
                            placeholder="Eg. Why Asli Prep is Different"
                          />
                        </Field>
                        <Field label="Display Order">
                          <Input
                            type="number"
                            value={video.displayOrder ?? index + 1}
                            onChange={(e) =>
                              setPromoVideos((prev) =>
                                prev.map((v) =>
                                  v.id === video.id
                                    ? {
                                        ...v,
                                        displayOrder:
                                          Number(e.target.value) || 0,
                                      }
                                    : v
                                )
                              )
                            }
                            className="w-24"
                          />
                        </Field>
                      </div>

                      <Field label="Short Description">
                        <Textarea
                          rows={2}
                          value={video.description || ""}
                          onChange={(e) =>
                            setPromoVideos((prev) =>
                              prev.map((v) =>
                                v.id === video.id
                                  ? { ...v, description: e.target.value }
                                  : v
                              )
                            )
                          }
                          placeholder="Briefly describe what this video is about."
                        />
                      </Field>
                    </div>
                  ))}
              </div>
            </SectionCard>
          )}

          {/* ──────────────────────────────────────
               RESOURCES PAGE
          ────────────────────────────────────── */}
          {activeSection === "resources" && (
            <div className="space-y-6">
              <SectionCard
                title="Resources Page – Hero"
                description="Badge, title and intro on the Resources page."
                onSave={() => saveContent("resources", resourcesPage)}
              >
                <Field label="Section Badge">
                  <Input
                    value={resourcesPage.sectionBadge}
                    onChange={(e) =>
                      setResourcesPage((p) => ({ ...p, sectionBadge: e.target.value }))
                    }
                    placeholder="RESOURCES"
                  />
                </Field>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Title (first part)">
                    <Input
                      value={resourcesPage.sectionTitle}
                      onChange={(e) =>
                        setResourcesPage((p) => ({ ...p, sectionTitle: e.target.value }))
                      }
                      placeholder="Free"
                    />
                  </Field>
                  <Field label="Title (highlight part)">
                    <Input
                      value={resourcesPage.sectionTitleHighlight}
                      onChange={(e) =>
                        setResourcesPage((p) => ({ ...p, sectionTitleHighlight: e.target.value }))
                      }
                      placeholder="Resources"
                    />
                  </Field>
                </div>
                <Field label="Section Description">
                  <Textarea
                    rows={3}
                    value={resourcesPage.sectionDescription}
                    onChange={(e) =>
                      setResourcesPage((p) => ({ ...p, sectionDescription: e.target.value }))
                    }
                    placeholder="Intro paragraph..."
                  />
                </Field>
              </SectionCard>

              <SectionCard
                title="Request Resources Block"
                description="Badge and title for the downloadables block."
                onSave={() => saveContent("resources", resourcesPage)}
              >
                <Field label="Block Badge">
                  <Input
                    value={resourcesPage.downloadablesBadge}
                    onChange={(e) =>
                      setResourcesPage((p) => ({ ...p, downloadablesBadge: e.target.value }))
                    }
                    placeholder="DOWNLOADABLES"
                  />
                </Field>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Title (first part)">
                    <Input
                      value={resourcesPage.downloadablesTitle}
                      onChange={(e) =>
                        setResourcesPage((p) => ({ ...p, downloadablesTitle: e.target.value }))
                      }
                      placeholder="Request"
                    />
                  </Field>
                  <Field label="Title (highlight part)">
                    <Input
                      value={resourcesPage.downloadablesTitleHighlight}
                      onChange={(e) =>
                        setResourcesPage((p) => ({ ...p, downloadablesTitleHighlight: e.target.value }))
                      }
                      placeholder="Resources"
                    />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard
                title="Resource Cards (4 items)"
                description="Title, description and action label for each card. Order matches the page."
                onSave={() => saveContent("resources", resourcesPage)}
              >
                {(resourcesPage.items || []).map((item, index) => (
                  <div key={index} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <h4 className="text-sm font-semibold text-slate-700">Card {index + 1}</h4>
                    <Field label="Title">
                      <Input
                        value={item.title}
                        onChange={(e) =>
                          setResourcesPage((p) => ({
                            ...p,
                            items: (p.items || []).map((it, i) =>
                              i === index ? { ...it, title: e.target.value } : it
                            ),
                          }))
                        }
                        placeholder="e.g. Free Sample Study Materials"
                      />
                    </Field>
                    <Field label="Description">
                      <Textarea
                        rows={2}
                        value={item.desc}
                        onChange={(e) =>
                          setResourcesPage((p) => ({
                            ...p,
                            items: (p.items || []).map((it, i) =>
                              i === index ? { ...it, desc: e.target.value } : it
                            ),
                          }))
                        }
                        placeholder="Short description"
                      />
                    </Field>
                    <Field label="Action Label">
                      <Input
                        value={item.action}
                        onChange={(e) =>
                          setResourcesPage((p) => ({
                            ...p,
                            items: (p.items || []).map((it, i) =>
                              i === index ? { ...it, action: e.target.value } : it
                            ),
                          }))
                        }
                        placeholder="e.g. Download / View / Watch"
                      />
                    </Field>
                  </div>
                ))}
              </SectionCard>

              <SectionCard
                title="Newsletter Block (Resources page)"
                description="Title and description for the newsletter section on Resources page."
                onSave={() => saveContent("resources", resourcesPage)}
              >
                <Field label="Newsletter Title">
                  <Input
                    value={resourcesPage.newsletterTitle}
                    onChange={(e) =>
                      setResourcesPage((p) => ({ ...p, newsletterTitle: e.target.value }))
                    }
                    placeholder="Stay Updated"
                  />
                </Field>
                <Field label="Newsletter Description">
                  <Textarea
                    rows={2}
                    value={resourcesPage.newsletterDescription}
                    onChange={(e) =>
                      setResourcesPage((p) => ({ ...p, newsletterDescription: e.target.value }))
                    }
                    placeholder="Newsletter signup for updates..."
                  />
                </Field>
              </SectionCard>
            </div>
          )}

          {/* ──────────────────────────────────────
               NEWSLETTER SECTION
          ────────────────────────────────────── */}
          {activeSection === "newsletter" && (
            <div className="space-y-6">
              <SectionCard
                title="Newsletter Settings"
                description="Update the email shown in the newsletter section."
                onSave={() =>
                  saveContent("newsletterSettings", newsletterSettings)
                }
              >
                <Field label="Newsletter Display Email">
                  <Input
                    value={newsletterSettings.email}
                    onChange={(e) =>
                      setNewsletterSettings((p) => ({
                        ...p,
                        email: e.target.value,
                      }))
                    }
                    placeholder="newsletter@asliprep.com"
                  />
                </Field>
              </SectionCard>

              {/* Subscribers list */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="p-5 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-800">
                    Subscribers ({subscribers.length})
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    People who signed up for the newsletter.
                  </p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {subscribers.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-10">
                      No subscribers yet.
                    </p>
                  ) : (
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 sticky top-0">
                        <tr>
                          <th className="text-left px-5 py-3 text-slate-500 font-medium">
                            Email
                          </th>
                          <th className="text-left px-5 py-3 text-slate-500 font-medium">
                            Subscribed
                          </th>
                          <th className="px-5 py-3" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {subscribers.map((s) => (
                          <tr key={s._id} className="hover:bg-slate-50">
                            <td className="px-5 py-3 text-slate-700">
                              {s.email}
                            </td>
                            <td className="px-5 py-3 text-slate-400 text-xs">
                              {new Date(s.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-5 py-3 text-right">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteSubscriber(s._id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {toast && <StatusToast {...toast} />}
    </div>
  );
}

// ── Reusable sub-components ──

function SectionCard({
  title,
  description,
  onSave,
  children,
  extraHeaderAction,
}: {
  title: string;
  description?: string;
  onSave: () => void;
  children: React.ReactNode;
  extraHeaderAction?: React.ReactNode;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm"
    >
      <div className="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800">{title}</h2>
          {description && (
            <p className="text-xs text-slate-400 mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {extraHeaderAction}
          <Button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
          >
            <Save className="h-4 w-4 mr-1.5" /> Save Changes
          </Button>
        </div>
      </div>
      <div className="p-5 space-y-5">{children}</div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}
