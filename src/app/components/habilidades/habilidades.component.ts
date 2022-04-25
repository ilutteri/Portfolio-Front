import { Component, OnInit } from '@angular/core';
import { skillType } from 'src/app/interfaces/skillType';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  skillList: skillType[];
  
  constructor(private skillService:SkillsService) { }

  ngOnInit(): void {
    this.getSkills();
  }

  public getSkills():void{
    this.skillService.getSkills().subscribe(data => {
      this.skillList = data;
    })

  }

}
