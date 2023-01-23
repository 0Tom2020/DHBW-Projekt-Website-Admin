import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dokumentenzugriff-uebersicht',
  templateUrl: './dokumentenzugriff-uebersicht.component.html',
  styleUrls: ['./dokumentenzugriff-uebersicht.component.scss']
})
export class DokumentenzugriffUebersichtComponent implements OnInit{

  accessCode:string = "test"
  title! :string

  constructor(private activeRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

  }

}
