import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[highlinght]',
  standalone: true
})
export class HighlinghtDirective {

  element = inject(ElementRef);

  constructor() { }

  ngOnInit() {
    this.element.nativeElement.style.backgroundColor = "red";
  }

}
