import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Palette,
  Code,
  BookOpen,
  Rocket,
  Gamepad2,
  Wrench,
  Share2,
  Newspaper,
  ExternalLink,
} from 'lucide-react';

// Particle component for hero section
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedY: -Math.random() * 0.5 - 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.2,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.y += particle.speedY;
        particle.x += particle.speedX;

        if (particle.y < 0) {
          particle.y = canvas.height;
          particle.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 78, 0, ${particle.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero parallax effect
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      
      if (scrollY < heroHeight) {
        const progress = scrollY / heroHeight;
        const bgElement = heroRef.current.querySelector('.hero-bg') as HTMLElement;
        const contentElement = heroRef.current.querySelector('.hero-content') as HTMLElement;
        
        if (bgElement) {
          bgElement.style.transform = `scale(${1 + progress * 0.1}) translateY(${-scrollY * 0.5}px)`;
        }
        if (contentElement) {
          contentElement.style.transform = `translateY(${-scrollY * 0.3}px)`;
          contentElement.style.opacity = `${1 - progress}`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { icon: Palette, label: '设计灵感', description: '创意设计与视觉灵感', color: 'from-pink-500 to-rose-500' },
    { icon: Code, label: '开发工具', description: '编程与开发资源', color: 'from-blue-500 to-cyan-500' },
    { icon: BookOpen, label: '学习平台', description: '在线学习与知识', color: 'from-green-500 to-emerald-500' },
    { icon: Rocket, label: '生产力', description: '效率提升工具', color: 'from-purple-500 to-violet-500' },
    { icon: Gamepad2, label: '娱乐', description: '休闲与娱乐资源', color: 'from-orange-500 to-amber-500' },
    { icon: Wrench, label: '实用工具', description: '日常实用小工具', color: 'from-gray-500 to-slate-500' },
    { icon: Share2, label: '社交媒体', description: '社交与社区平台', color: 'from-indigo-500 to-blue-500' },
    { icon: Newspaper, label: '新闻资讯', description: '新闻与信息聚合', color: 'from-red-500 to-pink-500' },
  ];

  const popularResources = [
    {
      name: 'Dribbble',
      description: '设计师作品展示平台',
      category: '设计灵感',
      url: 'https://dribbble.com',
      color: '#ea4c89',
    },
    {
      name: 'GitHub',
      description: '代码托管与协作平台',
      category: '开发工具',
      url: 'https://github.com',
      color: '#333',
    },
    {
      name: 'Figma',
      description: '协作设计工具',
      category: '设计灵感',
      url: 'https://figma.com',
      color: '#f24e1e',
    },
    {
      name: 'Notion',
      description: '全能笔记与协作工具',
      category: '生产力',
      url: 'https://notion.so',
      color: '#000',
    },
    {
      name: 'VS Code',
      description: '强大的代码编辑器',
      category: '开发工具',
      url: 'https://code.visualstudio.com',
      color: '#007acc',
    },
    {
      name: 'Behance',
      description: 'Adobe创意作品展示',
      category: '设计灵感',
      url: 'https://behance.net',
      color: '#1769ff',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/hero-bg.jpg)',
            transform: 'scale(1.1)',
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Particle Effect */}
        <ParticleBackground />
        
        {/* Content */}
        <div
          className="hero-content relative z-10 text-center px-4 max-w-4xl mx-auto"
          style={{ perspective: '1200px' }}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-down"
            style={{
              textShadow: '0 20px 40px rgba(0,0,0,0.3)',
              animationDelay: '0.6s',
              animationFillMode: 'both',
            }}
          >
            探索精选资源
          </h1>
          <p
            className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-slide-up"
            style={{
              animationDelay: '0.8s',
              animationFillMode: 'both',
            }}
          >
            发现最优质的工具、网站和资源，提升你的工作效率与创造力
          </p>
          <Link
            to="/categories"
            className="inline-block bg-white text-black px-8 py-4 rounded-lg font-semibold text-base hover:bg-[var(--orange)] hover:text-white transition-all duration-300 animate-glow-pulse"
            style={{
              animationDelay: '1s',
              animationFillMode: 'both',
              transform: 'translateY(0)',
            }}
          >
            开始探索
          </Link>
        </div>
        
        {/* Bottom Fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--light-gray)] to-transparent"
          style={{ zIndex: 2 }}
        />
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-[var(--light-gray)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dark-gray)] mb-4">
              浏览分类
            </h2>
            <div className="w-20 h-1 bg-[var(--orange)] mx-auto rounded-full" />
            <p className="mt-4 text-[var(--text-gray)]">
              按类别查找所需资源
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.label}
                to={`/categories#${category.label}`}
                className="group bg-white rounded-xl p-8 text-center transition-all duration-400 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  transitionTimingFunction: 'var(--ease-magnetic)',
                  animationDelay: `${500 + index * 80}ms`,
                }}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--dark-gray)] mb-2 group-hover:text-[var(--orange)] transition-colors duration-300">
                  {category.label}
                </h3>
                <p className="text-sm text-[var(--text-gray)]">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Resources Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dark-gray)] mb-4">
              热门资源
            </h2>
            <div className="w-20 h-1 bg-[var(--orange)] rounded-full" />
            <p className="mt-4 text-[var(--text-gray)]">
              精选最受欢迎的工具和网站
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularResources.map((resource, index) => (
              <a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-xl border border-[var(--medium-gray)] overflow-hidden transition-all duration-400 hover:-translate-y-3 hover:shadow-2xl hover:border-[var(--orange)]/30"
                style={{
                  transitionTimingFunction: 'var(--ease-magnetic)',
                  animationDelay: `${400 + index * 100}ms`,
                }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                      style={{ backgroundColor: resource.color }}
                    >
                      {resource.name[0]}
                    </div>
                    <ExternalLink className="w-5 h-5 text-[var(--text-gray)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--dark-gray)] mb-2 group-hover:text-[var(--orange)] transition-colors duration-300">
                    {resource.name}
                  </h3>
                  <p className="text-[var(--text-gray)] text-sm mb-3">
                    {resource.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-[var(--light-gray)] text-xs text-[var(--text-gray)] rounded-full">
                    {resource.category}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/cta-bg.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            准备好开始了吗？
          </h2>
          <p className="text-lg text-white/80 mb-10">
            立即探索我们的资源库，发现更多有价值的工具和网站
          </p>
          <Link
            to="/categories"
            className="inline-block bg-white text-black px-10 py-4 rounded-lg font-semibold text-base hover:bg-[var(--orange)] hover:text-white transition-all duration-300 animate-glow-pulse"
          >
            立即探索
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
