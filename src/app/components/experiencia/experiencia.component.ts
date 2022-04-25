import { Component, OnInit } from '@angular/core';
import { expe } from 'src/app/interfaces/expe';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ExperienceService } from 'src/app/services/experience.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experienceList: expe[];
  constructor(private experienceService:ExperienceService) { }

  ngOnInit(): void {
    this.getExperience();
  }

  public getExperience(): void {
    this.experienceService.getExperience().subscribe(data => {
      this.experienceList = data;
    })
  }
  
  public onAddExpe(addForm: NgForm): void {
    document.getElementById('exampleModal').click();
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


  public onOpenModal(expe: expe, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addExpeModal');
    }
    // if (mode === 'edit') {
    //   this.editEmployee = employee;
    //   button.setAttribute('data-target', '#updateEmployeeModal');
    // }
    // if (mode === 'delete') {
    //   this.deleteEmployee = employee;
    //   button.setAttribute('data-target', '#deleteEmployeeModal');
    // }
    container.appendChild(button);
    button.click();
  }
}
