import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {forEach} from "@angular-devkit/schematics";

@Component({
  selector: 'app-anfrage-uebersicht',
  templateUrl: './anfrage-uebersicht.component.html',
  styleUrls: ['./anfrage-uebersicht.component.scss']
})
export class AnfrageUebersichtComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
  ]
  title!:string
  inquires: any[] = []

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient) { }

  ngOnInit(): void {
    this.activeRoute.data.subscribe( value => {
      this.title = value['title']
    })

    this.client.get<any[]>(environment.backend + '/inquiry', {withCredentials: true}).subscribe(value => {
      for(const inquiry of value) {
        this.inquires.push(inquiry)
      }
    })
  }


}
