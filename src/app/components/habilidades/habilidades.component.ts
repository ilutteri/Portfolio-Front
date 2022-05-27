import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { skillType } from 'src/app/interfaces/skillType';
import { SkillsService } from 'src/app/services/skills.service';
import { skill } from 'src/app/interfaces/skill';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  public skillList: skillType[];
  public editST: skillType;
  public editSkill!: skill;
  public deleteSkill!: skill;
  isLogged: boolean = false;
  load:boolean = false;
  
  constructor(private skillService:SkillsService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.getSkills();
  }

  public getSkills():void{
    this.skillService.getSkills().subscribe(data => {
      this.skillList = data;
      this.load = true;
    })

  }

  public onAddSkill(addForm: NgForm, editST : skillType): void{
    editST.list.push(addForm.value);
    document.getElementById("add-skill-form")!.click();
    this.skillService.updateSkill(editST).subscribe(
      (response: skillType) => {
        console.log(response);
        this.getSkills();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onEditSkill(skill: skill, editST: skillType): void {
    editST.list = editST.list.map(function(x){if(x.id == skill.id){x = skill};return x});
    this.skillService.updateSkill(editST).subscribe(
      (response: skillType) => {
        console.log(response);
        this.getSkills();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteSkill(skillId: number, editST: skillType): void {
    editST.list = editST.list.filter(x => x.id !== skillId);
    this.skillService.updateSkill(editST).subscribe(
      (response: skillType) => {
        console.log(response);
        this.getSkills();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.skillService.deleteSkill(skillId).subscribe();
  }

  public onOpenModal( skill: skill, mode: string, sT: skillType): void {
    this.editST = sT; 
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-bs-target', '#addSkillModal');
    }
    if(mode === 'edit') {
      this.editSkill = skill;
      button.setAttribute('data-bs-target', '#editSkillModal');
    }
    if(mode === 'delete') {
      this.deleteSkill = skill;
      button.setAttribute('data-bs-target', '#deleteSkillModal');
    }
    container?.appendChild(button);
    button.click();
  }

}

