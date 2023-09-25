import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ColaboradorService } from 'src/app/services/colaborador/colaborador.service';

@Component({
  selector: 'app-equipe-modal',
  templateUrl: './equipe-modal.component.html',
  styleUrls: ['./equipe-modal.component.css']
})
export class EquipeModalComponent {
private id: number = 0;

formulario: any = {
  nomeEquipe: '',
  
    nome: '',
    dtNasc:  '',
    rg:  '',
    cpf:  '',
    endereco:  '',
    telFixo:  '',
    celular:  '',
    email:  '',
    dtAdmis:  '',
    dtDeslig:  '',
    idPerfil:  '',
    ativo:  '',
    areaSession:  '',
    senhaHash:  '',
}
  constructor(
    public dialogRef: MatDialogRef<EquipeModalComponent>,
    private colaboradorService: ColaboradorService,

  ) {}
  
  ngOnInit(){
    
    
  }

salvar(){
  
}

  fechar() {
    this.dialogRef.close();
  }
}
