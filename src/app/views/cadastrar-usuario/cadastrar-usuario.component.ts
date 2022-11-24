import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  public formCadastro: FormGroup;
  
  constructor(fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private showMessageService: NotificationService
    ) { 
    this.formCadastro = fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  public createUser(){
    if(this.formCadastro.valid){
      const user: User = this.formCadastro.value
      this.authService.createUser(user).subscribe(
        response => { 
          this.showMessageService.showMessage('Usuário Cadastrado!')
          this.router.navigate(["/login"])
         })
    } else {
      this.showMessageService.showMessage('Dados Inválidos!')
    }
  
  }

  public signInGoogle(): void {
    this.authService.authenticateByGoogle().subscribe(credentials => {
      this.showMessageService.showMessage('Bem Vindo(a)!')
      this.router.navigate(['/home'])
      })
  }

}
