import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCurrencyInput]'
})
export class CurrencyInputDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event']) onInput(event: any) {
    const inputVal = event.target.value;
    const newVal = inputVal.replace(',', '.');
    this.renderer.setProperty(this.el.nativeElement, 'value', newVal);
  }
}
