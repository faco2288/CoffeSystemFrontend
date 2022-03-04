import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario;
  

  constructor(private authService: AuthService ,private router: Router)
  {     
    this.usuario = new Usuario();      
  }

  ngOnInit(): void {
  }

  login(): void {
    
    console.log(this.usuario);
    
    if (this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }else{
      console.log("entra else");      
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      swal.fire('Login', `Hola ${response.username}, has iniciado sesión con éxito!`, 'success');
      this.router.navigate(['/home']);
    }, err => {
      if (err.status == 400) {
        swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    }
    );
    }
    
    //this.router.navigate(['/home']);
    /*this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      swal.fire('Login', `Hola ${response.username}, has iniciado sesión con éxito!`, 'success');
    }, err => {
      if (err.status == 400) {
        swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    }
    );*/
  }



}
