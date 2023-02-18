import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPerson } from 'src/app/models';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
})
export class PersonDetailsComponent implements OnInit {
  @Input()
  person!: IPerson;
  formData!: FormGroup;
  constructor() {}
  ngOnInit() {
    this.formData = new FormGroup({
      firstName: new FormControl({
        value: this.person.first_name,
        disabled: true,
      }),
      lastName: new FormControl({
        value: this.person.last_name,
        disabled: true,
      }),
      email: new FormControl({ value: this.person.email, disabled: true }),
    });
  }
}
