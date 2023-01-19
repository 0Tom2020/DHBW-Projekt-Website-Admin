import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dokumentenzugriff-bearbeiten',
  templateUrl: './dokumentenzugriff-bearbeiten.component.html',
  styleUrls: ['./dokumentenzugriff-bearbeiten.component.scss']
})
export class DokumentenzugriffBearbeitenComponent implements OnInit {

  newAccessCode = new FormGroup({
    accessCode: new FormControl('',[this.onlyCharsValidator, Validators.required]),
    file: new FormControl('', [Validators.required]),
  })

  constructor(private toastr: ToastrService) {
  }

  ngOnInit() {



  }

  post() {
    if (this.newAccessCode.controls.accessCode.invalid) {
      return this.toastr.error("Es sind nur folgende Zeichen zugelassen: Klein- und Großbuchstaben, sowie Zahlen")
    }
  }

  generateCode (length:number):string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.newAccessCode.controls.accessCode.setValue(result)
    return result;
  }

  onlyCharsValidator(control: FormControl) {
    const onlyCharsRegex = /^[a-zA-Z1-9]*$/;
    if (!onlyCharsRegex.test(control.value)) {
      return { onlyChars: true };
    }
    return null;
  }

  delete () {

  }
}
