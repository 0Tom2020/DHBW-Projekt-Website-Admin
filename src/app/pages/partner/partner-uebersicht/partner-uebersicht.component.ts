import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-partner-uebersicht',
  templateUrl: './partner-uebersicht.component.html',
  styleUrls: ['./partner-uebersicht.component.scss']
})
export class PartnerUebersichtComponent implements OnInit{

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
  ]

  partners

  httpSub

  title!:string

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient) {

  }

  ngOnInit() {
    this.activeRoute.data.subscribe( value => {
      this.title = value['title']
    })

    this.httpSub = this.client.get(environment.backend + 'partner').subscribe( data => {
      this.partners = data
    })

  }

  ngOnDestroy() {
    this.httpSub.unsubscribe()
  }


}
