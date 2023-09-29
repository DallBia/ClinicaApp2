import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent {
  subscription: Subscription;
  nChanges!: boolean;
  ngOnInit(): void {

    this.clienteService.BuscaClientes()
    this.agendaService.BuscaAgenda(new Date().toISOString().split('T')[0])

  }


  constructor(public agendaService: AgendaService, private sharedService: SharedService, public clienteService: ClienteService) {

    this.subscription = this.clienteService.ChangesA$.subscribe(
      name => this.nChanges = name
    )

  }
}
