import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiURL = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getProject(): Observable<project[]> {
    return this.http.get<project[]>(`${this.apiURL}project/get`);
  }

  public addProject(project: project): Observable<project> {
    return this.http.post<project>(`${this.apiURL}project/add`, project);
  }

  public updateProject(project: project): Observable<project> {
    return this.http.put<project>(`${this.apiURL}project/update`, project);
  }

  public deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}project/delete/${projectId}`);
  }

}
