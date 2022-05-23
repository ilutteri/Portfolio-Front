import { Component, OnInit } from '@angular/core';
import { LoginUsuario } from 'src/app/login/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-barralogin',
  templateUrl: './barralogin.component.html',
  styleUrls: ['./barralogin.component.css']
})
export class BarraloginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  errorMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
    }
  }

  refresh(): void {
    window.location.reload();
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario)
        this.refresh();
      },
      error => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMsj = error.error.mensaje;
        console.log(this.errorMsj);
      }
    )
  }

  public onOpenModal(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#loginModal');
    container?.appendChild(button);
    button.click();
  }

  onLogOut(): void {
    this.tokenService.logOut();
    this.isLogged = false;
    this.refresh();
  }

}
