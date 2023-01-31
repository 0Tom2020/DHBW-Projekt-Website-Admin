import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-adminuser-erstellen',
  templateUrl: './adminuser-erstellen.component.html',
  styleUrls: ['./adminuser-erstellen.component.scss']
})
export class AdminuserErstellenComponent implements OnInit {

  title!:string

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Erstellen", route: ''},
  ]

  newAdminUser = new FormGroup ({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    passwordRepeat: new FormControl('',[Validators.required, Validators.minLength(8)]),
    email: new FormControl('',[Validators.required]),
  })

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
  }

  post () {
    if (this.newAdminUser.invalid) {
      return this.toastr.error('Bitte alle Felder ausfüllen')
    } else if (this.newAdminUser.value.password.length < 8) {
      return this.toastr.error('Passwort muss mindestens 8 Zeichen lang sein')
    } else if (!this.checkEmail()) {
        return this.toastr.error('Bitte eine gültige Email eingeben')
    } else if (this.newAdminUser.value.password != this.newAdminUser.value.passwordRepeat) {
      return this.toastr.error('Passwörter stimmen nicht überein')
    } else {
      this.client.post(environment.backend + '/auth/admins', this.newAdminUser.value, {withCredentials: true}).subscribe(data => {
        this.toastr.success('Admin User erfolgreich erstellt')
        this.newAdminUser.reset()
      }, error => {
        console.log(error)
      })
    }
  }

  checkEmail() {
    let email = this.newAdminUser.value.email
    let pattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
    return pattern.test(email);
  }





}


