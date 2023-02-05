import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';

import {APP_BASE_HREF, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from '@components/menu-item/menu-item.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {defineCustomElements} from '@profabric/web-components/loader';
import {
  InformationsbeitragErstellenComponent
} from '@pages/informationsbeitrag/informationsbeitrag-erstellen/informationsbeitrag-erstellen.component';
import {
  InformationsbeitragUebersichtComponent
} from '@pages/informationsbeitrag/informationsbeitrag-uebersicht/informationsbeitrag-uebersicht.component';
import {
  InformationsbeitragBearbeitenComponent
} from '@pages/informationsbeitrag/informationsbeitrag-bearbeiten/informationsbeitrag-bearbeiten.component';
import {
  DokumentenzugriffErstellenComponent
} from '@pages/dokumentenzugriff/dokumentenzugriff-erstellen/dokumentenzugriff-erstellen.component';
import {
  DokumentenzugriffUebersichtComponent
} from '@pages/dokumentenzugriff/dokumentenzugriff-uebersicht/dokumentenzugriff-uebersicht.component';
import {
  DokumentenzugriffBearbeitenComponent
} from '@pages/dokumentenzugriff/dokumentenzugriff-bearbeiten/dokumentenzugriff-bearbeiten.component';
import {SeminarErstellenComponent} from '@pages/seminare/seminare-erstellen/seminar-erstellen.component';
import {SeminareUebersichtComponent} from '@pages/seminare/seminare-uebersicht/seminare-uebersicht.component';
import {SeminareBearbeitenComponent} from '@pages/seminare/seminare-bearbeiten/seminare-bearbeiten.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { DokumenteUebersichtComponent } from '@pages/dokumente/dokumente-uebersicht/dokumente-uebersicht.component';
import { DokumentFilterPipe } from './pipes/dokument-filter.pipe';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { PartnerUebersichtComponent } from '@pages/partner/partner-uebersicht/partner-uebersicht.component';
import { PartnerBearbeitenComponent } from '@pages/partner/partner-bearbeiten/partner-bearbeiten.component';
import { PartnerErstellenComponent } from '@pages/partner/partner-erstellen/partner-erstellen.component';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { FileSizeFormatterPipe } from './pipes/file-size-formatter.pipe';
import {environment} from "../environments/environment";
import { AdminuserUebersichtComponent } from '@pages/adminUser/adminuser-uebersicht/adminuser-uebersicht.component';
import { AdminuserErstellenComponent } from '@pages/adminUser/adminuser-erstellen/adminuser-erstellen.component';
import { AdminuserBearbeitenComponent } from '@pages/adminUser/adminuser-bearbeiten/adminuser-bearbeiten.component';
import { AnfrageBearbeitenComponent } from './pages/anfrage/anfrage-bearbeiten/anfrage-bearbeiten.component';
import { AnfrageUebersichtComponent } from './pages/anfrage/anfrage-uebersicht/anfrage-uebersicht.component';
import { AngebotUebersichtComponent } from './pages/angebot/angebot-uebersicht/angebot-uebersicht.component';
import { MaschineUebersichtComponent } from './pages/maschine/maschine-uebersicht/maschine-uebersicht.component';
import { MaschineErstellenComponent } from './pages/maschine/maschine-erstellen/maschine-erstellen.component';
import { MaschineBearbeitenComponent } from './pages/maschine/maschine-bearbeiten/maschine-bearbeiten.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import { AngebotErstellenComponent } from './pages/anfrage/angebot-erstellen/angebot-erstellen.component';
import { SeminareArchivUebersichtComponent } from './pages/seminare_archiv/seminare-archiv-uebersicht/seminare-archiv-uebersicht.component';
import { SeminareArchrivBearbeitenComponent } from './pages/seminare_archiv/seminare-archiv-bearbeiten/seminare-archriv-bearbeiten.component';
import { AngebotBearbeitenComponent } from './pages/angebot/angebot-bearbeiten/angebot-bearbeiten.component';

defineCustomElements();
registerLocaleData(localeEn, 'en-EN');

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuSidebarComponent,
    BlankComponent,
    ProfileComponent,
    DashboardComponent,
    UserComponent,
    ForgotPasswordComponent,
    MainMenuComponent,
    SubMenuComponent,
    MenuItemComponent,
    InformationsbeitragErstellenComponent,
    InformationsbeitragUebersichtComponent,
    InformationsbeitragBearbeitenComponent,
    DokumentenzugriffErstellenComponent,
    DokumentenzugriffUebersichtComponent,
    DokumentenzugriffBearbeitenComponent,
    SeminarErstellenComponent,
    SeminareUebersichtComponent,
    SeminareBearbeitenComponent,
    DokumenteUebersichtComponent,
    DokumentFilterPipe,
    BreadcrumbComponent,
    PartnerUebersichtComponent,
    PartnerBearbeitenComponent,
    PartnerErstellenComponent,
    DragAndDropDirective,
    FileSizeFormatterPipe,
    AdminuserUebersichtComponent,
    AdminuserErstellenComponent,
    AdminuserBearbeitenComponent,
    AnfrageBearbeitenComponent,
    AnfrageUebersichtComponent,
    AngebotErstellenComponent,
    AngebotUebersichtComponent,
    MaschineUebersichtComponent,
    MaschineErstellenComponent,
    MaschineBearbeitenComponent,
    AngebotErstellenComponent,
    SeminareArchivUebersichtComponent,
    SeminareArchrivBearbeitenComponent,
    AngebotBearbeitenComponent,
  ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        ProfabricComponentsModule,
        NgMultiSelectDropDownModule.forRoot(),
        FormsModule,
      BsDatepickerModule.forRoot(),
    ],
  providers: [{provide: APP_BASE_HREF, useValue: environment.baseUrl}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
