import { useResource } from '../api.js'
import { PageIntro, ResourceState } from './ResourceState.jsx'

function Workouts() {
  const { data, loading, error } = useResource('workouts')
  return <section><PageIntro eyebrow="Your next session" title="Workout library" description="Thoughtful sessions for wherever your energy is today." count={data.length} /><ResourceState loading={loading} error={error}><div className="workout-grid">{data.map((workout) => <article className="workout-card" key={workout._id}><div className="workout-meta"><span className="tag">{workout.category}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><ul>{(workout.exercises || []).slice(0, 3).map((exercise) => <li key={exercise.name}>{exercise.name}</li>)}</ul><footer><span>{workout.difficulty}</span><button type="button" aria-label={`Start ${workout.title}`}>Start <span aria-hidden="true">-&gt;</span></button></footer></article>)}</div></ResourceState></section>
}

export default Workouts