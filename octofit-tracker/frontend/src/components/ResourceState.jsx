export function ResourceState({ loading, error, children }) {
  if (loading) return <p className="resource-message">Loading your data...</p>
  if (error) return <p className="resource-message error-message">{error}</p>
  return children
}

export function PageIntro({ eyebrow, title, description, count }) {
  return (
    <div className="page-intro">
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-description">{description}</p></div>
      {count !== undefined && <span className="record-count">{count} records</span>}
    </div>
  )
}