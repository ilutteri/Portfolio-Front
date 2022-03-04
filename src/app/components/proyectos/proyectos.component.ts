import { Component, OnInit } from '@angular/core';
import { project } from 'src/app/classes/project';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  public projectList: project[];
  private root:string = "projects";

  constructor(private datosPortfolio:PortfolioService) { }
  

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos(this.root).subscribe(data =>{
      this.projectList = data;
      console.log(this.projectList)
    })
  };



}
