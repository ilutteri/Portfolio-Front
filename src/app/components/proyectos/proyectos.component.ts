import { Component, OnInit } from '@angular/core';
import { project } from 'src/app/interfaces/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  public projectList: project[];
  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  public getProjects(): void {
    this.projectsService.getProject().subscribe(data => {
      this.projectList = data;
    })
  }

}
