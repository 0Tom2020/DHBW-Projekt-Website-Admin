import {
    Component,
    HostBinding,
    OnDestroy,
    OnInit,
    Renderer2
} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public forgotPasswordForm: UntypedFormGroup;
    public isAuthLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.forgotPasswordForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required)
        });
    }

    forgotPassword() {
        if (this.forgotPasswordForm.valid) {
          const email = this.forgotPasswordForm.value.email;
          this.http.post(environment.backend + "/auth/forgot-password", {email}).subscribe((data) => {
            this.toastr.success(data["message"])
          }, error => {
            if (error.error.message) {
              this.toastr.error(error.error.message);
            } else {
              console.log(error);
              this.toastr.error("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.");
            }
          });
        } else {
            this.toastr.error(
                'Bitte füllen Sie alle Felder aus.',
                'Fehler'
            );
        }
    }

    ngOnDestroy(): void {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
