import './Sidebar.css'

const menuData = [
  {
    id: 'design-system',
    label: 'Design system',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    children: [
      {
        id: 'flame',
        label: 'Flame Design System',
        color: '#F97316',
        icon: '🔥',
        active: true,
        children: [
          { id: 'visao-geral', label: 'Visão geral' },
          { id: 'equipes', label: 'Equipes' },
          { id: 'projetos', label: 'Projetos', active: true },
        ],
      },
      {
        id: 'security',
        label: 'Security Design System',
        color: '#3B82F6',
        icon: '🛡️',
        children: [],
      },
      {
        id: 'health',
        label: 'Health Design System',
        color: '#22C55E',
        icon: '💚',
        children: [],
      },
    ],
  },
  {
    id: 'estrutura',
    label: 'Estrutura da organização',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <path d="M12 7v4M12 11l-5 6M12 11l5 6" />
      </svg>
    ),
  },
  {
    id: 'colaboradores',
    label: 'Colaboradores',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#logoGradient)" />
            <path d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="16" cy="16" r="3" fill="white" />
            <defs>
              <linearGradient id="logoGradient" x1="0" y1="0" x2="32" y2="32">
                <stop stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <nav className="sidebar__nav">
        <p className="sidebar__section-title">Menu</p>

        {menuData.map((item) => (
          <div key={item.id} className="sidebar__group">
            <div className="sidebar__item sidebar__item--parent">
              <span className="sidebar__item-icon">{item.icon}</span>
              <span className="sidebar__item-label">{item.label}</span>
              {item.children && (
                <svg className="sidebar__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              )}
            </div>

            {item.children?.map((child) => (
              <div key={child.id} className={`sidebar__subgroup ${child.active ? 'sidebar__subgroup--active' : ''}`}>
                <div className={`sidebar__item sidebar__item--child ${child.active ? 'sidebar__item--active-parent' : ''}`}>
                  <span className="sidebar__ds-icon" style={{ background: child.color + '22', color: child.color }}>
                    {child.icon}
                  </span>
                  <span className="sidebar__item-label">{child.label}</span>
                  <svg className="sidebar__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                {child.active && child.children?.map((sub) => (
                  <div key={sub.id} className={`sidebar__item sidebar__item--sub ${sub.active ? 'sidebar__item--active' : ''}`}>
                    <span className="sidebar__item-label">{sub.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
