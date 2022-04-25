import { Component, OnInit } from '@angular/core';
import { eduItem } from 'src/app/interfaces/eduItem'
import { EducationService } from 'src/app/services/education.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educationList: eduItem[];
  constructor(private educationService: EducationService) { }

  ngOnInit(): void {
    this.getEducation();
  }

  public getEducation(): void {
    this.educationService.getEducation().subscribe(data => {
      this.educationList = data;
    })
  }

}
