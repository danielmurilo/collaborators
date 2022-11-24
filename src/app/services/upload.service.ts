import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { catchError, EMPTY, from } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: AngularFireStorage,
    private notification: NotificationService
    ) { }

  public uploadFoto(photo: File) {
    const promise = this.storage.upload(`fotos/${Date.now()}`, photo)
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage('Erro ao fazer upload!')
        console.error(error)
        return EMPTY
      })
    )
  }
}
