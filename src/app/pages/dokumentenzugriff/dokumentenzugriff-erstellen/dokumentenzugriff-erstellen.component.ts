import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-dokumentenzugriff-erstellen',
  templateUrl: './dokumentenzugriff-erstellen.component.html',
  styleUrls: ['./dokumentenzugriff-erstellen.component.scss']
})
export class DokumentenzugriffErstellenComponent implements OnInit{
  searchTerm: string = ""
  searchTermAdded: string = ""
  title!: string

  documents = []
  documentsAdded = []
  newAccessCode = new FormGroup({
    accessCode: new FormControl('',[this.onlyCharsValidator, Validators.required]),
    file: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),

  })

  constructor(private toastr: ToastrService, private activeRoute: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
    this.http.get<[]>(environment.backend + '/data-transfer/documents/', {withCredentials: true}).subscribe(value => {
      for (const doc of value) {
        this.documents.push(doc);
      }
    }, error => {
      console.log(error);
    });

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
    const onlyCharsRegex = /^[a-zA-Z0-9-_]*$/;
    if (!onlyCharsRegex.test(control.value)) {
      return { onlyChars: true };
    }
    return null;
  }

  sortFunction (documentNameA, documentNameB) {
    const tmpDocumentNameA = documentNameA.name.toUpperCase();
    const tmpDocumentNameB = documentNameB.name.toUpperCase();
    if (tmpDocumentNameA < tmpDocumentNameB) {
      return -1;
    }
    if (tmpDocumentNameA > tmpDocumentNameB) {
      return 1;
    }
    return 0;
  }

  addDocument(document: any) {
    this.documents.splice(this.documents.indexOf(document), 1)
    this.documentsAdded.push(document)
    this.documentsAdded.sort(this.sortFunction)
  }

  removeDocument(document: any) {
    this.documentsAdded.splice(this.documentsAdded.indexOf(document), 1)
    this.documents.push(document)
    this.documents.sort(this.sortFunction)
  }

  viewDocument(singleDocument: any) {
    window.open(environment.backend + '/data-transfer/document/' + singleDocument.id + '/data', '_blank');
  }
}
