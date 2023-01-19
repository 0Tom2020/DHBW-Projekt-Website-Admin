import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dokumentenzugriff-uebersicht',
  templateUrl: './dokumentenzugriff-uebersicht.component.html',
  styleUrls: ['./dokumentenzugriff-uebersicht.component.scss']
})
export class DokumentenzugriffUebersichtComponent implements OnInit{

  accessCode:string = "test"

  constructor() {
  }
  ngOnInit() {

  }

}
