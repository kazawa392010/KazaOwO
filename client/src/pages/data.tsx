import { format } from "date-fns";
import { useSensorData } from "@/hooks/use-sensor";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ThermometerSun, Droplets, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DataPage() {
  const { data: sensorData, isLoading } = useSensorData();

  // Transform data for charts
  const chartData = sensorData?.map(d => ({
    time: format(new Date(d.timestamp), "HH:mm:ss"),
    temperature: d.temperature,
    humidity: d.humidity,
    soilMoisture: d.soilMoisture,
  })).slice(-30); // Take last 30 readings for clarity

  // Latest metrics
  const latest = sensorData && sensorData.length > 0 
    ? sensorData[sensorData.length - 1] 
    : { temperature: 0, humidity: 0, soilMoisture: 0 };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64 bg-white/5" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => <Skeleton key={i} className="h-32 rounded-2xl bg-white/5" />)}
        </div>
        <Skeleton className="h-[500px] rounded-2xl bg-white/5" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">Số Liệu Cảm Biến</h1>
        <p className="text-muted-foreground mt-2">Giám sát các chỉ số môi trường theo thời gian thực (Cập nhật mỗi 3s).</p>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <MetricCard 
          title="Nhiệt Độ" 
          value={`${latest.temperature}°C`} 
          icon={ThermometerSun} 
          color="text-orange-500" 
          glowColor="shadow-[0_0_30px_rgba(249,115,22,0.15)]"
        />
        <MetricCard 
          title="Độ Ẩm Không Khí" 
          value={`${latest.humidity}%`} 
          icon={Droplets} 
          color="text-secondary" 
          glowColor="shadow-[0_0_30px_rgba(0,255,255,0.15)]"
        />
        <MetricCard 
          title="Độ Ẩm Đất" 
          value={`${latest.soilMoisture}%`} 
          icon={Activity} 
          color="text-primary" 
          glowColor="shadow-[0_0_30px_rgba(0,255,157,0.15)]"
        />
      </div>

      {/* Main Chart */}
      <Card className="glass-card border-white/5 overflow-hidden">
        <CardHeader className="border-b border-white/5 pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <LineChartIcon className="w-5 h-5 text-primary" />
            Biểu Đồ Xu Hướng
          </CardTitle>
          <CardDescription className="text-sm">
            Dữ liệu tổng hợp từ các cảm biến trong phiên làm việc.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-8">
          {chartData && chartData.length > 0 ? (
            <div className="h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(35, 100%, 50%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(35, 100%, 50%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(190, 90%, 50%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(190, 90%, 50%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSoil" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(158, 100%, 50%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(158, 100%, 50%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="rgba(255,255,255,0.3)" 
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} 
                    tickMargin={10}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.3)" 
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(10px)'
                    }}
                    itemStyle={{ fontWeight: 600 }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  
                  <Area 
                    type="monotone" 
                    name="Nhiệt Độ (°C)"
                    dataKey="temperature" 
                    stroke="hsl(35, 100%, 50%)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorTemp)" 
                  />
                  <Area 
                    type="monotone" 
                    name="Độ Ẩm Không Khí (%)"
                    dataKey="humidity" 
                    stroke="hsl(190, 90%, 50%)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorHum)" 
                  />
                  <Area 
                    type="monotone" 
                    name="Độ Ẩm Đất (%)"
                    dataKey="soilMoisture" 
                    stroke="hsl(158, 100%, 50%)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorSoil)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[450px] flex items-center justify-center border border-dashed border-white/10 rounded-xl">
              <p className="text-muted-foreground">Chưa có dữ liệu cảm biến.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Icon helper
function LineChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
      <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  );
}

function MetricCard({ title, value, icon: Icon, color, glowColor }: { title: string, value: string, icon: any, color: string, glowColor: string }) {
  return (
    <Card className={`glass-card border-white/5 relative overflow-hidden group ${glowColor} transition-all duration-500 hover:-translate-y-1`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <p className="text-4xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
              {value}
            </p>
          </div>
          <div className={`p-3 rounded-2xl bg-white/5 ${color} group-hover:scale-110 transition-transform duration-500`}>
            <Icon className="w-7 h-7" />
          </div>
        </div>
      </CardContent>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </Card>
  );
}
