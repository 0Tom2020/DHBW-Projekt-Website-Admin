import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environments/environment";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-angebot-uebersicht',
  templateUrl: './angebot-uebersicht.component.html',
  styleUrls: ['./angebot-uebersicht.component.scss']
})
export class AngebotUebersichtComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
  ]

  offers

  title!:string

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient, private toastr: ToastrService) {


  }

  ngOnInit(): void {
    this.activeRoute.data.subscribe( value => {
      this.title = value['title']
    })

    this.client.get(environment.backend +'/offer', {withCredentials: true}).subscribe(value => {

      const tmpOffers = []

      tmpOffers.push(value)

      tmpOffers.forEach(offer => {
        offer.forEach(offer => {
          offer.deadlineDate = formatDate(offer.deadlineDate, 'dd.MM.yyyy', 'en_US')
        })
      })

      this.offers = value
    }, error => {
      this.toastr.error(error.error.message, "Fehler")
    })

  }
}
