import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {FormControl, FormGroup} from "@angular/forms";
import {formatDate} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-angebot-bearbeiten',
  templateUrl: './angebot-bearbeiten.component.html',
  styleUrls: ['./angebot-bearbeiten.component.scss']
})
export class AngebotBearbeitenComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Detail", route: './..'},
  ]
  offerAccepted!: boolean
  offerCompleted!: boolean
  offer = new FormGroup({
    name: new FormControl({value: '', disabled: true}),
    email: new FormControl({value: '', disabled: true}),
    lastName: new FormControl({value: '', disabled: true}),
    description: new FormControl({value: '', disabled: true}),
    street: new FormControl({value: '', disabled: true}),
    postal: new FormControl({value: '', disabled: true}),
    city: new FormControl({value: '', disabled: true}),
    deadline: new FormControl({value: '', disabled: true}),
    levy: new FormControl({value: '', disabled: true}),
    price: new FormControl({value: '', disabled: true}),
    partCount: new FormControl({value: '', disabled: true}),
    workingHours: new FormControl({value: '', disabled: true}),
    startDate: new FormControl({value: '', disabled: true}),
    completionDeadline: new FormControl({value: '', disabled: true}),
    machine: new FormControl({value: '', disabled: true}),
    descriptionInquiry: new FormControl({value: '', disabled: true}),
    partsDeliveryDate: new FormControl({value: '', disabled: true}),
    deadlineDate: new FormControl({value: '', disabled: true}),
  })
  title!: string
  id!: string

  constructor(private client: HttpClient, private activeRoute: ActivatedRoute, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.activeRoute.params.subscribe(value => {
      this.id = value['id']
    })

    this.client.get(environment.backend + '/offer/' + this.id + '/detail', {withCredentials: true}).subscribe(value => {
      this.offerAccepted = value['accepted']
      this.offerCompleted = value['completed']
      this.offer.controls['name'].setValue(value['contact']['firstName'])
      this.offer.controls['lastName'].setValue(value['contact']['lastName'])
      this.offer.controls['email'].setValue(value['contact']['email'])
      this.offer.controls['description'].setValue(value['description'])
      this.offer.controls['street'].setValue(value['contact']['street'])
      this.offer.controls['postal'].setValue(value['contact']['postalCode'])
      this.offer.controls['city'].setValue(value['contact']['city'])
      this.offer.controls['deadline'].setValue(value['inquiry']['deadlineDate'])
      this.offer.controls['levy'].setValue(value['inquiry']['partsDeliveryDate'])
      this.offer.controls['price'].setValue(value['price'].toFixed(2).replace('.', ','))
      this.offer.controls['partCount'].setValue(value['partCount'])
      this.offer.controls['workingHours'].setValue(value['workingHours'])
      this.offer.controls['startDate'].setValue(formatDate(value['startDate'], 'dd.MM.yyyy', 'en_US'))
      this.offer.controls['completionDeadline'].setValue(formatDate(value['completionDeadline'], 'dd.MM.yyyy', 'en_US'))
      this.offer.controls['machine'].setValue(value['machine'])
      this.offer.controls['descriptionInquiry'].setValue(value['inquiry']['description'])
      this.offer.controls['partsDeliveryDate'].setValue(formatDate(value['inquiry']['partsDeliveryDate'], 'dd.MM.yyyy', 'en_US'))
      this.offer.controls['deadlineDate'].setValue(formatDate(value['inquiry']['deadlineDate'], 'dd.MM.yyyy', 'en_US'))
    })


  }


  delete() {
    this.client.delete(environment.backend + '/offer/' + this.id, {withCredentials: true}).subscribe(value => {
      this.toastr.success('Angebot wurde gelöscht')
      this.router.navigate(['./angebot/uebersicht'])
    }, error => {
      this.toastr.error(error.error.message, 'Fehler')
    })
  }

  finishOffer() {
    const body = null
    this.client.put(environment.backend + '/offer/' + this.id + '/completed', body, {withCredentials: true}).subscribe(value => {
      this.toastr.success('Angebot wurde abgeschlossen')
      this.offerCompleted = true
      this.router.navigate(['./angebot/uebersicht'])
    }, error => {
      this.toastr.error(error.error.message, 'Fehler')
    })
  }
}
