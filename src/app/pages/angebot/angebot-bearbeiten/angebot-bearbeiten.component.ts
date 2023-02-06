import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {FormControl, FormGroup} from "@angular/forms";

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
    })
    title!: string
    id!: string

    constructor(private client: HttpClient, private activeRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activeRoute.data.subscribe(value => {
            this.title = value['title']
        })

        this.activeRoute.params.subscribe(value => {
            this.id = value['id']
        })

        this.client.get(environment.backend + '/offer/' + this.id + '/detail', {withCredentials: true}).subscribe(value => {
            console.log(value)
            this.offer.controls['name'].setValue(value['contact']['firstName'])
            this.offer.controls['lastName'].setValue(value['contact']['lastName'])
            this.offer.controls['email'].setValue(value['contact']['email'])
            this.offer.controls['description'].setValue(value['description'])
            this.offer.controls['street'].setValue(value['contact']['street'])
            this.offer.controls['postal'].setValue(value['contact']['postalCode'])
            this.offer.controls['city'].setValue(value['contact']['city'])
            this.offer.controls['deadline'].setValue(value['inquiry']['deadlineDate'])
            this.offer.controls['levy'].setValue(value['inquiry']['partsDeliveryDate'])
            this.offer.controls['price'].setValue(value['price'])
            this.offer.controls['partCount'].setValue(value['partCount'])
            this.offer.controls['workingHours'].setValue(value['workingHours'])
            this.offer.controls['startDate'].setValue(value['startDate'])
            this.offer.controls['completionDeadline'].setValue(value['completionDeadline'])
            this.offer.controls['machine'].setValue(value['machine'])
        })


    }


    delete() {

    }
}
