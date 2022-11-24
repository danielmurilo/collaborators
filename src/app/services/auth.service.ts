import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { catchError, EMPTY, from, Observable } from 'rxjs';
import { User } from '../models/user';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  constructor(private firebaseAuth: AngularFireAuth, 
    private showMessageService: NotificationService) { }

  public authenticateByGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    const promise = this.firebaseAuth.signInWithPopup(provider)
    return from(promise).pipe(
      catchError(error => {
        this.showMessageService.showMessage('Erro Ao Autenticar: ' + error.code)
        return EMPTY
      })
    )
  }

  authenticateByEmailAndPassword(user: User): Observable<any> {
    const promise = this.firebaseAuth.signInWithEmailAndPassword(user.email, user.senha)
    return from(promise).pipe(
      catchError(error => {
        if (error.code == 'auth/user-not-found') {
          this.showMessageService.showMessage('Usuário Não Encontrado!')
        } else if (error.code == 'auth/invalid-password') {
          this.showMessageService.showMessage('Senha Incorreta!')
        } else if (error.code == 'auth/wrong-password') {
          this.showMessageService.showMessage('Senha Incorreta!')
        } else if (error.code == 'auth/invalid-email') {
          this.showMessageService.showMessage('E-mail inválido!')
        }else if (error.code == 'auth/too-many-requests') {
          this.showMessageService.showMessage('Muitas Tentativas de Login!')
        } else {
          this.showMessageService.showMessage(error.code)
        }        
        return EMPTY
      })
    )
  }

  createUser(user: User): Observable<any> {
    const promise = this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.senha)
    return from(promise).pipe(
      catchError(error => {
        this.showMessageService.showMessage('Erro ao Cadastrar Usuário: ' + error.code)
        return EMPTY
      })
    )
  }
  
  logout() {
    const promise = this.firebaseAuth.signOut()
    return from(promise)
  }  

}
