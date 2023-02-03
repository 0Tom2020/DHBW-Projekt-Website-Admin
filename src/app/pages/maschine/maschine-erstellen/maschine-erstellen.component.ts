import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-maschine-erstellen',
  templateUrl: './maschine-erstellen.component.html',
  styleUrls: ['./maschine-erstellen.component.scss']
})
export class MaschineErstellenComponent implements OnInit {

  title!: string
  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Erstellen", route: ''},
  ]

  newMachine = new FormGroup({
    name: new FormControl('', [Validators.required]),
    hourlyRate: new FormControl('', [Validators.required]),
    maxCapacityInHours: new FormControl('', [Validators.required]),
  })
  constructor(private activeRoute: ActivatedRoute, private toastr: ToastrService, private client: HttpClient) { }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
  }

  post() {
    this.client.post('http://localhost:8080/machines', this.newMachine.value, {withCredentials: true}).subscribe(value => {
      this.toastr.success('Maschine erfolgreich erstellt', 'Erfolgreich')
    }, error => {
      this.toastr.error(error.error.message, 'Fehler')
    })
  }

}
