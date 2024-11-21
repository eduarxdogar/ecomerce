import { Component, ElementRef, Input, signal, ViewChild, viewChild } from '@angular/core';

import WaveSurfer from 'wavesurfer.js';
import { single } from 'rxjs';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css'
})
export class WaveAudioComponent {
  @Input({ required: true }) audioUrl!: string;
  @ViewChild('wave') container!: ElementRef;
  private ws!: WaveSurfer;
  isPlaying = signal(false);


  ngAfterViewInit() {
    this.ws = WaveSurfer.create({
      url: this.audioUrl,
      container: this.container.nativeElement,
      waveColor: 'violet',
      progressColor: 'purple'
    });
    this.ws.on('play', () => this.isPlaying.set(true));
    this.ws.on('pause', () => this.isPlaying.set(true));

  }

  playPause() {
    this.ws.playPause()

  }

}
