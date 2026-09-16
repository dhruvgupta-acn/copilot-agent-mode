import { useResource } from '../api.js'
import { PageIntro, ResourceState } from './ResourceState.jsx'

function Activities() {
  const { data, loading, error } = useResource('/api/activities/')
  return <section><PageIntro eyebrow="Recent movement" title="Activity log" description="Every session counts. Keep an eye on the rhythm, not just the result." count={data.length} /><ResourceState loading={loading} error={error}><div className="table-wrap"><table><thead><tr><th>Session</th><th>Type</th><th>Duration</th><th>Distance</th><th>Points</th></tr></thead><tbody>{data.map((activity) => <tr key={activity._id}><td><strong>{activity.title}</strong><small>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Unscheduled'}</small></td><td><span className="tag">{activity.type}</span></td><td>{activity.durationMinutes} min</td><td>{activity.distanceKm ? `${activity.distanceKm} km` : '—'}</td><td className="points">+{activity.points}</td></tr>)}</tbody></table></div></ResourceState></section>
}

export default Activities