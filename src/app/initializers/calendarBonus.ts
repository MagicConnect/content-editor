import { CalendarBonusRepeat, ICalendarBonus } from '@magicconnect/content-interfaces';

export const newCalendarBonus = (): ICalendarBonus => ({
  id: '',
  name: '',
  description: '',
  activeStarts: '',
  activeEnds: '',
  calendarBonusRepeat: CalendarBonusRepeat.NotRepeatable,
  rewardItems: [],
});
