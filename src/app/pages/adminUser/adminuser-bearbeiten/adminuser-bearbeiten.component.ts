import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-adminuser-bearbeiten',
  templateUrl: './adminuser-bearbeiten.component.html',
  styleUrls: ['./adminuser-bearbeiten.component.scss']
})
export class AdminuserBearbeitenComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Bearbeiten", route: ''},
  ]

  id:string
  title!:string
  editAdminUser = new FormGroup ({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.minLength(8)]),
    passwordRepeat: new FormControl('',[Validators.minLength(8)]),
  })


  constructor(private activeRoute: ActivatedRoute, private client: HttpClient, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.activeRoute.params.subscribe(params => {
      this.id = params['id']
    })

    this.client.get(environment.backend + '/auth/admin/' + this.id, {withCredentials: true}).subscribe((value: any) => {
      this.editAdminUser.patchValue({
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
      })
    }, error => {
      console.log(error)
    })
  }

  post() {
    const body = this.editAdminUser.value
    const form = this.editAdminUser
    const password = form.get('password')
    if (this.editAdminUser.get('password').invalid) {
      return this.toastr.error("Bitte geben Sie ein gültiges Password ein")
    } else if (this.editAdminUser.invalid) {
      return this.toastr.error('Bitte alle Felder ausfüllen')
    } else if (!this.checkEmail()) {
      return this.toastr.error('Bitte eine gültige Email eingeben')
    } else if (this.editAdminUser.value.password != this.editAdminUser.value.passwordRepeat) {
      return this.toastr.error('Passwörter stimmen nicht überein')
    } else {
      this.client.post(environment.backend + '/auth/admin/' + this.id, body, {withCredentials: true}).subscribe(() => {
        if (this.editAdminUser.value.password && this.editAdminUser.value.passwordRepeat) {
          this.client.post(environment.backend + '/auth/admin/' + this.id + '/password', body , {withCredentials:true}).subscribe(() => {
            this.toastr.success("Es wurde erfolgreich das Passwort geändert und der Admin bearbeitet")
          }, error => {
            console.log(error)
          })
        } else {
          this.toastr.success("Admin wurde erfolgreich bearbeitet")
        }




      }, error => {
        console.log(error)
      })
    }
  }

  delete() {
    this.client.delete(environment.backend + '/auth/admin/' + this.id, {withCredentials:true}).subscribe(() => {
      this.toastr.success("Informationsbeitrag wurde erfolgreich gelöscht")
      this.router.navigate(['/admin/uebersicht'])
    }, error => {
        console.log(error)
    })
  }

    checkEmail() {
      let email = this.editAdminUser.value.email
      let pattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      return pattern.test(email);
    }


}
