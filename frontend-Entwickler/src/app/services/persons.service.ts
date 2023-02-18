import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPerson } from '../models';
import { Observable } from 'rxjs';
import { persons } from '../data';

@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  constructor(private http: HttpClient) {}

  getPersons(): Observable<IPerson[]> {
    // return this.http.get<IPerson[]>(`${Endpoints.getALLPersons}`);
    return new Observable((sub) => {
      sub.next(persons);
    });
  }

  getPersonById(id: number): Observable<IPerson> {
    // return this.http.get<IPerson>(`${Endpoints.getPersonById}/${id}`);
    return new Observable((sub) => {
      let person = persons.find((per) => per.id === id);
      sub.next(person);
    });
  }

  updatePerson(_person: IPerson): Observable<IPerson[]> {
    return new Observable<IPerson[]>((sub) => {
      let index = persons.findIndex((pers) => pers.id === _person.id);
      persons[index] = _person;
      sub.next();
    });
  }

  deletePerson(id: number) {
    return new Observable<IPerson[]>((sub) => {
      let new_persons = persons.filter((per) => per.id != id);
      sub.next(new_persons);
    });
  }
}
