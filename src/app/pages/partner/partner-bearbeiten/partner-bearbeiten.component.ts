import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-partner-bearbeiten',
  templateUrl: './partner-bearbeiten.component.html',
  styleUrls: ['./partner-bearbeiten.component.scss']
})
export class PartnerBearbeitenComponent implements OnInit {

  title!: string
  partner
  id
  partnerPicture
  editPartner = new FormGroup({
    name: new FormControl('', [Validators.required]),
    website: new FormControl('', [Validators.required]),
    file: new FormControl,
  })
  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Bearbeiten", route: ''},
  ]
  backend = environment.backend;
  existsPartnerPicture:boolean

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.activeRoute.params.subscribe(params => {
      this.id = params['id']
      this.client.get(environment.backend + '/partner/single/' + this.id, {withCredentials: true}).subscribe(data => {
        this.partner = data
        this.existsPartnerPicture = this.partner['existsPartnerPicture']
        this.editPartner.controls['name'].setValue(this.partner['name'])
        this.editPartner.controls['website'].setValue(this.partner['website'])
      }, error => {
        console.log(error)
      })
    })


  }

  post() {
    if (this.editPartner.invalid) {
      this.toastr.error("Bitte füllen Sie alle Felder aus!", "Fehler")
    } else {
      const body = this.editPartner.value
      this.client.put(environment.backend + '/partner/single/' + this.id, body, {withCredentials: true}).subscribe(data => {
        console.log(data)
        this.toastr.success("Es wurde erfolgreich der Partner geändert")
      }, error => {
        console.log(error)
      })

    }
  }

  delete() {
    this.client.delete(environment.backend + '/partner/single/' + this.id, {withCredentials: true}).subscribe (data => {
      this.toastr.success("Partner wurde erfolgreich gelöscht")
      this.router.navigate(['/partner/uebersicht'])
    }, error => {
      console.log(error)
    })
  }
}
