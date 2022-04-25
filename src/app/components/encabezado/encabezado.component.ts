import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service'
import { profile } from '../../interfaces/profile';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  profile: profile;


  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  public getProfile(): void {
    this.profileService.getProfile().subscribe(data => {
      this.profile = data[0];
    })
  }

}
