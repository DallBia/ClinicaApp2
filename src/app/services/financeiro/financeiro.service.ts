import { Injectable } from '@angular/core';
import { Financeiro } from 'src/app/models/Financeiro';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {

  public tabFinanceira: Financeiro[] = []
  constructor() {
    const l1: Financeiro[] = [{
      id: 0,
      idCliente: 4,
      idFuncAlt: 1,
      nome: 'Sessão marcada: Psicopedagogia 18/10/2023',
      descricao: '((Un. 1, sala 3, 09:40)',
      data: '20/10/2023',
      valor: 180,
      selecionada: false,
      recibo: ''
    }]
    const l2: Financeiro[] = [{
      id: 0,
      idCliente: 4,
      idFuncAlt: 1,
      nome: 'Sessão marcada: Psicologia 15/11/2023',
      descricao: '((Un. 1, sala 3, 09:40)',
      data: '12/11/2023',
      valor: 250,
      selecionada: false,
      recibo: ''
    }]
    const l3: Financeiro[] = [{
      id: 0,
      idCliente: 4,
      idFuncAlt: 1,
      nome: 'Sessão marcada: Psicopedagogia 16/12/2023',
      descricao: '((Un. 1, sala 3, 09:40)',
      data: '12/12/2023',
      valor: 180,
      selecionada: false,
      recibo: ''
    }]
    const l4: Financeiro[] = [{
      id: 0,
      idCliente: 4,
      idFuncAlt: 1,
      nome: 'Sessão desmarcada: Psicopedagogia 16/12/2023',
      descricao: 'via pix',
      data: '14/12/2023',
      valor: -180,
      selecionada: false,
      recibo: '9904-B'
    }]
    const l5: Financeiro[] = [{
      id: 0,
      idCliente: 4,
      idFuncAlt: 1,
      nome: 'Consulta agendada: 14/12/2023',
      descricao: 'solicitado pelo cliente, para efetuar o pagamento',
      data: '12/12/2023',
      valor: 0,
      selecionada: false,
      recibo: '9904-B'
    }]
    const l6: Financeiro[] = [{
      id: 0,
      idCliente: 4,
      idFuncAlt: 1,
      nome: 'Pagamento efetuado',
      descricao: 'via pix',
      data: '14/12/2023',
      valor: -300,
      selecionada: false,
      recibo: '9904-B'
    }]
    this.tabFinanceira = [...this.tabFinanceira, ...l1]
    this.tabFinanceira = [...this.tabFinanceira, ...l2]
    this.tabFinanceira = [...this.tabFinanceira, ...l3]
    this.tabFinanceira = [...this.tabFinanceira, ...l4]
    this.tabFinanceira = [...this.tabFinanceira, ...l5]
    this.tabFinanceira = [...this.tabFinanceira, ...l6]
  }
}
