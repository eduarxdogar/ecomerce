import { Component, Input, signal, SimpleChange, SimpleChanges } from '@angular/core';
import { ProductComponent } from "../../../products/components/product/product.component";
import { single } from 'rxjs';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  @Input({ required: true }) duration = 0;
  @Input({ required: true }) message = '';
  counter = signal(0);
  counterRef: number | undefined;
  constructor() {
    //no ASYNC
    //antes render
    //run 1 vez
    console.log('constructor');
    console.log('-'.repeat(10))
  }

  ngOnChanges(change: SimpleChanges) {
    // antes y durante el render
    console.log('ngOnChanges');
    console.log('-'.repeat(10))
    console.log(change);
    const duration = change['duration'];
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSomeThing();
    }
  }

  ngOnInit()
  //ya se corrio after render
  //una vez
  //async , then ,subs para pis bd sirve
  {
    console.log('ngOnInit')
    console.log('-'.repeat(10));
    console.log('duration =>', this.duration);
    console.log('message =>', this.message);
    this.counterRef = window.setInterval(() => {
      console.log('run interval')
      this.counter.update(statePrev => statePrev + 1);

    }, 1000)
  }
  ngAfterViewInit() {
    //aaafter ender
    // pregunta si los hijos ya fueron pintados
    console.log('ngAfterViewInit')
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    console.log('ngOnDestroy')
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef)
  }
  doSomeThing() {
    //asyn
    console.log('change duration')
  }
}
