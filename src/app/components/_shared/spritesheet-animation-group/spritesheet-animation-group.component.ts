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
    onDeathFrames: 0,
    onHitFrames: 0
  };

  constructor() { }

  getFrames(key: string): number {
    return this.spritesheetData[(key + 'Frames') as keyof IUnitSpritesheetData];
  }


}
