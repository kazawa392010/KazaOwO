import { Link, useLocation } from "wouter";
import { Home, LineChart, Users, Sliders, Sprout } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Trang Chủ", url: "/", icon: Home },
  { title: "Số Liệu", url: "/data", icon: LineChart },
  { title: "Thành Viên", url: "/members", icon: Users },
  { title: "Điều Khiển", url: "/control", icon: Sliders },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar className="border-r border-white/5 bg-background">
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-white/5">
        <div className="flex items-center gap-3 w-full pl-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center neon-glow">
            <Sprout className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display font-bold text-lg text-white">SmartPlant</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3 mt-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Menu Chính
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map((item) => {
                const isActive = location === item.url;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link 
                        href={item.url}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300
                          ${isActive 
                            ? "bg-primary/10 text-primary border border-primary/20 neon-glow" 
                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                          }
                        `}
                      >
                        <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                        <span className="font-medium text-[15px]">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
