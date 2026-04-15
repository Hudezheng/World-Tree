import { useState } from 'react';
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
  Search,
} from 'lucide-react';

interface Resource {
  name: string;
  description: string;
  url: string;
  tags: string[];
}

interface Category {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
  color: string;
  resources: Resource[];
}

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 'design',
      icon: Palette,
      label: '设计灵感',
      description: '创意设计与视觉灵感',
      color: 'from-pink-500 to-rose-500',
      resources: [
        { name: 'Dribbble', description: '设计师作品展示平台', url: 'https://dribbble.com', tags: ['UI/UX', '灵感'] },
        { name: 'Behance', description: 'Adobe创意作品展示', url: 'https://behance.net', tags: ['作品集', '创意'] },
        { name: 'Pinterest', description: '图片灵感收集平台', url: 'https://pinterest.com', tags: ['灵感', '图片'] },
        { name: 'Awwwards', description: '优秀网站设计评选', url: 'https://awwwards.com', tags: ['网页设计', '奖项'] },
        { name: 'Muzli', description: '设计灵感聚合平台', url: 'https://muz.li', tags: ['灵感', '聚合'] },
        { name: 'Land-book', description: '着陆页设计灵感', url: 'https://land-book.com', tags: ['着陆页', '网页'] },
      ],
    },
    {
      id: 'dev',
      icon: Code,
      label: '开发工具',
      description: '编程与开发资源',
      color: 'from-blue-500 to-cyan-500',
      resources: [
        { name: 'GitHub', description: '代码托管与协作平台', url: 'https://github.com', tags: ['代码托管', '开源'] },
        { name: 'Stack Overflow', description: '开发者问答社区', url: 'https://stackoverflow.com', tags: ['问答', '社区'] },
        { name: 'MDN Web Docs', description: 'Web技术文档', url: 'https://developer.mozilla.org', tags: ['文档', '学习'] },
        { name: 'VS Code', description: '强大的代码编辑器', url: 'https://code.visualstudio.com', tags: ['编辑器', '工具'] },
        { name: 'CodePen', description: '在线代码编辑器', url: 'https://codepen.io', tags: ['前端', '演示'] },
        { name: 'GitLab', description: 'DevOps平台', url: 'https://gitlab.com', tags: ['CI/CD', '代码托管'] },
      ],
    },
    {
      id: 'learn',
      icon: BookOpen,
      label: '学习平台',
      description: '在线学习与知识',
      color: 'from-green-500 to-emerald-500',
      resources: [
        { name: 'Coursera', description: '在线课程平台', url: 'https://coursera.org', tags: ['课程', '证书'] },
        { name: 'Udemy', description: '实用技能学习', url: 'https://udemy.com', tags: ['技能', '视频'] },
        { name: 'freeCodeCamp', description: '免费编程学习', url: 'https://freecodecamp.org', tags: ['免费', '编程'] },
        { name: 'Khan Academy', description: '免费教育平台', url: 'https://khanacademy.org', tags: ['教育', '免费'] },
        { name: 'edX', description: '名校在线课程', url: 'https://edx.org', tags: ['大学课程', '证书'] },
        { name: 'YouTube Learning', description: '视频学习资源', url: 'https://youtube.com/learning', tags: ['视频', '免费'] },
      ],
    },
    {
      id: 'productivity',
      icon: Rocket,
      label: '生产力',
      description: '效率提升工具',
      color: 'from-purple-500 to-violet-500',
      resources: [
        { name: 'Notion', description: '全能笔记与协作', url: 'https://notion.so', tags: ['笔记', '协作'] },
        { name: 'Trello', description: '看板项目管理', url: 'https://trello.com', tags: ['项目管理', '看板'] },
        { name: 'Slack', description: '团队沟通工具', url: 'https://slack.com', tags: ['沟通', '团队'] },
        { name: 'Todoist', description: '任务管理应用', url: 'https://todoist.com', tags: ['待办', '效率'] },
        { name: 'Evernote', description: '笔记记录工具', url: 'https://evernote.com', tags: ['笔记', '记录'] },
        { name: 'RescueTime', description: '时间追踪分析', url: 'https://rescuetime.com', tags: ['时间', '分析'] },
      ],
    },
    {
      id: 'entertainment',
      icon: Gamepad2,
      label: '娱乐',
      description: '休闲与娱乐资源',
      color: 'from-orange-500 to-amber-500',
      resources: [
        { name: 'YouTube', description: '视频分享平台', url: 'https://youtube.com', tags: ['视频', '娱乐'] },
        { name: 'Netflix', description: '流媒体影视平台', url: 'https://netflix.com', tags: ['影视', '流媒体'] },
        { name: 'Spotify', description: '音乐流媒体', url: 'https://spotify.com', tags: ['音乐', '流媒体'] },
        { name: 'Steam', description: '游戏平台', url: 'https://store.steampowered.com', tags: ['游戏', '平台'] },
        { name: 'Twitch', description: '游戏直播平台', url: 'https://twitch.tv', tags: ['直播', '游戏'] },
        { name: 'Reddit', description: '社区讨论平台', url: 'https://reddit.com', tags: ['社区', '讨论'] },
      ],
    },
    {
      id: 'tools',
      icon: Wrench,
      label: '实用工具',
      description: '日常实用小工具',
      color: 'from-gray-500 to-slate-500',
      resources: [
        { name: 'TinyPNG', description: '图片压缩工具', url: 'https://tinypng.com', tags: ['图片', '压缩'] },
        { name: 'Canva', description: '在线设计工具', url: 'https://canva.com', tags: ['设计', '图形'] },
        { name: 'Google Drive', description: '云存储服务', url: 'https://drive.google.com', tags: ['存储', '云'] },
        { name: 'Dropbox', description: '文件同步工具', url: 'https://dropbox.com', tags: ['同步', '存储'] },
        { name: 'LastPass', description: '密码管理器', url: 'https://lastpass.com', tags: ['密码', '安全'] },
        { name: 'Speedtest', description: '网速测试', url: 'https://speedtest.net', tags: ['测试', '网络'] },
      ],
    },
    {
      id: 'social',
      icon: Share2,
      label: '社交媒体',
      description: '社交与社区平台',
      color: 'from-indigo-500 to-blue-500',
      resources: [
        { name: 'Twitter', description: '微博客平台', url: 'https://twitter.com', tags: ['社交', '微博'] },
        { name: 'LinkedIn', description: '职业社交网络', url: 'https://linkedin.com', tags: ['职业', '社交'] },
        { name: 'Instagram', description: '图片分享平台', url: 'https://instagram.com', tags: ['图片', '社交'] },
        { name: 'Facebook', description: '社交网络', url: 'https://facebook.com', tags: ['社交', '连接'] },
        { name: 'Discord', description: '社区聊天平台', url: 'https://discord.com', tags: ['聊天', '社区'] },
        { name: 'Telegram', description: '即时通讯应用', url: 'https://telegram.org', tags: ['通讯', '安全'] },
      ],
    },
    {
      id: 'news',
      icon: Newspaper,
      label: '新闻资讯',
      description: '新闻与信息聚合',
      color: 'from-red-500 to-pink-500',
      resources: [
        { name: 'Hacker News', description: '科技新闻聚合', url: 'https://news.ycombinator.com', tags: ['科技', '新闻'] },
        { name: 'TechCrunch', description: '科技媒体报道', url: 'https://techcrunch.com', tags: ['科技', '创业'] },
        { name: 'Medium', description: '博客发布平台', url: 'https://medium.com', tags: ['博客', '阅读'] },
        { name: 'Flipboard', description: '个性化新闻', url: 'https://flipboard.com', tags: ['新闻', '聚合'] },
        { name: 'Feedly', description: 'RSS阅读器', url: 'https://feedly.com', tags: ['RSS', '阅读'] },
        { name: 'Inoreader', description: '内容订阅工具', url: 'https://inoreader.com', tags: ['订阅', 'RSS'] },
      ],
    },
  ];

  const filteredCategories = categories.map((category) => ({
    ...category,
    resources: category.resources.filter(
      (resource) =>
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    ),
  })).filter((category) => category.resources.length > 0);

  return (
    <div className="min-h-screen bg-[var(--light-gray)] pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--dark-gray)] mb-4">
            分类导航
          </h1>
          <p className="text-[var(--text-gray)] max-w-2xl mx-auto">
            浏览我们精心整理的各类资源，快速找到你需要的工具
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-gray)]" />
            <input
              type="text"
              placeholder="搜索资源..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-[var(--medium-gray)] focus:border-[var(--orange)] focus:ring-2 focus:ring-[var(--orange)]/20 outline-none transition-all duration-300"
            />
          </div>
        </div>

        {/* Category Filter */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === null
                  ? 'bg-[var(--orange)] text-white'
                  : 'bg-white text-[var(--text-gray)] hover:bg-[var(--orange)]/10 hover:text-[var(--orange)]'
              }`}
            >
              全部
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[var(--orange)] text-white'
                    : 'bg-white text-[var(--text-gray)] hover:bg-[var(--orange)]/10 hover:text-[var(--orange)]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}

        {/* Categories Grid */}
        <div className="space-y-16">
          {filteredCategories
            .filter(
              (category) =>
                !activeCategory || category.id === activeCategory
            )
            .map((category) => (
              <div key={category.id} id={category.id}>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
                  >
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--dark-gray)]">
                      {category.label}
                    </h2>
                    <p className="text-sm text-[var(--text-gray)]">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.resources.map((resource) => (
                    <a
                      key={resource.name}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white rounded-xl p-5 border border-[var(--medium-gray)] hover:border-[var(--orange)]/30 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-[var(--dark-gray)] group-hover:text-[var(--orange)] transition-colors duration-300">
                          {resource.name}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-[var(--text-gray)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <p className="text-sm text-[var(--text-gray)] mb-3">
                        {resource.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {resource.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-[var(--light-gray)] text-xs text-[var(--text-gray)] rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[var(--text-gray)] text-lg">
              没有找到匹配的资源
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory(null);
              }}
              className="mt-4 text-[var(--orange)] hover:underline"
            >
              清除搜索
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
