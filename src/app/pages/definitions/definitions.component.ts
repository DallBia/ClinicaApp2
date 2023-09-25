import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Perfil } from 'src/app/models/Perfils';

@Component({
  selector: 'app-definitions',
  templateUrl: './definitions.component.html',
  styleUrls: ['./definitions.component.css']
})
export class DefinitionsComponent implements OnInit{
public Ajuda:string = 'Passe o mouse por cima da linha para ter uma descrição mais detalhada.';

constructor (private perfilService: PerfilService){}


ngOnInit(){
  this.perfilService.Ajuda$.subscribe((novoValor) => {
  this.Ajuda = novoValor;
});
}


}
