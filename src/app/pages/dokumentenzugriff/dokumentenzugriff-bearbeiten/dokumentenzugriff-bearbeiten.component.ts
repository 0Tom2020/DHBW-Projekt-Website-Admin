import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {timer} from "rxjs";

@Component({
  selector: 'app-dokumentenzugriff-bearbeiten',
  templateUrl: './dokumentenzugriff-bearbeiten.component.html',
  styleUrls: ['./dokumentenzugriff-bearbeiten.component.scss']
})
export class DokumentenzugriffBearbeitenComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './../../uebersicht'},
    {label: "Zugangscode", route: '/'},
  ]

  searchTerm: string = ""
  searchTermAdded: string = ""

  keyId: string = "";
  documents = []
  documentsAdded = []
  title!: string
  newAccessCode = new FormGroup({
    accessCode: new FormControl({value: '', disabled: true}, [this.onlyCharsValidator, Validators.required]),
    title: new FormControl('', [Validators.required]),
  })

  constructor(private toastr: ToastrService, private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
  }


  ngOnInit() {
    this.activatedRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.activatedRoute.params.subscribe(value => {
      if (value['id']) {
        this.keyId = value['id'];
        this.loadData();
      }
    })


  }

  post() {
    this.http.post(environment.backend + '/data-transfer/key/' + this.keyId, {
      description: this.newAccessCode.controls.title.value,
      documents: this.documentsAdded.map(value => value.id)
    }, {withCredentials: true}).subscribe(value => {
      this.toastr.success("Zugangscode erfolgreich bearbeitet");
      this.loadData();
    }, error => {
      this.toastr.error(error.error.message, "Fehler");
    });
  }


  loadData() {
    this.http.get<[]>(environment.backend + '/data-transfer/key/' + this.keyId, {withCredentials: true}).subscribe(key => {
      this.newAccessCode.controls['title'].setValue(key['description'])
      this.newAccessCode.controls['accessCode'].setValue(key['key'])
    }, error => {
      console.log(error);
    });

    this.http.get<[]>(environment.backend + '/data-transfer/key/' + this.keyId + '/documents', {withCredentials: true}).subscribe(documents => {
      this.documentsAdded = [];
      for (const document of documents) {
        this.documentsAdded.push(document);
      }
      this.documentsAdded.sort(this.sortFunction)

      this.http.get<[]>(environment.backend + '/data-transfer/documents', {withCredentials: true}).subscribe(documents => {
        this.documents = [];
        for (const document of documents) {
          if (!this.documentsAdded.find(value => value.id === document["id"])) {
            this.documents.push(document);
          }
        }
        this.documents.sort(this.sortFunction)
      })

    });
  }

  onlyCharsValidator(control: FormControl) {
    const onlyCharsRegex = /^[a-zA-Z1-9]*$/;
    if (!onlyCharsRegex.test(control.value)) {
      return {onlyChars: true};
    }
    return null;
  }

  delete() {
    this.http.delete(environment.backend + '/data-transfer/key/' + this.keyId, {withCredentials: true}).subscribe(value => {
      this.toastr.success("Zugangscode erfolgreich gelöscht");
      this.router.navigate(['/dokumentenzugriff/uebersicht']);
    });
  }

  sortFunction(documentNameA, documentNameB) {
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
    const tmp = this.searchTerm
    this.searchTerm = ""
    timer(1).subscribe(() => this.searchTerm = tmp)
  }

  removeDocument(document: any) {
    this.documentsAdded.splice(this.documentsAdded.indexOf(document), 1)
    this.documents.push(document)
    this.documents.sort(this.sortFunction)
    const tmp = this.searchTermAdded
    this.searchTermAdded = ""
    timer(1).subscribe(() => this.searchTermAdded = tmp)
  }

  viewDocument(singleDocument: any) {
    window.open(environment.backend + '/data-transfer/document/' + singleDocument.id + '/data', '_blank');
  }

}

