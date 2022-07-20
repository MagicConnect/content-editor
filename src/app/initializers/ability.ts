
import { AbilityTrigger, IAbility, IAbilityUtility } from 'content-interfaces';

export const newAbility = (): IAbility => ({
  id: '',

  isAbilityUsedAtBase: true,
  ...newAbilityUtility(),

  lbChanges: {
    0:  { shouldHide: true, ...newAbilityUtility() },
    1:  { shouldHide: true, ...newAbilityUtility() },
    2:  { shouldHide: true, ...newAbilityUtility() },
    3:  { shouldHide: true, ...newAbilityUtility() },
    4:  { shouldHide: true, ...newAbilityUtility() },
    5:  { shouldHide: true, ...newAbilityUtility() },
    6:  { shouldHide: true, ...newAbilityUtility() },
    7:  { shouldHide: true, ...newAbilityUtility() },
    8:  { shouldHide: true, ...newAbilityUtility() },
    9:  { shouldHide: true, ...newAbilityUtility() },
  }
});

export const newAbilityUtility = (): IAbilityUtility => ({
  name: '',
  description: '',
  trigger: AbilityTrigger.Always,
  conditions: [],
  effects: [],
});
