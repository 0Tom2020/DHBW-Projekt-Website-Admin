import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

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
  inquires: any[] = [{
    title: "Test",
    description: "Test",
    id: 1
  }]

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient) { }

  ngOnInit(): void {
    this.activeRoute.data.subscribe( value => {
      this.title = value['title']
    })
  }


}
