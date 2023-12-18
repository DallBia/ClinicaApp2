
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Agenda } from 'src/app/models/Agendas';
import { Agenda2Service } from 'src/app/services/agenda/agenda2.service';

@Component({
  selector: 'app-modal-multi',
  templateUrl: './modal-multi.component.html',
  styleUrls: ['./modal-multi.component.css']
})
export class ModalMultiComponent implements OnInit{

public ListaAgenda: any = [];
public idPr = 0;
  constructor(
    public agenda: Agenda2Service,
    public dialogRef: MatDialogRef<ModalMultiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      const lin = {
        sessao: (i+1).toString(),
        profis: '',
        dia: '',
        hora: '',
        status: 'teste',
      }
      this.ListaAgenda.push(lin);
    }




  }


  exemploChamadaApi(): void {


    // Se desejar, você pode armazenar a inscrição para mais tarde cancelá-la (por exemplo, ngOnDestroy)
    // this.subscriptions.push(subscription);
  }
  onCloseClick(): void {
    this.dialogRef.close();
  }


buscaData(n?: number){
  const x = n !== undefined ? n : 0
  for (let i of this.agenda.ListaEquipe){
    if (i.nome == this.ListaAgenda[x].profis){
      this.idPr = i.id
      this.ListaAgenda[x].status = this.idPr
    }
  }
this.busca(n)
}

buscaDia(n?: number){
  this.busca(n)
}
buscaHora(n?: number){
  this.busca(n)
}
buscaStatus(n?: number){
  this.busca(n)
}

async busca(n?: number){
  const x = n !== undefined ? n : 0
  let idPr = 0;
  console.log(this.ListaAgenda[x])

  for (let i of this.agenda.ListaEquipe){
    if (i.nome == this.ListaAgenda[x].profis){
      idPr = i.id
    }
  }
  if (this.ListaAgenda[x].profis !== ''
        && this.ListaAgenda[x].dia !== ''
        && this.ListaAgenda[x].hora !== ''
        ){
    const origem: Agenda = {
      id: 1,
      idCliente: idPr,
      nome: this.ListaAgenda[x].profis,
      idFuncAlt: idPr,
      dtAlt: new Date().toISOString(),
      horario: 'manhã',
      sala: 0,
      unidade: 0,
      diaI: this.ListaAgenda[x].dia,
      diaF: this.ListaAgenda[x].dia,
      repeticao: 'Unica',
      subtitulo: '',
      status: 'Vago',
      historico: '',
      obs: '',
      valor: 0,
      configRept: '',
    }
    console.log(origem)
    const data = await this.agenda.getAgendaMulti(origem)
    const dados = data.dados
    console.log(dados)
    const mensagem = data.mensagem
    console.log('Mensagem: ' + mensagem)
    const origem2: Agenda = {
      id: 0,
      idCliente: 0,
      nome: '',
      idFuncAlt: 0,
      dtAlt: new Date().toISOString(),
      horario: this.ListaAgenda[x].hora,
      sala: dados.sala,
      unidade: dados.unidade,
      diaI: this.ListaAgenda[x].dia,
      diaF: this.ListaAgenda[x].dia,
      repeticao: 'Unica',
      subtitulo: '',
      status: 'Vago',
      historico: '',
      obs: '',
      valor: 0,
      configRept: '',
    }
    console.log(origem2)
    const data2 = await this.agenda.getAgendaMulti(origem2)
    const dados2 = data2.dados
    console.log(dados2)
    console.log('Mensagem: ' + data2.mensagem)
    this.ListaAgenda[x].status = data2.mensagem

  }

}

onReserveClick(){

}
onSaveClick(){}
// sessao: (i+1).toString(),
//         profis: '',
//         dia: '',
//         hora: '',
//         status:
}

