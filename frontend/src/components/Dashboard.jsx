import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const Dashboard = () => {
  const { user, logout, getToken } = useAuth()
  const navigate = useNavigate()
  const [players, setPlayers] = useState([])
  const [lineups, setLineups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const token = getToken()
      const [playersRes, lineupsRes] = await Promise.all([
        fetch(`${API_URL}/api/data/players`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/api/data/lineups`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      if (playersRes.ok) {
        const playersData = await playersRes.json()
        setPlayers(playersData)
      }

      if (lineupsRes.ok) {
        const lineupsData = await lineupsRes.json()
        setLineups(lineupsData)
      }
    } catch (err) {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateLineup = () => {
    navigate('/formation')
  }

  const handleEditLineup = (lineupId) => {
    navigate(`/formation/${lineupId}`)
  }

  const handleMarkAvailability = async (playerId, available) => {
    try {
      const token = getToken()
      const response = await fetch(`${API_URL}/api/data/players`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          id: playerId,
          available
        })
      })

      if (response.ok) {
        await loadData()
      }
    } catch (err) {
      setError('Failed to update availability')
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Team Lineup Board</h1>
        <div className="header-actions">
          <span className="user-name">{user?.username}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        {error && <div className="error-banner">{error}</div>}

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Players</h2>
            <span className="section-subtitle">Mark your availability</span>
          </div>
          <div className="players-grid">
            {players.map(player => (
              <div key={player.id} className="player-card">
                <div className="player-info">
                  <h3>{player.name}</h3>
                  <p className="player-position">{player.position}</p>
                </div>
                <div className="availability-toggle">
                  <button
                    className={player.available ? 'available' : 'unavailable'}
                    onClick={() => handleMarkAvailability(player.id, !player.available)}
                  >
                    {player.available ? '✓ Available' : '✗ Unavailable'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Lineups</h2>
            <button onClick={handleCreateLineup} className="create-btn">
              Create New Lineup
            </button>
          </div>
          <div className="lineups-list">
            {lineups.length === 0 ? (
              <p className="empty-state">No lineups yet. Create your first lineup!</p>
            ) : (
              lineups.map(lineup => (
                <div key={lineup.id} className="lineup-card">
                  <div className="lineup-info">
                    <h3>{lineup.name || `Lineup ${lineup.id}`}</h3>
                    <p className="lineup-meta">
                      Formation: {lineup.formation} | Style: {lineup.tacticalStyle}
                    </p>
                    <p className="lineup-date">
                      Created: {new Date(lineup.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEditLineup(lineup.id)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
