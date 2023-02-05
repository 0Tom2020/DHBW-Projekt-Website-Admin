import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup} from "@angular/forms";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-anfrage-bearbeiten',
  templateUrl: './anfrage-bearbeiten.component.html',
  styleUrls: ['./anfrage-bearbeiten.component.scss']
})
export class AnfrageBearbeitenComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Detailansicht", route: ''},
  ]

  title!:string

  id: string = '';

  offers: any[] = [];

  inquiry = new FormGroup({
    name: new FormControl({value: '', disabled: true}),
    email: new FormControl({value: '', disabled: true}),
    lastName: new FormControl({value: '', disabled: true}),
    description: new FormControl({value: '', disabled: true}),
    street: new FormControl({value: '', disabled: true}),
    postal: new FormControl({value: '', disabled: true}),
    city: new FormControl({value: '', disabled: true}),
    deadline: new FormControl({value: '', disabled: true}),
    levy: new FormControl({value: '', disabled: true}),
  })

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
    this.activeRoute.params.subscribe(value => {
      this.client.get<any>(environment.backend + '/inquiry/' + value["id"], {withCredentials: true}).subscribe(value => {
        this.id = value['id'];
        this.inquiry.controls['name'].setValue(value['contact']['firstName'])
        this.inquiry.controls['lastName'].setValue(value['contact']['lastName'])
        this.inquiry.controls['email'].setValue(value['contact']['email'])
        this.inquiry.controls['description'].setValue(value['description'])
        this.inquiry.controls['street'].setValue(value['contact']['street'])
        this.inquiry.controls['postal'].setValue(value['contact']['postalCode'])
        this.inquiry.controls['city'].setValue(value['contact']['city'])
        this.inquiry.controls['deadline'].setValue(value['deadlineDate'])
        this.inquiry.controls['levy'].setValue(value['partsDeliveryDate'])
      }, error => {
        if (error.error.message) {
          this.toastr.error(error.error.message)
        } else {
          this.toastr.error("Es ist ein Fehler aufgetreten!")
        }
      })

      this.client.get<any[]>(environment.backend + '/inquiry/' + value["id"] + '/offers', {withCredentials: true}).subscribe(value => {
        for (const offer of value) {
          this.offers.push(offer)
        }
      })

    })


  }

  createOffer() {
    this.router.navigate(['angebot'], {relativeTo: this.activeRoute})
  }

  delete () {
    this.client.delete(environment.backend + '/inquiry/' + this.id, {withCredentials: true}).subscribe(value => {
      this.toastr.success("Anfrage wurde gelöscht")
      this.router.navigate(['./..'])
    }, error => {
      if (error.error.message) {
        this.toastr.error(error.error.message)
      } else {
        this.toastr.error("Es ist ein Fehler aufgetreten!")
      }
    })
  }


}
