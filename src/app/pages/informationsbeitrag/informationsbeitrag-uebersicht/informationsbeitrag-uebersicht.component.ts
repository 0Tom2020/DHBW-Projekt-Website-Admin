import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-informationsbeitrag-uebersicht',
  templateUrl: './informationsbeitrag-uebersicht.component.html',
  styleUrls: ['./informationsbeitrag-uebersicht.component.scss']
})
export class InformationsbeitragUebersichtComponent implements OnInit {

  title! :string
  infoEntry

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
  ]

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient) {
  }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.client.get(environment.backend + '/infoEntry').subscribe(data => {
      this.infoEntry = data
    }, error => {
      console.log(error)
    })
  }

}
