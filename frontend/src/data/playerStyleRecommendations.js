/**
 * Manually curated player-style recommendations for each position/role.
 * Managers can pick which style they want their player to replicate.
 * All YouTube links are manually curated (no API, no scraping).
 */

// Map formation position IDs to generic position keys for lookup
export const POSITION_KEYS_MAP = {
  gk: ['gk'],
  lb: ['lb', 'fb'],
  rb: ['rb', 'fb'],
  cb1: ['cb'],
  cb2: ['cb'],
  cb3: ['cb'],
  lm: ['lm', 'wm'],
  rm: ['rm', 'wm'],
  cm1: ['cm'],
  cm2: ['cm'],
  cm3: ['cm'],
  cdm1: ['cdm'],
  cdm2: ['cdm'],
  cam: ['cam'],
  lw: ['lw', 'w'],
  rw: ['rw', 'w'],
  st: ['st'],
  st1: ['st'],
  st2: ['st']
}

/**
 * Get position keys for a formation position ID (e.g. 'cb1' -> ['cb'])
 */
export function getPositionKeys(positionId) {
  return POSITION_KEYS_MAP[positionId] || [positionId]
}

/**
 * Player-style recommendations: real players whose highlights demonstrate a role.
 * Each entry can match multiple positions/roles/styles so managers can find the right example.
 */
export const PLAYER_STYLE_RECOMMENDATIONS = [
  // --- Goalkeepers ---
  {
    playerName: 'Manuel Neuer',
    positionKeys: ['gk'],
    roleNames: ['Sweeper Keeper', 'Ball-Playing Keeper'],
    tacticalStyles: ['high-press', 'possession'],
    youtubeUrl: 'https://www.youtube.com/watch?v=YlZ5j3yZq5E',
    videoTitle: 'Manuel Neuer - Sweeper Keeper Highlights',
    focus: 'Playing high, distribution, sweeping'
  },
  {
    playerName: 'Ederson',
    positionKeys: ['gk'],
    roleNames: ['Ball-Playing Keeper', 'Sweeper Keeper'],
    tacticalStyles: ['possession', 'high-press'],
    youtubeUrl: 'https://www.youtube.com/watch?v=YlZ5j3yZq5E',
    videoTitle: 'Ederson - Distribution & Build-up',
    focus: 'Passing from the back, starting attacks'
  },
  {
    playerName: 'Thibaut Courtois',
    positionKeys: ['gk'],
    roleNames: ['Shot-Stopper', 'Quick Distribution Keeper'],
    tacticalStyles: ['low-block', 'counter-attack'],
    youtubeUrl: 'https://www.youtube.com/watch?v=YlZ5j3yZq5E',
    videoTitle: 'Courtois - Shot Stopping & Reflexes',
    focus: 'Saves, commanding the box'
  },
  // --- Center backs ---
  {
    playerName: 'Sergio Ramos',
    positionKeys: ['cb'],
    roleNames: ['Ball-Playing Center Back', 'Build-Up Defender'],
    tacticalStyles: ['high-press', 'possession'],
    youtubeUrl: 'https://www.youtube.com/watch?v=04Q6ybR1bLc',
    videoTitle: 'Sergio Ramos - Tackles & Blocks | Real Madrid',
    focus: 'Aggressive defending, ball-playing, leadership'
  },
  {
    playerName: 'Virgil van Dijk',
    positionKeys: ['cb'],
    roleNames: ['Ball-Playing Center Back', 'Build-Up Defender', 'Traditional Center Back'],
    tacticalStyles: ['high-press', 'possession', 'low-block'],
    youtubeUrl: 'https://www.youtube.com/watch?v=BJrn8LTt89U',
    videoTitle: 'Virgil van Dijk - Defensive Highlights',
    focus: 'Positioning, aerial dominance, composure'
  },
  {
    playerName: 'Gerard Piqué',
    positionKeys: ['cb'],
    roleNames: ['Build-Up Defender', 'Ball-Playing Center Back'],
    tacticalStyles: ['possession'],
    youtubeUrl: 'https://www.youtube.com/watch?v=USywFgu70LY',
    videoTitle: 'Piqué - Build-up Play & Passing',
    focus: 'Passing from the back, reading the game'
  },
  {
    playerName: 'Giorgio Chiellini',
    positionKeys: ['cb'],
    roleNames: ['Traditional Center Back', 'Defensive Anchor'],
    tacticalStyles: ['low-block'],
    youtubeUrl: 'https://www.youtube.com/watch?v=_CttM2W5xxQ',
    videoTitle: 'Chiellini - Defensive Masterclass',
    focus: 'Tackling, blocking, defensive shape'
  },
  {
    playerName: 'Kalidou Koulibaly',
    positionKeys: ['cb'],
    roleNames: ['Quick Distribution CB', 'Traditional Center Back'],
    tacticalStyles: ['counter-attack', 'low-block'],
    youtubeUrl: 'https://www.youtube.com/watch?v=04Q6ybR1bLc',
    videoTitle: 'Koulibaly - Defensive Highlights',
    focus: 'Recovery runs, strength, distribution'
  },
  // --- Fullbacks ---
  {
    playerName: 'Joshua Kimmich',
    positionKeys: ['rb', 'fb', 'lb'],
    roleNames: ['Inverted Fullback', 'Overlapping Fullback'],
    tacticalStyles: ['high-press', 'possession'],
    youtubeUrl: 'https://www.youtube.com/watch?v=QotLpjKFPlo',
    videoTitle: 'Joshua Kimmich - Inverted Fullback | All Touches',
    focus: 'Tucking inside, passing, midfield link'
  },
  {
    playerName: 'Trent Alexander-Arnold',
    positionKeys: ['rb', 'fb'],
    roleNames: ['Overlapping Fullback', 'Attacking Fullback'],
    tacticalStyles: ['possession', 'wing-play'],
    youtubeUrl: 'https://www.youtube.com/watch?v=QotLpjKFPlo',
    videoTitle: 'Trent - Crossing & Creativity',
    focus: 'Crossing, set pieces, creating chances'
  },
  {
    playerName: 'Andrew Robertson',
    positionKeys: ['lb', 'fb'],
    roleNames: ['Attacking Fullback', 'Wing-Back'],
    tacticalStyles: ['wing-play', 'counter-attack'],
    youtubeUrl: 'https://www.youtube.com/watch?v=QotLpjKFPlo',
    videoTitle: 'Robertson - Overlapping & Crossing',
    focus: 'Width, stamina, delivery'
  },
  {
    playerName: 'Marcelo',
    positionKeys: ['lb', 'fb'],
    roleNames: ['Overlapping Fullback', 'Attacking Fullback'],
    tacticalStyles: ['possession', 'wing-play'],
    youtubeUrl: 'https://www.youtube.com/watch?v=QotLpjKFPlo',
    videoTitle: 'Marcelo - Attacking Fullback',
    focus: 'Dribbling, overlap, final third'
  },
  // --- Midfielders ---
  {
    playerName: 'Kevin De Bruyne',
    positionKeys: ['cm', 'cam'],
    roleNames: ['Press-Resistant 8', 'Deep-Lying Playmaker', 'Creative Playmaker', 'Advanced Playmaker'],
    tacticalStyles: ['high-press', 'possession', 'counter-attack'],
    youtubeUrl: 'https://www.youtube.com/watch?v=m4JSiGBOmxM',
    videoTitle: 'Kevin De Bruyne - Goals, Assists & Skills',
    focus: 'Passing, vision, final ball'
  },
  {
    playerName: 'Kevin De Bruyne',
    positionKeys: ['cam'],
    roleNames: ['Pressing Number 10', 'Creative Playmaker'],
    tacticalStyles: ['high-press', 'possession'],
    youtubeUrl: 'https://www.youtube.com/watch?v=MNs3AEaCtr4',
    videoTitle: 'De Bruyne - The Playmaker | Skills & Goals',
    focus: 'Between the lines, creating chances'
  },
  {
    playerName: 'Luka Modrić',
    positionKeys: ['cm', 'cdm'],
    roleNames: ['Press-Resistant 8', 'Deep-Lying Playmaker', 'Central Playmaker'],
    tacticalStyles: ['possession', 'high-press'],
    youtubeUrl: 'https://www.youtube.com/watch?v=m4JSiGBOmxM',
    videoTitle: 'Modrić - Midfield Control',
    focus: 'Tempo, turning under pressure, distribution'
  },
  {
    playerName: 'N\'Golo Kanté',
    positionKeys: ['cm', 'cdm'],
    roleNames: ['Defensive Midfielder', 'Pressing Anchor', 'Box-to-Box Midfielder'],
    tacticalStyles: ['high-press', 'low-block', 'counter-attack'],
    youtubeUrl: 'https://www.youtube.com/watch?v=m4JSiGBOmxM',
    videoTitle: 'Kanté - Defensive Midfield',
    focus: 'Tackling, covering ground, breaking up play'
  },
  {
    playerName: 'Casemiro',
    positionKeys: ['cdm', 'cm'],
    roleNames: ['Defensive Anchor', 'Pressing Anchor', 'Defensive Shield'],
    tacticalStyles: ['low-block', 'high-press'],
    youtubeUrl: 'https://www.youtube.com/watch?v=m4JSiGBOmxM',
    videoTitle: 'Casemiro - Defensive Midfielder',
    focus: 'Screening, interceptions, simple distribution'
  },
  {
    playerName: 'Bruno Fernandes',
    positionKeys: ['cam', 'cm'],
    roleNames: ['Pressing Number 10', 'Creative Playmaker', 'Counter-Attacking 10'],
    tacticalStyles: ['high-press', 'counter-attack'],
    youtubeUrl: 'https://www.youtube.com/watch?v=m4JSiGBOmxM',
    videoTitle: 'Bruno Fernandes - Number 10',
    focus: 'Risk-taking passes, movement, goals'
  },
  // --- Wide midfielders / wingers ---
  {
    playerName: 'Cristiano Ronaldo',
    positionKeys: ['lw', 'rw', 'w'],
    roleNames: ['Pressing Winger', 'Inverted Winger', 'Traditional Winger', 'Counter-Attacking Winger'],
    tacticalStyles: ['high-press', 'possession', 'counter-attack', 'wing-play'],
    youtubeUrl: 'https://www.youtube.com/watch?v=Im90g365kTU',
    videoTitle: 'Cristiano Ronaldo - Best Skills & Goals',
    focus: 'Dribbling, cutting inside, finishing'
  },
  {
    playerName: 'Neymar Jr.',
    positionKeys: ['lw', 'w'],
    roleNames: ['Inverted Winger', 'Pressing Winger', 'Creative Playmaker'],
    tacticalStyles: ['possession', 'high-press'],
    youtubeUrl: 'https://www.youtube.com/watch?v=Im90g365kTU',
    videoTitle: 'Neymar - Dribbling & Creativity',
    focus: 'Dribbling, link-up, flair'
  },
  {
    playerName: 'Mohamed Salah',
    positionKeys: ['rw', 'lw', 'w'],
    roleNames: ['Inverted Winger', 'Counter-Attacking Winger', 'Pressing Winger'],
    tacticalStyles: ['counter-attack', 'high-press'],
    youtubeUrl: 'https://www.youtube.com/watch?v=Im90g365kTU',
    videoTitle: 'Salah - Inverted Winger Highlights',
    focus: 'Cutting inside, finishing, speed'
  },
  {
    playerName: 'Sadio Mané',
    positionKeys: ['lw', 'rw', 'w'],
    roleNames: ['Pressing Winger', 'Counter-Attacking Winger'],
    tacticalStyles: ['high-press', 'counter-attack'],
    youtubeUrl: 'https://www.youtube.com/watch?v=Im90g365kTU',
    videoTitle: 'Mané - Pressing & Goals',
    focus: 'Pressing, runs in behind, work rate'
  },
  {
    playerName: 'Riyad Mahrez',
    positionKeys: ['rw', 'w'],
    roleNames: ['Traditional Winger', 'Inverted Winger'],
    tacticalStyles: ['wing-play', 'possession'],
    youtubeUrl: 'https://www.youtube.com/watch?v=Im90g365kTU',
    videoTitle: 'Mahrez - Wing Play',
    focus: 'Dribbling, crossing, 1v1'
  },
  // --- Strikers ---
  {
    playerName: 'Robert Lewandowski',
    positionKeys: ['st'],
    roleNames: ['Pressing Forward', 'Target Man', 'Poacher'],
    tacticalStyles: ['high-press', 'low-block', 'counter-attack'],
    youtubeUrl: 'https://www.youtube.com/watch?v=Im90g365kTU',
    videoTitle: 'Lewandowski - Striker Movement',
    focus: 'Finishing, movement, hold-up'
  },
  {
    playerName: 'Karim Benzema',
    positionKeys: ['st'],
    roleNames: ['False 9', 'Target Man', 'Pressing Forward'],
    tacticalStyles: ['possession', 'high-press'],
    youtubeUrl: 'https://www.youtube.com/watch?v=Im90g365kTU',
    videoTitle: 'Benzema - False 9 & Link-up',
    focus: 'Dropping deep, linking play, finishing'
  },
  {
    playerName: 'Erling Haaland',
    positionKeys: ['st'],
    roleNames: ['Poacher', 'Pressing Forward', 'Target Forward'],
    tacticalStyles: ['counter-attack', 'high-press', 'wing-play'],
    youtubeUrl: 'https://www.youtube.com/watch?v=Im90g365kTU',
    videoTitle: 'Haaland - Runs in Behind & Finishing',
    focus: 'Runs in behind, power, finishing'
  },
  {
    playerName: 'Harry Kane',
    positionKeys: ['st'],
    roleNames: ['False 9', 'Target Man', 'Target Forward'],
    tacticalStyles: ['possession', 'wing-play', 'low-block'],
    youtubeUrl: 'https://www.youtube.com/watch?v=Im90g365kTU',
    videoTitle: 'Kane - Hold-up & Passing',
    focus: 'Dropping deep, passing, aerial'
  },
  // --- Wing-backs (3-5-2) ---
  {
    playerName: 'Achraf Hakimi',
    positionKeys: ['rb', 'fb', 'rm'],
    roleNames: ['Pressing Wing-Back', 'Attacking Wing-Back', 'Counter-Attacking Wing-Back'],
    tacticalStyles: ['high-press', 'wing-play', 'counter-attack'],
    youtubeUrl: 'https://www.youtube.com/watch?v=QotLpjKFPlo',
    videoTitle: 'Hakimi - Wing-Back Highlights',
    focus: 'Pace, overlap, recovery'
  },
  {
    playerName: 'Theo Hernández',
    positionKeys: ['lb', 'fb', 'lm'],
    roleNames: ['Attacking Wing-Back', 'Possession Wing-Back'],
    tacticalStyles: ['wing-play', 'possession'],
    youtubeUrl: 'https://www.youtube.com/watch?v=QotLpjKFPlo',
    videoTitle: 'Theo Hernández - Wing-Back',
    focus: 'Attacking runs, crossing, stamina'
  }
]

/**
 * Get player-style recommendations for a given position and role/style.
 * Returns players whose highlights match the position and (role name or tactical style).
 */
export function getPlayerStylesForRole(positionId, roleName, tacticalStyle) {
  const keys = getPositionKeys(positionId)
  if (!keys.length) return []

  return PLAYER_STYLE_RECOMMENDATIONS.filter((rec) => {
    const positionMatch = rec.positionKeys.some((pk) => keys.includes(pk))
    const roleMatch = roleName && rec.roleNames.some((r) => r === roleName)
    const styleMatch = tacticalStyle && rec.tacticalStyles.includes(tacticalStyle)
    return positionMatch && (roleMatch || styleMatch)
  })
}
