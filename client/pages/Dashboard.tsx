import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Navigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Play,
  ExternalLink,
  Clock,
  TrendingUp,
  Heart,
  Activity,
  Brain,
  Stethoscope,
  Calendar,
  BookOpen,
  Video,
  FileText,
  RefreshCw,
  BarChart3,
  Newspaper,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: string;
  title: string;
  summary?: string;
  content_text?: string;
  content_html?: string;
  url: string;
  date_published: string;
  author?: {
    name: string;
  };
  tags?: string[];
  image?: string;
}

interface HealthFeed {
  version: string;
  title: string;
  description?: string;
  home_page_url?: string;
  items: NewsItem[];
}

const categories = [
  { name: "All", icon: BookOpen, color: "bg-blue-500" },
  { name: "Breaking News", icon: TrendingUp, color: "bg-red-500" },
  { name: "Research", icon: Brain, color: "bg-purple-500" },
  { name: "Technology", icon: Activity, color: "bg-green-500" },
  { name: "Policy", icon: Stethoscope, color: "bg-indigo-500" },
];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchHealthcareNews = async () => {
    setIsLoadingNews(true);
    setError(null);
    
    try {
      const response = await fetch('https://rss.app/feeds/v1.1/5rdWM6JSuqb3ZH4h.json');
      
      if (!response.ok) {
        throw new Error('Failed to fetch healthcare news');
      }
      
      const data: HealthFeed = await response.json();
      setNewsItems(data.items || []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching healthcare news:', err);
      setError('Unable to load latest healthcare news. Please try again later.');
      
      // Fallback to sample news items
      setNewsItems([
        {
          id: "1",
          title: "AI-Powered Drug Discovery Accelerates Cancer Treatment Development",
          summary: "New artificial intelligence algorithms are reducing drug discovery timelines from years to months, offering hope for faster cancer treatment options.",
          url: "#",
          date_published: new Date().toISOString(),
          author: { name: "Healthcare Technology Review" },
          tags: ["AI", "Cancer", "Drug Discovery"]
        },
        {
          id: "2", 
          title: "WHO Announces Global Health Initiative for Digital Healthcare Access",
          summary: "The World Health Organization launches a comprehensive digital health program to improve healthcare accessibility in underserved regions worldwide.",
          url: "#",
          date_published: new Date(Date.now() - 3600000).toISOString(),
          author: { name: "World Health Organization" },
          tags: ["WHO", "Digital Health", "Global Health"]
        },
        {
          id: "3",
          title: "Breakthrough Gene Therapy Shows Promise for Rare Genetic Disorders",
          summary: "Clinical trials reveal significant improvements in patients with rare genetic conditions using novel gene editing techniques.",
          url: "#",
          date_published: new Date(Date.now() - 7200000).toISOString(),
          author: { name: "Medical Research Today" },
          tags: ["Gene Therapy", "Research", "Rare Diseases"]
        },
        {
          id: "4",
          title: "Telemedicine Adoption Continues to Rise Post-Pandemic",
          summary: "Healthcare providers report sustained growth in telehealth services, with patient satisfaction rates exceeding pre-pandemic levels.",
          url: "#",
          date_published: new Date(Date.now() - 10800000).toISOString(),
          author: { name: "Healthcare Business Journal" },
          tags: ["Telemedicine", "Healthcare Technology", "COVID-19"]
        },
        {
          id: "5",
          title: "Mental Health Apps Show Effectiveness in Clinical Studies",
          summary: "Recent studies demonstrate that mobile mental health applications can significantly complement traditional therapy approaches.",
          url: "#",
          date_published: new Date(Date.now() - 14400000).toISOString(),
          author: { name: "Journal of Digital Health" },
          tags: ["Mental Health", "Mobile Apps", "Digital Therapeutics"]
        },
        {
          id: "6",
          title: "New Alzheimer's Drug Receives FDA Approval",
          summary: "The FDA approves a promising new treatment for early-stage Alzheimer's disease, offering hope to millions of patients and families.",
          url: "#",
          date_published: new Date(Date.now() - 18000000).toISOString(),
          author: { name: "FDA News Release" },
          tags: ["Alzheimer's", "FDA", "Drug Approval", "Neurology"]
        }
      ]);
    } finally {
      setIsLoadingNews(false);
    }
  };

  useEffect(() => {
    fetchHealthcareNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getCategoryFromTags = (tags?: string[]) => {
    if (!tags || tags.length === 0) return "General";
    
    const tag = tags[0].toLowerCase();
    if (tag.includes('research') || tag.includes('study') || tag.includes('clinical')) return "Research";
    if (tag.includes('technology') || tag.includes('ai') || tag.includes('digital')) return "Technology";
    if (tag.includes('policy') || tag.includes('regulation') || tag.includes('fda')) return "Policy";
    if (tag.includes('breaking') || tag.includes('urgent') || tag.includes('alert')) return "Breaking News";
    
    return "General";
  };

  const filteredNews = selectedCategory === "All" 
    ? newsItems 
    : newsItems.filter(item => getCategoryFromTags(item.tags) === selectedCategory);

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted/20 pb-20">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4 py-8">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Healthcare News Dashboard
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay informed with the latest healthcare insights, research breakthroughs, and industry developments from trusted medical sources
              </p>
              
              {/* Refresh Button and Last Updated */}
              <div className="flex items-center justify-center space-x-4 mt-6">
                <Button
                  onClick={fetchHealthcareNews}
                  disabled={isLoadingNews}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className={cn("w-4 h-4", isLoadingNews && "animate-spin")} />
                  <span>Refresh News</span>
                </Button>
                {lastUpdated && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Updated {formatTimeAgo(lastUpdated.toISOString())}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-red-700 dark:text-red-400">
                    <ExternalLink className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Loading State */}
            {isLoadingNews && (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading latest healthcare news...</p>
              </div>
            )}

            {/* Category Filters */}
            {!isLoadingNews && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Browse by Category</h2>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const categoryCount = category.name === "All" 
                      ? newsItems.length 
                      : newsItems.filter(item => getCategoryFromTags(item.tags) === category.name).length;
                    
                    return (
                      <Button
                        key={category.name}
                        variant={selectedCategory === category.name ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.name)}
                        className="flex items-center space-x-2"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{category.name}</span>
                        {categoryCount > 0 && (
                          <Badge variant="secondary" className="ml-1 text-xs">
                            {categoryCount}
                          </Badge>
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* News Grid */}
            {!isLoadingNews && filteredNews.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((item, index) => (
                  <Card 
                    key={item.id} 
                    className={cn(
                      "group hover:shadow-lg transition-all duration-300 cursor-pointer",
                      index === 0 && "md:col-span-2 lg:col-span-1" // Make first item larger on md screens
                    )}
                    onClick={() => window.open(item.url, '_blank')}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge className="flex items-center space-x-1">
                          <Globe className="w-3 h-3" />
                          <span>{getCategoryFromTags(item.tags)}</span>
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {formatTimeAgo(item.date_published)}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {item.summary || item.content_text || "Read more to discover the latest healthcare insights..."}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          {item.author && (
                            <span className="font-medium">{item.author.name}</span>
                          )}
                        </div>
                        <Button size="sm" variant="ghost" className="group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {item.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* No Content State */}
            {!isLoadingNews && filteredNews.length === 0 && !error && (
              <div className="text-center py-12">
                <Newspaper className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No news found</h3>
                <p className="text-muted-foreground">
                  {selectedCategory === "All" 
                    ? "No healthcare news available at the moment."
                    : `No news found in the ${selectedCategory} category.`}
                </p>
                <Button 
                  onClick={() => setSelectedCategory("All")}
                  variant="outline"
                  className="mt-4"
                >
                  View All News
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
