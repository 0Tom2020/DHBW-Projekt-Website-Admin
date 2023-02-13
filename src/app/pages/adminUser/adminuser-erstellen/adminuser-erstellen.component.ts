import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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

    title!: string

    breadcrumbItems = [
        {label: "Home", route: '/'},
        {label: "Übersicht", route: './..'},
        {label: "Erstellen", route: ''},
    ]

    newAdminUser = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        passwordRepeat: new FormControl('', [Validators.required, Validators.minLength(8)]),
        email: new FormControl('', [Validators.required]),
    })

    constructor(private activeRoute: ActivatedRoute, private client: HttpClient, private toastr: ToastrService, private router: Router) {
    }

    ngOnInit(): void {
        this.activeRoute.data.subscribe(value => {
            this.title = value['title']
        })
    }

    post() {
        this.client.post(environment.backend + '/auth/admins', this.newAdminUser.value, {withCredentials: true}).subscribe(data => {
            this.toastr.success('Adminuser erfolgreich erstellt')
            this.router.navigate(['./../' + data['id']], {relativeTo: this.activeRoute})
        }, error => {
            this.toastr.error(error.error.message, 'Fehler')
            console.log(error)
        })
    }

}


