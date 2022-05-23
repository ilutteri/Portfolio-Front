import { Component, OnInit } from '@angular/core';
import { expe } from 'src/app/interfaces/expe';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ExperienceService } from 'src/app/services/experience.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  public experienceList: expe[];
  public editExperience!: expe;
  public deleteExperience!: expe;
  isLogged: boolean = false;


  constructor(
    private experienceService: ExperienceService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.getExperience();
  }

  public getExperience(): void {
    this.experienceService.getExperience().subscribe(data => {
      this.experienceList = data;
    })
  }

  public onAddExperience(addForm: NgForm): void {
    document.getElementById('add-experience-form').click();
    this.experienceService.addExperience(addForm.value).subscribe(
      (response) => {
        console.log(response);
        this.getExperience();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onEditExperience(experience: expe): void {
    this.experienceService.updateExperience(experience).subscribe(
      (response: expe) => {
        console.log(response);
        this.getExperience();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteExperience(experienceId: number): void {
    this.experienceService.deleteExperience(experienceId).subscribe(
      (response: void) => {
        console.log(response);
        this.getExperience();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onOpenModal(experience: expe, mode: string): void {
    
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      console.log('work bitch')
      button.setAttribute('data-bs-target', '#addExperienceModal');
    }
    if (mode === 'edit') {
      this.editExperience = experience;
      button.setAttribute('data-bs-target', '#editExperienceModal');
    }
    if (mode === 'delete') {
      this.deleteExperience = experience;
      button.setAttribute('data-bs-target', '#deleteExperienceModal');
    }
    container.appendChild(button);
    button.click();
  }

}
