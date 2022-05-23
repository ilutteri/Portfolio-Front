import { Component, OnInit } from '@angular/core';
import { eduItem } from 'src/app/interfaces/eduItem'
import { EducationService } from 'src/app/services/education.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public educationList: eduItem[] = [];
  public editEducation!: eduItem;
  public deleteEducation!: eduItem;
  isLogged: boolean = false;

  constructor(
    private educationService: EducationService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.getEducation();
  }

  public getEducation(): void {
    this.educationService.getEducation().subscribe(data => {
      this.educationList = data;
    })
  }

  public onAddEducation(addForm: NgForm): void{
    document.getElementById("add-education-form")!.click();
    this.educationService.addEducation(addForm.value).subscribe(
      (response: eduItem) => {
        console.log(response);
        this.getEducation();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onEditEducation(education: eduItem): void {
    this.educationService.updateEducation(education).subscribe(
      (response: eduItem) => {
        console.log(response);
        this.getEducation();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEducation(educationId: number): void {
    this.educationService.deleteEducation(educationId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEducation();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(education: eduItem, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-bs-target', '#addEducationModal');
    }
    if(mode === 'edit') {
      this.editEducation = education;
      button.setAttribute('data-bs-target', '#editEducationModal');
    }
    if(mode === 'delete') {
      this.deleteEducation = education;
      button.setAttribute('data-bs-target', '#deleteEducationModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
