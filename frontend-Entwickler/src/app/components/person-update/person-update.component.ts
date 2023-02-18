import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPerson } from 'src/app/models';
import { PersonsService } from 'src/app/services/persons.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.scss'],
})
export class PersonUpdateComponent {
  @Input()
  person!: IPerson;
  formData!: FormGroup;
  constructor(private personService: PersonsService) {}
  ngOnInit() {
    this.formData = new FormGroup({
      first_name: new FormControl(this.person.first_name, [
        Validators.required,
      ]),
      last_name: new FormControl(this.person.last_name, [Validators.required]),
      email: new FormControl(this.person.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }
  handleUpdate() {
    let newPerson: IPerson = { id: this.person.id, ...this.formData.value };
    console.log({ newPerson });
    this.personService.updatePerson(newPerson).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'This person has been updated successfuly!',
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occured while updatng this person!',
        });
      }
    );
  }
  public get firstNameController() {
    return this.formData.get('first_name');
  }
  public get lastNameController() {
    return this.formData.get('last_name');
  }
  public get emailController() {
    return this.formData.get('email');
  }
}
