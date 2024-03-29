import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment";

const BASE_CLASSES = 'main-sidebar elevation-4';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {

  baseUrl = environment.baseUrl;
  @HostBinding('class') classes: string = BASE_CLASSES;
  public ui: Observable<UiState>;
  public user;
  public menu = MENU;

  constructor(
    public appService: AppService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.ui = this.store.select('ui');
    this.ui.subscribe((state: UiState) => {
      this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
    });
    this.user = this.appService.user;
  }
}

export const MENU = [
  {
    name: 'Kalender',
    iconClasses: 'fas fa-tachometer-alt',
    path: ['/']
  },
  {
    name: 'Admin-Benutzer',
    iconClasses: 'fas fa-user',
    path: ['/admin/uebersicht']
  },
  {
    name: 'Anfragen',
    iconClasses: 'fas fa-file-signature',
    path: ['/anfrage/uebersicht']
  },
  {
    name: 'Angebote',
    iconClasses: 'fas fa-file-signature',
    path: ['/angebot/uebersicht']
  },
  {
    name: 'Beratungstermine',
    iconClasses: 'fas fa-calendar',
    path: ['/beratungstermine/uebersicht']
  },
  {
    name: 'Dokumente',
    iconClasses: 'fas fa-folder',
    path: ['/dokumente/uebersicht']
  },
  {
    name: 'Dokumentenzugriff',
    iconClasses: 'fas fa-download',
    path: ['/dokumentenzugriff/uebersicht']
  },
  {
    name: 'Informationsbeitrag',
    iconClasses: 'fas fa-newspaper',
    path: ['/informationsbeitrag/uebersicht']
  },
  {
    name: 'Maschinen',
    iconClasses: 'fas fa-microscope',
    path: ['/maschinen/uebersicht']
  },
  {
    name: 'Partner',
    iconClasses: 'fas fa-handshake',
    path: ['/partner/uebersicht']
  },
  {
    name: 'Seminare',
    iconClasses: 'fas fa-graduation-cap',
    path: ['/seminare/uebersicht']
  },
  {
    name: 'Seminararchiv',
    iconClasses: 'fas fa-graduation-cap',
    path: ['/seminararchiv/uebersicht']
  },
];
