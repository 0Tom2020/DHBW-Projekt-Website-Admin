import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-seminare-archiv-uebersicht',
  templateUrl: './seminare-archiv-uebersicht.component.html',
  styleUrls: ['./seminare-archiv-uebersicht.component.scss']
})
export class SeminareArchivUebersichtComponent implements OnInit {

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


    this.client.get(environment.backend +'/seminar/old', {withCredentials: true}).subscribe(value => {
      this.seminars = value as any[]
    })
  }

}
