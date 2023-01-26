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
import {SeminarErstellenComponent} from "@pages/seminare/seminare-erstellen/seminar-erstellen.component";
import {SeminareUebersichtComponent} from "@pages/seminare/seminare-uebersicht/seminare-uebersicht.component";
import {
  SeminareBearbeitenComponent
} from "@pages/seminare/seminare-bearbeiten/seminare-bearbeiten.component";
import {DokumenteUebersichtComponent} from "@pages/dokumente/dokumente-uebersicht/dokumente-uebersicht.component";
import {DokumenteHinzufuegenComponent} from "@pages/dokumente/dokumente-hinzufuegen/dokumente-hinzufuegen.component";
import {PartnerUebersichtComponent} from "@pages/partner/partner-uebersicht/partner-uebersicht.component";
import {PartnerErstellenComponent} from "@pages/partner/partner-erstellen/partner-erstellen.component";
import {PartnerBearbeitenComponent} from "@pages/partner/partner-bearbeiten/partner-bearbeiten.component";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: "test"
        }
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
        path: 'informationsbeitrag/uebersicht/erstellen',
        component: InformationsbeitragErstellenComponent,
        data: {
          title: "Informationsbeitrag erstellen"
        }
      },
      {
        path: 'informationsbeitrag/uebersicht',
        component: InformationsbeitragUebersichtComponent,
        data: {
          title: 'Informationsbeitragsübersicht'
        }
      },
      {
        path: 'informationsbeitrag/uebersicht/:id',
        component: InformationsbeitragBearbeitenComponent,
        data: {
          title: "Informationsbeitrag bearbeiten"
        }
      },
      {
        path: 'dokumentenzugriff/uebersicht/erstellen',
        component: DokumentenzugriffErstellenComponent,
        data: {
          title: "Dokumentenzugriff erstellen"
        }
      },
      {
        path: 'dokumentenzugriff/uebersicht',
        component: DokumentenzugriffUebersichtComponent,
        data: {
          title: 'Dokumentenzugriffsübersicht'
        }
      },
      {
        path: 'dokumentenzugriff/uebersicht/:id',
        component: DokumentenzugriffBearbeitenComponent,
        data: {
          title: 'Dokumentenzugriff bearbeiten'
        }
      },
      {
        path: 'seminare/uebersicht/erstellen',
        component: SeminarErstellenComponent,
        data: {
          title: "Seminar erstellen"
        }
      },
      {
        path: 'seminare/uebersicht',
        component: SeminareUebersichtComponent,
        data: {
          title: "Seminarsübersicht"
        }
      },
      {
        path: 'seminare/uebersicht/:id',
        component: SeminareBearbeitenComponent,
        data: {
          title: "Seminar bearbeiten"
        }
      },
      {
        path: 'dokumente/uebersicht',
        component: DokumenteUebersichtComponent,
        data: {
          title: "Dokumente Übersicht"
        }
      },
      {
        path: 'dokumente/uebersicht/hochladen',
        component: DokumenteHinzufuegenComponent,
        data: {
          title: "Dokumente hochladen"
        }
      },
      {
        path: 'partner/uebersicht',
        component: PartnerUebersichtComponent,
        data: {
          title: "Partnerübersicht"
        }
      },
      {
        path: 'partner/uebersicht/erstellen',
        component: PartnerErstellenComponent,
        data: {
          title: "Partner erstellen"
        }
      },
      {
        path: 'partner/uebersicht/:id',
        component: PartnerBearbeitenComponent,
        data: {
          title: "Partner bearbeiten"
        }
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
export class AppRoutingModule {
}
