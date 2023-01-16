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
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';

import {registerLocaleData} from '@angular/common';
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
import { InformationsbeitragErstellenComponent } from './pages/informationsbeitrag/informationsbeitrag-erstellen/informationsbeitrag-erstellen.component';
import { InformationsbeitragUebersichtComponent } from '@pages/informationsbeitrag/informationsbeitrag-uebersicht/informationsbeitrag-uebersicht.component';
import { InformationsbeitragBearbeitenComponent } from './pages/informationsbeitrag/informationsbeitrag-uebersicht/informationsbeitrag-bearbeiten/informationsbeitrag-bearbeiten.component';
import { DokumentenzugriffErstellenComponent } from './pages/dokumentenzugriff/dokumentenzugriff-erstellen/dokumentenzugriff-erstellen.component';
import { DokumentenzugriffUebersichtComponent } from './pages/dokumentenzugriff/dokumentenzugriff-uebersicht/dokumentenzugriff-uebersicht.component';
import { DokumentenzugriffBearbeitenComponent } from './pages/dokumentenzugriff/dokumentenzugriff-uebersicht/dokumentenzugriff-bearbeiten/dokumentenzugriff-bearbeiten.component';

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
        ProfabricComponentsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
