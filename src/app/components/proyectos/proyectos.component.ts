import { Component, OnInit } from '@angular/core';
import { project } from 'src/app/interfaces/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { ViewportScroller } from '@angular/common';



@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  public projectList: project[];
  public editProject!: project;
  public deleteProject!: project;
  isLogged : boolean = false;
  load:boolean = false;

  

  constructor(
    private projectsService: ProjectsService,
    private tokenService: TokenService,
    private scroll: ViewportScroller) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.getProjects();
  }



  public getProjects(): void {
    this.projectsService.getProject().subscribe(data => {
      this.projectList = data;
      this.load = true;
    })
  }

  public onAddProject(addForm: NgForm): void{
    document.getElementById("add-project-form")!.click();
    this.projectsService.addProject(addForm.value).subscribe(
      (response: project) => {
        console.log(response);
        this.getProjects();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onEditProject(project: project): void {
    this.projectsService.updateProject(project).subscribe(
      (response: project) => {
        console.log(response);
        this.getProjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProject(projectId: number): void {
    this.projectsService.deleteProject(projectId).subscribe(
      (response: void) => {
        console.log(response);
        this.getProjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(project: project, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-bs-target', '#addProjectModal');
    }
    if(mode === 'edit') {
      this.editProject = project;
      button.setAttribute('data-bs-target', '#editProjectModal');
    }
    if(mode === 'delete') {
      this.deleteProject = project;
      button.setAttribute('data-bs-target', '#deleteProjectModal');
    }
    container?.appendChild(button);
    button.click();
  }


  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }

}
