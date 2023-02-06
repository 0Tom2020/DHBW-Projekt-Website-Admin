import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-maschine-uebersicht',
  templateUrl: './maschine-uebersicht.component.html',
  styleUrls: ['./maschine-uebersicht.component.scss']
})
export class MaschineUebersichtComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
  ]

  machines

  title!:string

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient) {

  }

  ngOnInit(): void {
    this.activeRoute.data.subscribe( value => {
      this.title = value['title']
    })

    this.client.get(environment.backend +'/machines', {withCredentials: true}).subscribe(value => {
      this.machines = value
    })

  }
}
