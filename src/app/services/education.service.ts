import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { eduItem } from '../interfaces/eduItem';


@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private apiURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getEducation(): Observable<eduItem[]> {
    return this.http.get<eduItem[]>(`${this.apiURL}education/get`);
  }

  public addEducation(education: eduItem): Observable<eduItem> {
    return this.http.post<eduItem>(`${this.apiURL}education/add`, education);
  }

  public updateEducation(education: eduItem): Observable<eduItem> {
    return this.http.put<eduItem>(`${this.apiURL}education/update`, education);
  }

  public deleteEducation(educationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}education/delete/${educationId}`);
  }

  
}
