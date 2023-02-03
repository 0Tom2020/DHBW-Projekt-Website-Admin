import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-maschine-bearbeiten',
  templateUrl: './maschine-bearbeiten.component.html',
  styleUrls: ['./maschine-bearbeiten.component.scss']
})
export class MaschineBearbeitenComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Bearbeiten", route: ''},
  ]

  title!: string
  id!: number

  editMachine = new FormGroup({
    name: new FormControl('', [Validators.required]),
    hourlyRate: new FormControl('', [Validators.required]),
    maxCapacityInHours: new FormControl('', [Validators.required]),
  })

  constructor(private activeRoute: ActivatedRoute, private toastr: ToastrService, private client: HttpClient) {
  }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
    this.activeRoute.params.subscribe(value => {
      this.id = value['id']
    })
    this.client.get('http://localhost:8080/machines/' + this.id, {withCredentials: true}).subscribe(value => {
      this.editMachine.patchValue(value)
    })
  }

  post() {
    this.client.put('http://localhost:8080/machines/' + this.id, this.editMachine.value, {withCredentials: true}).subscribe(value => {
      this.toastr.success('Maschine wurde erfolgreich bearbeitet')
    }, error => {
      this.toastr.error(error.error.message)
    })
  }

  delete() {

  }

}

