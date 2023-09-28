
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-cel-agenda',
  templateUrl: './cel-agenda.component.html',
  styleUrls: ['./cel-agenda.component.css']
})



export class CelAgendaComponent implements OnInit{
    public lin: number = 0;
    public col: number = 0;
    public linha1: string = '';
    public linha2: string = '';
    public l1: boolean = false;
    public c1: boolean = false;

  public sala: any = [
    {n: 0, dono: 'Amélia', area: 'Arteterapia'},
    {n: 1, dono: 'Amélia', area: 'Arteterapia'},
    {n: 2, dono: 'Solange', area: 'Fisioterapia Padovan'},
    {n: 3, dono: 'Sílvia', area: 'Psicopedagogia'},
    {n: 4, dono: 'Jussara', area: 'Fonoaudiologia'},
    {n: 5, dono: 'Vanessa', area: 'Fonoaudiologia'},
    {n: 6, dono: 'Cecília', area: 'Psicomotricidade'},
    {n: 7, dono: 'Amélia', area: 'Neurofeedback'},
    {n: 8, dono: 'Angélica', area: 'Psicomotricidade'},
    {n: 9, dono: 'Mariana', area: 'Neurofeedback'},
    {n: 10, dono: 'Júlia', area: 'Fisioterapia Padovan'},
    {n: 11, dono: 'Beatriz', area: 'Arteterapia'},
    {n: 12, dono: 'Amélia', area: 'Arteterapia'},
    {n: 13, dono: 'Angélica', area: 'Psicologia'},
    {n: 14, dono: 'Cecília', area: 'Arteterapia'},
    {n: 15, dono: 'Jussara', area: 'Fonoaudiologia'},
    {n: 16, dono: 'Mariana', area: 'Terapia Ocupacional'},
    {n: 17, dono: 'Beatriz', area: 'Neurofeedback'},
    {n: 18, dono: 'Angélica', area: 'Arteterapia'},
    {n: 19, dono: 'Vanessa', area: 'Psicomotricidade'},
    {n: 20, dono: 'Cláudia', area: 'Psicologia'},
    {n: 21, dono: 'Cristiane', area: 'Fisioterapia Padovan'},
    {n: 22, dono: 'Sílvia', area: 'Psicopedagogia'},
    {n: 23, dono: 'Amélia', area: 'Neurofeedback'},
    {n: 24, dono: 'Sílvia', area: 'Psicomotricidade'},
    {n: 25, dono: 'Amélia', area: 'Terapia Ocupacional'},
    {n: 26, dono: 'Cristiane', area: 'Neurofeedback'},
    {n: 27, dono: 'Amélia', area: 'Psicologia'},
    {n: 28, dono: 'Vanessa', area: 'Fonoaudiologia'},
    {n: 29, dono: 'Joana', area: 'Fonoaudiologia'},
    {n: 30, dono: 'Angélica', area: 'Psicopedagogia'},
  ]

  public listaHorarios: any = [
    {n: 0, horario: '-'},
    {n: 1, horario: '08:00'},
    {n: 2, horario: '08:50'},
    {n: 3, horario: '09:40'},
    {n: 4, horario: '10:30'},
    {n: 5, horario: '11:20'},
    {n: 6, horario: '12:00'},
    {n: 7, horario: '-'},
    {n: 8, horario: '13:10'},
    {n: 9, horario: '14:00'},
    {n: 10, horario: '14:50'},
    {n: 11, horario: '15:40'},
    {n: 12, horario: '16:30'},
    {n: 13, horario: '17:20'},
    {n: 14, horario: '18:10'},
    {n: 15, horario: '19:00'},
  ]


  @Input()  parametro!: string;
  public dados: any;

constructor() {


}

ngOnInit(){
  this.dados = this.parametro.split('%');

  this.lin = parseInt(this.dados[0]);
  this.col = parseInt(this.dados[1]);
  if (this.col == 0){
    this.linha1 = this.listaHorarios[this.lin].horario.substring(0, 15);
    this.c1 = true;
    this.l1 = true;
    }else{
    if(this.lin == 0 || this.lin == 7){
      this.linha1 = this.sala[this.col].dono.length > 18 ? this.sala[this.col].dono.substring(0, 15) + '...' : this.sala[this.col].dono;
      this.linha2 = this.sala[this.col].area.length > 18 ? this.sala[this.col].area.substring(0, 15) + '...' : this.sala[this.col].area;
      this.l1 = true;
    }
  }

}

}
