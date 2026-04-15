import { useEffect, useRef, useState } from 'react';
import { Target, Users, Zap, Heart } from 'lucide-react';

const About = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState({ resources: 0, categories: 0, users: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = { resources: 500, categories: 50, users: 10000 };
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        resources: Math.floor(targets.resources * easeOut),
        categories: Math.floor(targets.categories * easeOut),
        users: Math.floor(targets.users * easeOut),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [statsVisible]);

  const features = [
    {
      icon: Target,
      title: '精准分类',
      description: '所有资源经过精心分类，让您快速找到所需内容',
    },
    {
      icon: Users,
      title: '社区驱动',
      description: '汇集社区智慧，持续更新优质资源',
    },
    {
      icon: Zap,
      title: '高效发现',
      description: '简洁的界面设计，提升您的浏览效率',
    },
    {
      icon: Heart,
      title: '用心筛选',
      description: '每个资源都经过人工审核，确保质量',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--light-gray)] pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-[var(--dark-gray)] text-white py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              关于 <span className="text-[var(--orange)]">Nav</span>Hub
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              我们是一个致力于整理和分享优质互联网资源的平台，
              帮助用户快速找到最有价值的工具和网站。
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl font-bold text-[var(--dark-gray)] mb-6">
                我们的使命
              </h2>
              <div className="space-y-4 text-[var(--text-gray)] leading-relaxed">
                <p>
                  在信息爆炸的时代，找到真正有价值的资源变得越来越困难。
                  NavHub 诞生于解决这个问题的美好愿景。
                </p>
                <p>
                  我们精心筛选每一个收录的资源，确保它们能够真正帮助用户
                  提升工作效率、激发创造力、拓展知识边界。
                </p>
                <p>
                  无论是设计师寻找灵感，开发者寻找工具，还是学习者寻找资源，
                  NavHub 都将成为您最可靠的导航伙伴。
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/about-image.jpg"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[var(--orange)] rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--dark-gray)] rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white" ref={statsRef}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-[var(--orange)] mb-2">
                {counts.resources}+
              </div>
              <div className="text-[var(--text-gray)]">精选资源</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[var(--orange)] mb-2">
                {counts.categories}+
              </div>
              <div className="text-[var(--text-gray)]">分类目录</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[var(--orange)] mb-2">
                {counts.users.toLocaleString()}+
              </div>
              <div className="text-[var(--text-gray)]">月活跃用户</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--dark-gray)] mb-4">
              为什么选择我们
            </h2>
            <div className="w-20 h-1 bg-[var(--orange)] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-shadow duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-[var(--orange)]/10 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-[var(--orange)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--dark-gray)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-gray)] text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[var(--dark-gray)] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">我们的价值观</h2>
            <div className="w-20 h-1 bg-[var(--orange)] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-[var(--orange)]">
                质量至上
              </h3>
              <p className="text-white/70">
                我们只收录经过验证的优质资源，确保每一个推荐都值得信赖。
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-[var(--orange)]">
                用户体验
              </h3>
              <p className="text-white/70">
                简洁直观的界面设计，让资源发现变得轻松愉快。
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-[var(--orange)]">
                持续创新
              </h3>
              <p className="text-white/70">
                紧跟技术趋势，不断更新和优化我们的资源库。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
