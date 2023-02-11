import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-beratungstermin-bearbeiten',
    templateUrl: './beratungstermin-bearbeiten.component.html',
    styleUrls: ['./beratungstermin-bearbeiten.component.scss']
})
export class BeratungsterminBearbeitenComponent implements OnInit {


    consulting = new FormGroup({
        price: new FormControl({value: '', disabled: true}),
        date: new FormControl({value: '', disabled: true}),
        startTime: new FormControl({value: '', disabled: true}),
        endTime: new FormControl({value: '', disabled: true}),
        firstName: new FormControl({value: '', disabled: true}),
        lastName: new FormControl({value: '', disabled: true}),
        email: new FormControl({value: '', disabled: true}),
        street: new FormControl({value: '', disabled: true}),
        postal: new FormControl({value: '', disabled: true}),
        city: new FormControl({value: '', disabled: true}),
    })

    breadcrumbItems = [
        {label: "Home", route: '/'},
        {label: "Übersicht", route: './..'},
        {label: "Beratungstermin Details", route: ''},
    ]

    title!: string
    id!: string
    accepted!: boolean
    constructor(private client: HttpClient, private activeRoute: ActivatedRoute, private toastr: ToastrService, private router: Router) {

    }




    ngOnInit(): void {
        this.activeRoute.data.subscribe(value => {
            this.title = value['title']
        })

        this.activeRoute.params.subscribe(value => {
            this.id = value['id']
        })
        this.client.get('http://localhost:8080/consulting/' + this.id , {withCredentials: true}).subscribe(value => {
           console.log(value)
            this.consulting.controls['price'].setValue(value['price'])
            this.consulting.controls['date'].setValue(formatDate(value['startDate'], 'dd.MM.yyyy', 'en_US'))
            this.consulting.controls['startTime'].setValue(value['startDate'])
            this.consulting.controls['endTime'].setValue(value['endDate'])
            this.accepted = value['accepted']
            if (value['accepted']) {
                this.client.get('http://localhost:8080/consulting/' + value['userID'] + '/bookinguser', {withCredentials: true}).subscribe(value => {
                    this.consulting.controls['firstName'].setValue(value['firstName'])
                    this.consulting.controls['lastName'].setValue(value['lastName'])
                    this.consulting.controls['email'].setValue(value['email'])
                    this.consulting.controls['street'].setValue(value['street'])
                    this.consulting.controls['postal'].setValue(value['postal'])
                    this.consulting.controls['city'].setValue(value['city'])
                }, error => {
                    this.toastr.error(error.error.message, "Fehler")
                })
            }

        }, error => {

        })
    }

    delete() {
        this.client.delete('http://localhost:8080/consulting/' + this.id , {withCredentials: true}).subscribe(value => {
            this.toastr.success("Beratungstermin erfolgreich gelöscht", "Erfolg")
            this.router.navigate(['./..'], {relativeTo: this.activeRoute})
        }, error => {
            this.toastr.error(error.error.message, "Fehler")
        })
    }


}
