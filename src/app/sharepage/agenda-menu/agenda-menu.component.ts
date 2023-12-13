import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Agenda } from 'src/app/models/Agendas';
import { Financeiro } from 'src/app/models/Financeiro';
import { UserService } from 'src/app/services';
import { Agenda2Service } from 'src/app/services/agenda/agenda2.service';
import { FinanceiroService } from 'src/app/services/financeiro/financeiro.service';
import { FileService } from 'src/app/services/foto-service.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-agenda-menu',
  templateUrl: './agenda-menu.component.html',
  styleUrls: ['./agenda-menu.component.css']
})
export class AgendaMenuComponent implements OnInit {

    constructor(
      public agendaService: Agenda2Service,
      public foto: FileService,
      public shared: SharedService,
      public userService: UserService,
      public financeiroService: FinanceiroService

    ){}

      public fotografia: any = false
      public subscription: Subscription | undefined;

  ngOnInit(): void {
      this.shared.BuscaValores()
  }

    public Vlr: boolean = true;

    buscaValor(){
      for(let i of this.shared.ListaValores){
        if (this.agendaService.celSelect.subtitulo == i.nome && this.agendaService.celSelect.valor == -1000009){
          this.agendaService.celSelect.valor = i.valor
        }
      }
    }

    buscaFoto(){
      let id = 0
      for (let i of this.agendaService.ListaCLientes){
        if (this.agendaService.celSelect.nome == i.nome){
          id = i.id;
        }
      }
      if (id !== 0){
        this.agendaService.BuscaCliente(id)
      }else{
        this.agendaService.Cliente.foto = this.foto.semfoto2
      }
    }

    altVlr(){
      this.Vlr = !this.Vlr
      if (this.agendaService.celSelect.valor !== undefined){
        if(this.agendaService.celSelect.valor < 0){
        this.agendaService.celSelect.valor = 0;
        }
      }
    }


    setStatus(status: string){
      if(status == 'Bloqueado'){
        let valSt = false
        const StatAnt = this.agendaService.cellA.status
        if(StatAnt == '' || StatAnt == 'Vago'){
          valSt = true
        }
        if (this.agendaService.celSelect.nome !== ''
            || valSt !== true){
              alert('Só é possível bloquear um horário vago. Por favor, limpe o horário antes de bloquear.');
        }else{
          this.agendaService.celSelect.status = status;
        }
      }else{
        this.agendaService.celSelect.status = status;
      }
    }

    async salvaSessao(){
      //let diff = this.saoIguais(this.agendaService.celSelect, this.agendaService.cellA)
      let diff = true
      if (diff == true){
        this.agendaService.celSelect.idCliente = 0;
        if (this.agendaService.celSelect.status == 'Sala'){
          for(let n of this.agendaService.ListaEquipe){
            if (this.agendaService.celSelect.nome == n.nome){
              this.agendaService.celSelect.idCliente = n.id;
            }
          }
        }else{
          for(let n of this.agendaService.ListaCLientes){
          if (this.agendaService.celSelect.nome == n.nome){
            this.agendaService.celSelect.idCliente = n.id;
          }
        }
        }

        let sessao = '';
        switch (this.agendaService.celSelect.repeticao){
          case 'Sessão única':
            sessao = 'Unica';
            break;
          case 'Diária':
            sessao = 'Diaria';
            break;
          case 'Semanal':
            sessao = 'Semanal';
            break;
          case 'Quinzenal':
            sessao = 'Quinzenal';
            break;
          case 'Mensal':
            sessao = 'Mensal';
            break;
          case 'Cancelar Repetição':
            sessao = 'Cancelar';
            break;
          default:
            sessao = 'Unica';
        }

        let texto = '';
        const dataAtual = new Date();
        const horas = dataAtual.getHours();
        const minutos = dataAtual.getMinutes();

        const horaFormatada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
        const Usr = this.userService.getUserA().getValue();

        if (this.agendaService.cellA.status == ''|| this.agendaService.cellA.status == 'Vago'){
          texto = 'Agendamento de ' + this.agendaService.celSelect.subtitulo + '. ';
          this.agendaService.celSelect.status == 'Pendente';
        }else{
          if(this.agendaService.celSelect.status == 'Vago'){
            texto = 'Sessão anterior Excluída.';
            this.agendaService.celSelect.repeticao = 'Cancelar';
            this.agendaService.celSelect.nome = '';
            this.agendaService.celSelect.idCliente = 0;
            this.agendaService.celSelect.subtitulo = '';
            this.agendaService.celSelect.obs = '';
            this.agendaService.celSelect.valor = -1000009;
          }else{
            if(this.agendaService.cellA.repeticao !== this.agendaService.celSelect.repeticao){
              texto += 'Repetição alterada: de ' + this.agendaService.cellA.repeticao + ' para ' + this.agendaService.celSelect.repeticao + '. '
            }
            if(this.agendaService.cellA.valor !== this.agendaService.celSelect.valor){
              texto += 'Valor alterado: de ' + this.agendaService.cellA.valor + ' para ' + this.agendaService.celSelect.valor + '. '
            }
            if(this.agendaService.cellA.nome !== this.agendaService.celSelect.nome){
              texto += 'Cliente alterado: de ' + this.agendaService.cellA.nome + ' para ' + this.agendaService.celSelect.nome + '. '
            }
            if(this.agendaService.cellA.status !== this.agendaService.celSelect.status){
              texto += 'Novo Status: ' + this.agendaService.celSelect.status + '. '
            }
          }
        }
        this.agendaService.celSelect.repeticao = sessao;
        let Histmp = '֍' + new Date().toLocaleDateString('pt-BR') + ' - ' +  horaFormatada + ':\n' + texto  + '\npor: ' + Usr?.name + '\nꟷꚚꟷ\n';
        this.agendaService.celSelect.historico += Histmp;
        const usrId = Usr?.userid !== undefined ? parseInt(Usr?.userid, 10) : 0;
        this.agendaService.celSelect.idFuncAlt = usrId
        this.agendaService.celSelect.dia = this.agendaService.dia;
        this.agendaService.celSelect.unidade = this.agendaService.un;
        this.agendaService.celSelect.horario = this.agendaService.horario;
        this.agendaService.celSelect.sala = this.agendaService.sala;
        this.agendaService.celSelect.dtAlt = new Date().toISOString();
        this.agendaService.celSelect.status = this.agendaService.celSelect.status == '' ? 'Pendente' : this.agendaService.celSelect.status

        if(this.agendaService.celSelect.id == 0 || this.agendaService.celSelect.id == undefined){
          this.salvaAgenda(this.agendaService.celSelect)
        }
        else{
          console.log('ANTES da chamada:')
          console.log(this.dado)
          const resp = await this.buscaFinanceiro(this.agendaService.celSelect.id)
          console.log('DEPOIS da chamada:')
          console.log(this.dado)
          if(this.dado.idCliente == this.agendaService.celSelect.idCliente){
            this.dado.data = this.agendaService.celSelect.dtAlt
            this.dado.valor = this.agendaService.celSelect.valor !== undefined ? this.agendaService.celSelect.valor : 0;
            this.dado.idFuncAlt = this.agendaService.celSelect.idFuncAlt
            const texto = 'Sessão alterada: ' + this.agendaService.celSelect.subtitulo + ' - ' + this.agendaService.celSelect.dia
            this.dado.descricao = texto
            console.log(this.dado)
            const ok = this.updateFin(this.dado)
          }
          this.updateAgenda(this.agendaService.celSelect.id, this.agendaService.celSelect)
        }
      }
    }


    private dado: Financeiro = {
      id: 0,
      idCliente: 0,
      idFuncAlt: 0,
      nome: '',
      descricao: '',
      data: '',
      valor: -1000009,
      selecionada: false,
      recibo: '',
      refAgenda: 0,
    }
    async buscaFinanceiro(id: number){
        try{
            const resp = await this.financeiroService.getFinanceiroByAgenda(id)
            this.dado.id = (await resp).id
            this.dado.idCliente = (await resp).idCliente
            this.dado.idFuncAlt = (await resp).idFuncAlt
            this.dado.nome = (await resp).nome
            this.dado.descricao = (await resp).descricao
            this.dado.valor = (await resp).valor
            this.dado.selecionada = (await resp).selecionada
            this.dado.recibo = (await resp).recibo
            this.dado.refAgenda = (await resp).refAgenda
        }catch{}
        console.log(this.dado)
        return this.dado
    }

    async updateFin(info: Financeiro){
      info.data = info.data.substring(0, 10);
      try{
        const resp = await this.financeiroService.updateFinanceiro(info)
        console.log(resp)
        return resp
      }catch{return 'erro'}
      }
      async createFin(info: Financeiro){
        try{
          info.data = info.data.substring(0, 10);
          const resp = await this.financeiroService.createFinanceiro(info)
          console.log(resp)
          return resp
      }catch{return 'erro'}
    }

    teste(){
      // const info: Financeiro = {
      //     id: 0,
      //     idCliente: 2,
      //     idFuncAlt: 2,
      //     nome: 'Teste novo',
      //     descricao: 'Sera apagado também',
      //     data: '2023-12-12',
      //     valor: 40,
      //     selecionada: false,
      //     recibo: '',
      //     refAgenda: 35,
      //   }
      //   const ok = this.createFin(info)
      //   console.log(ok)
      }


    async updateAgenda(id: number, texto: Agenda) {
      console.log(texto)
      try{
        const okCriaAgenda = await this.agendaService.UpdateAgenda(id, texto)
        alert('Sessão atualizada!');
        this.delay(100);
        location.reload()
        return true
      }catch{
        alert('Ops!');
        return false}

      // this.agendaService.UpdateAgenda(id, texto).subscribe(
      //   (data) => {
      //     this.delay(100);
      //     alert('Sessão atualizada!');
      //     this.delay(100);
      //     location.reload();
      //   },
      //   (error) => {
      //     console.error('Erro no upload', error);
      //   }
      // );

    }

    async salvaAgenda(DadosEntrada: Agenda) {
      console.log(DadosEntrada)
      const okCriaAgenda = await this.agendaService.CreateAgenda(DadosEntrada)
      // this.agendaService.CreateAgenda(texto).subscribe(
      //   (data) => {
      //     this.delay(100);
          const x = this.agendaService.celSelect.dtAlt !== undefined ? new Date(this.agendaService.celSelect.dtAlt) :new Date();
          this.dado.data = x.toISOString().split('T')[0]
          this.dado.valor = this.agendaService.celSelect.valor !== undefined ? this.agendaService.celSelect.valor : 0;
          this.dado.idFuncAlt = this.agendaService.celSelect.idFuncAlt !== undefined ? this.agendaService.celSelect.idFuncAlt : 0;
          const texto = 'Sessão alterada: ' + this.agendaService.celSelect.subtitulo + ' - ' + this.agendaService.celSelect.dia
          this.dado.descricao = ''
          this.dado.id = 0
          this.dado.idCliente = this.agendaService.celSelect.idCliente !== undefined ? this.agendaService.celSelect.idCliente : 0;
          this.dado.nome = texto
          this.dado.recibo = ''
          this.dado.selecionada = false
          const dia = this.agendaService.celSelect.dia !== undefined ? this.agendaService.celSelect.dia : new Date().toISOString().split('T')[0]
          this.agendaService.success = false
          const busca = await this.agendaService.BuscarAgenda(dia)

          for (let i of this.agendaService.agendaG){
            if(i.sala == this.agendaService.celSelect.sala &&
              i.dia== this.agendaService.celSelect.dia &&
              i.horario == this.agendaService.celSelect.horario &&
              i.unidade == this.agendaService.celSelect.unidade
                ){
                  this.dado.refAgenda = i.id !== undefined ? i.id : 0;
                }
          }
          const ok = await this.createFin(this.dado)
          alert('Sessão gravada!');
          this.delay(100);
          location.reload();
      //   },
      //   (error) => {
      //     console.error('Erro no upload', error);
      //   }
      // );
    }
    delay(time:number) {
      setTimeout(() => {

      }, time);
    }


    saoIguais(agenda1: Agenda, agenda2: Agenda): boolean {

      if (!agenda1 || !agenda2) {
        return false;
      }

      // Obtém as chaves (propriedades) dos objetos
      const chavesAgenda1 = Object.keys(agenda1);
      const chavesAgenda2 = Object.keys(agenda2);

      // Verifica se o número de propriedades é o mesmo
      if (chavesAgenda1.length !== chavesAgenda2.length) {
        return false;
      }
      const n = chavesAgenda1.length
      // Itera sobre as chaves e compara os valores
      for (let i = 0; i < n; i++) {
        if (chavesAgenda1[i] !== chavesAgenda2[i]) {
          return false;
        }
      }

      // Se todas as propriedades forem iguais, retorna true
      return true;
    }

}
