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

  editMachine = new FormGroup({
    name: new FormControl('', [Validators.required]),
    hourlyRate: new FormControl('', [Validators.required]),
  })
  constructor(private activeRoute: ActivatedRoute, private toastr: ToastrService, private client: HttpClient) {  }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
  }

  post() {

  }

  delete() {

  }

}

