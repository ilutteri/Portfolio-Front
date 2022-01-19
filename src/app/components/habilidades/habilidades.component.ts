import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service'

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  skillList:any;
  frontendList:any;
  backendList:any;
  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.skillList = data.skills;
    })
  }

}
