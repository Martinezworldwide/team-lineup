// Deterministic tactical role interpretation engine
// Maps positions to interpreted roles based on formation and tactical style
// All logic is explicit, rule-based, and runs entirely client-side

// Position to role mapping rules
// Format: { formation: { positionId: { style: roleData } } }
// Built in steps to avoid "Cannot access before initialization" (no self-reference in object literal)
const ROLE_MAPPINGS = {}
ROLE_MAPPINGS['4-4-2'] = {
    'gk': {
      'high-press': {
        name: 'Sweeper Keeper',
        description: 'Act as an extra outfield player, playing high up the pitch to support build-up and press from the back.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example1',
            title: 'Sweeper Keeper Tutorial',
            focus: 'Playing out from the back and high positioning'
          }
        ]
      },
      'possession': {
        name: 'Ball-Playing Keeper',
        description: 'Distribute the ball accurately to start attacks, comfortable with feet under pressure.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example2',
            title: 'Goalkeeper Distribution',
            focus: 'Short and long passing accuracy'
          }
        ]
      },
      'low-block': {
        name: 'Shot-Stopper',
        description: 'Focus on traditional goalkeeping: shot-stopping, commanding the box, and organizing the defense.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example3',
            title: 'Goalkeeper Fundamentals',
            focus: 'Positioning and shot-stopping'
          }
        ]
      },
      'counter-attack': {
        name: 'Quick Distribution Keeper',
        description: 'Launch quick counter-attacks with accurate long throws and kicks to bypass the midfield.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example4',
            title: 'Counter-Attacking Goalkeeper',
            focus: 'Quick distribution and long-range accuracy'
          }
        ]
      },
      'wing-play': {
        name: 'Wide Distribution Keeper',
        description: 'Distribute to wide areas to initiate wing attacks, accurate long passes to fullbacks.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example5',
            title: 'Wide Distribution Techniques',
            focus: 'Targeting wide players accurately'
          }
        ]
      }
    },
    'lb': {
      'high-press': {
        name: 'Inverted Fullback',
        description: 'Tuck inside into midfield when in possession, creating numerical superiority in central areas.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example6',
            title: 'Inverted Fullback Explained',
            focus: 'Moving inside to support midfield'
          }
        ]
      },
      'possession': {
        name: 'Overlapping Fullback',
        description: 'Provide width in attack, overlap the winger, and maintain possession through safe passing.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example7',
            title: 'Overlapping Fullback Play',
            focus: 'Width and overlapping runs'
          }
        ]
      },
      'low-block': {
        name: 'Defensive Fullback',
        description: 'Stay deep and narrow, prioritize defensive duties, minimal forward runs.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example8',
            title: 'Defensive Fullback Positioning',
            focus: 'Staying compact and defensive'
          }
        ]
      },
      'counter-attack': {
        name: 'Wing-Back',
        description: 'Provide width on the break, make overlapping runs, and deliver early crosses.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example9',
            title: 'Wing-Back Counter Attacks',
            focus: 'Quick overlapping and crossing'
          }
        ]
      },
      'wing-play': {
        name: 'Attacking Fullback',
        description: 'Primary width provider, constant overlapping, deliver crosses from deep and advanced positions.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example10',
            title: 'Attacking Fullback Masterclass',
            focus: 'Width, overlapping, and crossing'
          }
        ]
      }
    },
    'cb1': {
      'high-press': {
        name: 'Ball-Playing Center Back',
        description: 'Step into midfield when pressing, comfortable on the ball, initiate attacks from deep.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example11',
            title: 'Ball-Playing Defender',
            focus: 'Stepping into midfield and passing'
          }
        ]
      },
      'possession': {
        name: 'Build-Up Defender',
        description: 'Key in build-up play, accurate short and medium passes, comfortable under pressure.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example12',
            title: 'Build-Up Play from Defense',
            focus: 'Passing and composure'
          }
        ]
      },
      'low-block': {
        name: 'Traditional Center Back',
        description: 'Focus on aerial duels, clearances, and maintaining defensive shape.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example13',
            title: 'Defensive Fundamentals',
            focus: 'Aerial ability and positioning'
          }
        ]
      },
      'counter-attack': {
        name: 'Quick Distribution CB',
        description: 'Win the ball and quickly distribute to wide areas or forwards to launch counters.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example14',
            title: 'Counter-Attacking Defender',
            focus: 'Quick distribution after winning the ball'
          }
        ]
      },
      'wing-play': {
        name: 'Wide Distribution CB',
        description: 'Distribute to wide areas, support fullbacks, maintain defensive width.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example15',
            title: 'Wide Distribution from Center',
            focus: 'Finding wide players accurately'
          }
        ]
      }
    },
    'cb2': {
      // Same as cb1 for simplicity, can be differentiated later
      'high-press': {
        name: 'Ball-Playing Center Back',
        description: 'Step into midfield when pressing, comfortable on the ball, initiate attacks from deep.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example11',
            title: 'Ball-Playing Defender',
            focus: 'Stepping into midfield and passing'
          }
        ]
      },
      'possession': {
        name: 'Build-Up Defender',
        description: 'Key in build-up play, accurate short and medium passes, comfortable under pressure.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example12',
            title: 'Build-Up Play from Defense',
            focus: 'Passing and composure'
          }
        ]
      },
      'low-block': {
        name: 'Traditional Center Back',
        description: 'Focus on aerial duels, clearances, and maintaining defensive shape.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example13',
            title: 'Defensive Fundamentals',
            focus: 'Aerial ability and positioning'
          }
        ]
      },
      'counter-attack': {
        name: 'Quick Distribution CB',
        description: 'Win the ball and quickly distribute to wide areas or forwards to launch counters.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example14',
            title: 'Counter-Attacking Defender',
            focus: 'Quick distribution after winning the ball'
          }
        ]
      },
      'wing-play': {
        name: 'Wide Distribution CB',
        description: 'Distribute to wide areas, support fullbacks, maintain defensive width.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example15',
            title: 'Wide Distribution from Center',
            focus: 'Finding wide players accurately'
          }
        ]
      }
    },
    'rb': {
      // Same patterns as lb
      'high-press': {
        name: 'Inverted Fullback',
        description: 'Tuck inside into midfield when in possession, creating numerical superiority in central areas.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example6',
            title: 'Inverted Fullback Explained',
            focus: 'Moving inside to support midfield'
          }
        ]
      },
      'possession': {
        name: 'Overlapping Fullback',
        description: 'Provide width in attack, overlap the winger, and maintain possession through safe passing.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example7',
            title: 'Overlapping Fullback Play',
            focus: 'Width and overlapping runs'
          }
        ]
      },
      'low-block': {
        name: 'Defensive Fullback',
        description: 'Stay deep and narrow, prioritize defensive duties, minimal forward runs.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example8',
            title: 'Defensive Fullback Positioning',
            focus: 'Staying compact and defensive'
          }
        ]
      },
      'counter-attack': {
        name: 'Wing-Back',
        description: 'Provide width on the break, make overlapping runs, and deliver early crosses.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example9',
            title: 'Wing-Back Counter Attacks',
            focus: 'Quick overlapping and crossing'
          }
        ]
      },
      'wing-play': {
        name: 'Attacking Fullback',
        description: 'Primary width provider, constant overlapping, deliver crosses from deep and advanced positions.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example10',
            title: 'Attacking Fullback Masterclass',
            focus: 'Width, overlapping, and crossing'
          }
        ]
      }
    },
    'lm': {
      'high-press': {
        name: 'Pressing Wide Midfielder',
        description: 'Lead the press from wide areas, cut off passing lanes, force play inside.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example16',
            title: 'Wide Pressing Techniques',
            focus: 'Cutting passing lanes and forcing play'
          }
        ]
      },
      'possession': {
        name: 'Possession Wide Midfielder',
        description: 'Maintain width, provide passing options, recycle possession, support build-up.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example17',
            title: 'Wide Midfield Possession',
            focus: 'Width and ball retention'
          }
        ]
      },
      'low-block': {
        name: 'Defensive Wide Midfielder',
        description: 'Track back, support fullback, maintain defensive shape, minimal forward runs.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example18',
            title: 'Defensive Wide Midfield',
            focus: 'Tracking back and defensive duties'
          }
        ]
      },
      'counter-attack': {
        name: 'Counter-Attacking Winger',
        description: 'Exploit space on the break, carry the ball forward, provide width in transition.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example19',
            title: 'Counter-Attacking Wide Play',
            focus: 'Exploiting space and carrying the ball'
          }
        ]
      },
      'wing-play': {
        name: 'Traditional Winger',
        description: 'Stay wide, take on defenders, deliver crosses, provide primary width in attack.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example20',
            title: 'Traditional Winger Play',
            focus: 'Width, dribbling, and crossing'
          }
        ]
      }
    },
    'cm1': {
      'high-press': {
        name: 'Press-Resistant 8',
        description: 'Receive the ball under pressure, turn and progress play, support the press.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example21',
            title: 'Press-Resistant Midfielder',
            focus: 'Receiving under pressure and turning'
          }
        ]
      },
      'possession': {
        name: 'Deep-Lying Playmaker',
        description: 'Control tempo, distribute from deep, maintain possession, create from distance.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example22',
            title: 'Deep-Lying Playmaker',
            focus: 'Tempo control and distribution'
          }
        ]
      },
      'low-block': {
        name: 'Defensive Midfielder',
        description: 'Screen the defense, break up play, simple distribution, maintain shape.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example23',
            title: 'Defensive Midfielder Basics',
            focus: 'Screening and breaking up play'
          }
        ]
      },
      'counter-attack': {
        name: 'Box-to-Box Midfielder',
        description: 'Cover ground quickly, support defense and attack, drive forward on the break.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example24',
            title: 'Box-to-Box Midfielder',
            focus: 'End-to-end running and transitions'
          }
        ]
      },
      'wing-play': {
        name: 'Wide-Supporting Midfielder',
        description: 'Support wide play, provide passing options, switch play to opposite flank.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example25',
            title: 'Supporting Wide Play',
            focus: 'Supporting wingers and switching play'
          }
        ]
      }
    },
    'cm2': {
      // Similar to cm1, can be differentiated
      'high-press': {
        name: 'Press-Resistant 8',
        description: 'Receive the ball under pressure, turn and progress play, support the press.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example21',
            title: 'Press-Resistant Midfielder',
            focus: 'Receiving under pressure and turning'
          }
        ]
      },
      'possession': {
        name: 'Deep-Lying Playmaker',
        description: 'Control tempo, distribute from deep, maintain possession, create from distance.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example22',
            title: 'Deep-Lying Playmaker',
            focus: 'Tempo control and distribution'
          }
        ]
      },
      'low-block': {
        name: 'Defensive Midfielder',
        description: 'Screen the defense, break up play, simple distribution, maintain shape.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example23',
            title: 'Defensive Midfielder Basics',
            focus: 'Screening and breaking up play'
          }
        ]
      },
      'counter-attack': {
        name: 'Box-to-Box Midfielder',
        description: 'Cover ground quickly, support defense and attack, drive forward on the break.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example24',
            title: 'Box-to-Box Midfielder',
            focus: 'End-to-end running and transitions'
          }
        ]
      },
      'wing-play': {
        name: 'Wide-Supporting Midfielder',
        description: 'Support wide play, provide passing options, switch play to opposite flank.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example25',
            title: 'Supporting Wide Play',
            focus: 'Supporting wingers and switching play'
          }
        ]
      }
    },
    'rm': {
      // Same patterns as lm
      'high-press': {
        name: 'Pressing Wide Midfielder',
        description: 'Lead the press from wide areas, cut off passing lanes, force play inside.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example16',
            title: 'Wide Pressing Techniques',
            focus: 'Cutting passing lanes and forcing play'
          }
        ]
      },
      'possession': {
        name: 'Possession Wide Midfielder',
        description: 'Maintain width, provide passing options, recycle possession, support build-up.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example17',
            title: 'Wide Midfield Possession',
            focus: 'Width and ball retention'
          }
        ]
      },
      'low-block': {
        name: 'Defensive Wide Midfielder',
        description: 'Track back, support fullback, maintain defensive shape, minimal forward runs.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example18',
            title: 'Defensive Wide Midfield',
            focus: 'Tracking back and defensive duties'
          }
        ]
      },
      'counter-attack': {
        name: 'Counter-Attacking Winger',
        description: 'Exploit space on the break, carry the ball forward, provide width in transition.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example19',
            title: 'Counter-Attacking Wide Play',
            focus: 'Exploiting space and carrying the ball'
          }
        ]
      },
      'wing-play': {
        name: 'Traditional Winger',
        description: 'Stay wide, take on defenders, deliver crosses, provide primary width in attack.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example20',
            title: 'Traditional Winger Play',
            focus: 'Width, dribbling, and crossing'
          }
        ]
      }
    },
    'st1': {
      'high-press': {
        name: 'Pressing Forward',
        description: 'Lead the press from the front, force errors, win the ball high up the pitch.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example26',
            title: 'Pressing Forward',
            focus: 'Leading the press and forcing errors'
          }
        ]
      },
      'possession': {
        name: 'False 9',
        description: 'Drop deep to link play, create space for others, combine with midfield.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example27',
            title: 'False 9 Role',
            focus: 'Dropping deep and linking play'
          }
        ]
      },
      'low-block': {
        name: 'Target Man',
        description: 'Hold up play, win aerial duels, bring others into play, physical presence.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example28',
            title: 'Target Man Play',
            focus: 'Hold-up play and aerial ability'
          }
        ]
      },
      'counter-attack': {
        name: 'Poacher',
        description: 'Stay on the last line, make runs in behind, finish counter-attacks.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example29',
            title: 'Poacher Movement',
            focus: 'Runs in behind and finishing'
          }
        ]
      },
      'wing-play': {
        name: 'Target Forward',
        description: 'Attack crosses, win headers, provide focal point for wide attacks.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example30',
            title: 'Target Forward in Wide Play',
            focus: 'Attacking crosses and aerial ability'
          }
        ]
      }
    },
    'st2': {
      // Similar to st1, can be differentiated
      'high-press': {
        name: 'Pressing Forward',
        description: 'Lead the press from the front, force errors, win the ball high up the pitch.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example26',
            title: 'Pressing Forward',
            focus: 'Leading the press and forcing errors'
          }
        ]
      },
      'possession': {
        name: 'False 9',
        description: 'Drop deep to link play, create space for others, combine with midfield.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example27',
            title: 'False 9 Role',
            focus: 'Dropping deep and linking play'
          }
        ]
      },
      'low-block': {
        name: 'Target Man',
        description: 'Hold up play, win aerial duels, bring others into play, physical presence.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example28',
            title: 'Target Man Play',
            focus: 'Hold-up play and aerial ability'
          }
        ]
      },
      'counter-attack': {
        name: 'Poacher',
        description: 'Stay on the last line, make runs in behind, finish counter-attacks.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example29',
            title: 'Poacher Movement',
            focus: 'Runs in behind and finishing'
          }
        ]
      },
      'wing-play': {
        name: 'Target Forward',
        description: 'Attack crosses, win headers, provide focal point for wide attacks.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example30',
            title: 'Target Forward in Wide Play',
            focus: 'Attacking crosses and aerial ability'
          }
        ]
      }
    }
  }
// 4-3-3 Formation
ROLE_MAPPINGS['4-3-3'] = (function () {
  const F433 = {
    'gk': ROLE_MAPPINGS['4-4-2']['gk'],
    'lb': ROLE_MAPPINGS['4-4-2']['lb'],
    'cb1': ROLE_MAPPINGS['4-4-2']['cb1'],
    'cb2': ROLE_MAPPINGS['4-4-2']['cb2'],
    'rb': ROLE_MAPPINGS['4-4-2']['rb'],
    'cm1': {
      'high-press': {
        name: 'Press-Resistant 8',
        description: 'Receive the ball under pressure, turn and progress play, support the press.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example21',
            title: 'Press-Resistant Midfielder',
            focus: 'Receiving under pressure and turning'
          }
        ]
      },
      'possession': {
        name: 'Deep-Lying Playmaker',
        description: 'Control tempo, distribute from deep, maintain possession, create from distance.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example22',
            title: 'Deep-Lying Playmaker',
            focus: 'Tempo control and distribution'
          }
        ]
      },
      'low-block': {
        name: 'Defensive Midfielder',
        description: 'Screen the defense, break up play, simple distribution, maintain shape.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example23',
            title: 'Defensive Midfielder Basics',
            focus: 'Screening and breaking up play'
          }
        ]
      },
      'counter-attack': {
        name: 'Box-to-Box Midfielder',
        description: 'Cover ground quickly, support defense and attack, drive forward on the break.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example24',
            title: 'Box-to-Box Midfielder',
            focus: 'End-to-end running and transitions'
          }
        ]
      },
      'wing-play': {
        name: 'Wide-Supporting Midfielder',
        description: 'Support wide play, provide passing options, switch play to opposite flank.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example25',
            title: 'Supporting Wide Play',
            focus: 'Supporting wingers and switching play'
          }
        ]
      }
    },
    'cm2': {
      'high-press': {
        name: 'Advanced Playmaker',
        description: 'Play between the lines, create chances, support the press from advanced positions.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example31',
            title: 'Advanced Playmaker',
            focus: 'Playing between lines and creating chances'
          }
        ]
      },
      'possession': {
        name: 'Central Playmaker',
        description: 'Control the game from central areas, link defense and attack, maintain possession.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example32',
            title: 'Central Playmaker Role',
            focus: 'Controlling tempo and linking play'
          }
        ]
      },
      'low-block': {
        name: 'Defensive Shield',
        description: 'Protect the back four, break up attacks, simple distribution.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example33',
            title: 'Defensive Shield',
            focus: 'Protecting defense and breaking up play'
          }
        ]
      },
      'counter-attack': {
        name: 'Counter-Attacking Midfielder',
        description: 'Quick transitions, drive forward with the ball, support counter-attacks.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example34',
            title: 'Counter-Attacking Midfielder',
            focus: 'Quick transitions and driving forward'
          }
        ]
      },
      'wing-play': {
        name: 'Wide-Linking Midfielder',
        description: 'Connect central areas to wide players, switch play, support wingers.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example35',
            title: 'Wide-Linking Midfielder',
            focus: 'Connecting central and wide areas'
          }
        ]
      }
    },
    'cm3': null,
    'lw': {
      'high-press': {
        name: 'Pressing Winger',
        description: 'Lead the press from wide areas, force play inside, win the ball high.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example36',
            title: 'Pressing Winger',
            focus: 'Wide pressing and forcing play'
          }
        ]
      },
      'possession': {
        name: 'Inverted Winger',
        description: 'Cut inside, create chances, combine with midfield, maintain possession.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example37',
            title: 'Inverted Winger Play',
            focus: 'Cutting inside and creating chances'
          }
        ]
      },
      'low-block': {
        name: 'Defensive Winger',
        description: 'Track back, support fullback, maintain defensive shape.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example38',
            title: 'Defensive Winger',
            focus: 'Tracking back and defensive duties'
          }
        ]
      },
      'counter-attack': {
        name: 'Counter-Attacking Winger',
        description: 'Exploit space on the break, carry the ball forward at pace.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example39',
            title: 'Counter-Attacking Winger',
            focus: 'Exploiting space and carrying the ball'
          }
        ]
      },
      'wing-play': {
        name: 'Traditional Winger',
        description: 'Stay wide, take on defenders, deliver crosses, provide primary width.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example40',
            title: 'Traditional Winger',
            focus: 'Width, dribbling, and crossing'
          }
        ]
      }
    },
    'st': {
      'high-press': {
        name: 'Pressing Forward',
        description: 'Lead the press from the front, force errors, win the ball high up the pitch.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example26',
            title: 'Pressing Forward',
            focus: 'Leading the press and forcing errors'
          }
        ]
      },
      'possession': {
        name: 'False 9',
        description: 'Drop deep to link play, create space for others, combine with midfield.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example27',
            title: 'False 9 Role',
            focus: 'Dropping deep and linking play'
          }
        ]
      },
      'low-block': {
        name: 'Target Man',
        description: 'Hold up play, win aerial duels, bring others into play, physical presence.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example28',
            title: 'Target Man Play',
            focus: 'Hold-up play and aerial ability'
          }
        ]
      },
      'counter-attack': {
        name: 'Poacher',
        description: 'Stay on the last line, make runs in behind, finish counter-attacks.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example29',
            title: 'Poacher Movement',
            focus: 'Runs in behind and finishing'
          }
        ]
      },
      'wing-play': {
        name: 'Target Forward',
        description: 'Attack crosses, win headers, provide focal point for wide attacks.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example30',
            title: 'Target Forward in Wide Play',
            focus: 'Attacking crosses and aerial ability'
          }
        ]
      }
    },
    'rw': null
  }
  F433.cm3 = F433.cm1
  F433.rw = F433.lw
  return F433
})()
ROLE_MAPPINGS['4-2-3-1'] = (function () {
  const F4231 = {
    'gk': ROLE_MAPPINGS['4-4-2']['gk'],
    'lb': ROLE_MAPPINGS['4-4-2']['lb'],
    'cb1': ROLE_MAPPINGS['4-4-2']['cb1'],
    'cb2': ROLE_MAPPINGS['4-4-2']['cb2'],
    'rb': ROLE_MAPPINGS['4-4-2']['rb'],
    'cdm1': {
      'high-press': {
        name: 'Pressing Anchor',
        description: 'Screen the defense, support the press, win the ball high up the pitch.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example41',
            title: 'Pressing Anchor',
            focus: 'Screening and supporting the press'
          }
        ]
      },
      'possession': {
        name: 'Deep-Lying Playmaker',
        description: 'Control tempo from deep, distribute accurately, maintain possession.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example22',
            title: 'Deep-Lying Playmaker',
            focus: 'Tempo control and distribution'
          }
        ]
      },
      'low-block': {
        name: 'Defensive Anchor',
        description: 'Stay deep, protect the back four, break up play, simple distribution.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example42',
            title: 'Defensive Anchor',
            focus: 'Protecting defense and breaking up play'
          }
        ]
      },
      'counter-attack': {
        name: 'Counter-Attacking Shield',
        description: 'Win the ball and quickly distribute to start counters.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example43',
            title: 'Counter-Attacking Shield',
            focus: 'Quick distribution after winning the ball'
          }
        ]
      },
      'wing-play': {
        name: 'Wide-Distributing Anchor',
        description: 'Distribute to wide areas, support fullbacks, maintain defensive width.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example44',
            title: 'Wide Distribution from Anchor',
            focus: 'Finding wide players accurately'
          }
        ]
      }
    },
    'cdm2': null,
    'cam': {
      'high-press': {
        name: 'Pressing Number 10',
        description: 'Lead the press from advanced positions, force errors, create chances.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example45',
            title: 'Pressing Number 10',
            focus: 'Advanced pressing and chance creation'
          }
        ]
      },
      'possession': {
        name: 'Creative Playmaker',
        description: 'Play between the lines, create chances, link midfield and attack.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example46',
            title: 'Creative Playmaker',
            focus: 'Playing between lines and creating chances'
          }
        ]
      },
      'low-block': {
        name: 'Defensive Number 10',
        description: 'Drop deep to support defense, maintain shape, counter when possible.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example47',
            title: 'Defensive Number 10',
            focus: 'Supporting defense and countering'
          }
        ]
      },
      'counter-attack': {
        name: 'Counter-Attacking 10',
        description: 'Quick transitions, drive forward, create chances on the break.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example48',
            title: 'Counter-Attacking Number 10',
            focus: 'Quick transitions and chance creation'
          }
        ]
      },
      'wing-play': {
        name: 'Wide-Supporting 10',
        description: 'Support wide play, create chances from wide areas, link with wingers.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example49',
            title: 'Wide-Supporting Number 10',
            focus: 'Supporting wide play and creating chances'
          }
        ]
      }
    },
    'lw': ROLE_MAPPINGS['4-3-3']['lw'],
    'rw': ROLE_MAPPINGS['4-3-3']['rw'],
    'st': ROLE_MAPPINGS['4-3-3']['st']
  }
  F4231.cdm2 = F4231.cdm1
  return F4231
})()
// 3-5-2 Formation
ROLE_MAPPINGS['3-5-2'] = (function () {
  const F352 = {
    'gk': ROLE_MAPPINGS['4-4-2']['gk'],
    'cb1': {
      'high-press': {
        name: 'Ball-Playing Center Back',
        description: 'Step into midfield when pressing, comfortable on the ball, initiate attacks.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example11',
            title: 'Ball-Playing Defender',
            focus: 'Stepping into midfield and passing'
          }
        ]
      },
      'possession': {
        name: 'Build-Up Defender',
        description: 'Key in build-up play, accurate passes, comfortable under pressure.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example12',
            title: 'Build-Up Play from Defense',
            focus: 'Passing and composure'
          }
        ]
      },
      'low-block': {
        name: 'Traditional Center Back',
        description: 'Focus on aerial duels, clearances, maintaining defensive shape.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example13',
            title: 'Defensive Fundamentals',
            focus: 'Aerial ability and positioning'
          }
        ]
      },
      'counter-attack': {
        name: 'Quick Distribution CB',
        description: 'Win the ball and quickly distribute to wide areas or forwards.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example14',
            title: 'Counter-Attacking Defender',
            focus: 'Quick distribution after winning the ball'
          }
        ]
      },
      'wing-play': {
        name: 'Wide Distribution CB',
        description: 'Distribute to wide areas, support wing-backs, maintain width.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example15',
            title: 'Wide Distribution from Center',
            focus: 'Finding wide players accurately'
          }
        ]
      }
    },
    'cb2': null,
    'cb3': null,
    'lm': {
      'high-press': {
        name: 'Pressing Wing-Back',
        description: 'Press high up the pitch, provide width, force play inside.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example50',
            title: 'Pressing Wing-Back',
            focus: 'High pressing and width'
          }
        ]
      },
      'possession': {
        name: 'Possession Wing-Back',
        description: 'Maintain width, provide passing options, support build-up.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example51',
            title: 'Possession Wing-Back',
            focus: 'Width and ball retention'
          }
        ]
      },
      'low-block': {
        name: 'Defensive Wing-Back',
        description: 'Track back, support defense, maintain shape, minimal forward runs.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example52',
            title: 'Defensive Wing-Back',
            focus: 'Tracking back and defensive duties'
          }
        ]
      },
      'counter-attack': {
        name: 'Counter-Attacking Wing-Back',
        description: 'Exploit space on the break, provide width, deliver crosses.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example53',
            title: 'Counter-Attacking Wing-Back',
            focus: 'Exploiting space and crossing'
          }
        ]
      },
      'wing-play': {
        name: 'Attacking Wing-Back',
        description: 'Primary width provider, constant overlapping, deliver crosses.',
        youtubeLinks: [
          {
            url: 'https://www.youtube.com/watch?v=example54',
            title: 'Attacking Wing-Back',
            focus: 'Width, overlapping, and crossing'
          }
        ]
      }
    },
    'cm1': ROLE_MAPPINGS['4-3-3']['cm1'],
    'cm2': ROLE_MAPPINGS['4-3-3']['cm2'],
    'cm3': ROLE_MAPPINGS['4-3-3']['cm1'],
    'rm': null,
    'st1': ROLE_MAPPINGS['4-4-2']['st1'],
    'st2': ROLE_MAPPINGS['4-4-2']['st2']
  }
  F352.cb2 = F352.cb1
  F352.cb3 = F352.cb1
  F352.rm = F352.lm
  return F352
})()

/**
 * Interpret roles for assigned positions based on formation and tactical style
 * @param {string} formation - The selected formation (e.g., '4-4-2')
 * @param {string} tacticalStyle - The selected tactical style (e.g., 'high-press')
 * @param {Object} assignments - Map of positionId to player object
 * @returns {Object} Map of positionId to role data
 */
export const tacticalEngine = {
  interpretRoles(formation, tacticalStyle, assignments) {
    const roles = {}
    const formationMappings = ROLE_MAPPINGS[formation]
    
    if (!formationMappings) {
      return roles
    }

    // For each assigned position, look up the role based on formation and style
    Object.keys(assignments).forEach(positionId => {
      const positionMappings = formationMappings[positionId]
      
      if (positionMappings && positionMappings[tacticalStyle]) {
        roles[positionId] = positionMappings[tacticalStyle]
      }
    })

    return roles
  },

  // Get all available formations
  getFormations() {
    return Object.keys(ROLE_MAPPINGS)
  },

  // Get all available tactical styles
  getTacticalStyles() {
    return ['high-press', 'possession', 'low-block', 'counter-attack', 'wing-play']
  }
}
