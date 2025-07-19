import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  Stethoscope,
  User,
  Settings,
  ChevronDown,
  MessageCircle,
  FileText,
} from "lucide-react";
import BottomNav from "./BottomNav";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, signOut } = useAuth();
  const location = useLocation();

  // Chat-specific header (blue bar with Nina centered)
  const renderChatHeader = () => (
    <nav className="sticky top-0 z-50 bg-blue-400 shadow-sm">
      <div className="h-16 flex items-center justify-center">
        <h1 className="text-xl font-semibold text-white">Nina</h1>
      </div>
    </nav>
  );

  // Records-specific header (title + account)
  const renderRecordsHeader = () => (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-semibold text-foreground">
            Clinical Records
          </h1>

          {/* User Menu */}
          <div className="flex items-center">
            {/* Desktop dropdown */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 px-3 py-1.5 bg-accent/50 rounded-lg hover:bg-accent transition-all duration-300"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium">
                      Hi, {user?.email?.split("@")[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="flex items-center space-x-2 cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile account text */}
            <div className="md:hidden flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Hi, {user?.email?.split("@")[0]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  // Default header for other routes (logo + account)
  const renderDefaultHeader = () => (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Nina</h1>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            <Link to="/chat">
              <Button
                variant={location.pathname === "/chat" ? "default" : "ghost"}
                size="sm"
                className="relative group transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </Link>
            <Link to="/records">
              <Button
                variant={location.pathname === "/records" ? "default" : "ghost"}
                size="sm"
                className="relative group transition-all duration-300"
              >
                <FileText className="w-4 h-4 mr-2" />
                Records
              </Button>
            </Link>
            <Link to="/settings">
              <Button
                variant={
                  location.pathname === "/settings" ? "default" : "ghost"
                }
                size="sm"
                className="relative group transition-all duration-300"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center">
            {/* Desktop dropdown */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 px-3 py-1.5 bg-accent/50 rounded-lg hover:bg-accent transition-all duration-300"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium">
                      {user?.email?.split("@")[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="flex items-center space-x-2 cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile account text */}
            <div className="md:hidden flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Your account
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  // Settings-specific header (just logo and navigation)
  const renderSettingsHeader = () => (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Nina</h1>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            <Link to="/chat">
              <Button
                variant={location.pathname === "/chat" ? "default" : "ghost"}
                size="sm"
                className="relative group transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </Link>
            <Link to="/records">
              <Button
                variant={location.pathname === "/records" ? "default" : "ghost"}
                size="sm"
                className="relative group transition-all duration-300"
              >
                <FileText className="w-4 h-4 mr-2" />
                Records
              </Button>
            </Link>
            <Link to="/settings">
              <Button
                variant={
                  location.pathname === "/settings" ? "default" : "ghost"
                }
                size="sm"
                className="relative group transition-all duration-300"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );

  // Render appropriate header based on current route
  const renderHeader = () => {
    if (location.pathname === "/chat") {
      return renderChatHeader();
    } else if (location.pathname === "/records") {
      return renderRecordsHeader();
    } else if (location.pathname === "/settings") {
      return renderSettingsHeader();
    } else {
      return renderDefaultHeader();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Route-specific header */}
      {renderHeader()}

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Bottom Navigation for Mobile */}
      <BottomNav />
    </div>
  );
}
