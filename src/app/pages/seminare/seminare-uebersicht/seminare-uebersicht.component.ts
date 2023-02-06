import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-seminare-uebersicht',
  templateUrl: './seminare-uebersicht.component.html',
  styleUrls: ['./seminare-uebersicht.component.scss']
})
export class SeminareUebersichtComponent implements OnInit {

  title!: string

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'}
  ]
  seminars: any[] = []

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient) {
  }
  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })


    this.client.get(environment.backend +'/seminar', {withCredentials: true}).subscribe(value => {
      this.seminars = value as any[]
    })
  }

}
