import { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthContent {
  id: string;
  title: string;
  description: string;
  type: "video" | "article" | "news";
  category: string;
  duration?: string;
  readTime?: string;
  publishedAt: string;
  thumbnail?: string;
  url: string;
  featured?: boolean;
}

const healthContent: HealthContent[] = [
  {
    id: "1",
    title: "Understanding Blood Pressure: What Your Numbers Mean",
    description: "Learn how to interpret your blood pressure readings and when to be concerned about hypertension. Dr. Sarah Chen explains the difference between systolic and diastolic pressure.",
    type: "video",
    category: "Cardiovascular Health",
    duration: "8:45",
    publishedAt: "2024-01-15",
    url: "#",
    featured: true,
  },
  {
    id: "2",
    title: "The Complete Guide to Cholesterol Management",
    description: "Expert insights on managing cholesterol levels through diet, exercise, and medication when necessary. Includes meal planning tips and exercise routines.",
    type: "article",
    category: "Cardiovascular Health",
    readTime: "5 min read",
    publishedAt: "2024-01-14",
    url: "#",
  },
  {
    id: "3",
    title: "Breaking: AI Detects Early Diabetes Risk 5 Years in Advance",
    description: "Stanford researchers demonstrate how machine learning algorithms can identify diabetes risk 5 years before traditional methods using routine blood tests.",
    type: "news",
    category: "Medical Research",
    readTime: "3 min read",
    publishedAt: "2024-01-13",
    url: "#",
    featured: true,
  },
  {
    id: "4",
    title: "Mental Health and Physical Wellness: The Connection",
    description: "Exploring the bidirectional relationship between mental health and physical health outcomes.",
    type: "video",
    category: "Mental Health",
    duration: "12:30",
    publishedAt: "2024-01-12",
    url: "#",
  },
  {
    id: "5",
    title: "Preventive Care: Essential Health Screenings by Age",
    description: "A comprehensive guide to recommended health screenings and when to schedule them for optimal prevention.",
    type: "article",
    category: "Preventive Medicine",
    readTime: "7 min read",
    publishedAt: "2024-01-11",
    url: "#",
  },
  {
    id: "6",
    title: "Nutrition Myths Debunked: What Science Really Says",
    description: "Evidence-based analysis of common nutrition claims and what current research actually supports.",
    type: "video",
    category: "Nutrition",
    duration: "15:20",
    publishedAt: "2024-01-10",
    url: "#",
  },
  {
    id: "7",
    title: "Telemedicine Adoption Reaches Record High Post-Pandemic",
    description: "Healthcare delivery continues to evolve with sustained high adoption rates of virtual care solutions.",
    type: "news",
    category: "Healthcare Technology",
    readTime: "4 min read",
    publishedAt: "2024-01-09",
    url: "#",
  },
  {
    id: "8",
    title: "Sleep Hygiene: Building Better Rest Habits",
    description: "Evidence-based strategies for improving sleep quality and duration for better overall health.",
    type: "article",
    category: "Sleep Medicine",
    readTime: "6 min read",
    publishedAt: "2024-01-08",
    url: "#",
  },
];

const categories = [
  { name: "All", icon: BookOpen, color: "bg-blue-500" },
  { name: "Cardiovascular Health", icon: Heart, color: "bg-red-500" },
  { name: "Mental Health", icon: Brain, color: "bg-purple-500" },
  { name: "Nutrition", icon: Activity, color: "bg-green-500" },
  { name: "Medical Research", icon: Stethoscope, color: "bg-indigo-500" },
  { name: "Preventive Medicine", icon: TrendingUp, color: "bg-orange-500" },
];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState<"all" | "video" | "article" | "news">("all");

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

  const filteredContent = healthContent.filter(content => {
    const categoryMatch = selectedCategory === "All" || content.category === selectedCategory;
    const typeMatch = selectedType === "all" || content.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const featuredContent = healthContent.filter(content => content.featured);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "article":
        return <FileText className="w-4 h-4" />;
      case "news":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      video: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      article: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      news: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted/20 pb-20">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4 py-8">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Health Dashboard
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay informed with the latest healthcare insights, research, and expert guidance from trusted medical professionals
              </p>
            </div>

            {/* Featured Content */}
            {featuredContent.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Featured Content</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredContent.map((content) => (
                    <Card key={content.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge className={cn("flex items-center space-x-1", getTypeBadge(content.type))}>
                            {getTypeIcon(content.type)}
                            <span className="capitalize">{content.type}</span>
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {content.category}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors duration-200">
                          {content.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {content.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{content.publishedAt}</span>
                            </div>
                            {content.duration && (
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{content.duration}</span>
                              </div>
                            )}
                            {content.readTime && (
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{content.readTime}</span>
                              </div>
                            )}
                          </div>
                          <Button size="sm" className="group-hover:scale-105 transition-transform duration-200">
                            {content.type === "video" ? <Play className="w-4 h-4 mr-2" /> : <ExternalLink className="w-4 h-4 mr-2" />}
                            {content.type === "video" ? "Watch" : "Read"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Browse by Category</h2>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
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
                    </Button>
                  );
                })}
              </div>

              {/* Content Type Filter */}
              <div className="flex flex-wrap gap-2">
                {["all", "video", "article", "news"].map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type as any)}
                    className="flex items-center space-x-2"
                  >
                    {getTypeIcon(type)}
                    <span className="capitalize">{type}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((content) => (
                <Card key={content.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={cn("flex items-center space-x-1", getTypeBadge(content.type))}>
                        {getTypeIcon(content.type)}
                        <span className="capitalize">{content.type}</span>
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {content.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {content.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        {content.duration || content.readTime}
                      </div>
                      <Button size="sm" variant="ghost" className="group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                        {content.type === "video" ? <Play className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredContent.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No content found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more health content.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
