import { useState, useEffect } from "react";
import { useDeviceStatus, useUpdateDeviceStatus } from "@/hooks/use-device";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Server, Wifi, Zap, Power, Send, TerminalSquare } from "lucide-react";

export default function ControlPage() {
  const { data: status, isLoading } = useDeviceStatus();
  const { mutate: updateDevice, isPending } = useUpdateDeviceStatus();
  
  const [messageInput, setMessageInput] = useState("");

  // Sync local input state with server data initially
  useEffect(() => {
    if (status && !messageInput) {
      setMessageInput(status.message);
    }
  }, [status]);

  const handleToggleMotor = (checked: boolean) => {
    updateDevice({ motorRunning: checked });
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    updateDevice({ message: messageInput });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64 bg-white/5" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[300px] rounded-2xl bg-white/5" />
          <Skeleton className="h-[300px] rounded-2xl bg-white/5" />
        </div>
      </div>
    );
  }

  // Fallback if no device status is found initially
  const device = status || {
    isOnline: false,
    ipAddress: "N/A",
    motorRunning: false,
    message: "",
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Bảng Điều Khiển</h1>
          <p className="text-muted-foreground mt-2">Quản lý và tương tác với ESP32 theo thời gian thực.</p>
        </div>

        <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-3 w-fit">
          <span className="text-sm font-medium text-muted-foreground">Trạng thái ESP32:</span>
          {device.isOnline ? (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 py-1 gap-2 neon-glow">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Đang Hoạt Động
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 py-1 gap-2 neon-glow-red">
              <div className="w-2 h-2 rounded-full bg-destructive" /> Mất Kết Nối
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hardware Status */}
        <Card className="glass-card border-white/5">
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="text-xl flex items-center gap-2 text-white">
              <Server className="w-5 h-5 text-secondary" /> Thông Tin Phần Cứng
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Wifi className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Địa Chỉ IP Mạng</p>
                  <p className="text-xs text-muted-foreground">IP local của module WiFi</p>
                </div>
              </div>
              <code className="text-secondary font-mono bg-secondary/10 px-3 py-1 rounded-md text-sm border border-secondary/20">
                {device.ipAddress}
              </code>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${device.motorRunning ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Máy Bơm Nước</p>
                  <p className="text-xs text-muted-foreground">Điều khiển động cơ bơm</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm font-bold ${device.motorRunning ? 'text-primary' : 'text-muted-foreground'}`}>
                  {device.motorRunning ? 'ON' : 'OFF'}
                </span>
                <Switch 
                  checked={device.motorRunning} 
                  onCheckedChange={handleToggleMotor}
                  disabled={!device.isOnline || isPending}
                  className="data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_0_10px_hsla(var(--primary)/0.5)]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* OLED Control */}
        <Card className="glass-card border-white/5">
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="text-xl flex items-center gap-2 text-white">
              <TerminalSquare className="w-5 h-5 text-orange-400" /> Hiển Thị Màn Hình OLED
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Nội dung hiển thị hiện tại:</label>
                <div className="w-full h-24 bg-black rounded-xl border border-white/10 p-4 font-mono text-primary flex items-center shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none"></div>
                  <span className="relative z-10 text-lg neon-text">{device.message || "---"}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <label className="text-sm font-medium text-white">Gửi thông điệp mới</label>
                <div className="flex gap-3">
                  <Input 
                    placeholder="Nhập chữ để hiển thị lên màn hình..." 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    disabled={!device.isOnline || isPending}
                    className="bg-white/5 border-white/10 focus-visible:ring-orange-400/50 focus-visible:border-orange-400 text-white h-11"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!device.isOnline || isPending || !messageInput.trim() || messageInput === device.message}
                    className="h-11 px-6 bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all hover:scale-105"
                  >
                    <Send className="w-4 h-4 mr-2" /> Gửi
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
