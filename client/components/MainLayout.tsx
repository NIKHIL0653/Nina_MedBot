import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  FileText,
  LogOut,
  Moon,
  Sun,
  Stethoscope,
  User,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    {
      name: "Chat",
      href: "/chat",
      icon: MessageCircle,
      current: location.pathname === "/chat",
    },
    {
      name: "Records",
      href: "/records",
      icon: FileText,
      current: location.pathname === "/records",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 mr-8">
              <div className="relative group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Nina</h1>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1 flex-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant={item.current ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "relative group transition-all duration-300",
                        item.current
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <Icon className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                      {item.name}
                      {item.current && (
                        <div className="absolute inset-0 bg-primary rounded-md opacity-20 blur-sm"></div>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-3 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="group transition-all duration-300 hover:bg-accent"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                ) : (
                  <Sun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                )}
              </Button>

              <div className="flex items-center space-x-2 px-3 py-1.5 bg-accent/50 rounded-lg">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium">
                  {user?.email?.split("@")[0]}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="group text-muted-foreground hover:text-destructive transition-all duration-300"
              >
                <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
