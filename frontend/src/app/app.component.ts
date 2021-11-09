import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { ModManagerService } from './services/mod-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @LocalStorage() currentPage!: string;

  constructor(private mod: ModManagerService) {}

  ngOnInit() {
    if(!this.currentPage) this.currentPage = 'weapon';
  }

  netExport() {

  }

  netImport() {

  }

  export() {
    this.mod.export();
  }

  import(e: any, inputEl: HTMLInputElement) {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (ev) => {
      const contentPack = JSON.parse((ev.target as FileReader).result as string);

      const finish = () => {
        this.mod.import(contentPack);
        inputEl.value = '';
      };

      if(!confirm('Are you sure you want to import this content?')) return;
      finish();
    };

    reader.readAsText(file);
  }

  reset() {
    if(!confirm('Are you sure you want to reset this content pack?')) return;

    this.mod.reset();
  }

}
