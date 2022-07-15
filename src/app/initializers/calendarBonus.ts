import { CalendarBonusRepeat, ICalendarBonus } from 'content-interfaces';

export const newCalendarBonus = (): ICalendarBonus => ({
  id: '',
  name: '',
  description: '',
  activeStarts: '',
  activeEnds: '',
  calendarBonusRepeat: CalendarBonusRepeat.NotRepeatable,
  rewardItems: [],
});
