import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-anfrage-bearbeiten',
  templateUrl: './anfrage-bearbeiten.component.html',
  styleUrls: ['./anfrage-bearbeiten.component.scss']
})
export class AnfrageBearbeitenComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Bearbeiten", route: ''},
  ]

  title!:string

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
  }

  inquiry = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    lastname: new FormControl(''),
    description: new FormControl(''),
    street: new FormControl(''),
    postal: new FormControl(''),
    city: new FormControl(''),
    deadline: new FormControl(''),
    levy: new FormControl(''),
  })

  createOffer() {

  }

  delete () {

  }


}
