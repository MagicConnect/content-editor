import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorage } from 'ngx-webstorage';
import { interval } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ModManagerService } from './services/mod-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public currentColor = 'primary';
  private readonly allColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  @ViewChild('login') loginForm!: TemplateRef<any>;
  private modalRef!: BsModalRef;

  @LocalStorage() currentPage!: string;

  @LocalStorage() email!: string;
  @LocalStorage() password!: string;
  @LocalStorage() hasLoggedIn!: boolean;

  constructor(
    private modalService: BsModalService,
    public auth: AuthService,
    public mod: ModManagerService
  ) {}

  ngOnInit() {
    if(!this.currentPage) this.currentPage = 'weapon';

    if(this.email && this.password && this.hasLoggedIn) {
      this.doLogin();
    }

    this.watchLoginButtonColor();
  }

  watchLoginButtonColor() {
    interval(1000).subscribe(() => {
      if(this.auth.loggedIn) return;

      this.currentColor = this.allColors[Math.floor(Math.random() * this.allColors.length)];
    });
  }

  showLogin() {
    this.modalRef = this.modalService.show(this.loginForm, { backdrop: true });
  }

  async doLogin() {
    const res = await this.auth.login(this.email, this.password);
    if(!res) {
      alert('Your email or password was incorrect, or you do not have an account.');
      return;
    }

    this.hasLoggedIn = true;
    this.mod.importNet();

    this.abortLogin();
  }

  abortLogin() {
    if(this.modalRef) this.modalRef.hide();
  }

  logout() {
    this.email = '';
    this.password = '';
    this.hasLoggedIn = false;

    this.auth.logout();
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
