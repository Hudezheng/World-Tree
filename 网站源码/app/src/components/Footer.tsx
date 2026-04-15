import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { path: '/', label: '首页' },
    { path: '/categories', label: '分类导航' },
    { path: '/about', label: '关于' },
    { path: '/feedback', label: '反馈' },
  ];

  const categoryLinks = [
    { label: '设计灵感', href: '/categories#design' },
    { label: '开发工具', href: '/categories#dev' },
    { label: '实用工具', href: '/categories#tools' },
    { label: '学习平台', href: '/categories#learn' },
  ];

  const legalLinks = [
    { label: '隐私政策', href: '#' },
    { label: '使用条款', href: '#' },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="inline-block text-2xl font-bold mb-4 hover:opacity-80 transition-opacity duration-300"
            >
              <span className="text-[var(--orange)]">Nav</span>Hub
            </Link>
            <p className="text-[var(--footer-text)] text-sm leading-relaxed">
              您的终极资源导航平台，帮助您快速找到最有价值的工具和网站。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">快速链接</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[var(--footer-link)] text-sm hover:text-[var(--orange)] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">分类</h4>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[var(--footer-link)] text-sm hover:text-[var(--orange)] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">法律</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[var(--footer-link)] text-sm hover:text-[var(--orange)] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-[var(--footer-text)] text-sm text-center">
            © {new Date().getFullYear()} NavHub. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
