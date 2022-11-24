import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Collaborator } from 'src/app/models/collaborator';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-edit-collaborator',
  templateUrl: './edit-collaborator.component.html',
  styleUrls: ['./edit-collaborator.component.css']
})
export class EditCollaboratorComponent implements OnInit {
 
public collaborator!: Collaborator
public isLoading: boolean = false

  constructor( 
    private notification: NotificationService,
    private collaboratorService: CollaboratorService,
    private router: Router,
    private route: ActivatedRoute,
    private uploadService: UploadService
    ) { }

  ngOnInit(): void {
    this.initializeFields()
  }

  private initializeFields():void{
    const id = this.route.snapshot.params['id']
    this.collaboratorService.findById(id).subscribe(collaborator => {
      this.collaborator = collaborator
    })
  }

  updateCollaborator( form: NgForm): void {
    if (form.valid) {

      this.collaboratorService.updateCollaborator(this.collaborator).subscribe(
        response => {
          this.notification.showMessage("Colaborador Atualizado Com Sucesso!")
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
        this.collaborator.fotoUrl = fotoUrl;
      })
    })
  }

}
