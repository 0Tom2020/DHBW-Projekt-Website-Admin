import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
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
import {PartnerUebersichtComponent} from "@pages/partner/partner-uebersicht/partner-uebersicht.component";
import {PartnerErstellenComponent} from "@pages/partner/partner-erstellen/partner-erstellen.component";
import {PartnerBearbeitenComponent} from "@pages/partner/partner-bearbeiten/partner-bearbeiten.component";
import {AdminuserUebersichtComponent} from "@pages/adminUser/adminuser-uebersicht/adminuser-uebersicht.component";
import {AdminuserBearbeitenComponent} from "@pages/adminUser/adminuser-bearbeiten/adminuser-bearbeiten.component";
import {AdminuserErstellenComponent} from "@pages/adminUser/adminuser-erstellen/adminuser-erstellen.component";
import {MaschineErstellenComponent} from "@pages/maschine/maschine-erstellen/maschine-erstellen.component";
import {MaschineUebersichtComponent} from "@pages/maschine/maschine-uebersicht/maschine-uebersicht.component";
import {MaschineBearbeitenComponent} from "@pages/maschine/maschine-bearbeiten/maschine-bearbeiten.component";
import {AnfrageUebersichtComponent} from "@pages/anfrage/anfrage-uebersicht/anfrage-uebersicht.component";
import {AngebotUebersichtComponent} from "@pages/angebot/angebot-uebersicht/angebot-uebersicht.component";
import {AnfrageBearbeitenComponent} from "@pages/anfrage/anfrage-bearbeiten/anfrage-bearbeiten.component";
import {AngebotErstellenComponent} from "@pages/anfrage/angebot-erstellen/angebot-erstellen.component";
import {
  SeminareArchivUebersichtComponent
} from "@pages/seminare_archiv/seminare-archiv-uebersicht/seminare-archiv-uebersicht.component";
import {
  SeminareArchrivBearbeitenComponent
} from "@pages/seminare_archiv/seminare-archiv-bearbeiten/seminare-archriv-bearbeiten.component";
import {AngebotBearbeitenComponent} from "@pages/angebot/angebot-bearbeiten/angebot-bearbeiten.component";
import {
  BeratungsterminUebersichtComponent
} from "@pages/beratungstermin/beratungstermin-uebersicht/beratungstermin-uebersicht.component";
import {
  BeratungsterminBearbeitenComponent
} from "@pages/beratungstermin/beratungstermin-bearbeiten/beratungstermin-bearbeiten.component";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
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
        path: 'dokumentenzugriff/code/:id',
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
          title: "Seminarübersicht"
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
        path: 'seminararchiv/uebersicht',
        component: SeminareArchivUebersichtComponent,
        data: {
          title: "Archiv - Seminarübersicht"
        }
      },
      {
        path: 'seminararchiv/uebersicht/:id',
        component: SeminareArchrivBearbeitenComponent,
        data: {
          title: "Archiv - Seminar Detail"
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
      {
        path: 'admin/uebersicht',
        component: AdminuserUebersichtComponent,
        data: {
          title: "Admin Übersicht"
        }
      },
      {
        path: 'admin/uebersicht/erstellen',
        component: AdminuserErstellenComponent,
        data: {
          title: "Admin erstellen"
        }
      },
      {
        path: 'admin/uebersicht/:id',
        component: AdminuserBearbeitenComponent,
        data: {
          title: "Admin bearbeiten"
        }
      },
      {
        path: 'maschinen/uebersicht',
        component: MaschineUebersichtComponent,
        data: {
          title: "Maschinenübersicht"
        }
      },
      {
        path: 'maschinen/uebersicht/erstellen',
        component: MaschineErstellenComponent,
        data: {
          title: "Maschine erstellen"
        }
      },
      {
        path: 'maschinen/uebersicht/:id',
        component: MaschineBearbeitenComponent,
        data: {
          title: "Maschine bearbeiten"
        }
      },
      {
        path: 'anfrage/uebersicht',
        component: AnfrageUebersichtComponent,
        data: {
          title: "Anfrage Übersicht"
        }
      },
      {
        path: 'anfrage/uebersicht/:id',
        children: [
          {
            path: '',
            component: AnfrageBearbeitenComponent,
            data: {
              title: "Anfrage Detailansicht"
            },
          },
          {
            path: 'angebot',
            component: AngebotErstellenComponent,
            data: {
              title: "Angebot erstellen"
            }
          }
        ]
      },
      {
        path: 'angebot/uebersicht',
        component: AngebotUebersichtComponent,
        data: {
          title: "Angebot Übersicht"
        },
      },
      {
        path: 'angebot/uebersicht/:id',
        component: AngebotBearbeitenComponent,
        data: {
          title: "Angebot Details"
        },
      },
      {
        path: 'beratungstermine/uebersicht',
        component: BeratungsterminUebersichtComponent,
        data: {
          title: "Beratungstermin Übersicht"
        },
      },
      {
        path: 'beratungstermine/uebersicht/:id',
        component: BeratungsterminBearbeitenComponent,
        data: {
          title: "Beratungstermin Details"
        },
      }
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
