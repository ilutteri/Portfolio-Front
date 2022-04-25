import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { expe } from '../interfaces/expe';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getExperience(): Observable<expe[]> {
    return this.http.get<expe[]>(`${this.apiURL}experience/get`);
  }

  public addExperience(experience: expe): Observable<expe> {
    return this.http.post<expe>(`${this.apiURL}experience/add`, experience);
  }

  public updateExperience(experience: expe): Observable<expe> {
    return this.http.put<expe>(`${this.apiURL}experience/update`, experience);
  }

  public deleteExperience(experienceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}experience/delete/${experienceId}`);
  }

}
