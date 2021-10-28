
export enum MonsterType {
  Bug = 'Bug',
  Celestial = 'Celestial',
  Flying = 'Flying',
  Humanoid = 'Humanoid',
  Mechanical = 'Mechanical',
  Plant = 'Plant',
  Undead = 'Undead'
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
  Bow = 'Bow',
  Dagger = 'Dagger',
  Greatsword = 'Greatsword',
  Knuckles = 'Knuckles',
  Staff = 'Staff',
  SwordAndShield = 'SwordAndShield'
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
  Curse = 'Curse',        // outgoing damage reduced, incoming damage increased
  Poison = 'Poison',      // taking damage every turn
  Silence = 'Silence',    // cannot use skills
  Stun = 'Stun',          // cannot act for a turn

  // unique buffs
  Barrier = 'Barrier',    // lower incoming magical damage
  Deflect = 'Deflect',    // negate incoming damage X times
  Regen = 'Regen',        // heal every turn
  Shield = 'Shield',      // lower incoming physical damage

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

export enum Stat {
  Attack = 'attack',
  Defense = 'defense',
  Magic = 'magic',
  Special = 'special',
  HP = 'hp',
  MP = 'mp',
  MeleeEvasion = 'meleeEvasion',
  MagicEvasion = 'magicEvasion',
  Critical = 'critical',
  Accuracy = 'accuracy'
}

export type PrimaryStat = Stat.Attack | Stat.Defense | Stat.Magic | Stat.Special;
export type SecondaryStat = Stat.HP | Stat.MP | Stat.MeleeEvasion | Stat.MagicEvasion | Stat.Critical | Stat.Accuracy;