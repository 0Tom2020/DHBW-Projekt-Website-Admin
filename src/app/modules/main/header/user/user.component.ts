import {Component, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';
import {DateTime} from 'luxon';
import {AdminUser} from "@services/api.model";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user: AdminUser;

    constructor(private appService: AppService) {}

    ngOnInit(): void {
        this.user = this.appService.user;
    }

    logout() {
        this.appService.logout().subscribe();
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
