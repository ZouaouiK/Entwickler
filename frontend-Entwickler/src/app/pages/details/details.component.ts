import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPerson } from 'src/app/models';
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
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
