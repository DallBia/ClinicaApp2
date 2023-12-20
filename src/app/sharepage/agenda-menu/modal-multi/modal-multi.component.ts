
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Agenda } from 'src/app/models/Agendas';
import { UserService } from 'src/app/services';
import { Agenda2Service } from 'src/app/services/agenda/agenda2.service';

@Component({
  selector: 'app-modal-multi',
  templateUrl: './modal-multi.component.html',
  styleUrls: ['./modal-multi.component.css']
})
export class ModalMultiComponent implements OnInit{

  public informacao = '';
public ListaAgenda: any = [];
public idPr = 0;
public numReserva: string = '';

  constructor(
    public agenda: Agenda2Service,
    private userService: UserService,
    public dialogRef: MatDialogRef<ModalMultiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.ListaAgenda = [];
    const n = this.agenda.agendaNsessoes;
    let id00 = new Date()
    let id01 = id00.toISOString()
    id01 = id01.replace(/\D/g, '')
    this.numReserva = id01
    for (let i = 0; i < n; i++) {
      const lin = {
        id: i,
        sessao: (i+1).toString(),
        profis: '',
        dia: '',
        hora: '',
        status: '○',
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

        let rept = 'A%' + this.agenda.calcDiaSemana(this.ListaAgenda[x].dia);
        rept = rept + '%' + this.agenda.calcSemanaSimNao(this.ListaAgenda[x].dia);

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
          configRept: rept,
        }
        console.log(origem)
        const data = await this.agenda.getAgendaMulti(origem)
        const dados = data.dados

        console.log(dados)
        const mensagem = data.mensagem
        console.log('Mensagem: ' + mensagem)
        if (mensagem == 'Encontrado.'){
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
          if (data2.mensagem == 'Disponível.'){
            this.ListaAgenda[x].status = '●'
            n = this.ListaAgenda[x].id
            if(n !== undefined){
              const nn = n + 1;
              let nId: number = 0;
              for(let h of this.agenda.ListaCLientes){
                if (this.agenda.celSelect.nome == h.nome){
                  nId = h.id;
                }
              }
              const Usr = this.userService.getUserA().getValue();
              const usrId = Usr?.userid !== undefined ? parseInt(Usr?.userid, 10) : 0;

              this.agenda.agendaMulti[n] = {
                id: nn,
                idCliente: nId,
                nome: this.agenda.celSelect.nome,
                idFuncAlt: usrId,
                dtAlt: new Date().toISOString(),
                horario: this.ListaAgenda[x].hora,
                sala: dados.sala,
                unidade: dados.unidade,
                diaI: this.ListaAgenda[x].dia,
                diaF: this.ListaAgenda[x].dia,
                repeticao: 'Unica',
                subtitulo: 'Multi (' + nn + ' de ' + this.agenda.agendaNsessoes + ')',
                status: '',
                historico: this.numReserva + ' (' + nn + ' de ' + this.agenda.agendaNsessoes + ')',
                obs: '',
                valor: nn == 1 ? this.agenda.celSelect.valor : 0,
                configRept: 'X',
              }
            }

          }else{
            this.ListaAgenda[x].status = '○'
          }
        }else{
          this.ListaAgenda[x].status = '○'
        }
      }

}

async onReserveClick(){
  console.log('Serão feitos os seguintes agendamentos:')
  console.log(this.agenda.agendaMulti)
  for (let i of this.agenda.agendaMulti){
    i.status = 'Reservado';
    const n =  i.id !== undefined ? i.id - 1 : 0;
    i.id = 0;
    this.informacao = 'Gravando dados... sessão ' + this.ListaAgenda[n].sessao.toString();
    const okCriaAgenda = await this.agenda.CreateAgenda(i);
    console.log(okCriaAgenda)
    while (okCriaAgenda == undefined){
      this.delay(500)
      console.log('Aguardando...')
    }

  }
  this.informacao = '';
  this.onCloseClick();
}


delay(time:number) {
  setTimeout(() => {

  }, time);
}

onSaveClick(){}
// sessao: (i+1).toString(),
//         profis: '',
//         dia: '',
//         hora: '',
//         status:
}

