import { useRef } from "react";
import { Leaf, Cpu, Droplets, ArrowRight, LineChart, Sliders } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const CAROUSEL_IMAGES = [
  "https://github.com/kazawa392010/KazaOwO/blob/main/public/img/mihinh3d.jpg?raw=true",
  "https://github.com/kazawa392010/KazaOwO/blob/main/public/img/mohinh3d-%20phantich.jpg?raw=true",
  "https://github.com/kazawa392010/KazaOwO/blob/main/public/img/test.jpg?raw=true"
];

export default function Home() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="space-y-10 pb-10">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-10 pb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
          <Leaf className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide">ĐỒ ÁN TỐT NGHIỆP</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white max-w-4xl mx-auto leading-tight">
          Hệ Thống Chăm Sóc Cây <br/>
          <span className="text-gradient">Tự Động Thông Minh</span>
        </h1>
        
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Ứng dụng công nghệ IoT với vi điều khiển ESP32 giúp tự động hóa quá trình theo dõi 
          và chăm sóc cây trồng, tối ưu hóa sự phát triển với dữ liệu thời gian thực.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button asChild size="lg" className="rounded-xl px-8 h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-md shadow-[0_0_20px_hsla(var(--primary)/0.4)] transition-all hover:scale-105">
            <Link href="/control">
              Điều Khiển Ngay <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-xl px-8 h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white transition-all">
            <Link href="/data">
              Xem Dữ Liệu
            </Link>
          </Button>
        </div>
      </section>

      {/* 3D Model Showcase */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
          <Cpu className="text-primary w-6 h-6" /> 
          Mô Hình 3D Hệ Thống
        </h2>
        
        <Card className="glass-card overflow-hidden border-white/5">
          <CardContent className="p-2 sm:p-4">
            <Carousel
              plugins={[plugin.current]}
              className="w-full relative rounded-xl overflow-hidden"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {CAROUSEL_IMAGES.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden rounded-lg bg-black/50">
                      <img 
                        src={src} 
                        alt={`Mô hình 3D ${index + 1}`} 
                        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 sm:left-8 bg-black/50 border-white/10 hover:bg-primary/20 hover:text-primary transition-all backdrop-blur-sm" />
              <CarouselNext className="right-4 sm:right-8 bg-black/50 border-white/10 hover:bg-primary/20 hover:text-primary transition-all backdrop-blur-sm" />
            </Carousel>
          </CardContent>
        </Card>
      </section>

      {/* Feature Highlights */}
      <section className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { title: "Giám Sát Thời Gian Thực", desc: "Theo dõi nhiệt độ, độ ẩm đất và không khí liên tục 24/7.", icon: LineChart, color: "text-secondary" },
          { title: "Tự Động Tưới Tiêu", desc: "Động cơ máy bơm tự động kích hoạt khi đất thiếu độ ẩm.", icon: Droplets, color: "text-primary" },
          { title: "Điều Khiển Từ Xa", desc: "Tương tác trực tiếp với ESP32 và màn hình OLED qua web.", icon: Sliders, color: "text-orange-400" },
        ].map((feat, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-white/5 group">
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${feat.color}`}>
              <feat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">{feat.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
