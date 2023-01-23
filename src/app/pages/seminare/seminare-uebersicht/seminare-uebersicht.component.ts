import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-seminare-uebersicht',
  templateUrl: './seminare-uebersicht.component.html',
  styleUrls: ['./seminare-uebersicht.component.scss']
})
export class SeminareUebersichtComponent implements OnInit {

  title!: string

  constructor(private activeRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
  }

}
