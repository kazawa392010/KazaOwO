import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  const style = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "4.5rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden relative">
          <header className="flex h-16 items-center justify-between px-4 sm:px-6 glass-panel sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-white/5 transition-colors text-white" />
              <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
              <h1 className="text-lg font-display font-bold tracking-wider text-white hidden sm:block">
                HỆ THỐNG <span className="text-primary text-gradient">MÔ HÌNH CHĂM SÓC CÂY</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">System Active</span>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
            {/* Background Decorative Gradients for depth */}
            <div className="absolute top-0 left-[20%] w-[600px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none translate-y-1/3"></div>

            <div className="relative z-10 max-w-6xl mx-auto h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
