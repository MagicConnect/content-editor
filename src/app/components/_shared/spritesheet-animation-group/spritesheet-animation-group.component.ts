import { Component, Input } from '@angular/core';
import { IUnitSpritesheetData } from 'content-interfaces';

@Component({
  selector: 'app-spritesheet-animation-group',
  templateUrl: './spritesheet-animation-group.component.html',
  styleUrls: ['./spritesheet-animation-group.component.scss']
})
export class SpritesheetAnimationGroupComponent {

  @Input() type: 'character' | 'enemy' = 'character';

  @Input() spritesheetName = '';

  @Input() spritesheetData: IUnitSpritesheetData = {
    attackFrames: 0,
    castFrames: 0,
    deadFrames: 0,
    idleFrames: 0,
    moveFrames: 0,
    moveEndFrames: 0,
    onDeathFrames: 0,
    onHitFrames: 0
  };

  public frameIndexes = [
    { name: 'idle',     row: 0 },
    { name: 'move',     row: 1 },
    { name: 'moveEnd',  row: 1, addFramesFrom: 'move' },
    { name: 'cast',     row: 2 },
    { name: 'attack',   row: 3 },
    { name: 'onHit',    row: 4 },
    { name: 'onDeath',  row: 5 },
    { name: 'dead',     row: 6 },
  ]

  constructor() { }

  getFrames(key: string): number {
    return this.spritesheetData[(key + 'Frames') as keyof IUnitSpritesheetData];
  }


}
