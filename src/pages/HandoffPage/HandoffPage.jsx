import { useState } from 'react'
import './HandoffPage.css'

// ── Mock Data ──────────────────────────────────────────────────────────────────

const mockStats = [
  { label: 'Aderência', value: '100%' },
  { label: 'Total de telas', value: '3' },
  { label: 'Total de erros', value: '0' },
  { label: 'Último scan realizado', value: '06/01/26 às 17:30', large: true },
]

const mockFrames = [
  { id: 1, name: 'Frame 1', adherence: '100%', errors: 0, status: 100, date: '18/06/2025 às 17h26' },
  { id: 2, name: 'Frame 2', adherence: '100%', errors: 0, status: 100, date: '18/06/2025 às 17h26' },
  { id: 3, name: 'Frame 3', adherence: '100%', errors: 0, status: 100, date: '18/06/2025 às 17h26' },
]

const mockComponents = [
  {
    id: 1,
    name: 'Button',
    designSystem: 'Design System Portal',
    compatible: true,
    expanded: false,
    details: null,
  },
  {
    id: 2,
    name: 'Input-password',
    designSystem: 'Design System Portal',
    compatible: false,
    expanded: false,
    details: {
      problem: 'Padding inferior 4px fora\ndo token padrão (8px)',
      accessibility: 'Contraste de placeholder abaixo do mínimo (2.9:1)',
      violations: 2,
      suggestion: 'Usar Input DS v3 com token spacing-md',
    },
  },
  {
    id: 3,
    name: 'Accordion',
    designSystem: 'Design System Portal',
    compatible: false,
    expanded: true,
    details: {
      problem: 'Padding inferior 4px fora\ndo token padrão (8px)',
      accessibility: 'Contraste de placeholder abaixo do mínimo (2.9:1)',
      violations: 2,
      suggestion: 'Usar Input DS v3 com token spacing-md',
    },
  },
]

// ── Sub-components ─────────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <div className="breadcrumb">
      <span className="breadcrumb__home">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
          <path d="M9 21V12h6v9" />
        </svg>
      </span>
      <span className="breadcrumb__sep">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
      </span>
      <span className="breadcrumb__item">...</span>
      <span className="breadcrumb__sep">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
      </span>
      <span className="breadcrumb__item">[Cartão adicional] Form</span>
      <span className="breadcrumb__sep">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
      </span>
      <span className="breadcrumb__item breadcrumb__item--active">✅ - Handoff</span>
    </div>
  )
}

function StatsCard({ label, value, large }) {
  return (
    <div className={`stats-card ${large ? 'stats-card--large' : ''}`}>
      <p className="stats-card__label">{label}</p>
      <p className="stats-card__value">{value}</p>
    </div>
  )
}

function StatusBar({ value }) {
  return (
    <div className="status-bar">
      <div className="status-bar__track">
        <div className="status-bar__fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function SortIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 4, verticalAlign: 'middle', opacity: 0.5 }}>
      <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
    </svg>
  )
}

function Pagination() {
  return (
    <div className="pagination">
      <span className="pagination__label">Itens por página:</span>
      <div className="pagination__select">
        <span>10</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <span className="pagination__dot">·</span>
      <span className="pagination__info">1-3 de 3 Itens</span>
      <button className="pagination__btn" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button className="pagination__btn" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  )
}

function AdherenceTable() {
  return (
    <section className="section">
      <h2 className="section__title">Aderência e conformidade por tela</h2>
      <p className="section__description">
        Monitore o nível de fidelidade das telas ao Design System e identifique desvios de implementação em cada entrega.
      </p>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Tela <SortIcon /></th>
              <th>% Aderência <SortIcon /></th>
              <th>Erros <SortIcon /></th>
              <th>Status <SortIcon /></th>
              <th>Data <SortIcon /></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mockFrames.map((frame) => (
              <tr key={frame.id}>
                <td><strong>{frame.name}</strong></td>
                <td>{frame.adherence}</td>
                <td>{frame.errors}</td>
                <td><StatusBar value={frame.status} /></td>
                <td className="table__date">{frame.date}</td>
                <td><a href="#" className="table__link">Ver tela</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </section>
  )
}

function ComponentRow({ component, onToggle }) {
  return (
    <>
      <tr className={component.expanded ? 'table__row--expanded-parent' : ''}>
        <td>
          <span className={component.compatible ? '' : 'table__name--link'}>{component.name}</span>
        </td>
        <td className="table__ds-link">{component.designSystem}</td>
        <td>
          {component.compatible ? (
            <span className="badge badge--compatible">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
              Compatível
            </span>
          ) : (
            <span className="badge badge--incompatible">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              Não compatível
            </span>
          )}
        </td>
        <td><a href="#" className="table__link">Link do Figma</a></td>
        <td>
          {component.details && (
            <button className="expand-btn" onClick={() => onToggle(component.id)}>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ transform: component.expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          )}
        </td>
      </tr>

      {component.expanded && component.details && (
        <tr className="table__expanded-row">
          <td colSpan={5}>
            <div className="expanded-details">
              <div className="expanded-details__col">
                <p className="expanded-details__label">Problema detectado</p>
                <p className="expanded-details__value">{component.details.problem}</p>
              </div>
              <div className="expanded-details__col">
                <p className="expanded-details__label">Acessibilidade</p>
                <p className="expanded-details__value">{component.details.accessibility}</p>
              </div>
              <div className="expanded-details__col expanded-details__col--center">
                <p className="expanded-details__label">Violações</p>
                <p className="expanded-details__value expanded-details__violations">{component.details.violations}</p>
              </div>
              <div className="expanded-details__col">
                <p className="expanded-details__label">Sugestão</p>
                <p className="expanded-details__value">{component.details.suggestion}</p>
              </div>
              <div className="expanded-details__action">
                <button className="btn-fix">Corrigir</button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

function InspectionSection() {
  const [activeTab, setActiveTab] = useState('descricao')
  const [activeSubTab, setActiveSubTab] = useState('componentes')
  const [components, setComponents] = useState(mockComponents)

  const toggleExpand = (id) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, expanded: !c.expanded } : c))
    )
  }

  return (
    <section className="section section--inspection">
      <div className="section__header-row">
        <div>
          <h2 className="section__title">Inspeção dos componentes na tela</h2>
          <p className="section__description">
            Visualize os componentes detectados pelo scan e identifique rapidamente quais elementos estão<br />
            em conformidade ou apresentam divergências com o Design System.
          </p>
        </div>
        <div className="tab-group">
          <button
            className={`tab-btn ${activeTab === 'graficos' ? '' : ''}`}
            onClick={() => setActiveTab('graficos')}
          >
            Gráficos
          </button>
          <button
            className={`tab-btn tab-btn--active ${activeTab === 'descricao' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('descricao')}
          >
            Descrição
          </button>
        </div>
      </div>

      <div className="inspection-card">
        <div className="inspection-card__header">
          <span className="inspection-card__frame-name">Frame 1</span>
          <a href="#" className="inspection-card__figma-link">Link do figma</a>
        </div>

        <div className="sub-tabs">
          <button
            className={`sub-tab ${activeSubTab === 'componentes' ? 'sub-tab--active' : ''}`}
            onClick={() => setActiveSubTab('componentes')}
          >
            Componentes
          </button>
          <button
            className={`sub-tab ${activeSubTab === 'variaveis' ? 'sub-tab--active' : ''}`}
            onClick={() => setActiveSubTab('variaveis')}
          >
            Variáveis
          </button>
        </div>

        <div className="inspection-body">
          <div className="inspection-table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Componentes <SortIcon /></th>
                  <th>Design system <SortIcon /></th>
                  <th>Status <SortIcon /></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {components.map((comp) => (
                  <ComponentRow key={comp.id} component={comp} onToggle={toggleExpand} />
                ))}
              </tbody>
            </table>

            <Pagination />
          </div>

          <div className="inspection-preview">
            <div className="phone-mockup">
              <div className="phone-mockup__screen">
                <div className="phone-mockup__topbar">
                  <div className="phone-mockup__notch" />
                  <div className="phone-mockup__status">
                    <span>9:30</span>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <div className="phone-mockup__icon" />
                      <div className="phone-mockup__icon" />
                      <div className="phone-mockup__icon" />
                    </div>
                  </div>
                </div>
                <div className="phone-mockup__content">
                  <div className="phone-mockup__header-bar">
                    <div className="phone-mockup__back" />
                    <div className="phone-mockup__title-bar" />
                    <div className="phone-mockup__close" />
                  </div>
                  <div className="phone-mockup__card highlighted">
                    <div className="phone-mockup__label" />
                    <div className="phone-mockup__value-bar" />
                  </div>
                  <div className="phone-mockup__label-row">
                    <div className="phone-mockup__chip highlighted" />
                    <div className="phone-mockup__chip highlighted" />
                    <div className="phone-mockup__chip highlighted" />
                  </div>
                  <div className="phone-mockup__input highlighted">
                    <div className="phone-mockup__input-text" />
                  </div>
                  <div className="phone-mockup__row">
                    <div className="phone-mockup__img-block highlighted" />
                    <div className="phone-mockup__img-block highlighted" />
                  </div>
                  <div className="phone-mockup__btn-row">
                    <div className="phone-mockup__btn highlighted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function HandoffPage() {
  return (
    <div className="handoff-page">
      {/* Top Bar */}
      <header className="topbar">
        <Breadcrumb />
        <div className="topbar__avatar">A</div>
      </header>

      {/* Page Header */}
      <div className="page-header">
        <button className="page-header__back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div>
          <h1 className="page-header__title">✅ - Handoff</h1>
          <p className="page-header__subtitle">... • Cartão adicional • [Cartão adicional] Form</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {mockStats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      {/* Adherence Table */}
      <AdherenceTable />

      {/* Inspection Section */}
      <InspectionSection />
    </div>
  )
}
