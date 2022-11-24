import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Collaborator } from 'src/app/models/collaborator';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-new-collaborator',
  templateUrl: './new-collaborator.component.html',
  styleUrls: ['./new-collaborator.component.css']
})
export class NewCollaboratorComponent implements OnInit {
 
  public formCollaborator: FormGroup

  private  fotoUrl: string = ''
  public isLoading: boolean = false

  constructor(fb: FormBuilder, 
    private notification: NotificationService,
    private collaboratorService: CollaboratorService,
    private router: Router,
    private uploadService: UploadService) {
    this.formCollaborator = fb.group({
      nome: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
      cpf: ["", [Validators.required]],
      dataNascimento: ["", [Validators.required]],
      cargo: ["", [Validators.required]],
      setor: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      cidade: ["", [Validators.required]],
      remuneracao: ["", [Validators.required, Validators.min(0)]],
      email: ["", [Validators.required, Validators.email]],
    })
   }

  ngOnInit(): void {
  }

  createColaborador(){
    if (this.formCollaborator.valid) {
      const collaborator: Collaborator = this.formCollaborator.value
      collaborator.fotoUrl = this.fotoUrl
      this.collaboratorService.createCollaborator(collaborator).subscribe(
        response => {
          this.notification.showMessage("Colaborador Cadastrado Com Sucesso!")
          this.router.navigate(['/dashboard'])
      }
      )

    } else {
      this.notification.showMessage("Dados Inválidos!")
    }
  }

  public uploadFile(event: any):void {
    this.isLoading = true;
    const file: File = event.target.files[0]
    this.uploadService.uploadFoto(file).subscribe(uploadResult  => {
      this.isLoading = false
      const storageReference = uploadResult.ref;
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((fotoUrl: string) => {
        this.fotoUrl = fotoUrl;
      })
    })
  }


    


}
