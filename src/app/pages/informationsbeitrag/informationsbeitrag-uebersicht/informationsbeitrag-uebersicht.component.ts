import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-informationsbeitrag-uebersicht',
  templateUrl: './informationsbeitrag-uebersicht.component.html',
  styleUrls: ['./informationsbeitrag-uebersicht.component.scss']
})
export class InformationsbeitragUebersichtComponent implements OnInit {

  title! :string
  constructor(private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
  }

}
