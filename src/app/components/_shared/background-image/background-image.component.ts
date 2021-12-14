import { Component, Input } from '@angular/core';
import { ModManagerService } from '../../../services/mod-manager.service';

@Component({
  selector: 'app-background-image',
  templateUrl: './background-image.component.html',
  styleUrls: ['./background-image.component.scss']
})
export class BackgroundImageComponent {

  @Input() art!: string;
  @Input() artType!: string;

  constructor(public mod: ModManagerService) {}

}
