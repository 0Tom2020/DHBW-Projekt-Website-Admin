import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environments/environment";
import {formatDate} from "@angular/common";
import {BsLocaleService} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'app-angebot-erstellen',
  templateUrl: './angebot-erstellen.component.html',
  styleUrls: ['./angebot-erstellen.component.scss']
})
export class AngebotErstellenComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Angebot erstellen", route: ''},
  ]

  title!:string

  id: string = '';

  inquiry = new FormGroup({
    name: new FormControl({value: '', disabled: true}),
    email: new FormControl({value: '', disabled: true}),
    lastName: new FormControl({value: '', disabled: true}),
    street: new FormControl({value: '', disabled: true}),
    postal: new FormControl({value: '', disabled: true}),
    city: new FormControl({value: '', disabled: true}),
    partsDeliveryDate: new FormControl({value: '', disabled: true}),
    deadlineDate: new FormControl({value: '', disabled: true}),
    descriptionInquiry: new FormControl({value: '', disabled: true}),
    description: new FormControl({value: '', disabled: false}, [Validators.required]),
    partCount: new FormControl({value: 0, disabled: false}, [Validators.required]),
    price: new FormControl({value: 0, disabled: false}, [Validators.required]),
    completionDeadline: new FormControl({value: '', disabled: false}, [Validators.required]),
    startDate: new FormControl({value: '', disabled: false}, [Validators.required]),
    workingHours: new FormControl({value: 0, disabled: false}, [Validators.required]),
    machineId: new FormControl({value: '', disabled: false}, [Validators.required]),
  })

  inquiryData:any
  machines: any[] = [];
  isMachineAvailable: MachineAvailability = "UNKNOWN";
  completionDate

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient, private toastr: ToastrService,private bsLocaleService: BsLocaleService, private router: Router) {
    this.bsLocaleService.use('de')
  }
  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.client.get<any[]>(environment.backend + '/machines', {withCredentials: true}).subscribe(value => {
      for (const machine of value) {
        this.machines.push(machine)
      }
    });

    this.activeRoute.params.subscribe(value => {
      this.client.get<any>(environment.backend + '/inquiry/' + value["id"], {withCredentials: true}).subscribe(value => {
        this.id = value['id'];
        this.inquiryData = value;
        this.inquiry.controls['descriptionInquiry'].setValue(value['description'])
        this.inquiry.controls['name'].setValue(value['contact']['firstName'])
        this.inquiry.controls['lastName'].setValue(value['contact']['lastName'])
        this.inquiry.controls['email'].setValue(value['contact']['email'])
        this.inquiry.controls['street'].setValue(value['contact']['street'])
        this.inquiry.controls['postal'].setValue(value['contact']['postalCode'])
        this.inquiry.controls['city'].setValue(value['contact']['city'])
        this.inquiry.controls['completionDeadline'].setValue(formatDate(Date.parse(value['deadlineDate']), 'dd.MM.yyyy', 'en_US'))
        this.inquiry.controls['partsDeliveryDate'].setValue(formatDate(Date.parse(value['partsDeliveryDate']), 'dd.MM.yyyy', 'en_US'))
        this.inquiry.controls['deadlineDate'].setValue(formatDate(Date.parse(value['deadlineDate']), 'dd.MM.yyyy', 'en_US'))
      }, error => {
        if (error.error.message) {
          this.toastr.error(error.error.message)
        } else {
          this.toastr.error("Es ist ein Fehler aufgetreten!")
        }
      })
    })
  }


  createOffer() {
    if (this.isMachineAvailable !== "AVAILABLE") {
      this.toastr.error("Die Maschine ist leider nicht verfügbar!")
      return;
    }
    if (this.isValidDateFormat(this.inquiry.controls.completionDeadline.value)) {
      const dateStrings = this.inquiry.controls.completionDeadline.value.toString()
      let dateParts = dateStrings.split(".");
      let day = parseInt(dateParts[0], 10);
      let month = parseInt(dateParts[1], 10) - 1;
      let year = parseInt(dateParts[2], 10);
      this.completionDate = new Date(year, month, day)
    } else {
      this.completionDate = this.inquiry.controls.completionDeadline.value
    }





    this.client.post(environment.backend + '/inquiry/' + this.id + '/offer', {
      partCount: this.inquiry.controls['partCount'].value,
      description: this.inquiry.controls['description'].value,
      price: this.inquiry.controls['price'].value,
      startDate: this.inquiry.controls['startDate'].value,
      workingHours: this.inquiry.controls['workingHours'].value,
      machineId: this.inquiry.controls['machineId'].value,
      completionDeadline: this.completionDate
    }, {withCredentials: true}).subscribe(value => {
      this.toastr.success("Angebot erfolgreich erstellt!")
      this.router.navigate( ['/angebot/uebersicht/' + value['id']]);
    }, error => {
      if (error.error.message) {
        this.toastr.error(error.error.message)
      } else {
        this.toastr.error("Es ist ein Fehler aufgetreten!")
      }
    })
  }

  isValidDateFormat(date: string): boolean {
    const dateFormat = /^\d{2}\.\d{2}\.\d{4}$/;
    return dateFormat.test(date);
  }

  onMachineChange() {
    this.calculatePrice();
    this.checkIfMachineIsAvailable()
  }

  onStartDateChange() {
    this.calculatePrice();
    this.checkIfMachineIsAvailable()
  }

  onWorkingHoursChange() {
    this.calculatePrice();
    this.checkIfMachineIsAvailable()
  }

  calculatePrice() {
    const machineId = this.inquiry.controls['machineId'].value;
    const workingHours = this.inquiry.controls['workingHours'].value;
    if (!machineId || !workingHours) {
      return;
    }
    // get calculated price
    this.client.get<any>(environment.backend + '/machines/' + machineId + '/price?hours=' + workingHours, {withCredentials: true}).subscribe(value => {
      this.inquiry.controls['price'].setValue(value['price'])
    }, error => {
      if (error.error.message) {
        this.toastr.error(error.error.message)
      } else {
        this.toastr.error("Es ist ein Fehler aufgetreten!")
      }
    });
  }

  checkIfMachineIsAvailable() {
    const machineId = this.inquiry.controls['machineId'].value;
    const startDateRaw = this.inquiry.controls['startDate'].value;
    const workingHours = this.inquiry.controls['workingHours'].value;
    if (!machineId || !startDateRaw || !workingHours) {
      return;
    }
    const startDate = formatDate(startDateRaw, 'yyyy-MM-dd', 'en_US');
    this.isMachineAvailable = "UNKNOWN";
    // check if machine is available
    this.client.get<any>(environment.backend + '/machines/' + machineId + '/availability?startDate=' + startDate + '&hours=' + workingHours, {withCredentials: true}).subscribe(value => {
        this.isMachineAvailable = value['available'] ? "AVAILABLE" : "NOT_AVAILABLE";
        if (this.isMachineAvailable === "NOT_AVAILABLE") {
          this.toastr.error("Die Maschine ist in diesem Zeitraum leider nicht verfügbar!")
        }
    }, error => {
      if (error.error.message) {
        this.toastr.error(error.error.message)
      } else {
        this.toastr.error("Es ist ein Fehler aufgetreten!")
      }
    });

  }


}
type MachineAvailability = "AVAILABLE" | "NOT_AVAILABLE" | "UNKNOWN";
