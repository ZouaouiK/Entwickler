import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPerson } from 'src/app/models';
import { PersonsService } from 'src/app/services/persons.service';
import Swal from 'sweetalert2';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  dataSource!: MatTableDataSource<IPerson>;
  persons!: IPerson[];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private personService: PersonsService) {
    this.personService.getPersons().subscribe((_persons) => {
      this.persons = _persons;
      this.dataSource = new MatTableDataSource(_persons);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleDeletePerson(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete this person?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.personService.deletePerson(id).subscribe(
          (data) => {
            const newPersons = this.persons.filter((person) => person.id != id);
            this.persons = newPersons;
            this.dataSource = new MatTableDataSource(newPersons);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'This person has been deleted successfuly!',
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'An error occured while deleting this person!',
            });
          }
        );
      }
    });
  }
}
