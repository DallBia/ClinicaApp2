import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../navbar/header.service';

@Component({
  selector: 'app-custom-date',
  templateUrl: './custom-date.component.html',
  styleUrls: ['./custom-date.component.css']
})
export class CustomDateComponent implements OnInit {
  displayedDate: Date = new Date();
  semana = ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'];
  linkA!: string;
  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.LinkA$.subscribe(link => {
      this.linkA = link;
    });
  }

  onDateChange(event: any): void {
    if(this.linkA == "AGENDA"){
      if (event) {
        this.displayedDate = event.value;
      }
    }
    if(this.linkA == "AGENDA"){
    if (event) {
      this.displayedDate = event.value;
    }
  }

  }
}
