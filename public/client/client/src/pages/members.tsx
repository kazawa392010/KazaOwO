import { Github, Mail, Code, Palette, Settings, CheckCircle2, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MEMBERS = [
  { name: "Khang", role: "Thiết Kế / Hàn mạch", icon: Cpu, color: "text-blue-400", bg: "bg-blue-400/10" },
  { name: "Thịnh", role: "Design Giao Diện Website", icon: Palette, color: "text-pink-400", bg: "bg-pink-400/10" },
  { name: "Nghĩa", role: "Làm Giao Diện", icon: Code, color: "text-purple-400", bg: "bg-purple-400/10" },
  { name: "Tiên", role: "Kiểm Tra Điều Chỉnh", icon: Settings, color: "text-orange-400", bg: "bg-orange-400/10" },
  { name: "Lâm", role: "Nạp code esp32", icon: Code, color: "text-primary", bg: "bg-primary/10" },
  { name: "Tâm", role: "Hoàn Thiện Sản Phẩm", icon: CheckCircle2, color: "text-secondary", bg: "bg-secondary/10" },
];

export default function MembersPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
          Đội Ngũ <span className="text-gradient">Phát Triển</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Những thành viên đã đóng góp để xây dựng và hoàn thiện dự án Hệ Thống Chăm Sóc Cây Tự Động.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {MEMBERS.map((member, i) => (
          <Card 
            key={i} 
            className="glass-card border-white/5 relative overflow-hidden group hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
          >
            {/* Abstract Background pattern */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full opacity-20 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-40" style={{ backgroundColor: `var(--${member.color.split('-')[1]})` }}></div>
            
            <CardContent className="p-8 relative z-10 flex flex-col items-center text-center space-y-4">
              <div className={`w-20 h-20 rounded-2xl ${member.bg} flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-transform duration-300 shadow-inner border border-white/5`}>
                <member.icon className={`w-10 h-10 ${member.color}`} />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-2xl font-display font-bold text-white group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-muted-foreground px-3 py-1 rounded-full bg-white/5 border border-white/5 inline-block">
                  {member.role}
                </p>
              </div>

              <div className="flex gap-3 pt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white">
                  <Github className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
