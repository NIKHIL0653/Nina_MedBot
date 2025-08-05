import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Navigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Clock,
  RefreshCw,
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

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      
      // Fallback to sample news items with images
      setNewsItems([
        {
          id: "1",
          title: "Poor sleep patterns linked to diabetes, dementia, and 170 diseases",
          summary: "A new study has linked 172 different diseases, which include dementia, type 2 diabetes, and...",
          url: "#",
          date_published: new Date().toISOString(),
          author: { name: "Healthcare Technology Review" },
          image: "https://cdn.builder.io/api/v1/image/assets%2Fc8ab0ccd1c1f4c0983053a74f900b6ee%2F49e95ae1ede14750ba39bf77de75981c?format=webp&width=800"
        },
        {
          id: "2", 
          title: "3 diets may help lower diabetes risk: What do they have in common?",
          summary: "The Mediterranean, DASH, and AHEI diets can all lower the risk of developing type 2 diabetes, a new meta-analysis suggests.",
          url: "#",
          date_published: new Date(Date.now() - 3600000).toISOString(),
          author: { name: "World Health Organization" },
          image: "https://cdn.builder.io/api/v1/image/assets%2Fc8ab0ccd1c1f4c0983053a74f900b6ee%2F49e95ae1ede14750ba39bf77de75981c?format=webp&width=800"
        },
        {
          id: "3",
          title: "Alzheimer's treatment: Cancer drug combo shows promise in mice",
          summary: "Two already-approved medications may help overturn the brain disease, according to a recent study conducted...",
          url: "#",
          date_published: new Date(Date.now() - 7200000).toISOString(),
          author: { name: "Medical Research Today" },
          image: "https://cdn.builder.io/api/v1/image/assets%2Fc8ab0ccd1c1f4c0983053a74f900b6ee%2F49e95ae1ede14750ba39bf77de75981c?format=webp&width=800"
        },
        {
          id: "4",
          title: "Telemedicine Adoption Continues to Rise Post-Pandemic",
          summary: "Healthcare providers report sustained growth in telehealth services, with patient satisfaction rates exceeding pre-pandemic levels.",
          url: "#",
          date_published: new Date(Date.now() - 10800000).toISOString(),
          author: { name: "Healthcare Business Journal" },
          image: "https://cdn.builder.io/api/v1/image/assets%2Fc8ab0ccd1c1f4c0983053a74f900b6ee%2F49e95ae1ede14750ba39bf77de75981c?format=webp&width=800"
        },
        {
          id: "5",
          title: "Mental Health Apps Show Effectiveness in Clinical Studies",
          summary: "Recent studies demonstrate that mobile mental health applications can significantly complement traditional therapy approaches.",
          url: "#",
          date_published: new Date(Date.now() - 14400000).toISOString(),
          author: { name: "Journal of Digital Health" },
          image: "https://cdn.builder.io/api/v1/image/assets%2Fc8ab0ccd1c1f4c0983053a74f900b6ee%2F49e95ae1ede14750ba39bf77de75981c?format=webp&width=800"
        },
        {
          id: "6",
          title: "New Alzheimer's Drug Receives FDA Approval",
          summary: "The FDA approves a promising new treatment for early-stage Alzheimer's disease, offering hope to millions of patients and families.",
          url: "#",
          date_published: new Date(Date.now() - 18000000).toISOString(),
          author: { name: "FDA News Release" },
          image: "https://cdn.builder.io/api/v1/image/assets%2Fc8ab0ccd1c1f4c0983053a74f900b6ee%2F49e95ae1ede14750ba39bf77de75981c?format=webp&width=800"
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

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-background pb-20">
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4 py-6">
              <div className="w-16 h-16 mx-auto bg-blue-400 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Healthcare News
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay informed with the latest healthcare insights and medical breakthroughs
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
                  <span>Refresh</span>
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

            {/* News Feed */}
            {!isLoadingNews && newsItems.length > 0 && (
              <div className="space-y-6">
                {newsItems.map((item) => (
                  <Card 
                    key={item.id} 
                    className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-700"
                    onClick={() => window.open(item.url, '_blank')}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="w-full sm:w-48 h-48 sm:h-32 bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                        <img
                          src={item.image || "https://cdn.builder.io/api/v1/image/assets%2Fc8ab0ccd1c1f4c0983053a74f900b6ee%2F49e95ae1ede14750ba39bf77de75981c?format=webp&width=800"}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Content */}
                      <CardContent className="flex-1 p-4 sm:p-6">
                        <div className="space-y-3">
                          <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                            {item.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm sm:text-base line-clamp-3">
                            {item.summary || item.content_text || "Read more to discover the latest healthcare insights..."}
                          </p>
                          
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                              {item.author && (
                                <span className="font-medium">{item.author.name}</span>
                              )}
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatTimeAgo(item.date_published)}</span>
                              </div>
                            </div>
                            <Button size="sm" variant="ghost" className="group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 p-2">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* No Content State */}
            {!isLoadingNews && newsItems.length === 0 && !error && (
              <div className="text-center py-12">
                <Newspaper className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No news available</h3>
                <p className="text-muted-foreground">
                  No healthcare news available at the moment.
                </p>
                <Button 
                  onClick={fetchHealthcareNews}
                  variant="outline"
                  className="mt-4"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
