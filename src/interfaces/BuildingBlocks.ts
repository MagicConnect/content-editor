
export enum MonsterType {
  Bug = 'Bug',
  Celestial = 'Celestial',
  Flying = 'Flying',
  Humanoid = 'Humanoid',
  Mechanical = 'Mechanical',
  Plant = 'Plant',
}

export enum Archetype {
  Archer = 'Archer',
  Attacker = 'Attacker',
  Caster = 'Caster',
  Defender = 'Defender',
  Healer = 'Healer'
}

export enum Weapon {
  Axe = 'Axe',
  Book = 'Book',
  Bow = 'Bow',
  Dagger = 'Dagger',
  Greatsword = 'Greatsword',
  Knuckles = 'Knuckles',
  Staff = 'Staff'
}

export enum Element {
  Neutral = 'Neutral',
  Fire = 'Fire',
  Ice = 'Ice',
  Lightning = 'Lightning',
  Earth = 'Earth',
  Dark = 'Dark',
  Light = 'Light'
}

export enum StatusEffect {

  // unique debuffs
  Curse = 'Curse',
  Poison = 'Poison',
  Silence = 'Silence',
  Stun = 'Stun',

  // unique buffs
  Barrier = 'Barrier',
  Deflect = 'Deflect',
  Regen = 'Regen',
  Shield = 'Shield',

  // stat buffs
  HPUp = 'HPUp',
  MPUp = 'MPUp',
  ATKUp = 'ATKUp',
  DEFUp = 'DEFUp',
  MAGUp = 'MAGUp',
  SPCUp = 'SPCUp',
  ACCUp = 'ACCUp',
  CRITUp = 'CRITUp',
  PEVAUp = 'PEVAUp',
  MEVAUp = 'MEVAUp',

  // stat debuffs
  HPDown = 'HPDown',
  MPDown = 'MPDown',
  ATKDown = 'ATKDown',
  DEFDown = 'DEFDown',
  MAGDown = 'MAGDown',
  SPCDown = 'SPCDown',
  ACCDown = 'ACCDown',
  CRITDown = 'CRITDown',
  PEVADown = 'PEVADown',
  MEVADown = 'MEVADown',
}

export enum PrimaryStat {
  Attack = 'Attack',
  Defense = 'Defense',
  Magic = 'Magic',
  Special = 'Special'
}

export enum SecondaryStat {
  HP = 'HP',
  MP = 'MP',
  MeleeEvasion = 'MeleeEvasion',
  MagicEvasion = 'MagicEvasion',
  Critical = 'Critical',
  Accuracy = 'Accuracy'
}

export type Stat = PrimaryStat & SecondaryStat;
