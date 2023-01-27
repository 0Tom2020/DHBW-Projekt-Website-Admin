import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-dokumentenzugriff-uebersicht',
  templateUrl: './dokumentenzugriff-uebersicht.component.html',
  styleUrls: ['./dokumentenzugriff-uebersicht.component.scss']
})
export class DokumentenzugriffUebersichtComponent implements OnInit{

  keys: any[] = [];
  title! :string

  constructor(private activeRoute: ActivatedRoute, private http: HttpClient) {
  }
  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.http.get(environment.backend + '/data-transfer/keys/', {withCredentials: true}).subscribe((keys: any) => {
      this.keys = keys;
    });

  }

}
