import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { eduItem } from 'src/app/classes/eduItem'


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educationList: eduItem[];
  private root:string = "education"
  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    
    this.datosPortfolio.obtenerDatos(this.root).subscribe(data =>{
      this.educationList = data;
    })
    };
    
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.educationList, event.previousIndex, event.currentIndex);
    }

  onDelete(x:eduItem){
    this.datosPortfolio.delete(x,this.root).subscribe(()=>{
      this.educationList = this.educationList.filter( ((edu: { id: any; }) => edu.id !== x.id))
    }

    );
    console.log(x.id)
  }
}