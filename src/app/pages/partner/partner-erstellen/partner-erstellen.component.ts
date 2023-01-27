import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-partner-erstellen',
  templateUrl: './partner-erstellen.component.html',
  styleUrls: ['./partner-erstellen.component.scss']
})
export class PartnerErstellenComponent implements OnInit {

  title!:string

  newPartner = new FormGroup ({
    name: new FormControl('', [Validators.required]),
    website: new FormControl('', [Validators.required]),
    file: new FormControl,
  })

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Erstellen", route: ''},
  ]

  constructor(private activeRoute: ActivatedRoute, private toastr: ToastrService, private client: HttpClient) {
  }

  ngOnInit() {
    this.activeRoute.data.subscribe( value => {
      this.title = value['title']
    })
  }

  post() {
    if (this.newPartner.invalid) {
      this.toastr.error("Bitte füllen Sie alle Felder aus!", "Fehler")
    } else {
      const body = this.newPartner.value
      console.log(body)
      this.client.post(environment.backend + '/partner/create', body, {withCredentials:true}).subscribe(data => {
        this.newPartner.reset()
        this.toastr.success("Es wurde erfolgreich ein neuer Partner angelegt")
      }, error => {
        console.log(error)
      })

    }
  }

}
