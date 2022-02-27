import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { User } from '../model/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  newUserForm: FormGroup;
  newUserViewActive: boolean = false;
  loginFormError: boolean = false;
  newUserFormError: boolean = false;

  myStorage = window.sessionStorage;

  constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private router: Router
    ) {
    // Inicialización de formularios
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Verifica si el usuario y contraseña son correctos
   * @returns true si son correctos, false si no
   */
  login(): void {
    if(this.loginForm.valid) {
      const passwordHash: string | Int32Array = this.encryptPassword(this.loginForm.get('password')?.value);
      const user: string = this.loginForm.get('name')?.value;

      // Se verifica si el usuario y contraseña son correctos
      this.userService.login(user, passwordHash.toString()).subscribe({
        next: (data) => {
          const sessionData: User = new User(data.username, "", data.vote, data.token, data.id);
          // Se setea sesión
          this.myStorage.setItem("user",JSON.stringify(sessionData));
          // Se redirige a votación
          this.router.navigate(['/vote']);
        },
        error: (error) => {
          this.loginFormError = true;
        }});
    }
  }

  /**
   * Crea un nuevo usuario
   */
  createUser() {
    if(this.newUserForm.valid) {
      const passwordHash: string | Int32Array = this.encryptPassword(this.newUserForm.get('password')?.value);
      const user: User = new User(this.newUserForm.get('name')?.value, passwordHash);

      // Se llama a creación de usuario
      this.userService.createUser(user).subscribe({
      next: (data) => {
        this.newUserView(false);
      },
      error: (error) => {
        this.newUserFormError = true;
      }});
    }
  }

  /**
   * Encripta la cadena pasada por parámetro con el algoritmo md5
   * @param password Contraseña a encriptar
   * @returns Contraseña encriptada
   */
  encryptPassword(password: string): string | Int32Array {
    const md5 = new Md5();
    return md5.appendStr(password).end();
  }

  /**
   * Cambia la vista de login a crear usuario y viceversa
   * @param newUserView true vista de crear usuario, false vista de login
   */
  newUserView(newUserView: boolean): void {
    this.newUserViewActive = newUserView;
  }

  cleanErrors(): void {
    this.loginFormError = false;
    this.newUserFormError = false;
  }

}
