import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Clinica';
  showNavbar = true;


  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showNavbar = !this.router.url.includes('login');
    });

  }

  ngOnInit(): void {
    //window.addEventListener('beforeunload', this.onBeforeUnload.bind(this));

  }

  ngOnDestroy(): void {
    //window.removeEventListener('beforeunload', this.onBeforeUnload.bind(this));

  }

  onBeforeUnload(event: any): void {
    //localStorage.clear();
    //sessionStorage.clear();
  }
}

