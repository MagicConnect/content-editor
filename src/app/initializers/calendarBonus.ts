import { ICalendarBonus } from 'content-interfaces';

export const newCalendarBonus = (): ICalendarBonus => ({
  id: '',
  name: '',
  description: '',
  activeStart: '',
  activeEnd: '',
  calendarBonusRepeat: CalendarBonusRepeat.NotRepeatable,
  rewardItems: [],
});
