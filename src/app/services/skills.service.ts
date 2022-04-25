import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { skillType } from '../interfaces/skillType';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private apiURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getSkills(): Observable<skillType[]> {
    return this.http.get<skillType[]>(`${this.apiURL}skillType/get`);
  }

  public addSkills(experience: skillType): Observable<skillType> {
    return this.http.post<skillType>(`${this.apiURL}skillType/add`, experience);
  }

  public updateSkills(skillType: skillType): Observable<skillType> {
    return this.http.put<skillType>(`${this.apiURL}skillType/update`, skillType);
  }

  public deleteExperience(experienceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}skillType/delete/${experienceId}`);
  }

}
