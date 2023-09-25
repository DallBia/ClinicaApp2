import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private selectedNameSubject = new BehaviorSubject<string>('');
  selectedName$ = this.selectedNameSubject.asObservable();
  setSelectedName(name: string) {
    this.selectedNameSubject.next(name);
  }
  private selectedFichaSubject = new BehaviorSubject<string>('NOVO');
  selectedFicha$ = this.selectedFichaSubject.asObservable();
  setSelectedFicha(name: string) {
    this.selectedFichaSubject.next(name);
  }
  private selectedNascimentoSubject = new BehaviorSubject<string>('');
  selectedNascimento$ = this.selectedNascimentoSubject.asObservable();
    setSelectedNascimento(name: string) {
    this.selectedNascimentoSubject.next(name);
  }

  private selectedImageSource = new BehaviorSubject<string | null>(null);

  selectedImage$ = this.selectedImageSource.asObservable();

  setSelectedImage(imageUrl: string): void {
    this.selectedImageSource.next(imageUrl);
  }





  private selectedRowSource = new BehaviorSubject<any>(null);
    currentSelectedRow = this.selectedRowSource.asObservable();

  changeSelectedRow(row: any) {
        this.selectedRowSource.next(row);
    }


    constructor() {

    }
}
