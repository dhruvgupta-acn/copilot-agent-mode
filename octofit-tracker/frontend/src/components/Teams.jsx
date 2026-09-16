import { useResource } from '../api.js'
import { PageIntro, ResourceState } from './ResourceState.jsx'

function Teams() {
  const { data, loading, error } = useResource('teams')
  return <section><PageIntro eyebrow="Find your pace" title="Teams" description="Small groups make the next session easier to start." count={data.length} /><ResourceState loading={loading} error={error}><div className="team-grid">{data.map((team) => <article className="team-card" key={team._id}><div className="team-number">{String(team.name || 'T').slice(0, 1)}</div><h2>{team.name}</h2><p>{team.description}</p><footer><span>{team.members?.length ?? 0} members</span><strong>{team.totalPoints ?? 0} pts</strong></footer></article>)}</div></ResourceState></section>
}

export default Teams