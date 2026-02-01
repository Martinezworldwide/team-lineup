import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useAuth } from '../context/AuthContext'
import { tacticalEngine } from '../utils/tacticalEngine'
import { getPlayerStylesForRole } from '../data/playerStyleRecommendations'
import './FormationEditor.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Formation presets with position coordinates (normalized 0-1)
const FORMATIONS = {
  '4-4-2': [
    { id: 'gk', x: 0.5, y: 0.95, label: 'GK' },
    { id: 'lb', x: 0.2, y: 0.7, label: 'LB' },
    { id: 'cb1', x: 0.4, y: 0.75, label: 'CB' },
    { id: 'cb2', x: 0.6, y: 0.75, label: 'CB' },
    { id: 'rb', x: 0.8, y: 0.7, label: 'RB' },
    { id: 'lm', x: 0.2, y: 0.5, label: 'LM' },
    { id: 'cm1', x: 0.4, y: 0.5, label: 'CM' },
    { id: 'cm2', x: 0.6, y: 0.5, label: 'CM' },
    { id: 'rm', x: 0.8, y: 0.5, label: 'RM' },
    { id: 'st1', x: 0.4, y: 0.25, label: 'ST' },
    { id: 'st2', x: 0.6, y: 0.25, label: 'ST' }
  ],
  '4-3-3': [
    { id: 'gk', x: 0.5, y: 0.95, label: 'GK' },
    { id: 'lb', x: 0.2, y: 0.7, label: 'LB' },
    { id: 'cb1', x: 0.4, y: 0.75, label: 'CB' },
    { id: 'cb2', x: 0.6, y: 0.75, label: 'CB' },
    { id: 'rb', x: 0.8, y: 0.7, label: 'RB' },
    { id: 'cm1', x: 0.3, y: 0.5, label: 'CM' },
    { id: 'cm2', x: 0.5, y: 0.5, label: 'CM' },
    { id: 'cm3', x: 0.7, y: 0.5, label: 'CM' },
    { id: 'lw', x: 0.2, y: 0.25, label: 'LW' },
    { id: 'st', x: 0.5, y: 0.25, label: 'ST' },
    { id: 'rw', x: 0.8, y: 0.25, label: 'RW' }
  ],
  '4-2-3-1': [
    { id: 'gk', x: 0.5, y: 0.95, label: 'GK' },
    { id: 'lb', x: 0.2, y: 0.7, label: 'LB' },
    { id: 'cb1', x: 0.4, y: 0.75, label: 'CB' },
    { id: 'cb2', x: 0.6, y: 0.75, label: 'CB' },
    { id: 'rb', x: 0.8, y: 0.7, label: 'RB' },
    { id: 'cdm1', x: 0.4, y: 0.55, label: 'CDM' },
    { id: 'cdm2', x: 0.6, y: 0.55, label: 'CDM' },
    { id: 'cam', x: 0.5, y: 0.4, label: 'CAM' },
    { id: 'lw', x: 0.2, y: 0.35, label: 'LW' },
    { id: 'rw', x: 0.8, y: 0.35, label: 'RW' },
    { id: 'st', x: 0.5, y: 0.2, label: 'ST' }
  ],
  '3-5-2': [
    { id: 'gk', x: 0.5, y: 0.95, label: 'GK' },
    { id: 'cb1', x: 0.3, y: 0.75, label: 'CB' },
    { id: 'cb2', x: 0.5, y: 0.75, label: 'CB' },
    { id: 'cb3', x: 0.7, y: 0.75, label: 'CB' },
    { id: 'lm', x: 0.15, y: 0.5, label: 'LM' },
    { id: 'cm1', x: 0.35, y: 0.5, label: 'CM' },
    { id: 'cm2', x: 0.5, y: 0.5, label: 'CM' },
    { id: 'cm3', x: 0.65, y: 0.5, label: 'CM' },
    { id: 'rm', x: 0.85, y: 0.5, label: 'RM' },
    { id: 'st1', x: 0.4, y: 0.25, label: 'ST' },
    { id: 'st2', x: 0.6, y: 0.25, label: 'ST' }
  ]
}

const TACTICAL_STYLES = [
  { id: 'high-press', label: 'High Press' },
  { id: 'possession', label: 'Possession' },
  { id: 'low-block', label: 'Low Block' },
  { id: 'counter-attack', label: 'Counter Attack' },
  { id: 'wing-play', label: 'Wing Play' }
]

// Draggable player component
const DraggablePlayer = ({ player, onRemove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'player',
    item: { player },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  return (
    <div
      ref={drag}
      className={`draggable-player ${isDragging ? 'dragging' : ''}`}
    >
      <span>{player.name}</span>
      {onRemove && (
        <button className="remove-btn" onClick={() => onRemove(player.id)}>
          ×
        </button>
      )}
    </div>
  )
}

// Droppable position slot
const PositionSlot = ({ position, assignedPlayer, onDrop, onRemove }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'player',
    drop: (item) => {
      onDrop(position.id, item.player)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  return (
    <div
      ref={drop}
      className={`position-slot ${isOver ? 'over' : ''} ${assignedPlayer ? 'filled' : ''}`}
      style={{
        left: `${position.x * 100}%`,
        top: `${position.y * 100}%`
      }}
    >
      <div className="position-label">{position.label}</div>
      {assignedPlayer ? (
        <div className="assigned-player">
          <span>{assignedPlayer.name}</span>
          <button className="remove-btn" onClick={() => onRemove(position.id)}>
            ×
          </button>
        </div>
      ) : (
        <div className="empty-slot">Drop player</div>
      )}
    </div>
  )
}

const FormationEditor = () => {
  const { lineupId } = useParams()
  const navigate = useNavigate()
  const { getToken } = useAuth()
  
  const [players, setPlayers] = useState([])
  const [selectedFormation, setSelectedFormation] = useState('4-4-2')
  const [selectedStyle, setSelectedStyle] = useState('high-press')
  const [assignments, setAssignments] = useState({})
  const [lineup, setLineup] = useState(null)
  const [tacticalRoles, setTacticalRoles] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadData()
  }, [lineupId])

  useEffect(() => {
    // Recalculate tactical roles when formation, style, or assignments change
    if (selectedFormation && selectedStyle && Object.keys(assignments).length > 0) {
      const roles = tacticalEngine.interpretRoles(
        selectedFormation,
        selectedStyle,
        assignments
      )
      setTacticalRoles(roles)
    }
  }, [selectedFormation, selectedStyle, assignments])

  const loadData = async () => {
    try {
      const token = getToken()
      const [playersRes, lineupRes] = await Promise.all([
        fetch(`${API_URL}/api/data/players`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        lineupId ? fetch(`${API_URL}/api/data/lineups/${lineupId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }) : Promise.resolve(null)
      ])

      if (playersRes.ok) {
        const playersData = await playersRes.json()
        // Filter to only available players
        setPlayers(playersData.filter(p => p.available))
      }

      if (lineupRes && lineupRes.ok) {
        const lineupData = await lineupRes.json()
        setLineup(lineupData)
        setSelectedFormation(lineupData.formation || '4-4-2')
        setSelectedStyle(lineupData.tacticalStyle || 'high-press')
        setAssignments(lineupData.assignments || {})
      }
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (positionId, player) => {
    setAssignments(prev => ({
      ...prev,
      [positionId]: player
    }))
  }

  const handleRemove = (positionId) => {
    setAssignments(prev => {
      const newAssignments = { ...prev }
      delete newAssignments[positionId]
      return newAssignments
    })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = getToken()
      const lineupData = {
        id: lineupId || Date.now().toString(),
        name: lineup?.name || `Lineup ${new Date().toLocaleDateString()}`,
        formation: selectedFormation,
        tacticalStyle: selectedStyle,
        assignments,
        createdAt: lineup?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const method = lineupId ? 'PUT' : 'POST'
      const url = lineupId 
        ? `${API_URL}/api/data/lineups/${lineupId}`
        : `${API_URL}/api/data/lineups`

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(lineupData)
      })

      if (response.ok) {
        navigate('/dashboard')
      } else {
        alert('Failed to save lineup')
      }
    } catch (err) {
      alert('Failed to save lineup')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  const positions = FORMATIONS[selectedFormation] || []
  const availablePlayers = players.filter(
    p => !Object.values(assignments).some(ap => ap.id === p.id)
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="formation-editor">
        <header className="editor-header">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            ← Back
          </button>
          <h1>Formation Editor</h1>
          <button onClick={handleSave} disabled={saving} className="save-btn">
            {saving ? 'Saving...' : 'Save Lineup'}
          </button>
        </header>

        <div className="editor-content">
          <div className="editor-sidebar">
            <section className="sidebar-section">
              <h2>Formation</h2>
              <select
                value={selectedFormation}
                onChange={(e) => {
                  setSelectedFormation(e.target.value)
                  setAssignments({}) // Clear assignments on formation change
                }}
                className="formation-select"
              >
                {Object.keys(FORMATIONS).map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </section>

            <section className="sidebar-section">
              <h2>Tactical Style</h2>
              <div className="style-buttons">
                {TACTICAL_STYLES.map(style => (
                  <button
                    key={style.id}
                    className={`style-btn ${selectedStyle === style.id ? 'active' : ''}`}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="sidebar-section">
              <h2>Available Players</h2>
              <div className="players-list">
                {availablePlayers.length === 0 ? (
                  <p className="empty-message">All players assigned</p>
                ) : (
                  availablePlayers.map(player => (
                    <DraggablePlayer key={player.id} player={player} />
                  ))
                )}
              </div>
            </section>
          </div>

          <div className="editor-main">
            <div className="pitch-container">
              <div className="pitch">
                {positions.map(position => (
                  <PositionSlot
                    key={position.id}
                    position={position}
                    assignedPlayer={assignments[position.id]}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </div>

            {Object.keys(tacticalRoles).length > 0 && (
              <div className="tactical-roles-panel">
                <h2>Tactical Roles & Instructions</h2>
                <div className="roles-list">
                  {Object.entries(tacticalRoles).map(([positionId, role]) => {
                    const assignedPlayer = assignments[positionId]
                    if (!assignedPlayer) return null

                    return (
                      <div key={positionId} className="role-card">
                        <div className="role-header">
                          <h3>{assignedPlayer.name}</h3>
                          <span className="role-name">{role.name}</span>
                        </div>
                        <p className="role-description">{role.description}</p>
                        {role.youtubeLinks && role.youtubeLinks.length > 0 && (
                          <div className="youtube-links">
                            <h4>Educational Videos</h4>
                            <ul>
                              {role.youtubeLinks.map((link, idx) => (
                                <li key={idx}>
                                  <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {link.title}
                                  </a>
                                  {link.focus && (
                                    <span className="focus-note"> — {link.focus}</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {(() => {
                          const playerStyles = getPlayerStylesForRole(positionId, role.name, selectedStyle)
                          if (playerStyles.length === 0) return null
                          return (
                            <div className="player-style-recommendations">
                              <h4>Play like these players</h4>
                              <p className="player-style-intro">Watch highlights to replicate their style for this role.</p>
                              <ul className="player-style-list">
                                {playerStyles.map((p, idx) => (
                                  <li key={idx} className="player-style-item">
                                    <a
                                      href={p.youtubeUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="player-style-link"
                                    >
                                      <span className="player-name">{p.playerName}</span>
                                      <span className="player-video-title">{p.videoTitle}</span>
                                    </a>
                                    {p.focus && (
                                      <span className="player-focus">{p.focus}</span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        })()}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default FormationEditor
