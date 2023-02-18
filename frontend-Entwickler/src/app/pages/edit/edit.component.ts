import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPerson } from 'src/app/models';
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  person_id!: number;
  person!: IPerson;
  constructor(private route: ActivatedRoute, private service: PersonsService) {
    this.route.params.subscribe((queryParams) => {
      this.person_id = Number(queryParams['id']);
      this.service.getPersonById(this.person_id).subscribe(
        (data) => {
          this.person = data;
        },
        (error) => {}
      );
    });
  }
}
