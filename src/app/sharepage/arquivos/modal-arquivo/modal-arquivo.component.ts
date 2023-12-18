import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-modal-arquivo',
  templateUrl: './modal-arquivo.component.html',
  styleUrls: ['./modal-arquivo.component.css']
})
export class ModalArquivoComponent {


/**
 *
 */
    constructor(
      public shared: SharedService,
    ) {


    }


}
