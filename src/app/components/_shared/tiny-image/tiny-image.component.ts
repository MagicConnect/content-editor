import { Component, Input } from '@angular/core';
import { ModManagerService } from '../../../services/mod-manager.service';

@Component({
  selector: 'app-tiny-image',
  templateUrl: './tiny-image.component.html',
  styleUrls: ['./tiny-image.component.scss']
})
export class TinyImageComponent {

  @Input() art!: string;
  @Input() artType!: string;

  constructor(public mod: ModManagerService) {}

}
