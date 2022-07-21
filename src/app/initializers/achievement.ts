import { AchievementCategory, AchievementStat, IAchievement } from '@magicconnect/content-interfaces';

export const newAchievement = (): IAchievement => ({
  id: '',
  name: '',
  description: '',
  art: '',
  isRepeatable: false,
  category: AchievementCategory.Miscellaneous,
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
