import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: '首页' },
    { path: '/categories', label: '分类导航' },
    { path: '/about', label: '关于' },
    { path: '/feedback', label: '留言反馈' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-xl py-3'
          : 'bg-transparent py-5'
      }`}
      style={{
        transitionTimingFunction: 'var(--ease-expo-out)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`text-white font-bold transition-all duration-500 ${
              isScrolled ? 'text-xl' : 'text-2xl'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            <span className="text-[var(--orange)]">Nav</span>Hub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-all duration-300 group ${
                  isActive(link.path)
                    ? 'text-[var(--orange)]'
                    : 'text-white/80 hover:text-white'
                }`}
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[var(--orange)] transition-all duration-300 ${
                    isActive(link.path)
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                  style={{
                    transitionTimingFunction: 'var(--ease-expo-out)',
                    transformOrigin: 'center',
                  }}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 transition-all duration-300 ${
                  isMobileMenuOpen
                    ? 'opacity-0 rotate-90 scale-0'
                    : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                className={`absolute inset-0 transition-all duration-300 ${
                  isMobileMenuOpen
                    ? 'opacity-100 rotate-0 scale-100'
                    : 'opacity-0 -rotate-90 scale-0'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          transitionTimingFunction: 'var(--ease-expo-out)',
        }}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block text-lg font-medium transition-all duration-300 ${
                isActive(link.path)
                  ? 'text-[var(--orange)]'
                  : 'text-white/80 hover:text-white'
              }`}
              style={{
                animationDelay: `${index * 80}ms`,
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
