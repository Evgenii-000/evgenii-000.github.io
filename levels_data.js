// levels_data.js - Sector & Wave level definitions
var LEVELS_DATA = {
  "1": {
    "mapId": "L1",
    "startHp": 10,
    "startGold": 90,
    "totalWaves": 2,
    "unlockedTowers": [
      "gun"
    ],
    "canUpgrade": false,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 32,
            "speed": 50,
            "interval": 1.045,
            "bounty": 7,
            "hpMult": 0.8,
            "speedMult": 0.91,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 40,
            "speed": 50,
            "interval": 0.88,
            "bounty": 7,
            "hpMult": 1,
            "speedMult": 0.91,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "2": {
    "mapId": "L2",
    "startHp": 10,
    "startGold": 115,
    "totalWaves": 2,
    "unlockedTowers": [
      "gun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 6,
            "hp": 60,
            "hpMult": 1.5,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.75,
            "bounty": 7,
            "bountyMult": 1,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 6,
            "hp": 100,
            "hpMult": 1.5,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.75,
            "bounty": 7,
            "bountyMult": 1,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      }
    ]
  },
  "3": {
    "mapId": "L3",
    "startHp": 10,
    "startGold": 110,
    "totalWaves": 4,
    "unlockedTowers": [
      "gun",
      "laser"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 38,
            "speed": 55,
            "interval": 0.825,
            "bounty": 7,
            "speedMult": 1,
            "hpMult": 0.95,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "scout",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 24,
            "speed": 110,
            "interval": 0.6,
            "bounty": 6,
            "speedMult": 1,
            "hpMult": 1,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 40,
            "speed": 55,
            "interval": 0.825,
            "bounty": 12,
            "hpMult": 1,
            "speedMult": 1,
            "bountyMult": 1.71
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 180,
            "speed": 55,
            "interval": 1.3,
            "bounty": 54,
            "speedMult": 1,
            "hpMult": 4.5,
            "bountyMult": 3.09
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "4": {
    "mapId": "L4",
    "startHp": 10,
    "startGold": 125,
    "totalWaves": 5,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 40,
            "speed": 55,
            "interval": 0.77,
            "bounty": 7,
            "speedMult": 1,
            "hpMult": 1,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "scout",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 25,
            "speed": 110,
            "interval": 0.562,
            "bounty": 7,
            "hpMult": 1.04,
            "speedMult": 1,
            "bountyMult": 1.17
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 48,
            "speed": 55,
            "interval": 0.77,
            "bounty": 7,
            "hpMult": 1.2,
            "speedMult": 1,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 2,
            "hp": 115,
            "speed": 38,
            "interval": 1.282,
            "bounty": 12,
            "speedMult": 1,
            "hpMult": 1.15,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 380,
            "speed": 44,
            "interval": 1.3,
            "bounty": 35,
            "speedMult": 0.8,
            "hpMult": 9.5,
            "bountyMult": 2
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "5": {
    "mapId": "L5",
    "startHp": 10,
    "startGold": 135,
    "totalWaves": 6,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 5,
            "hp": 45,
            "hpMult": 1.13,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 15,
            "bountyMult": 2.14,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 7,
            "hp": 29,
            "hpMult": 1.21,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 9,
            "bountyMult": 1.5,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 3,
            "hp": 284,
            "hpMult": 2.84,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 35,
            "bountyMult": 2.92,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 6,
            "hp": 162,
            "hpMult": 4.05,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 13,
            "bountyMult": 1.86,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 7,
            "hp": 86,
            "hpMult": 3.58,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 14,
            "bountyMult": 2.33,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 1,
            "hp": 711,
            "hpMult": 7.11,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 45,
            "bountyMult": 3.75,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 1,
            "hp": 1851,
            "hpMult": 46.28,
            "speed": 47,
            "speedMult": 0.85,
            "interval": 1.2,
            "bounty": 60,
            "bountyMult": 2,
            "isBoss": false,
            "isMiniBoss": true
          }
        ]
      }
    ]
  },
  "6": {
    "mapId": "L6",
    "startHp": 10,
    "startGold": 145,
    "totalWaves": 6,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 6,
            "hp": 66,
            "hpMult": 1.65,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 14,
            "bountyMult": 2,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 5,
            "hp": 207,
            "hpMult": 2.07,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 14,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 8,
            "hp": 53,
            "hpMult": 2.21,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 14,
            "bountyMult": 2.33,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 7,
            "hp": 210,
            "hpMult": 5.25,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 14,
            "bountyMult": 2,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 7,
        "spawns": [
          {
            "type": "tank",
            "count": 4,
            "hp": 499,
            "hpMult": 4.99,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 15,
            "bountyMult": 1.25,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 6,
            "hp": 225,
            "hpMult": 5.63,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 8,
            "bountyMult": 1.14,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 14,
            "hp": 130,
            "hpMult": 3.25,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.6,
            "bounty": 4,
            "bountyMult": 0.57,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 1,
            "hp": 1166,
            "hpMult": 48.58,
            "speed": 94,
            "speedMult": 0.85,
            "interval": 1.2,
            "bounty": 69,
            "bountyMult": 4.6,
            "isBoss": false,
            "isMiniBoss": true
          }
        ]
      }
    ]
  },
  "7": {
    "mapId": "L7",
    "startHp": 10,
    "startGold": 160,
    "totalWaves": 7,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 8,
            "hp": 25,
            "hpMult": 1.04,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 12,
            "bountyMult": 2,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 7,
            "hp": 127,
            "hpMult": 3.18,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 11,
            "bountyMult": 1.57,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 8,
            "hp": 62,
            "hpMult": 2.58,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 16,
            "bountyMult": 2.67,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 10,
            "hp": 261,
            "hpMult": 2.61,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 11,
            "bountyMult": 0.92,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 8,
            "hp": 79,
            "hpMult": 3.29,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 8,
            "bountyMult": 1.33,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 12,
            "hp": 123,
            "hpMult": 3.08,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 6,
            "bountyMult": 0.86,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 9,
            "hp": 107,
            "hpMult": 4.46,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 7,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "tank",
            "count": 12,
            "hp": 262,
            "hpMult": 2.62,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 7,
            "bountyMult": 0.58,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 7,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 9,
            "hp": 135,
            "hpMult": 5.63,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 9,
            "bountyMult": 1.5,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "tank",
            "count": 1,
            "hp": 5803,
            "hpMult": 58.03,
            "speed": 32,
            "speedMult": 0.84,
            "interval": 1.2,
            "bounty": 79,
            "bountyMult": 2.63,
            "isBoss": false,
            "isMiniBoss": true
          }
        ]
      }
    ]
  },
  "8": {
    "mapId": "L8",
    "startHp": 10,
    "startGold": 175,
    "totalWaves": 7,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 7,
            "hp": 73,
            "hpMult": 1.83,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 15,
            "bountyMult": 2.14,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 6,
            "hp": 222,
            "hpMult": 2.22,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 15,
            "bountyMult": 1.25,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 9,
            "hp": 64,
            "hpMult": 2.67,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 16,
            "bountyMult": 2.67,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 8,
            "hp": 222,
            "hpMult": 5.55,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 16,
            "bountyMult": 2.29,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 5,
            "hp": 411,
            "hpMult": 4.11,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 17,
            "bountyMult": 1.42,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 9,
            "hp": 75,
            "hpMult": 3.13,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 7,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 16,
            "hp": 194,
            "hpMult": 4.85,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 10,
            "bountyMult": 1.43,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 7,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 6,
            "hp": 584,
            "hpMult": 5.84,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 16,
            "bountyMult": 1.33,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 1,
            "hp": 3767,
            "hpMult": 94.18,
            "speed": 47,
            "speedMult": 0.85,
            "interval": 1.2,
            "bounty": 89,
            "bountyMult": 2.97,
            "isBoss": false,
            "isMiniBoss": true
          }
        ]
      }
    ]
  },
  "9": {
    "mapId": "L9",
    "startHp": 10,
    "startGold": 190,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 1,
            "hp": 966,
            "hpMult": 9.66,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 115,
            "bountyMult": 9.58,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 2,
            "hp": 935,
            "hpMult": 9.35,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 50,
            "bountyMult": 4.17,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 3,
            "hp": 849,
            "hpMult": 8.49,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 53,
            "bountyMult": 4.42,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 4,
            "hp": 990,
            "hpMult": 9.9,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 35,
            "bountyMult": 2.92,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 5,
            "hp": 596,
            "hpMult": 5.96,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 21,
            "bountyMult": 1.75,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 7,
            "hp": 298,
            "hpMult": 7.45,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 9,
            "bountyMult": 1.29,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 6,
            "hp": 650,
            "hpMult": 6.5,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 20,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 10,
            "hp": 133,
            "hpMult": 5.54,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 7,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 7,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 7,
            "hp": 719,
            "hpMult": 7.19,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 21,
            "bountyMult": 1.75,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 7,
            "hp": 475,
            "hpMult": 11.88,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 9,
            "bountyMult": 1.29,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 8,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 8,
            "hp": 654,
            "hpMult": 6.54,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 18,
            "bountyMult": 1.5,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 1,
            "hp": 2507,
            "hpMult": 104.46,
            "speed": 94,
            "speedMult": 0.85,
            "interval": 1.2,
            "bounty": 86,
            "bountyMult": 5.73,
            "isBoss": false,
            "isMiniBoss": true
          }
        ]
      }
    ]
  },
  "10": {
    "mapId": "L10",
    "startHp": 10,
    "startGold": 200,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 7,
            "hp": 147,
            "hpMult": 3.68,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 17,
            "bountyMult": 2.43,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 7,
            "hp": 305,
            "hpMult": 3.05,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 16,
            "bountyMult": 1.33,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 10,
            "hp": 107,
            "hpMult": 4.46,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 17,
            "bountyMult": 2.83,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 7,
            "hp": 404,
            "hpMult": 4.04,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 14,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 8,
            "hp": 267,
            "hpMult": 6.68,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 7,
            "bountyMult": 1,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 6,
            "hp": 589,
            "hpMult": 5.89,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 20,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 10,
            "hp": 119,
            "hpMult": 4.96,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 6,
            "bountyMult": 1,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 7,
            "hp": 647,
            "hpMult": 6.47,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 20,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 8,
            "hp": 383,
            "hpMult": 9.58,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 8,
            "bountyMult": 1.14,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 7,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 6,
            "hp": 924,
            "hpMult": 9.24,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 26,
            "bountyMult": 2.17,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 10,
            "hp": 190,
            "hpMult": 7.92,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 7,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 8,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 8,
            "hp": 489,
            "hpMult": 12.23,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 15,
            "bountyMult": 2.14,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 10,
            "hp": 196,
            "hpMult": 8.17,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 4,
            "bountyMult": 0.67,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "tank",
            "count": 1,
            "hp": 9493,
            "hpMult": 94.93,
            "speed": 29,
            "speedMult": 0.76,
            "interval": 1.2,
            "bounty": 100,
            "bountyMult": 1.67,
            "isBoss": true,
            "isMiniBoss": false
          }
        ]
      }
    ]
  },
  "11": {
    "mapId": "L11",
    "startHp": 10,
    "startGold": 125,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 10,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "grunt",
            "count": 7,
            "hp": 75,
            "hpMult": 1.88,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 10,
            "bountyMult": 1.43,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 7,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "swarm",
            "count": 14,
            "hp": 1,
            "hpMult": 0.06,
            "speed": 170,
            "speedMult": 1,
            "interval": 0.045,
            "clumps": 2,
            "bounty": 6,
            "bountyMult": 2,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 7,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "grunt",
            "count": 8,
            "hp": 122,
            "hpMult": 3.05,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 12,
            "bountyMult": 1.71,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 7,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "scout",
            "count": 12,
            "hp": 45,
            "hpMult": 1.88,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 10,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 7,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "grunt",
            "count": 9,
            "hp": 140,
            "hpMult": 3.5,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 10,
            "bountyMult": 1.43,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "swarm",
            "count": 18,
            "hp": 14,
            "hpMult": 0.88,
            "speed": 170,
            "speedMult": 1,
            "interval": 0.045,
            "clumps": 2,
            "bounty": 3,
            "bountyMult": 1,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 7,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "grunt",
            "count": 10,
            "hp": 111,
            "hpMult": 2.78,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 9,
            "bountyMult": 1.29,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 12,
            "hp": 55,
            "hpMult": 2.29,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 7,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 7,
        "delayAfter": 7,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "scout",
            "count": 12,
            "hp": 96,
            "hpMult": 4,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 10,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "swarm",
            "count": 20,
            "hp": 27,
            "hpMult": 1.69,
            "speed": 170,
            "speedMult": 1,
            "interval": 0.045,
            "clumps": 2,
            "bounty": 4,
            "bountyMult": 1.33,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 8,
        "delayAfter": 7,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "scout",
            "count": 12,
            "hp": 111,
            "hpMult": 4.63,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 10,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 1,
            "hp": 3572,
            "hpMult": 89.3,
            "speed": 47,
            "speedMult": 0.85,
            "interval": 1.2,
            "bounty": 130,
            "bountyMult": 18.57,
            "isBoss": false,
            "isMiniBoss": true
          }
        ]
      }
    ]
  },
  "12": {
    "mapId": "L12",
    "startHp": 10,
    "startGold": 135,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 7,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "swarm",
            "count": 14,
            "hp": 5,
            "hpMult": 0.31,
            "speed": 170,
            "speedMult": 1,
            "interval": 0.045,
            "clumps": 2,
            "bounty": 5,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 7,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "grunt",
            "count": 8,
            "hp": 104,
            "hpMult": 2.6,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 11,
            "bountyMult": 1.57,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 10,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "tank",
            "count": 5,
            "hp": 80,
            "hpMult": 0.8,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 21,
            "bountyMult": 1.75,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 7,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "swarm",
            "count": 18,
            "hp": 26,
            "hpMult": 1.63,
            "speed": 170,
            "speedMult": 1,
            "interval": 0.045,
            "clumps": 2,
            "bounty": 4,
            "bountyMult": 1.33,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 15,
            "hp": 80,
            "hpMult": 2,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 6,
            "bountyMult": 0.86,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 7,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "scout",
            "count": 12,
            "hp": 80,
            "hpMult": 3.33,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 7,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 15,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "swarm",
            "count": 20,
            "hp": 40,
            "hpMult": 2.5,
            "speed": 170,
            "speedMult": 1,
            "interval": 0.045,
            "clumps": 2,
            "bounty": 4,
            "bountyMult": 1.33,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "tank",
            "count": 6,
            "hp": 544,
            "hpMult": 5.44,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 18,
            "bountyMult": 1.5,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 7,
        "delayAfter": 15,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "scout",
            "count": 12,
            "hp": 185,
            "hpMult": 7.71,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 9,
            "bountyMult": 1.5,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "tank",
            "count": 6,
            "hp": 798,
            "hpMult": 7.98,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 20,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 8,
        "delayAfter": 7,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "swarm",
            "count": 20,
            "hp": 93,
            "hpMult": 5.81,
            "speed": 170,
            "speedMult": 1,
            "interval": 0.045,
            "clumps": 2,
            "bounty": 5,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 1,
            "hp": 3763,
            "hpMult": 156.79,
            "speed": 94,
            "speedMult": 0.85,
            "interval": 1.2,
            "bounty": 180,
            "bountyMult": 30,
            "isBoss": false,
            "isMiniBoss": true
          }
        ]
      }
    ]
  },
  "13": {
    "mapId": "L13",
    "startHp": 10,
    "startGold": 145,
    "totalWaves": 8,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 10, "earlyBonus": 25, "spawns": [
        { "type": "tank", "count": 4, "hp": 363, "hpMult": 3.63, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 20, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "swarm", "count": 16, "hp": 13, "hpMult": 0.81, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "tank", "count": 5, "hp": 216, "hpMult": 2.16, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 13, "bountyMult": 1.08, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 11, "hp": 60, "hpMult": 2.5, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 5, "bountyMult": 0.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 10, "earlyBonus": 25, "spawns": [
        { "type": "tank", "count": 5, "hp": 239, "hpMult": 2.39, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 17, "bountyMult": 1.42, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 18, "hp": 26, "hpMult": 1.63, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 3, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "grunt", "count": 10, "hp": 244, "hpMult": 6.1, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 8, "bountyMult": 1.14, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 536, "hpMult": 5.36, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 16, "bountyMult": 1.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 10, "earlyBonus": 25, "spawns": [
        { "type": "grunt", "count": 11, "hp": 224, "hpMult": 5.6, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 9, "bountyMult": 1.29, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 572, "hpMult": 5.72, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 19, "bountyMult": 1.58, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "grunt", "count": 11, "hp": 361, "hpMult": 9.03, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 11, "bountyMult": 1.57, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 912, "hpMult": 9.12, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 23, "bountyMult": 1.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "tank", "count": 7, "hp": 865, "hpMult": 8.65, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 20, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 6638, "hpMult": 66.38, "speed": 32, "speedMult": 0.84, "interval": 1.2, "bounty": 175, "bountyMult": 14.58, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "14": {
    "mapId": "L14",
    "startHp": 10,
    "startGold": 155,
    "totalWaves": 8,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "grunt", "count": 8, "hp": 121, "hpMult": 3.03, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 11, "bountyMult": 1.57, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 10, "earlyBonus": 30, "spawns": [
        { "type": "grunt", "count": 10, "hp": 56, "hpMult": 1.4, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 5, "bountyMult": 0.71, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 5, "hp": 159, "hpMult": 1.59, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 11, "bountyMult": 0.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "scout", "count": 24, "hp": 44, "hpMult": 1.83, "speed": 110, "speedMult": 1.0, "interval": 0.5, "bounty": 5, "bountyMult": 0.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "tank", "count": 6, "hp": 225, "hpMult": 2.25, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 15, "bountyMult": 1.25, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 11, "hp": 127, "hpMult": 3.18, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 6, "bountyMult": 0.86, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "scout", "count": 26, "hp": 84, "hpMult": 3.5, "speed": 110, "speedMult": 1.0, "interval": 0.5, "bounty": 7, "bountyMult": 1.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 10, "earlyBonus": 30, "spawns": [
        { "type": "grunt", "count": 11, "hp": 225, "hpMult": 5.63, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 9, "bountyMult": 1.29, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 539, "hpMult": 5.39, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 23, "bountyMult": 1.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "tank", "count": 7, "hp": 771, "hpMult": 7.71, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 23, "bountyMult": 1.92, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 11, "hp": 308, "hpMult": 7.7, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 12, "bountyMult": 1.71, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "grunt", "count": 12, "hp": 386, "hpMult": 9.65, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 12, "bountyMult": 1.71, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 6970, "hpMult": 174.25, "speed": 47, "speedMult": 0.85, "interval": 1.2, "bounty": 206, "bountyMult": 29.43, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "15": {
    "mapId": "L15",
    "startHp": 10,
    "startGold": 170,
    "totalWaves": 8,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "swarm", "count": 16, "hp": 48, "hpMult": 3.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "scout", "count": 13, "hp": 70, "hpMult": 2.92, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 9, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "swarm", "count": 18, "hp": 90, "hpMult": 5.63, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "scout", "count": 14, "hp": 140, "hpMult": 5.83, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 13, "bountyMult": 2.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "swarm", "count": 22, "hp": 150, "hpMult": 9.38, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 10, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "scout", "count": 15, "hp": 229, "hpMult": 9.54, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 18, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "swarm", "count": 24, "hp": 195, "hpMult": 12.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 13, "bountyMult": 4.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "swarm", "count": 24, "hp": 152, "hpMult": 9.5, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 6569, "hpMult": 273.71, "speed": 94, "speedMult": 0.85, "interval": 1.2, "bounty": 198, "bountyMult": 33.0, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "16": {
    "mapId": "L16",
    "startHp": 10,
    "startGold": 185,
    "totalWaves": 9,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 14, "earlyBonus": 35, "spawns": [
        { "type": "swarm", "count": 16, "hp": 23, "hpMult": 1.44, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 20, "earlyBonus": 35, "spawns": [
        { "type": "grunt", "count": 11, "hp": 104, "hpMult": 2.6, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 5, "bountyMult": 0.71, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 5, "hp": 225, "hpMult": 2.25, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 13, "bountyMult": 1.08, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 14, "earlyBonus": 35, "spawns": [
        { "type": "scout", "count": 13, "hp": 135, "hpMult": 5.63, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 11, "bountyMult": 1.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 14, "earlyBonus": 35, "spawns": [
        { "type": "grunt", "count": 12, "hp": 192, "hpMult": 4.8, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 8, "bountyMult": 1.14, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 489, "hpMult": 4.89, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 15, "bountyMult": 1.25, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 14, "earlyBonus": 35, "spawns": [
        { "type": "swarm", "count": 22, "hp": 153, "hpMult": 9.56, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 11, "bountyMult": 3.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 20, "earlyBonus": 35, "spawns": [
        { "type": "tank", "count": 7, "hp": 505, "hpMult": 5.05, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 23, "bountyMult": 1.92, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 12, "hp": 326, "hpMult": 8.15, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 11, "bountyMult": 1.57, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 14, "earlyBonus": 35, "spawns": [
        { "type": "scout", "count": 14, "hp": 383, "hpMult": 15.96, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 25, "bountyMult": 4.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 14, "earlyBonus": 35, "spawns": [
        { "type": "tank", "count": 8, "hp": 1069, "hpMult": 10.69, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 26, "bountyMult": 2.17, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 13, "hp": 505, "hpMult": 12.63, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 16, "bountyMult": 2.29, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 14, "earlyBonus": 35, "spawns": [
        { "type": "swarm", "count": 24, "hp": 217, "hpMult": 13.56, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 16280, "hpMult": 162.8, "speed": 32, "speedMult": 0.84, "interval": 1.2, "bounty": 293, "bountyMult": 24.42, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "17": {
    "mapId": "L17",
    "startHp": 10,
    "startGold": 200,
    "totalWaves": 9,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 24, "earlyBonus": 40, "spawns": [
        { "type": "swarm", "count": 16, "hp": 12, "hpMult": 0.75, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 14, "earlyBonus": 40, "spawns": [
        { "type": "scout", "count": 14, "hp": 44, "hpMult": 1.83, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 5, "bountyMult": 0.83, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 18, "hp": 13, "hpMult": 0.81, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 3, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 14, "earlyBonus": 40, "spawns": [
        { "type": "scout", "count": 13, "hp": 88, "hpMult": 3.67, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 7, "bountyMult": 1.17, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 20, "hp": 53, "hpMult": 3.31, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 4, "bountyMult": 1.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 20, "earlyBonus": 40, "spawns": [
        { "type": "grunt", "count": 12, "hp": 188, "hpMult": 4.7, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 9, "bountyMult": 1.29, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 361, "hpMult": 3.61, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 17, "bountyMult": 1.42, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 14, "earlyBonus": 40, "spawns": [
        { "type": "scout", "count": 14, "hp": 178, "hpMult": 7.42, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 11, "bountyMult": 1.83, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 22, "hp": 80, "hpMult": 5.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 5, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 14, "earlyBonus": 40, "spawns": [
        { "type": "scout", "count": 16, "hp": 147, "hpMult": 6.13, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 12, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 24, "hp": 67, "hpMult": 4.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 5, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 20, "earlyBonus": 40, "spawns": [
        { "type": "grunt", "count": 13, "hp": 546, "hpMult": 13.65, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 13, "bountyMult": 1.86, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 7, "hp": 899, "hpMult": 8.99, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 31, "bountyMult": 2.58, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 14, "earlyBonus": 40, "spawns": [
        { "type": "grunt", "count": 14, "hp": 536, "hpMult": 13.4, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 15, "bountyMult": 2.14, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 8, "hp": 864, "hpMult": 8.64, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 31, "bountyMult": 2.58, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 14, "earlyBonus": 40, "spawns": [
        { "type": "scout", "count": 16, "hp": 362, "hpMult": 15.08, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 26, "hp": 234, "hpMult": 14.63, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 5, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 15066, "hpMult": 376.65, "speed": 47, "speedMult": 0.85, "interval": 1.2, "bounty": 250, "bountyMult": 35.71, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "18": {
    "mapId": "L18",
    "startHp": 10,
    "startGold": 110,
    "totalWaves": 9,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 14, "earlyBonus": 15, "spawns": [
        { "type": "swarm", "count": 16, "hp": 16, "hpMult": 1.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 3, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 14, "earlyBonus": 15, "spawns": [
        { "type": "grunt", "count": 12, "hp": 46, "hpMult": 1.15, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 148, "hpMult": 1.48, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 14, "earlyBonus": 15, "spawns": [
        { "type": "scout", "count": 14, "hp": 54, "hpMult": 2.25, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 7, "bountyMult": 1.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 20, "earlyBonus": 15, "spawns": [
        { "type": "grunt", "count": 13, "hp": 47, "hpMult": 1.18, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 179, "hpMult": 1.79, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 14, "earlyBonus": 15, "spawns": [
        { "type": "swarm", "count": 22, "hp": 16, "hpMult": 1.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 5, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 20, "earlyBonus": 15, "spawns": [
        { "type": "tank", "count": 7, "hp": 141, "hpMult": 1.41, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 14, "hp": 78, "hpMult": 1.95, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 14, "earlyBonus": 15, "spawns": [
        { "type": "scout", "count": 16, "hp": 84, "hpMult": 3.5, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 6, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 14, "earlyBonus": 15, "spawns": [
        { "type": "swarm", "count": 26, "hp": 58, "hpMult": 3.63, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 14, "earlyBonus": 15, "spawns": [
        { "type": "tank", "count": 8, "hp": 364, "hpMult": 3.64, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 15, "bountyMult": 1.25, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 1840, "hpMult": 76.67, "speed": 94, "speedMult": 0.85, "interval": 1.2, "bounty": 180, "bountyMult": 30.0, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "19": {
    "mapId": "L19",
    "startHp": 10,
    "startGold": 230,
    "totalWaves": 10,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 1, "hp": 2742, "hpMult": 27.42, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 110, "bountyMult": 9.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 2, "hp": 1626, "hpMult": 16.26, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 73, "bountyMult": 6.08, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 3, "hp": 2301, "hpMult": 23.01, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 62, "bountyMult": 5.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 4, "hp": 1700, "hpMult": 17.0, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 59, "bountyMult": 4.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 5, "hp": 2504, "hpMult": 25.04, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 59, "bountyMult": 4.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 6, "hp": 2307, "hpMult": 23.07, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 61, "bountyMult": 5.08, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 7, "hp": 3216, "hpMult": 32.16, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 64, "bountyMult": 5.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 8, "hp": 2542, "hpMult": 25.42, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 66, "bountyMult": 5.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 9, "hp": 3629, "hpMult": 36.29, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 69, "bountyMult": 5.75, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 14, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 10, "hp": 1990, "hpMult": 19.9, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 35, "bountyMult": 2.92, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 29844, "hpMult": 298.44, "speed": 32, "speedMult": 0.84, "interval": 1.2, "bounty": 370, "bountyMult": 30.83, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "20": {
    "mapId": "L20",
    "startHp": 10,
    "startGold": 250,
    "totalWaves": 10,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 24, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 18, "hp": 65, "hpMult": 4.06, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 2, "bountyMult": 0.67, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 72, "hpMult": 0.72, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 13, "bountyMult": 1.08, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 14, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 20, "hp": 62, "hpMult": 3.88, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 3, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 13, "hp": 24, "hpMult": 0.6, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 7, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 20, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 20, "hp": 94, "hpMult": 5.88, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 4, "bountyMult": 1.33, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 7, "hp": 169, "hpMult": 1.69, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 17, "bountyMult": 1.42, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 14, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 22, "hp": 83, "hpMult": 5.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 4, "bountyMult": 1.33, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 14, "hp": 56, "hpMult": 1.4, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 12, "bountyMult": 1.71, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 14, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 22, "hp": 115, "hpMult": 7.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 4, "bountyMult": 1.33, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 7, "hp": 296, "hpMult": 2.96, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 17, "bountyMult": 1.42, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 14, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 20, "hp": 116, "hpMult": 7.25, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 14, "hp": 110, "hpMult": 2.75, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 7, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 20, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 24, "hp": 139, "hpMult": 8.69, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 8, "hp": 476, "hpMult": 4.76, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 22, "bountyMult": 1.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 14, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 26, "hp": 148, "hpMult": 9.25, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 15, "hp": 257, "hpMult": 6.43, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 14, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 20, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 26, "hp": 202, "hpMult": 12.63, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 9, "hp": 583, "hpMult": 5.83, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 24, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 14, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 18, "hp": 300, "hpMult": 12.5, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 28, "hp": 300, "hpMult": 18.75, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 9, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false },
        { "type": "hive_empress", "count": 1, "hp": 29840, "hpMult": 13.56, "speed": 38, "speedMult": 1.0, "interval": 1.2, "bounty": 400, "bountyMult": 6.67, "isBoss": true, "isMiniBoss": false }
      ]}
    ]
  },
  "21": {
    "mapId": "L21",
    "startHp": 10,
    "startGold": 160,
    "totalWaves": 9,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 12, "earlyBonus": 50, "spawns": [
        { "type": "grunt", "count": 8, "hp": 227, "hpMult": 5.68, "speed": 55, "speedMult": 1.0, "interval": 0.66, "bounty": 14, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "blinker", "count": 2, "hp": 371, "hpMult": 5.71, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 50, "bountyMult": 6.25, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 14, "hp": 19, "hpMult": 1.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 2, "bountyMult": 0.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 13, "earlyBonus": 50, "spawns": [
        { "type": "grunt", "count": 9, "hp": 309, "hpMult": 7.73, "speed": 55, "speedMult": 1.0, "interval": 0.66, "bounty": 16, "bountyMult": 2.29, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 10, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 10, "hp": 197, "hpMult": 8.21, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 17, "bountyMult": 2.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 14, "earlyBonus": 50, "spawns": [
        { "type": "blinker", "count": 2, "hp": 989, "hpMult": 15.22, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 70, "bountyMult": 8.75, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 9, "hp": 134, "hpMult": 3.35, "speed": 55, "speedMult": 1.0, "interval": 0.66, "bounty": 7, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 12, "earlyBonus": 50, "spawns": [
        { "type": "blinker", "count": 2, "hp": 1276, "hpMult": 19.63, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 72, "bountyMult": 9.0, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 11, "hp": 197, "hpMult": 8.21, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 9, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 8, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 16, "hp": 200, "hpMult": 12.5, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 9, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 3, "hp": 1070, "hpMult": 16.46, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 49, "bountyMult": 6.13, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 13, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 11, "hp": 568, "hpMult": 23.67, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 22, "bountyMult": 3.67, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 16, "hp": 176, "hpMult": 11.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 7, "bountyMult": 2.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "blinker", "count": 3, "hp": 1606, "hpMult": 24.71, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 60, "bountyMult": 7.5, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 10707, "hpMult": 164.72, "speed": 53, "speedMult": 0.85, "interval": 1.2, "bounty": 240, "bountyMult": 30.0, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "22": {
    "mapId": "L22",
    "startHp": 10,
    "startGold": 170,
    "totalWaves": 9,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 10, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 11, "hp": 134, "hpMult": 5.58, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 9, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 15, "hp": 78, "hpMult": 4.88, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 9, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 13, "earlyBonus": 50, "spawns": [
        { "type": "blinker", "count": 3, "hp": 659, "hpMult": 10.14, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 52, "bountyMult": 6.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 11, "hp": 185, "hpMult": 7.71, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 15, "hp": 87, "hpMult": 5.44, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 5, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 12, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 12, "hp": 268, "hpMult": 11.17, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 13, "bountyMult": 2.17, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 2, "hp": 741, "hpMult": 11.4, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 32, "bountyMult": 4.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 11, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 18, "hp": 176, "hpMult": 11.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 12, "hp": 259, "hpMult": 10.79, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 13, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 13, "hp": 403, "hpMult": 16.79, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 15, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 3, "hp": 1154, "hpMult": 17.75, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 42, "bountyMult": 5.25, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 8, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 20, "hp": 309, "hpMult": 19.31, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 14, "bountyMult": 4.67, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 3, "hp": 989, "hpMult": 15.22, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 35, "bountyMult": 4.38, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 14, "hp": 395, "hpMult": 16.46, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 15, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 9885, "hpMult": 411.88, "speed": 94, "speedMult": 0.85, "interval": 1.2, "bounty": 255, "bountyMult": 42.5, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "23": {
    "mapId": "L23",
    "startHp": 10,
    "startGold": 185,
    "totalWaves": 10,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 4, "hp": 948, "hpMult": 9.48, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 30, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "grunt", "count": 10, "hp": 330, "hpMult": 8.25, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 14, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 5, "hp": 700, "hpMult": 7.0, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 23, "bountyMult": 1.92, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 8, "hp": 176, "hpMult": 4.4, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 6, "bountyMult": 0.86, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "blinker", "count": 3, "hp": 989, "hpMult": 15.22, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 65, "bountyMult": 8.13, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 6, "hp": 905, "hpMult": 9.05, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 25, "bountyMult": 2.08, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 2, "hp": 824, "hpMult": 12.68, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 42, "bountyMult": 5.25, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 6, "hp": 1070, "hpMult": 10.7, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 28, "bountyMult": 2.33, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 10, "hp": 433, "hpMult": 10.83, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 11, "bountyMult": 1.57, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "blinker", "count": 3, "hp": 1339, "hpMult": 20.6, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 55, "bountyMult": 6.88, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 1400, "hpMult": 14.0, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 28, "bountyMult": 2.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 7, "hp": 1750, "hpMult": 17.5, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 38, "bountyMult": 3.17, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 3, "hp": 1195, "hpMult": 18.38, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 44, "bountyMult": 5.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "grunt", "count": 11, "hp": 814, "hpMult": 20.35, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 18, "bountyMult": 2.57, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 8, "hp": 2369, "hpMult": 23.69, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 35, "bountyMult": 2.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 7, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 8, "hp": 2883, "hpMult": 28.83, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 35, "bountyMult": 2.92, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 23681, "hpMult": 236.81, "speed": 32, "speedMult": 0.84, "interval": 1.2, "bounty": 290, "bountyMult": 24.17, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "24": {
    "mapId": "L24",
    "startHp": 10,
    "startGold": 200,
    "totalWaves": 10,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 14, "earlyBonus": 55, "spawns": [
        { "type": "grunt", "count": 11, "hp": 330, "hpMult": 8.25, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 11, "bountyMult": 1.57, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 16, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 5, "hp": 905, "hpMult": 9.05, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 29, "bountyMult": 2.42, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 8, "earlyBonus": 55, "spawns": [
        { "type": "blinker", "count": 2, "hp": 1133, "hpMult": 17.43, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 60, "bountyMult": 7.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 16, "hp": 46, "hpMult": 2.88, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 3, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 16, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 6, "hp": 989, "hpMult": 9.89, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 22, "bountyMult": 1.83, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 11, "hp": 371, "hpMult": 9.28, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 7, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 11, "earlyBonus": 55, "spawns": [
        { "type": "scout", "count": 13, "hp": 350, "hpMult": 14.58, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 19, "bountyMult": 3.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 14, "earlyBonus": 55, "spawns": [
        { "type": "blinker", "count": 3, "hp": 1276, "hpMult": 19.63, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 60, "bountyMult": 7.5, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 13, "hp": 259, "hpMult": 10.79, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 9, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 16, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 7, "hp": 1689, "hpMult": 16.89, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 35, "bountyMult": 2.92, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 2, "hp": 1195, "hpMult": 18.38, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 57, "bountyMult": 7.13, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 9, "earlyBonus": 55, "spawns": [
        { "type": "swarm", "count": 22, "hp": 259, "hpMult": 16.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 19, "bountyMult": 6.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 14, "earlyBonus": 55, "spawns": [
        { "type": "blinker", "count": 3, "hp": 1833, "hpMult": 28.2, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 95, "bountyMult": 11.88, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 12, "hp": 905, "hpMult": 22.63, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 19, "bountyMult": 2.71, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 7, "earlyBonus": 55, "spawns": [
        { "type": "grunt", "count": 14, "hp": 1154, "hpMult": 28.85, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 22, "bountyMult": 3.14, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 27799, "hpMult": 694.98, "speed": 47, "speedMult": 0.85, "interval": 1.2, "bounty": 302, "bountyMult": 43.14, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "25": {
    "mapId": "L25",
    "startHp": 10,
    "startGold": 215,
    "totalWaves": 10,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 13, "earlyBonus": 60, "spawns": [
        { "type": "grunt", "count": 12, "hp": 330, "hpMult": 8.25, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 11, "bountyMult": 1.57, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 14, "earlyBonus": 60, "spawns": [
        { "type": "blinker", "count": 3, "hp": 944, "hpMult": 14.52, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 52, "bountyMult": 6.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 11, "earlyBonus": 60, "spawns": [
        { "type": "scout", "count": 14, "hp": 246, "hpMult": 10.25, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 13, "bountyMult": 2.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 8, "earlyBonus": 60, "spawns": [
        { "type": "swarm", "count": 20, "hp": 227, "hpMult": 14.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 11, "bountyMult": 3.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 16, "earlyBonus": 60, "spawns": [
        { "type": "tank", "count": 9, "hp": 1689, "hpMult": 16.89, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 30, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 14, "earlyBonus": 60, "spawns": [
        { "type": "blinker", "count": 3, "hp": 1606, "hpMult": 24.71, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 65, "bountyMult": 8.13, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 13, "hp": 433, "hpMult": 10.83, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 12, "earlyBonus": 60, "spawns": [
        { "type": "scout", "count": 15, "hp": 494, "hpMult": 20.58, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 16, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 22, "hp": 227, "hpMult": 14.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 7, "bountyMult": 2.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 16, "earlyBonus": 60, "spawns": [
        { "type": "tank", "count": 9, "hp": 2368, "hpMult": 23.68, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 36, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 4, "hp": 1400, "hpMult": 21.54, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 35, "bountyMult": 4.38, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 13, "earlyBonus": 60, "spawns": [
        { "type": "blinker", "count": 4, "hp": 2430, "hpMult": 37.38, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 70, "bountyMult": 8.75, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 24, "hp": 453, "hpMult": 28.31, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 11, "bountyMult": 3.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 7, "earlyBonus": 60, "spawns": [
        { "type": "blinker", "count": 4, "hp": 2163, "hpMult": 33.28, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 75, "bountyMult": 9.38, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 24710, "hpMult": 380.15, "speed": 53, "speedMult": 0.85, "interval": 1.2, "bounty": 360, "bountyMult": 45.0, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "26": {
    "mapId": "L26",
    "startHp": 10,
    "startGold": 235,
    "totalWaves": 11,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 9, "earlyBonus": 65, "spawns": [
        { "type": "swarm", "count": 18, "hp": 81, "hpMult": 5.06, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 7, "bountyMult": 2.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 11, "earlyBonus": 65, "spawns": [
        { "type": "scout", "count": 15, "hp": 156, "hpMult": 6.5, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 11, "bountyMult": 1.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 11, "earlyBonus": 65, "spawns": [
        { "type": "swarm", "count": 22, "hp": 134, "hpMult": 8.38, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 10, "hp": 144, "hpMult": 6.0, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 6, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 10, "earlyBonus": 65, "spawns": [
        { "type": "swarm", "count": 24, "hp": 185, "hpMult": 11.56, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 10, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 12, "earlyBonus": 65, "spawns": [
        { "type": "scout", "count": 16, "hp": 278, "hpMult": 11.58, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 11, "bountyMult": 1.83, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 22, "hp": 144, "hpMult": 9.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 5, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 13, "earlyBonus": 65, "spawns": [
        { "type": "blinker", "count": 4, "hp": 989, "hpMult": 15.22, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 50, "bountyMult": 6.25, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 24, "hp": 197, "hpMult": 12.31, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 11, "earlyBonus": 65, "spawns": [
        { "type": "scout", "count": 18, "hp": 433, "hpMult": 18.04, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 23, "bountyMult": 3.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 12, "earlyBonus": 65, "spawns": [
        { "type": "swarm", "count": 26, "hp": 288, "hpMult": 18.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 11, "bountyMult": 3.67, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 16, "hp": 309, "hpMult": 12.88, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 13, "bountyMult": 2.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 10, "earlyBonus": 65, "spawns": [
        { "type": "swarm", "count": 30, "hp": 411, "hpMult": 25.69, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 20, "bountyMult": 6.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 11, "earlyBonus": 65, "spawns": [
        { "type": "scout", "count": 20, "hp": 576, "hpMult": 24.0, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 20, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 30, "hp": 371, "hpMult": 23.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 10, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 11, "delayAfter": 7, "earlyBonus": 65, "spawns": [
        { "type": "swarm", "count": 30, "hp": 494, "hpMult": 30.88, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 15, "bountyMult": 5.0, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 20181, "hpMult": 840.88, "speed": 94, "speedMult": 0.85, "interval": 1.2, "bounty": 375, "bountyMult": 62.5, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "27": {
    "mapId": "L27",
    "startHp": 10,
    "startGold": 255,
    "totalWaves": 11,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 10, "earlyBonus": 70, "spawns": [
        { "type": "grunt", "count": 1, "hp": 371, "hpMult": 9.28, "speed": 55, "speedMult": 1.0, "interval": 0.45, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 227, "hpMult": 9.46, "speed": 55, "speedMult": 0.5, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 371, "hpMult": 9.28, "speed": 55, "speedMult": 1.0, "interval": 0.45, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 227, "hpMult": 9.46, "speed": 55, "speedMult": 0.5, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 371, "hpMult": 9.28, "speed": 55, "speedMult": 1.0, "interval": 0.45, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 227, "hpMult": 9.46, "speed": 55, "speedMult": 0.5, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 371, "hpMult": 9.28, "speed": 55, "speedMult": 1.0, "interval": 0.45, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 227, "hpMult": 9.46, "speed": 55, "speedMult": 0.5, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 371, "hpMult": 9.28, "speed": 55, "speedMult": 1.0, "interval": 0.45, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 227, "hpMult": 9.46, "speed": 55, "speedMult": 0.5, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 371, "hpMult": 9.28, "speed": 55, "speedMult": 1.0, "interval": 0.45, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 227, "hpMult": 9.46, "speed": 55, "speedMult": 0.5, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 371, "hpMult": 9.28, "speed": 55, "speedMult": 1.0, "interval": 0.45, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 227, "hpMult": 9.46, "speed": 55, "speedMult": 0.5, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 10, "earlyBonus": 70, "spawns": [
        { "type": "grunt", "count": 1, "hp": 371, "hpMult": 9.28, "speed": 55, "speedMult": 1.0, "interval": 0.5, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 989, "hpMult": 9.89, "speed": 55, "speedMult": 1.45, "interval": 0.5, "bounty": 18, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 371, "hpMult": 9.28, "speed": 55, "speedMult": 1.0, "interval": 0.5, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 989, "hpMult": 9.89, "speed": 55, "speedMult": 1.45, "interval": 0.5, "bounty": 18, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 371, "hpMult": 9.28, "speed": 55, "speedMult": 1.0, "interval": 0.5, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 989, "hpMult": 9.89, "speed": 55, "speedMult": 1.45, "interval": 0.5, "bounty": 18, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 371, "hpMult": 9.28, "speed": 55, "speedMult": 1.0, "interval": 0.5, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 989, "hpMult": 9.89, "speed": 55, "speedMult": 1.45, "interval": 0.5, "bounty": 18, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 371, "hpMult": 9.28, "speed": 55, "speedMult": 1.0, "interval": 0.5, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 989, "hpMult": 9.89, "speed": 55, "speedMult": 1.45, "interval": 0.5, "bounty": 18, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 371, "hpMult": 9.28, "speed": 55, "speedMult": 1.0, "interval": 0.5, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 989, "hpMult": 9.89, "speed": 55, "speedMult": 1.45, "interval": 0.5, "bounty": 20, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 10, "earlyBonus": 70, "spawns": [
        { "type": "swarm", "count": 1, "hp": 103, "hpMult": 6.44, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 601, "hpMult": 9.25, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 1, "hp": 103, "hpMult": 6.44, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 601, "hpMult": 9.25, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 1, "hp": 103, "hpMult": 6.44, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 601, "hpMult": 9.25, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 1, "hp": 103, "hpMult": 6.44, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 601, "hpMult": 9.25, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 1, "hp": 103, "hpMult": 6.44, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 601, "hpMult": 9.25, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 1, "hp": 103, "hpMult": 6.44, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 601, "hpMult": 9.25, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 1, "hp": 103, "hpMult": 6.44, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 601, "hpMult": 9.25, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 1, "hp": 103, "hpMult": 6.44, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 601, "hpMult": 9.25, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 23, "bountyMult": 2.88, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 10, "earlyBonus": 70, "spawns": [
        { "type": "grunt", "count": 5, "hp": 453, "hpMult": 11.33, "speed": 65, "speedMult": 1.18, "interval": 0.45, "bounty": 12, "bountyMult": 1.71, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 5, "hp": 309, "hpMult": 12.88, "speed": 65, "speedMult": 0.59, "interval": 0.45, "bounty": 15, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 5, "hp": 1750, "hpMult": 17.5, "speed": 65, "speedMult": 1.71, "interval": 0.45, "bounty": 23, "bountyMult": 1.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 11, "earlyBonus": 70, "spawns": [
        { "type": "blinker", "count": 10, "hp": 948, "hpMult": 14.58, "speed": 68, "speedMult": 1.1, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 5, "hp": 453, "hpMult": 11.33, "speed": 68, "speedMult": 1.24, "interval": 0.45, "bounty": 11, "bountyMult": 1.57, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 5, "hp": 268, "hpMult": 11.17, "speed": 68, "speedMult": 0.62, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 11, "earlyBonus": 70, "spawns": [
        { "type": "swarm", "count": 12, "hp": 246, "hpMult": 15.38, "speed": 72, "speedMult": 0.42, "interval": 0.4, "bounty": 9, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 6, "hp": 536, "hpMult": 22.33, "speed": 72, "speedMult": 0.65, "interval": 0.4, "bounty": 22, "bountyMult": 3.67, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 2471, "hpMult": 24.71, "speed": 72, "speedMult": 1.89, "interval": 0.4, "bounty": 21, "bountyMult": 1.75, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 11, "earlyBonus": 70, "spawns": [
        { "type": "tank", "count": 8, "hp": 2574, "hpMult": 25.74, "speed": 65, "speedMult": 1.71, "interval": 0.45, "bounty": 30, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 8, "hp": 989, "hpMult": 15.22, "speed": 65, "speedMult": 1.05, "interval": 0.45, "bounty": 25, "bountyMult": 3.13, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 11, "earlyBonus": 70, "spawns": [
        { "type": "grunt", "count": 6, "hp": 659, "hpMult": 16.48, "speed": 76, "speedMult": 1.38, "interval": 0.4, "bounty": 18, "bountyMult": 2.57, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 6, "hp": 391, "hpMult": 16.29, "speed": 76, "speedMult": 0.69, "interval": 0.4, "bounty": 18, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 6, "hp": 288, "hpMult": 18.0, "speed": 76, "speedMult": 0.45, "interval": 0.4, "bounty": 12, "bountyMult": 4.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 6, "hp": 2780, "hpMult": 42.77, "speed": 76, "speedMult": 1.23, "interval": 0.4, "bounty": 40, "bountyMult": 5.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 11, "earlyBonus": 70, "spawns": [
        { "type": "tank", "count": 6, "hp": 3398, "hpMult": 33.98, "speed": 78, "speedMult": 2.05, "interval": 0.4, "bounty": 40, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 6, "hp": 556, "hpMult": 23.17, "speed": 78, "speedMult": 0.71, "interval": 0.4, "bounty": 20, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 6, "hp": 1956, "hpMult": 30.09, "speed": 78, "speedMult": 1.26, "interval": 0.4, "bounty": 35, "bountyMult": 4.38, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 6, "hp": 391, "hpMult": 24.44, "speed": 78, "speedMult": 0.46, "interval": 0.4, "bounty": 10, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 11, "earlyBonus": 70, "spawns": [
        { "type": "tank", "count": 5, "hp": 4324, "hpMult": 43.24, "speed": 82, "speedMult": 2.16, "interval": 0.38, "bounty": 50, "bountyMult": 4.17, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 5, "hp": 2163, "hpMult": 33.28, "speed": 82, "speedMult": 1.32, "interval": 0.38, "bounty": 40, "bountyMult": 5.0, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 5, "hp": 865, "hpMult": 21.63, "speed": 82, "speedMult": 1.49, "interval": 0.38, "bounty": 25, "bountyMult": 3.57, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 5, "hp": 618, "hpMult": 25.75, "speed": 82, "speedMult": 0.75, "interval": 0.38, "bounty": 20, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 5, "hp": 494, "hpMult": 30.88, "speed": 82, "speedMult": 0.48, "interval": 0.38, "bounty": 14, "bountyMult": 4.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 11, "delayAfter": 7, "earlyBonus": 70, "spawns": [
        { "type": "tank", "count": 6, "hp": 1750, "hpMult": 17.5, "speed": 85, "speedMult": 2.24, "interval": 0.35, "bounty": 30, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 6, "hp": 865, "hpMult": 13.31, "speed": 85, "speedMult": 1.37, "interval": 0.35, "bounty": 25, "bountyMult": 3.13, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 6, "hp": 659, "hpMult": 27.46, "speed": 85, "speedMult": 0.77, "interval": 0.35, "bounty": 25, "bountyMult": 4.17, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 6, "hp": 700, "hpMult": 43.75, "speed": 85, "speedMult": 0.5, "interval": 0.35, "bounty": 15, "bountyMult": 5.0, "isBoss": false, "isMiniBoss": false },
        { "type": "hive_empress", "count": 1, "hp": 30888, "hpMult": 14.04, "speed": 40, "speedMult": 1.05, "interval": 1.2, "bounty": 260, "bountyMult": 4.33, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "28": {
    "mapId": "L28",
    "startHp": 10,
    "startGold": 135,
    "totalWaves": 11,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 14, "earlyBonus": 25, "spawns": [
        { "type": "swarm", "count": 18, "hp": 73, "hpMult": 4.56, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 14, "earlyBonus": 25, "spawns": [
        { "type": "grunt", "count": 14, "hp": 176, "hpMult": 4.4, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 2, "hp": 453, "hpMult": 6.97, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 14, "earlyBonus": 25, "spawns": [
        { "type": "scout", "count": 16, "hp": 165, "hpMult": 6.88, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 14, "bountyMult": 2.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 16, "earlyBonus": 25, "spawns": [
        { "type": "tank", "count": 8, "hp": 659, "hpMult": 6.59, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 3, "hp": 576, "hpMult": 8.86, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 14, "earlyBonus": 25, "spawns": [
        { "type": "swarm", "count": 24, "hp": 197, "hpMult": 12.31, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 14, "bountyMult": 4.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 14, "earlyBonus": 25, "spawns": [
        { "type": "blinker", "count": 4, "hp": 783, "hpMult": 12.05, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 15, "hp": 185, "hpMult": 7.71, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 16, "earlyBonus": 25, "spawns": [
        { "type": "grunt", "count": 16, "hp": 391, "hpMult": 9.78, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 15, "bountyMult": 2.14, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 8, "hp": 1194, "hpMult": 11.94, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 30, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 14, "earlyBonus": 25, "spawns": [
        { "type": "swarm", "count": 28, "hp": 288, "hpMult": 18.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 20, "bountyMult": 6.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 14, "earlyBonus": 25, "spawns": [
        { "type": "blinker", "count": 4, "hp": 1400, "hpMult": 21.54, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 15, "hp": 494, "hpMult": 12.35, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 14, "earlyBonus": 25, "spawns": [
        { "type": "scout", "count": 20, "hp": 700, "hpMult": 29.17, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 40, "bountyMult": 6.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 11, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "blinker", "count": 5, "hp": 2574, "hpMult": 39.6, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 75, "bountyMult": 9.38, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 32947, "hpMult": 506.88, "speed": 53, "speedMult": 0.85, "interval": 1.2, "bounty": 560, "bountyMult": 70.0, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "29": {
    "mapId": "L29",
    "startHp": 10,
    "startGold": 295,
    "totalWaves": 12,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 12, "hp": 869, "hpMult": 8.69, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 13, "bountyMult": 1.08, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 11, "hp": 1273, "hpMult": 12.73, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 17, "bountyMult": 1.42, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 10, "hp": 1792, "hpMult": 17.92, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 23, "bountyMult": 1.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 9, "hp": 2517, "hpMult": 25.17, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 31, "bountyMult": 2.58, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 8, "hp": 3474, "hpMult": 34.74, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 43, "bountyMult": 3.58, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 7, "hp": 3265, "hpMult": 32.65, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 39, "bountyMult": 3.25, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 4, "hp": 1483, "hpMult": 22.82, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 35, "bountyMult": 4.38, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 6, "hp": 6727, "hpMult": 67.27, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 82, "bountyMult": 6.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 5, "hp": 6424, "hpMult": 64.24, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 72, "bountyMult": 6.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 4, "hp": 2163, "hpMult": 33.28, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 55, "bountyMult": 6.88, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 4, "hp": 13901, "hpMult": 139.01, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 171, "bountyMult": 14.25, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 3, "hp": 21630, "hpMult": 216.3, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 267, "bountyMult": 22.25, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 11, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 2, "hp": 26054, "hpMult": 260.54, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 303, "bountyMult": 25.25, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 5, "hp": 2780, "hpMult": 42.77, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 63, "bountyMult": 7.88, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 12, "delayAfter": 14, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 1, "hp": 40776, "hpMult": 407.76, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 540, "bountyMult": 45.0, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 70013, "hpMult": 700.13, "speed": 32, "speedMult": 0.84, "interval": 1.2, "bounty": 520, "bountyMult": 43.33, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "30": {
    "mapId": "L30",
    "startHp": 10,
    "startGold": 320,
    "totalWaves": 12,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 7, "earlyBonus": 75, "spawns": [
        { "type": "blinker", "count": 5, "hp": 652, "hpMult": 10.03, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 27, "bountyMult": 3.38, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 24, "hp": 39, "hpMult": 2.44, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 2, "bountyMult": 0.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 13, "earlyBonus": 75, "spawns": [
        { "type": "blinker", "count": 5, "hp": 824, "hpMult": 12.68, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 30, "bountyMult": 3.75, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 14, "hp": 146, "hpMult": 3.65, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 5, "bountyMult": 0.71, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 16, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 9, "hp": 1115, "hpMult": 11.15, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 20, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 4, "hp": 652, "hpMult": 10.03, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 19, "bountyMult": 2.38, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 14, "earlyBonus": 75, "spawns": [
        { "type": "blinker", "count": 5, "hp": 1459, "hpMult": 22.45, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 43, "bountyMult": 5.38, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 16, "hp": 172, "hpMult": 7.17, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 6, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 8, "earlyBonus": 75, "spawns": [
        { "type": "swarm", "count": 30, "hp": 309, "hpMult": 19.31, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 6, "hp": 926, "hpMult": 14.25, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 23, "bountyMult": 2.88, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 16, "earlyBonus": 75, "spawns": [
        { "type": "blinker", "count": 6, "hp": 1802, "hpMult": 27.72, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 45, "bountyMult": 5.63, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 10, "hp": 1269, "hpMult": 12.69, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 18, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 14, "earlyBonus": 75, "spawns": [
        { "type": "scout", "count": 18, "hp": 824, "hpMult": 34.33, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 18, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 6, "hp": 1527, "hpMult": 23.49, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 36, "bountyMult": 4.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 14, "earlyBonus": 75, "spawns": [
        { "type": "blinker", "count": 7, "hp": 2402, "hpMult": 36.95, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 55, "bountyMult": 6.88, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 18, "hp": 704, "hpMult": 17.6, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 14, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 16, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 12, "hp": 2488, "hpMult": 24.88, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 32, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 7, "hp": 2488, "hpMult": 38.28, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 52, "bountyMult": 6.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 7, "earlyBonus": 75, "spawns": [
        { "type": "swarm", "count": 30, "hp": 755, "hpMult": 47.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 12, "bountyMult": 4.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 8, "hp": 2574, "hpMult": 39.6, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 65, "bountyMult": 8.13, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 11, "delayAfter": 16, "earlyBonus": 75, "spawns": [
        { "type": "blinker", "count": 8, "hp": 3089, "hpMult": 47.52, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 63, "bountyMult": 7.88, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 21, "hp": 1269, "hpMult": 52.88, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 24, "bountyMult": 4.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 12, "delayAfter": 14, "earlyBonus": 75, "spawns": [
        { "type": "blinker", "count": 8, "hp": 1287, "hpMult": 19.8, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 45, "bountyMult": 5.63, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 30, "hp": 275, "hpMult": 17.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 10, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false },
        { "type": "chronos_warp", "count": 1, "hp": 47520, "hpMult": 11.31, "speed": 40, "speedMult": 1.0, "interval": 1.2, "bounty": 500, "bountyMult": 5.88, "isBoss": true, "isMiniBoss": false }
      ]}
    ]
  },
  "31": {
  "mapId": "L31",
  "startHp": 10,
  "canUpgrade": true,
  "unlockedTowers": [
    "gun",
    "laser",
    "mortar",
    "tesla",
    "stasis",
    "melter"
  ],
  "totalWaves": 10,
  "startGold": 190,
  "waves": [
    {
      "wave": 1,
      "delayAfter": 12,
      "earlyBonus": 65,
      "spawns": [
        {
          "type": "grunt",
          "count": 8,
          "hp": 180,
          "hpMult": 4.5,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.65,
          "bounty": 10,
          "bountyMult": 1.4,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 2,
      "delayAfter": 13,
      "earlyBonus": 65,
      "spawns": [
        {
          "type": "grunt",
          "count": 8,
          "hp": 140,
          "hpMult": 3.5,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.65,
          "bounty": 8,
          "bountyMult": 1.1,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "goliath",
          "count": 2,
          "hp": 1260,
          "hpMult": 3.16,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.2,
          "bounty": 38,
          "bountyMult": 1.9,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 3,
      "delayAfter": 11,
      "earlyBonus": 65,
      "spawns": [
        {
          "type": "scout",
          "count": 8,
          "hp": 110,
          "hpMult": 3.66,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.45,
          "bounty": 9,
          "bountyMult": 1.5,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "swarm",
          "count": 18,
          "hp": 70,
          "hpMult": 4.66,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.18,
          "bounty": 5,
          "bountyMult": 2.5,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 4,
      "delayAfter": 14,
      "earlyBonus": 65,
      "spawns": [
        {
          "type": "goliath",
          "count": 2,
          "hp": 1820,
          "hpMult": 4.56,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.4,
          "bounty": 45,
          "bountyMult": 2.25,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "tank",
          "count": 3,
          "hp": 780,
          "hpMult": 3.9,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.8,
          "bounty": 26,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 5,
      "delayAfter": 13,
      "earlyBonus": 65,
      "spawns": [
        {
          "type": "grunt",
          "count": 10,
          "hp": 240,
          "hpMult": 6,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.6,
          "bounty": 11,
          "bountyMult": 1.6,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 8,
          "hp": 180,
          "hpMult": 6,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.42,
          "bounty": 10,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 6,
      "delayAfter": 10,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "swarm",
          "count": 30,
          "hp": 110,
          "hpMult": 7.34,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.16,
          "bounty": 6,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 7,
      "delayAfter": 14,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 1820,
          "hpMult": 4.56,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.2,
          "bounty": 48,
          "bountyMult": 2.4,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "blinker",
          "count": 4,
          "hp": 730,
          "hpMult": 7.3,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.4,
          "bounty": 26,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 8,
      "delayAfter": 14,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "tank",
          "count": 4,
          "hp": 1000,
          "hpMult": 5,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.6,
          "bounty": 28,
          "bountyMult": 1.85,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 10,
          "hp": 220,
          "hpMult": 7.34,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.4,
          "bounty": 11,
          "bountyMult": 1.8,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 9,
      "delayAfter": 14,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 2100,
          "hpMult": 5.26,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 52,
          "bountyMult": 2.6,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "grunt",
          "count": 10,
          "hp": 340,
          "hpMult": 8.5,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.55,
          "bounty": 13,
          "bountyMult": 1.85,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 10,
      "delayAfter": 0,
      "earlyBonus": 0,
      "spawns": [
        {
          "type": "grunt",
          "count": 1,
          "hp": 9000,
          "hpMult": 225,
          "speed": 45,
          "speedMult": 0.82,
          "interval": 1,
          "bounty": 320,
          "bountyMult": 16,
          "isBoss": false,
          "isMiniBoss": true
        }
      ]
    }
  ]
},

  "32": {
  "mapId": "L32",
  "startHp": 10,
  "canUpgrade": true,
  "unlockedTowers": [
    "gun",
    "laser",
    "mortar",
    "tesla",
    "stasis",
    "melter"
  ],
  "totalWaves": 10,
  "startGold": 200,
  "waves": [
    {
      "wave": 1,
      "delayAfter": 11,
      "earlyBonus": 65,
      "spawns": [
        {
          "type": "scout",
          "count": 8,
          "hp": 150,
          "hpMult": 5,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.45,
          "bounty": 9,
          "bountyMult": 1.5,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 2,
      "delayAfter": 13,
      "earlyBonus": 65,
      "spawns": [
        {
          "type": "tank",
          "count": 3,
          "hp": 900,
          "hpMult": 4.5,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.8,
          "bounty": 26,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "grunt",
          "count": 8,
          "hp": 170,
          "hpMult": 4.26,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.65,
          "bounty": 9,
          "bountyMult": 1.3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 3,
      "delayAfter": 12,
      "earlyBonus": 65,
      "spawns": [
        {
          "type": "goliath",
          "count": 2,
          "hp": 1680,
          "hpMult": 4.2,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.2,
          "bounty": 42,
          "bountyMult": 2.1,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 8,
          "hp": 140,
          "hpMult": 4.66,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.45,
          "bounty": 10,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 4,
      "delayAfter": 10,
      "earlyBonus": 65,
      "spawns": [
        {
          "type": "swarm",
          "count": 24,
          "hp": 100,
          "hpMult": 6.66,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.17,
          "bounty": 5,
          "bountyMult": 2.5,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 5,
      "delayAfter": 13,
      "earlyBonus": 65,
      "spawns": [
        {
          "type": "blinker",
          "count": 3,
          "hp": 980,
          "hpMult": 9.8,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.5,
          "bounty": 30,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "grunt",
          "count": 8,
          "hp": 250,
          "hpMult": 6.26,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.6,
          "bounty": 11,
          "bountyMult": 1.6,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 6,
      "delayAfter": 14,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 1960,
          "hpMult": 4.9,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 46,
          "bountyMult": 2.3,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "tank",
          "count": 4,
          "hp": 1060,
          "hpMult": 5.3,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.6,
          "bounty": 28,
          "bountyMult": 1.85,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 7,
      "delayAfter": 11,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "scout",
          "count": 18,
          "hp": 270,
          "hpMult": 9,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.38,
          "bounty": 10,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 8,
      "delayAfter": 13,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 2240,
          "hpMult": 5.6,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 50,
          "bountyMult": 2.5,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "swarm",
          "count": 24,
          "hp": 140,
          "hpMult": 9.34,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.17,
          "bounty": 6,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 9,
      "delayAfter": 15,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "tank",
          "count": 5,
          "hp": 1240,
          "hpMult": 6.2,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.6,
          "bounty": 30,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "blinker",
          "count": 5,
          "hp": 1000,
          "hpMult": 10,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.3,
          "bounty": 32,
          "bountyMult": 2.1,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 10,
      "delayAfter": 0,
      "earlyBonus": 0,
      "spawns": [
        {
          "type": "goliath",
          "count": 2,
          "hp": 2520,
          "hpMult": 6.3,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.2,
          "bounty": 60,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 1,
          "hp": 6200,
          "hpMult": 206.6,
          "speed": 105,
          "speedMult": 0.95,
          "interval": 1,
          "bounty": 260,
          "bountyMult": 43.3,
          "isBoss": false,
          "isMiniBoss": true
        }
      ]
    }
  ]
},

  "33": {
  "mapId": "L33",
  "startHp": 10,
  "canUpgrade": true,
  "unlockedTowers": [
    "gun",
    "laser",
    "mortar",
    "tesla",
    "stasis",
    "melter"
  ],
  "totalWaves": 11,
  "startGold": 210,
  "waves": [
    {
      "wave": 1,
      "delayAfter": 12,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "grunt",
          "count": 10,
          "hp": 170,
          "hpMult": 4.26,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.62,
          "bounty": 9,
          "bountyMult": 1.3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 2,
      "delayAfter": 11,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "swarm",
          "count": 20,
          "hp": 84,
          "hpMult": 5.6,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.18,
          "bounty": 5,
          "bountyMult": 2.5,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "blinker",
          "count": 3,
          "hp": 780,
          "hpMult": 7.8,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.5,
          "bounty": 28,
          "bountyMult": 1.85,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 3,
      "delayAfter": 13,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "tank",
          "count": 4,
          "hp": 860,
          "hpMult": 4.3,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.6,
          "bounty": 26,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 8,
          "hp": 170,
          "hpMult": 5.66,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.45,
          "bounty": 10,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 4,
      "delayAfter": 14,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "goliath",
          "count": 2,
          "hp": 2100,
          "hpMult": 5.26,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.2,
          "bounty": 50,
          "bountyMult": 2.5,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "grunt",
          "count": 10,
          "hp": 220,
          "hpMult": 5.5,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.58,
          "bounty": 10,
          "bountyMult": 1.4,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 5,
      "delayAfter": 12,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "blinker",
          "count": 4,
          "hp": 730,
          "hpMult": 7.3,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.4,
          "bounty": 26,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 12,
          "hp": 150,
          "hpMult": 5,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.4,
          "bounty": 9,
          "bountyMult": 1.5,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 6,
      "delayAfter": 13,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 2100,
          "hpMult": 5.26,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 48,
          "bountyMult": 2.4,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "swarm",
          "count": 24,
          "hp": 154,
          "hpMult": 10.26,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.17,
          "bounty": 6,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 7,
      "delayAfter": 15,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "tank",
          "count": 5,
          "hp": 1280,
          "hpMult": 6.4,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.6,
          "bounty": 30,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "blinker",
          "count": 5,
          "hp": 1060,
          "hpMult": 10.6,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.3,
          "bounty": 32,
          "bountyMult": 2.1,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 8,
      "delayAfter": 11,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "scout",
          "count": 20,
          "hp": 320,
          "hpMult": 10.66,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.35,
          "bounty": 10,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 9,
      "delayAfter": 15,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 2520,
          "hpMult": 6.3,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 55,
          "bountyMult": 2.75,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "tank",
          "count": 4,
          "hp": 1340,
          "hpMult": 6.7,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.5,
          "bounty": 32,
          "bountyMult": 2.1,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 10,
      "delayAfter": 12,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "swarm",
          "count": 30,
          "hp": 170,
          "hpMult": 11.34,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.16,
          "bounty": 6,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "blinker",
          "count": 6,
          "hp": 1120,
          "hpMult": 11.2,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.2,
          "bounty": 34,
          "bountyMult": 2.25,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 11,
      "delayAfter": 0,
      "earlyBonus": 0,
      "spawns": [
        {
          "type": "tank",
          "count": 1,
          "hp": 11800,
          "hpMult": 59,
          "speed": 35,
          "speedMult": 0.92,
          "interval": 1,
          "bounty": 420,
          "bountyMult": 28,
          "isBoss": false,
          "isMiniBoss": true
        }
      ]
    }
  ]
},

  "34": {
  "mapId": "L34",
  "startHp": 10,
  "canUpgrade": true,
  "unlockedTowers": [
    "gun",
    "laser",
    "mortar",
    "tesla",
    "stasis",
    "melter"
  ],
  "totalWaves": 11,
  "startGold": 220,
  "waves": [
    {
      "wave": 1,
      "delayAfter": 14,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "tank",
          "count": 3,
          "hp": 670,
          "hpMult": 3.36,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.8,
          "bounty": 24,
          "bountyMult": 1.6,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 2,
      "delayAfter": 12,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "scout",
          "count": 8,
          "hp": 180,
          "hpMult": 6,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.45,
          "bounty": 10,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "grunt",
          "count": 8,
          "hp": 210,
          "hpMult": 5.26,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.65,
          "bounty": 10,
          "bountyMult": 1.4,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 3,
      "delayAfter": 14,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 1960,
          "hpMult": 4.9,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.2,
          "bounty": 46,
          "bountyMult": 2.3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 4,
      "delayAfter": 12,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "blinker",
          "count": 3,
          "hp": 900,
          "hpMult": 9,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.5,
          "bounty": 28,
          "bountyMult": 1.85,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "swarm",
          "count": 20,
          "hp": 110,
          "hpMult": 7.34,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.18,
          "bounty": 5,
          "bountyMult": 2.5,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 5,
      "delayAfter": 15,
      "earlyBonus": 70,
      "spawns": [
        {
          "type": "tank",
          "count": 4,
          "hp": 1180,
          "hpMult": 5.9,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.6,
          "bounty": 28,
          "bountyMult": 1.85,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "goliath",
          "count": 2,
          "hp": 2380,
          "hpMult": 5.96,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.2,
          "bounty": 55,
          "bountyMult": 2.75,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 6,
      "delayAfter": 13,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "scout",
          "count": 15,
          "hp": 310,
          "hpMult": 10.34,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.4,
          "bounty": 10,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "blinker",
          "count": 4,
          "hp": 1000,
          "hpMult": 10,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.4,
          "bounty": 30,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 7,
      "delayAfter": 15,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 2660,
          "hpMult": 6.66,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 56,
          "bountyMult": 2.8,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "grunt",
          "count": 12,
          "hp": 390,
          "hpMult": 9.76,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.55,
          "bounty": 12,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 8,
      "delayAfter": 10,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "swarm",
          "count": 36,
          "hp": 170,
          "hpMult": 11.34,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.15,
          "bounty": 6,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 9,
      "delayAfter": 15,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "tank",
          "count": 6,
          "hp": 1460,
          "hpMult": 7.3,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.5,
          "bounty": 32,
          "bountyMult": 2.1,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 12,
          "hp": 340,
          "hpMult": 11.34,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.4,
          "bounty": 11,
          "bountyMult": 1.8,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 10,
      "delayAfter": 15,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 3080,
          "hpMult": 7.7,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 60,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "blinker",
          "count": 5,
          "hp": 1240,
          "hpMult": 12.4,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.3,
          "bounty": 35,
          "bountyMult": 2.3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 11,
      "delayAfter": 0,
      "earlyBonus": 0,
      "spawns": [
        {
          "type": "swarm",
          "count": 1,
          "hp": 8960,
          "hpMult": 597.38,
          "speed": 150,
          "speedMult": 0.88,
          "interval": 1,
          "bounty": 450,
          "bountyMult": 30,
          "isBoss": false,
          "isMiniBoss": true
        }
      ]
    }
  ]
},

  "35": {
  "mapId": "L35",
  "startHp": 10,
  "canUpgrade": true,
  "unlockedTowers": [
    "gun",
    "laser",
    "mortar",
    "tesla",
    "stasis",
    "melter"
  ],
  "totalWaves": 11,
  "startGold": 230,
  "waves": [
    {
      "wave": 1,
      "delayAfter": 13,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "blinker",
          "count": 4,
          "hp": 620,
          "hpMult": 6.2,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.5,
          "bounty": 26,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 2,
      "delayAfter": 12,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "grunt",
          "count": 10,
          "hp": 220,
          "hpMult": 5.5,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.6,
          "bounty": 10,
          "bountyMult": 1.4,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 8,
          "hp": 200,
          "hpMult": 6.66,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.45,
          "bounty": 10,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 3,
      "delayAfter": 15,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 2100,
          "hpMult": 5.26,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.2,
          "bounty": 48,
          "bountyMult": 2.4,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "tank",
          "count": 4,
          "hp": 1000,
          "hpMult": 5,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.6,
          "bounty": 28,
          "bountyMult": 1.85,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 4,
      "delayAfter": 11,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "swarm",
          "count": 28,
          "hp": 126,
          "hpMult": 8.4,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.17,
          "bounty": 6,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 5,
      "delayAfter": 14,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "blinker",
          "count": 4,
          "hp": 980,
          "hpMult": 9.8,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.4,
          "bounty": 30,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "goliath",
          "count": 2,
          "hp": 2660,
          "hpMult": 6.66,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.2,
          "bounty": 56,
          "bountyMult": 2.8,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 6,
      "delayAfter": 12,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "scout",
          "count": 18,
          "hp": 340,
          "hpMult": 11.34,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.38,
          "bounty": 11,
          "bountyMult": 1.8,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 7,
      "delayAfter": 14,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "tank",
          "count": 5,
          "hp": 1500,
          "hpMult": 7.5,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.6,
          "bounty": 32,
          "bountyMult": 2.1,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "swarm",
          "count": 26,
          "hp": 180,
          "hpMult": 12,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.17,
          "bounty": 6,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 8,
      "delayAfter": 15,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 3220,
          "hpMult": 8.06,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 62,
          "bountyMult": 3.1,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "grunt",
          "count": 14,
          "hp": 450,
          "hpMult": 11.26,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.52,
          "bounty": 13,
          "bountyMult": 1.85,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 9,
      "delayAfter": 13,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "blinker",
          "count": 6,
          "hp": 1340,
          "hpMult": 13.4,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.3,
          "bounty": 36,
          "bountyMult": 2.4,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 14,
          "hp": 360,
          "hpMult": 12,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.4,
          "bounty": 12,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 10,
      "delayAfter": 16,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "goliath",
          "count": 4,
          "hp": 3080,
          "hpMult": 7.7,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 65,
          "bountyMult": 3.25,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "tank",
          "count": 5,
          "hp": 1400,
          "hpMult": 7,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.5,
          "bounty": 34,
          "bountyMult": 2.25,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 11,
      "delayAfter": 0,
      "earlyBonus": 0,
      "spawns": [
        {
          "type": "goliath",
          "count": 1,
          "hp": 13400,
          "hpMult": 33.5,
          "speed": 30,
          "speedMult": 0.75,
          "interval": 1,
          "bounty": 480,
          "bountyMult": 24,
          "isBoss": false,
          "isMiniBoss": true
        }
      ]
    }
  ]
},

  "36": {
  "mapId": "L36",
  "startHp": 10,
  "canUpgrade": true,
  "unlockedTowers": [
    "gun",
    "laser",
    "mortar",
    "tesla",
    "stasis",
    "melter"
  ],
  "totalWaves": 12,
  "startGold": 240,
  "waves": [
    {
      "wave": 1,
      "delayAfter": 10,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "swarm",
          "count": 20,
          "hp": 80,
          "hpMult": 5.34,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.18,
          "bounty": 5,
          "bountyMult": 2.5,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 2,
      "delayAfter": 11,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "scout",
          "count": 12,
          "hp": 220,
          "hpMult": 7.34,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.42,
          "bounty": 10,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 3,
      "delayAfter": 11,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "swarm",
          "count": 24,
          "hp": 90,
          "hpMult": 6,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.17,
          "bounty": 5,
          "bountyMult": 2.5,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 10,
          "hp": 180,
          "hpMult": 6,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.42,
          "bounty": 10,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 4,
      "delayAfter": 11,
      "earlyBonus": 75,
      "spawns": [
        {
          "type": "scout",
          "count": 16,
          "hp": 230,
          "hpMult": 7.66,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.4,
          "bounty": 10,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "swarm",
          "count": 30,
          "hp": 90,
          "hpMult": 6,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.16,
          "bounty": 5,
          "bountyMult": 2.5,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 5,
      "delayAfter": 11,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "scout",
          "count": 22,
          "hp": 220,
          "hpMult": 7.34,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.38,
          "bounty": 11,
          "bountyMult": 1.8,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 6,
      "delayAfter": 10,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "swarm",
          "count": 45,
          "hp": 130,
          "hpMult": 8.66,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.14,
          "bounty": 6,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 7,
      "delayAfter": 12,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "scout",
          "count": 24,
          "hp": 300,
          "hpMult": 10,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.35,
          "bounty": 11,
          "bountyMult": 1.8,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "swarm",
          "count": 20,
          "hp": 140,
          "hpMult": 9.34,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.18,
          "bounty": 6,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 8,
      "delayAfter": 12,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "swarm",
          "count": 40,
          "hp": 170,
          "hpMult": 11.34,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.15,
          "bounty": 6,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 18,
          "hp": 310,
          "hpMult": 10.34,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.38,
          "bounty": 11,
          "bountyMult": 1.8,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 9,
      "delayAfter": 12,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "scout",
          "count": 30,
          "hp": 330,
          "hpMult": 11,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.32,
          "bounty": 12,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 10,
      "delayAfter": 10,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "swarm",
          "count": 60,
          "hp": 170,
          "hpMult": 11.34,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.13,
          "bounty": 6,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 11,
      "delayAfter": 13,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "swarm",
          "count": 50,
          "hp": 190,
          "hpMult": 12.66,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.14,
          "bounty": 7,
          "bountyMult": 3.5,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 16,
          "hp": 320,
          "hpMult": 10.66,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.38,
          "bounty": 12,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 12,
      "delayAfter": 0,
      "earlyBonus": 0,
      "spawns": [
        {
          "type": "blinker",
          "count": 1,
          "hp": 15200,
          "hpMult": 152,
          "speed": 60,
          "speedMult": 0.92,
          "interval": 1,
          "bounty": 520,
          "bountyMult": 34.7,
          "isBoss": false,
          "isMiniBoss": true
        }
      ]
    }
  ]
},

  "37": {
  "mapId": "L37",
  "startHp": 10,
  "canUpgrade": true,
  "unlockedTowers": [
    "gun",
    "laser",
    "mortar",
    "tesla",
    "stasis",
    "melter"
  ],
  "totalWaves": 12,
  "startGold": 250,
  "waves": [
    {
      "wave": 1,
      "delayAfter": 13,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "grunt",
          "count": 8,
          "hp": 300,
          "hpMult": 7.5,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.65,
          "bounty": 11,
          "bountyMult": 1.6,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 8,
          "hp": 250,
          "hpMult": 8.34,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.45,
          "bounty": 11,
          "bountyMult": 1.8,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 2,
      "delayAfter": 14,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "goliath",
          "count": 2,
          "hp": 2240,
          "hpMult": 5.6,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.2,
          "bounty": 52,
          "bountyMult": 2.6,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "blinker",
          "count": 4,
          "hp": 1060,
          "hpMult": 10.6,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.4,
          "bounty": 30,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 3,
      "delayAfter": 14,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "tank",
          "count": 4,
          "hp": 1060,
          "hpMult": 5.3,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.6,
          "bounty": 28,
          "bountyMult": 1.85,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 10,
          "hp": 240,
          "hpMult": 8,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.42,
          "bounty": 11,
          "bountyMult": 1.8,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 4,
      "delayAfter": 14,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "goliath",
          "count": 2,
          "hp": 2660,
          "hpMult": 6.66,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.2,
          "bounty": 56,
          "bountyMult": 2.8,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "swarm",
          "count": 24,
          "hp": 154,
          "hpMult": 10.26,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.17,
          "bounty": 6,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 5,
      "delayAfter": 14,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "blinker",
          "count": 4,
          "hp": 1180,
          "hpMult": 11.8,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.4,
          "bounty": 32,
          "bountyMult": 2.1,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "grunt",
          "count": 10,
          "hp": 390,
          "hpMult": 9.76,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.58,
          "bounty": 12,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 6,
      "delayAfter": 15,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 2940,
          "hpMult": 7.36,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 60,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "tank",
          "count": 5,
          "hp": 1560,
          "hpMult": 7.8,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.5,
          "bounty": 34,
          "bountyMult": 2.25,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 7,
      "delayAfter": 12,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "scout",
          "count": 16,
          "hp": 390,
          "hpMult": 13,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.38,
          "bounty": 12,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "swarm",
          "count": 30,
          "hp": 210,
          "hpMult": 14,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.16,
          "bounty": 7,
          "bountyMult": 3.5,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 8,
      "delayAfter": 15,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 3500,
          "hpMult": 8.76,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 65,
          "bountyMult": 3.25,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "blinker",
          "count": 6,
          "hp": 1280,
          "hpMult": 12.8,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.3,
          "bounty": 35,
          "bountyMult": 2.3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 9,
      "delayAfter": 15,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "tank",
          "count": 6,
          "hp": 1740,
          "hpMult": 8.7,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.5,
          "bounty": 36,
          "bountyMult": 2.4,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "grunt",
          "count": 14,
          "hp": 500,
          "hpMult": 12.5,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.52,
          "bounty": 14,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 10,
      "delayAfter": 15,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 4060,
          "hpMult": 10.16,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 70,
          "bountyMult": 3.5,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 16,
          "hp": 450,
          "hpMult": 15,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.38,
          "bounty": 13,
          "bountyMult": 2.2,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 11,
      "delayAfter": 14,
      "earlyBonus": 90,
      "spawns": [
        {
          "type": "blinker",
          "count": 6,
          "hp": 1460,
          "hpMult": 14.6,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.3,
          "bounty": 38,
          "bountyMult": 2.5,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "swarm",
          "count": 36,
          "hp": 240,
          "hpMult": 16,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.15,
          "bounty": 7,
          "bountyMult": 3.5,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 12,
      "delayAfter": 0,
      "earlyBonus": 0,
      "spawns": [
        {
          "type": "swarm",
          "count": 1,
          "hp": 19800,
          "hpMult": 1320,
          "speed": 150,
          "speedMult": 0.88,
          "interval": 1,
          "bounty": 600,
          "bountyMult": 30,
          "isBoss": false,
          "isMiniBoss": true
        }
      ]
    }
  ]
},

  "38": {
  "mapId": "L38",
  "startHp": 10,
  "canUpgrade": true,
  "unlockedTowers": [
    "gun",
    "laser",
    "mortar",
    "tesla",
    "stasis",
    "melter"
  ],
  "totalWaves": 12,
  "startGold": 165,
  "waves": [
    {
      "wave": 1,
      "delayAfter": 11,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "swarm",
          "count": 20,
          "hp": 84,
          "hpMult": 5.6,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.18,
          "bounty": 6,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 2,
      "delayAfter": 12,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "grunt",
          "count": 10,
          "hp": 240,
          "hpMult": 6,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.6,
          "bounty": 0,
          "bountyMult": 0,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 3,
      "delayAfter": 12,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "scout",
          "count": 12,
          "hp": 310,
          "hpMult": 10.34,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.42,
          "bounty": 14,
          "bountyMult": 2.3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 4,
      "delayAfter": 14,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "goliath",
          "count": 2,
          "hp": 2520,
          "hpMult": 6.3,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.2,
          "bounty": 0,
          "bountyMult": 0,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 5,
      "delayAfter": 11,
      "earlyBonus": 80,
      "spawns": [
        {
          "type": "swarm",
          "count": 32,
          "hp": 126,
          "hpMult": 8.4,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.16,
          "bounty": 7,
          "bountyMult": 3.5,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 6,
      "delayAfter": 15,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "tank",
          "count": 5,
          "hp": 1460,
          "hpMult": 7.3,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.6,
          "bounty": 0,
          "bountyMult": 0,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 7,
      "delayAfter": 13,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "blinker",
          "count": 5,
          "hp": 1180,
          "hpMult": 11.8,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.4,
          "bounty": 36,
          "bountyMult": 2.4,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 12,
          "hp": 360,
          "hpMult": 12,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.4,
          "bounty": 15,
          "bountyMult": 2.5,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 8,
      "delayAfter": 15,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 3360,
          "hpMult": 8.4,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 0,
          "bountyMult": 0,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 9,
      "delayAfter": 12,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "swarm",
          "count": 40,
          "hp": 200,
          "hpMult": 13.34,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.15,
          "bounty": 8,
          "bountyMult": 4,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 10,
      "delayAfter": 15,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 3500,
          "hpMult": 8.76,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 0,
          "bountyMult": 0,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "tank",
          "count": 5,
          "hp": 1540,
          "hpMult": 7.7,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.5,
          "bounty": 0,
          "bountyMult": 0,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 11,
      "delayAfter": 14,
      "earlyBonus": 90,
      "spawns": [
        {
          "type": "blinker",
          "count": 8,
          "hp": 1260,
          "hpMult": 12.6,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.3,
          "bounty": 45,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 12,
      "delayAfter": 0,
      "earlyBonus": 0,
      "spawns": [
        {
          "type": "scout",
          "count": 1,
          "hp": 16200,
          "hpMult": 540,
          "speed": 110,
          "speedMult": 1,
          "interval": 1,
          "bounty": 600,
          "bountyMult": 100,
          "isBoss": false,
          "isMiniBoss": true
        }
      ]
    }
  ]
},

  "39": {
  "mapId": "L39",
  "startHp": 10,
  "canUpgrade": true,
  "unlockedTowers": [
    "gun",
    "laser",
    "mortar",
    "tesla",
    "stasis",
    "melter"
  ],
  "totalWaves": 13,
  "startGold": 270,
  "waves": [
    {
      "wave": 1,
      "delayAfter": 15,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "tank",
          "count": 1,
          "hp": 500,
          "hpMult": 2.5,
          "speed": 38,
          "speedMult": 1,
          "interval": 1,
          "bounty": 45,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 2,
      "delayAfter": 15,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "tank",
          "count": 2,
          "hp": 700,
          "hpMult": 3.5,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.8,
          "bounty": 35,
          "bountyMult": 2.3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 3,
      "delayAfter": 15,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "tank",
          "count": 3,
          "hp": 1000,
          "hpMult": 5,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.8,
          "bounty": 32,
          "bountyMult": 2.1,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 4,
      "delayAfter": 16,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "tank",
          "count": 4,
          "hp": 1400,
          "hpMult": 7,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.7,
          "bounty": 30,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 5,
      "delayAfter": 16,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "tank",
          "count": 5,
          "hp": 1800,
          "hpMult": 9,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.7,
          "bounty": 30,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 6,
      "delayAfter": 16,
      "earlyBonus": 90,
      "spawns": [
        {
          "type": "tank",
          "count": 6,
          "hp": 2200,
          "hpMult": 11,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.6,
          "bounty": 32,
          "bountyMult": 2.1,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 7,
      "delayAfter": 17,
      "earlyBonus": 90,
      "spawns": [
        {
          "type": "goliath",
          "count": 7,
          "hp": 2700,
          "hpMult": 6.76,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 1.8,
          "bounty": 38,
          "bountyMult": 1.9,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 8,
      "delayAfter": 17,
      "earlyBonus": 90,
      "spawns": [
        {
          "type": "tank",
          "count": 8,
          "hp": 2900,
          "hpMult": 14.5,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.5,
          "bounty": 35,
          "bountyMult": 2.3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 9,
      "delayAfter": 17,
      "earlyBonus": 90,
      "spawns": [
        {
          "type": "goliath",
          "count": 9,
          "hp": 3300,
          "hpMult": 8.26,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 1.7,
          "bounty": 40,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 10,
      "delayAfter": 18,
      "earlyBonus": 90,
      "spawns": [
        {
          "type": "tank",
          "count": 10,
          "hp": 3700,
          "hpMult": 18.5,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.4,
          "bounty": 38,
          "bountyMult": 2.5,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 11,
      "delayAfter": 18,
      "earlyBonus": 95,
      "spawns": [
        {
          "type": "goliath",
          "count": 11,
          "hp": 4200,
          "hpMult": 10.5,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 1.6,
          "bounty": 45,
          "bountyMult": 2.25,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 12,
      "delayAfter": 18,
      "earlyBonus": 95,
      "spawns": [
        {
          "type": "tank",
          "count": 12,
          "hp": 4700,
          "hpMult": 23.5,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.3,
          "bounty": 45,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 13,
      "delayAfter": 0,
      "earlyBonus": 0,
      "spawns": [
        {
          "type": "tank",
          "count": 1,
          "hp": 32000,
          "hpMult": 160,
          "speed": 35,
          "speedMult": 0.92,
          "interval": 1,
          "bounty": 750,
          "bountyMult": 50,
          "isBoss": false,
          "isMiniBoss": true
        }
      ]
    }
  ]
},

  "40": {
  "mapId": "L40",
  "startHp": 10,
  "canUpgrade": true,
  "unlockedTowers": [
    "gun",
    "laser",
    "mortar",
    "tesla",
    "stasis",
    "melter"
  ],
  "totalWaves": 13,
  "startGold": 280,
  "waves": [
    {
      "wave": 1,
      "delayAfter": 13,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "grunt",
          "count": 8,
          "hp": 340,
          "hpMult": 8.5,
          "speed": 55,
          "speedMult": 1,
          "interval": 0.65,
          "bounty": 12,
          "bountyMult": 1.7,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 8,
          "hp": 270,
          "hpMult": 9,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.45,
          "bounty": 12,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 2,
      "delayAfter": 14,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "tank",
          "count": 4,
          "hp": 1180,
          "hpMult": 5.9,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.6,
          "bounty": 30,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "blinker",
          "count": 4,
          "hp": 1000,
          "hpMult": 10,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.4,
          "bounty": 30,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 3,
      "delayAfter": 14,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 3080,
          "hpMult": 7.7,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.2,
          "bounty": 55,
          "bountyMult": 2.75,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 4,
      "delayAfter": 11,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "swarm",
          "count": 30,
          "hp": 170,
          "hpMult": 11.34,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.16,
          "bounty": 6,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 5,
      "delayAfter": 14,
      "earlyBonus": 85,
      "spawns": [
        {
          "type": "goliath",
          "count": 2,
          "hp": 3500,
          "hpMult": 8.76,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.2,
          "bounty": 60,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 10,
          "hp": 320,
          "hpMult": 10.66,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.42,
          "bounty": 12,
          "bountyMult": 2,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 6,
      "delayAfter": 14,
      "earlyBonus": 90,
      "spawns": [
        {
          "type": "blinker",
          "count": 5,
          "hp": 1240,
          "hpMult": 12.4,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.4,
          "bounty": 34,
          "bountyMult": 2.25,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "swarm",
          "count": 26,
          "hp": 210,
          "hpMult": 14,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.17,
          "bounty": 7,
          "bountyMult": 3.5,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 7,
      "delayAfter": 15,
      "earlyBonus": 90,
      "spawns": [
        {
          "type": "tank",
          "count": 5,
          "hp": 1820,
          "hpMult": 9.1,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.6,
          "bounty": 36,
          "bountyMult": 2.4,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "goliath",
          "count": 2,
          "hp": 4200,
          "hpMult": 10.5,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2.2,
          "bounty": 65,
          "bountyMult": 3.25,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 8,
      "delayAfter": 12,
      "earlyBonus": 90,
      "spawns": [
        {
          "type": "scout",
          "count": 20,
          "hp": 460,
          "hpMult": 15.34,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.35,
          "bounty": 13,
          "bountyMult": 2.2,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 9,
      "delayAfter": 15,
      "earlyBonus": 90,
      "spawns": [
        {
          "type": "goliath",
          "count": 3,
          "hp": 3920,
          "hpMult": 9.8,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 68,
          "bountyMult": 3.4,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "blinker",
          "count": 6,
          "hp": 1460,
          "hpMult": 14.6,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.3,
          "bounty": 38,
          "bountyMult": 2.5,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 10,
      "delayAfter": 14,
      "earlyBonus": 90,
      "spawns": [
        {
          "type": "tank",
          "count": 6,
          "hp": 1900,
          "hpMult": 9.5,
          "speed": 38,
          "speedMult": 1,
          "interval": 1.5,
          "bounty": 38,
          "bountyMult": 2.5,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "swarm",
          "count": 36,
          "hp": 270,
          "hpMult": 18,
          "speed": 170,
          "speedMult": 1,
          "interval": 0.15,
          "bounty": 8,
          "bountyMult": 4,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 11,
      "delayAfter": 16,
      "earlyBonus": 95,
      "spawns": [
        {
          "type": "goliath",
          "count": 4,
          "hp": 4340,
          "hpMult": 10.86,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 72,
          "bountyMult": 3.6,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 12,
      "delayAfter": 14,
      "earlyBonus": 95,
      "spawns": [
        {
          "type": "blinker",
          "count": 7,
          "hp": 1540,
          "hpMult": 15.4,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.3,
          "bounty": 40,
          "bountyMult": 2.6,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "scout",
          "count": 16,
          "hp": 490,
          "hpMult": 16.34,
          "speed": 110,
          "speedMult": 1,
          "interval": 0.38,
          "bounty": 14,
          "bountyMult": 2.3,
          "isBoss": false,
          "isMiniBoss": false
        }
      ]
    },
    {
      "wave": 13,
      "delayAfter": 0,
      "earlyBonus": 0,
      "spawns": [
        {
          "type": "goliath",
          "count": 2,
          "hp": 3920,
          "hpMult": 9.8,
          "speed": 34,
          "speedMult": 0.85,
          "interval": 2,
          "bounty": 60,
          "bountyMult": 3,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "blinker",
          "count": 4,
          "hp": 1400,
          "hpMult": 14,
          "speed": 65,
          "speedMult": 1,
          "interval": 1.5,
          "bounty": 35,
          "bountyMult": 2.3,
          "isBoss": false,
          "isMiniBoss": false
        },
        {
          "type": "titan_core",
          "count": 1,
          "hp": 28000,
          "hpMult": 280,
          "speed": 40,
          "speedMult": 1,
          "interval": 1,
          "bounty": 1000,
          "bountyMult": 50,
          "isBoss": true,
          "isMiniBoss": false
        }
      ]
    }
  ]
},

  "41": {
    "mapId": "L41",
    "startHp": 10,
    "startGold": 190,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 195,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 12,
            "hp": 48,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 510,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 780,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 195,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 48,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 510,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 780,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 195,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 19,
            "hp": 48,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 510,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 780,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 195,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 22,
            "hp": 48,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 510,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 780,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1100,
            "speed": 34,
            "interval": 1.2,
            "bounty": 35,
            "speedMult": 0.85,
            "hpMult": 6.47,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "42": {
    "mapId": "L42",
    "startHp": 10,
    "startGold": 194,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 211,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 12,
            "hp": 52,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 553,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 845,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 211,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 52,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 553,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 845,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 211,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 19,
            "hp": 52,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 553,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 845,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 211,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 22,
            "hp": 52,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 553,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 845,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1650,
            "speed": 26,
            "interval": 1.2,
            "bounty": 45,
            "speedMult": 0.87,
            "hpMult": 6.35,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "43": {
    "mapId": "L43",
    "startHp": 10,
    "startGold": 198,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 228,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 12,
            "hp": 56,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 595,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 910,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 228,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 56,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 595,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 910,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 228,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 19,
            "hp": 56,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 595,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 910,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 228,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 22,
            "hp": 56,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 595,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 910,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.5,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 920,
            "speed": 53,
            "interval": 1.2,
            "bounty": 20,
            "speedMult": 0.85,
            "hpMult": 14.15,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "44": {
    "mapId": "L44",
    "startHp": 10,
    "startGold": 202,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 244,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 13,
            "hp": 60,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 638,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 975,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 244,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 60,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 638,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 975,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 244,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 20,
            "hp": 60,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 638,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 975,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 244,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 23,
            "hp": 60,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 638,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 975,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1300,
            "speed": 34,
            "interval": 1.2,
            "bounty": 35,
            "speedMult": 0.85,
            "hpMult": 7.65,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "45": {
    "mapId": "L45",
    "startHp": 10,
    "startGold": 206,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 260,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 13,
            "hp": 64,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 680,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1040,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 260,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 64,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 680,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1040,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 260,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 20,
            "hp": 64,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 680,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1040,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 260,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 23,
            "hp": 64,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 680,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 1040,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1600,
            "speed": 32,
            "interval": 1.2,
            "bounty": 30,
            "speedMult": 0.84,
            "hpMult": 16,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "46": {
    "mapId": "L46",
    "startHp": 10,
    "startGold": 210,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 276,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 13,
            "hp": 68,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 723,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1105,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4.25,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 276,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 68,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 723,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1105,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4.25,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 276,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 20,
            "hp": 68,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 723,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1105,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4.25,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 276,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 23,
            "hp": 68,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 723,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 1105,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1450,
            "speed": 34,
            "interval": 1.2,
            "bounty": 35,
            "speedMult": 0.85,
            "hpMult": 8.53,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "47": {
    "mapId": "L47",
    "startHp": 10,
    "startGold": 214,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 293,
            "speed": 82,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.32,
            "hpMult": 4.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 13,
            "hp": 72,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 765,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1170,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 293,
            "speed": 82,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.32,
            "hpMult": 4.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 72,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 765,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1170,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 293,
            "speed": 82,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.32,
            "hpMult": 4.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 20,
            "hp": 72,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 765,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1170,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 293,
            "speed": 82,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.32,
            "hpMult": 4.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 23,
            "hp": 72,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 765,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 1170,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1900,
            "speed": 26,
            "interval": 1.2,
            "bounty": 45,
            "speedMult": 0.87,
            "hpMult": 7.31,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "48": {
    "mapId": "L48",
    "startHp": 10,
    "startGold": 218,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 309,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 13,
            "hp": 76,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 808,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1235,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 309,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 76,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 808,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1235,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 309,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 20,
            "hp": 76,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 808,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1235,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 309,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 23,
            "hp": 76,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 808,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 1235,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 520,
            "speed": 53,
            "interval": 1.2,
            "bounty": 20,
            "speedMult": 0.85,
            "hpMult": 8,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "49": {
    "mapId": "L49",
    "startHp": 10,
    "startGold": 222,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 325,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 13,
            "hp": 80,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 850,
            "speed": 54,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1300,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 325,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 80,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 850,
            "speed": 54,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1300,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 325,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 20,
            "hp": 80,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 850,
            "speed": 54,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1300,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 325,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 23,
            "hp": 80,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 850,
            "speed": 54,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 1300,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1700,
            "speed": 34,
            "interval": 1.2,
            "bounty": 35,
            "speedMult": 0.85,
            "hpMult": 10,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "50": {
    "mapId": "L50",
    "startHp": 10,
    "startGold": 230,
    "totalWaves": 10,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 2,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 2,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 2,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 2,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 9,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 10,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 1020,
            "speed": 54,
            "interval": 1.04,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 20,
            "hp": 96,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 6,
            "bountyMult": 1.61
          },
          {
            "type": "emp_overlord",
            "isBoss": true,
            "isMiniBoss": false,
            "count": 1,
            "hp": 15000,
            "speed": 30,
            "interval": 1.2,
            "bounty": 140,
            "speedMult": 1,
            "hpMult": 2.08,
            "bountyMult": 0.2
          }
        ],
        "delayAfter": 5
      }
    ]
  }
};
for (let lvl = 5; lvl <= 10; lvl++) {
  LEVELS_DATA[lvl].unlockedTowers = ['gun', 'laser', 'mortar'];
}


const SECTOR_5_MINIBOSSES = [
  { type: 'emp_bomber', hp: 1100 }, { type: 'goliath', hp: 1650 }, { type: 'blinker', hp: 920 },
  { type: 'emp_bomber', hp: 1300 }, { type: 'tank', hp: 1600 }, { type: 'emp_bomber', hp: 1450 },
  { type: 'goliath', hp: 1900 }, { type: 'blinker', hp: 520 }, { type: 'emp_bomber', hp: 1700 }
];
const SECTOR_5_MAPS = ['L41', 'L42', 'L43', 'L44', 'L45', 'L46', 'L47', 'L48', 'L49'];

for (let lvl = 41; lvl <= 49; lvl++) {
  const mapKey = SECTOR_5_MAPS[lvl - 41];
  const mb = SECTOR_5_MINIBOSSES[lvl - 41];
  const waves = [];
  const lvlHpMult = 3.0 + (lvl - 41) * 0.25; // 3.0 at L41 -> 5.0 at L49
  const lvlSpeedMult = getLevelSpeedMult(lvl);
  const countBonus = getLevelCountBonus(lvl);
  for (let w = 1; w <= 8; w++) {
    const spawns = [];
    const count = 10 + w * 2 + countBonus;
    if (w % 2 === 0) {
      spawns.push(createEnemySpawn('emp_bomber', Math.max(1, Math.floor(count * 0.3)), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.17 }));
      spawns.push(createEnemySpawn('goliath', Math.max(1, Math.floor(count * 0.2)), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.6 }));
    } else {
      spawns.push(createEnemySpawn('blinker', Math.floor(count * 0.4), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 0.688 }));
      spawns.push(createEnemySpawn('swarm', Math.floor(count * 0.8), { hpMult: lvlHpMult, interval: 0.15, clumps: swarmClumpsFor(lvl, w) }));
    }
    if (w === 8) {
      spawns.push(createEnemySpawn(mb.type, 1, { isMiniBoss: true, hp: mb.hp, interval: 1.2 }));
    }
    waves.push({ wave: w, spawns });
  }
  LEVELS_DATA[lvl] = {
    mapId: mapKey, startHp: 10, startGold: 190 + (lvl - 41) * 4, totalWaves: 8,
    unlockedTowers: ['gun', 'laser', 'mortar', 'tesla', 'stasis', 'melter', 'railgun'], canUpgrade: true, waves
  };
}

LEVELS_DATA[50] = {
  mapId: 'L50', startHp: 10, startGold: 230, totalWaves: 10,
  unlockedTowers: ['gun', 'laser', 'mortar', 'tesla', 'stasis', 'melter', 'railgun'], canUpgrade: true,
  waves: (function() {
    const wArr = [];
    const lvlHpMult = 6.0;
    const lvlSpeedMult = getLevelSpeedMult(50);
    for (let w = 1; w <= 9; w++) {
      wArr.push({
        wave: w,
        spawns: [
          createEnemySpawn('emp_bomber', 2 + Math.floor(w * 0.5), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.105 }),
          createEnemySpawn('goliath', 2 + Math.floor(w * 0.3), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.53 }),
          createEnemySpawn('blinker', 4 + Math.floor(w * 0.5), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 0.688 })
        ]
      });
    }
    wArr.push({
      wave: 10,
      spawns: [
        createEnemySpawn('emp_bomber', 8, { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.04 }),
        createEnemySpawn('goliath', 7, { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.53 }),
        createEnemySpawn('blinker', 10, { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 0.688 }),
        createEnemySpawn('swarm', 20, { hpMult: lvlHpMult, interval: 0.15, clumps: 4 }),
        { type: 'emp_overlord', isBoss: true, isMiniBoss: false, count: 1, hp: 15000, speed: 30, interval: 1.2, bounty: 140 }
      ]
    });
    return wArr;
  })()
};

// Debug log: confirm data loaded




















// --- Ниже идут данные исключительно для Level Editor, игра их игнорирует ---
const EDITOR_META = {
  "templates": {},
  "bindings": {
    "1": "custom",
    "2": "custom",
    "3": "custom",
    "4": "custom",
    "5": "custom",
    "6": "custom",
    "7": "custom",
    "8": "custom",
    "9": "hard_proc",
    "10": "hard_proc",
    "11": "hard_proc",
    "12": "custom",
    "13": "hard_proc",
    "14": "hard_proc",
    "15": "hard_proc",
    "16": "hard_proc",
    "17": "hard_proc",
    "18": "hard_proc",
    "19": "hard_proc",
    "20": "hard_proc",
    "21": "hard_proc",
    "22": "hard_proc",
    "23": "hard_proc",
    "24": "hard_proc",
    "25": "hard_proc",
    "26": "hard_proc",
    "27": "hard_proc",
    "28": "hard_proc",
    "29": "hard_proc",
    "30": "hard_proc",
    "31": "hard_proc",
    "32": "hard_proc",
    "33": "hard_proc",
    "34": "hard_proc",
    "35": "hard_proc",
    "36": "hard_proc",
    "37": "hard_proc",
    "38": "hard_proc",
    "39": "hard_proc",
    "40": "hard_proc",
    "41": "hard_proc",
    "42": "hard_proc",
    "43": "hard_proc",
    "44": "hard_proc",
    "45": "hard_proc",
    "46": "hard_proc",
    "47": "hard_proc",
    "48": "hard_proc",
    "49": "hard_proc",
    "50": "hard_proc"
  }
};

if (typeof console !== 'undefined') {
  console.log('[levels_data.js] Loaded successfully!', {
    totalLevels: typeof TOTAL_LEVELS !== 'undefined' ? TOTAL_LEVELS : 50,
    levelsDataKeys: Object.keys(LEVELS_DATA).length
  });
}