import { useResource } from '../api.js'
import { PageIntro, ResourceState } from './ResourceState.jsx'

function Leaderboard() {
  const { data, loading, error } = useResource('/api/leaderboard/')
  const sorted = [...data].sort((left, right) => (left.rank ?? 999) - (right.rank ?? 999))
  return <section><PageIntro eyebrow="The weekly climb" title="Leaderboard" description="A little friendly pressure for the people who like a visible target." count={data.length} /><ResourceState loading={loading} error={error}><div className="leaderboard-list">{sorted.map((entry, index) => <article className={`leader-row rank-${entry.rank || index + 1}`} key={entry._id}><span className="rank">{entry.rank || index + 1}</span><div><h2>{entry.user?.name || entry.user || 'Athlete'}</h2><small>{entry.team?.name || entry.team || 'Independent'}</small></div><strong>{entry.points}<small> pts</small></strong></article>)}</div></ResourceState></section>
}

export default Leaderboard