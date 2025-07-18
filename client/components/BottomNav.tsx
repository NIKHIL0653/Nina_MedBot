import { Link, useLocation } from "react-router-dom";
import { MessageCircle, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
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
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      current: location.pathname === "/settings",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <div className="grid grid-cols-3 h-16">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-colors duration-200",
                item.current
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
