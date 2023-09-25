import { Component } from '@angular/core';

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.css']
})
export class UnidadeComponent {
public x: boolean=true;
public Ligado = [
  {fontWeight: 'bolder', fontSize:'x-large',porc:'75%',porc2:'76%'}
]

ToggleUnit(){
  this.x = !this.x;
}

}
