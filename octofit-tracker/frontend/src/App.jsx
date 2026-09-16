import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
      <div className="app-shell">
        <header className="app-header">
          <NavLink className="brand" to="/users">
            <span className="brand-mark">OF</span>
            <span><strong>OctoFit</strong><small>Training collective</small></span>
          </NavLink>
          <nav className="app-nav" aria-label="Main navigation">
            <NavLink to="/users">People</NavLink>
            <NavLink to="/activities">Activities</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
          </nav>
          <span className="status-dot" title="API connection configured">Live</span>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
        <footer className="app-footer">OctoFit Tracker <span>|</span> Move with intent</footer>
        </div>
      )
}

export default App
