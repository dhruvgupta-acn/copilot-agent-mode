import { useResource } from '../api.js'
import { PageIntro, ResourceState } from './ResourceState.jsx'

function Users() {
  const { data, loading, error } = useResource('users')
  return <section><PageIntro eyebrow="The collective" title="People who show up" description="A quick read on the athletes building consistency together." count={data.length} /><ResourceState loading={loading} error={error}><div className="profile-grid">{data.map((user) => <article className="profile-card" key={user._id}><div className="avatar">{user.name?.split(' ').map((part) => part[0]).join('')}</div><div><h2>{user.name}</h2><p>{user.email}</p></div><strong>{user.points ?? 0}<small> pts</small></strong></article>)}</div></ResourceState></section>
}

export default Users