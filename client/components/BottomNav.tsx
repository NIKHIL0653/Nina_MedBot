import { Link, useLocation } from "react-router-dom";
import { MessageCircle, FileText, BarChart3 } from "lucide-react";
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
      name: "News",
      href: "/dashboard",
      icon: BarChart3,
      current: location.pathname === "/dashboard",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border px-6 py-3">
      <div className="flex items-center justify-around space-x-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center space-y-1 p-2 h-auto transition-all duration-300",
                item.current
                  ? "text-blue-400 font-semibold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
