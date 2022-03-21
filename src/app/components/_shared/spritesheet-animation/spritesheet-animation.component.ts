import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { ModManagerService } from '../../../services/mod-manager.service';

@Component({
  selector: 'app-spritesheet-animation',
  templateUrl: './spritesheet-animation.component.html',
  styleUrls: ['./spritesheet-animation.component.scss']
})
export class SpritesheetAnimationComponent implements OnInit, OnDestroy {

  private timer$!: Subscription;

  @Input() type: 'character' | 'enemy' = 'character';

  @Input() spritesheetName = '';

  @Input() frameset = -1;

  @Input() numFrames = 0;

  @HostBinding('style.--animation-frame')
  public curFrame = 0;

  @HostBinding('style.--animation-index')
  public get animationFrameset(): number {
    return this.frameset;
  }

  constructor(public mod: ModManagerService) { }

  ngOnInit() {
    this.timer$ = timer(0, 100).subscribe(() => {
      this.curFrame++;

      if(this.curFrame > this.numFrames - 1) {
        this.curFrame = 0;
      }
    });
  }

  ngOnDestroy() {
    if(this.timer$) this.timer$.unsubscribe();
  }

}
