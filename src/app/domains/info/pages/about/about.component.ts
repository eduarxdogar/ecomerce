import { Component, signal } from '@angular/core';
import { CounterComponent } from './../../../shared/components/counter/counter.component';
import { CommonModule } from '@angular/common';
import { WaveAudioComponent } from './../../../info/components/wave-audio/wave-audio.component';
import { HighlinghtDirective } from './../../../shared/directives/highlinght.directive';



@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CounterComponent, CommonModule, WaveAudioComponent, HighlinghtDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  duration = signal(1000);
  message = signal('hola');


  changeDuraion(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber)
  }

  changeMessage(event: Event) {
    const input = event.target as HTMLInputElement;
    this.message.set(input.value)
  }

}
