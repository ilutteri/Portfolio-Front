import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service'
import { TokenService } from 'src/app/services/token.service';
import { profile } from '../../interfaces/profile';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  profile: profile;
  editProfile!: profile;
  isLogged: boolean = false;
  load:boolean = false;

  constructor(
    private profileService: ProfileService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.getProfile();
  }

  public getProfile(): void {
    this.profileService.getProfile().subscribe(data => {
      this.profile = data[0];
      this.load = true;
    })
  }

  public onEditProfile(profile: profile): void {
    this.profileService.updateProfile(profile).subscribe(
      (response: profile) => {
        console.log(response);
        this.getProfile();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(profile: profile, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'
    button.setAttribute('data-bs-toggle', 'modal');
    this.editProfile = profile;
    button.setAttribute('data-bs-target', '#editProfileModal');
    container?.appendChild(button);
    button.click();
  }


}
