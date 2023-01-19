import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import {
    InformationsbeitragErstellenComponent
} from "@pages/informationsbeitrag/informationsbeitrag-erstellen/informationsbeitrag-erstellen.component";
import {
    InformationsbeitragUebersichtComponent
} from "@pages/informationsbeitrag/informationsbeitrag-uebersicht/informationsbeitrag-uebersicht.component";
import {
    InformationsbeitragBearbeitenComponent
} from "@pages/informationsbeitrag/informationsbeitrag-bearbeiten/informationsbeitrag-bearbeiten.component";
import {
    DokumentenzugriffErstellenComponent
} from "@pages/dokumentenzugriff/dokumentenzugriff-erstellen/dokumentenzugriff-erstellen.component";
import {
    DokumentenzugriffUebersichtComponent
} from "@pages/dokumentenzugriff/dokumentenzugriff-uebersicht/dokumentenzugriff-uebersicht.component";
import {
    DokumentenzugriffBearbeitenComponent
} from "@pages/dokumentenzugriff/dokumentenzugriff-bearbeiten/dokumentenzugriff-bearbeiten.component";
import {SeminarErstellenComponent} from "@pages/seminare/seminar-erstellen/seminar-erstellen.component";
import {SeminareUebersichtComponent} from "@pages/seminare/seminare-uebersicht/seminare-uebersicht.component";
import {
  SeminareBearbeitenComponent
} from "@pages/seminare/seminare-bearbeiten/seminare-bearbeiten.component";


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent
            },
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'informationsbeitrag/erstellen',
                component: InformationsbeitragErstellenComponent
            },
            {
                path: 'informationsbeitrag/uebersicht',
                component: InformationsbeitragUebersichtComponent
            },
            {
                path: 'informationsbeitrag/uebersicht/:id',
                component: InformationsbeitragBearbeitenComponent
            },
            {
                path: 'dokumentenzugriff/erstellen',
                component: DokumentenzugriffErstellenComponent
            },
            {
                path: 'dokumentenzugriff/uebersicht',
                component: DokumentenzugriffUebersichtComponent
            },
            {
                path: 'dokumentenzugriff/uebersicht/:id',
                component: DokumentenzugriffBearbeitenComponent
            },
          {
                path: 'seminare/erstellen',
                component: SeminarErstellenComponent
            },
          {
                path: 'seminare/uebersicht',
                component: SeminareUebersichtComponent
            },
          {
                path: 'seminare/uebersicht/:id',
                component: SeminareBearbeitenComponent
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
