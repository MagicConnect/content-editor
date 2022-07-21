
import { AbilityTrigger, IAbility, IAbilityUtility } from '@magicconnect/content-interfaces';

export const newAbility = (): IAbility => ({
  id: '',

  isAbilityUsedAtBase: true,
  ...newAbilityUtility(),

  abilityChanges: {
    0:  { shouldHide: true, ...newAbilityUtility() },
    1:  { shouldHide: true, ...newAbilityUtility() },
    2:  { shouldHide: true, ...newAbilityUtility() },
    3:  { shouldHide: true, ...newAbilityUtility() },
    4:  { shouldHide: true, ...newAbilityUtility() },
    5:  { shouldHide: true, ...newAbilityUtility() },
  }
});

export const newAbilityUtility = (): IAbilityUtility => ({
  name: '',
  description: '',
  trigger: AbilityTrigger.Always,
  conditions: [],
  effects: [],
});
