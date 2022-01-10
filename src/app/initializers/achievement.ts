import { AchievementStat, IAchievement } from 'content-interfaces';

export const newAchievement = (): IAchievement => ({
  id: '',
  name: '',
  description: '',
  art: '',
  requirements: {
    stat: AchievementStat.Attacks,
    statValue: -1,
    mapName: '',
    mapNodeId: -1
  },
  rewards: {
    accessories: [],
    items: [],
    characters: [],
    weapons: []
  },
});
