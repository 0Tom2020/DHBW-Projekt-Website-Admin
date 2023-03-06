import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-beratungstermin-uebersicht',
  templateUrl: './beratungstermin-uebersicht.component.html',
  styleUrls: ['./beratungstermin-uebersicht.component.scss']
})
export class BeratungsterminUebersichtComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
  ]

  title!: string
  consultingAppointments

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient) {
  }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.client.get<any[]>(environment.backend + '/consulting', {withCredentials: true}).subscribe(value => {
      this.consultingAppointments = value
    })

  }

}
