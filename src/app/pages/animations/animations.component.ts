import { Component, OnInit } from '@angular/core';

import { trigger, state, style, transition, animate, group } from '@angular/animations';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.css'],
  animations: [
    trigger('toggleBox', [
      // ...
      state('open', style({
        height: '200px',
        backgroundColor: '#061ff0'
      })),
      state('closed', style({
        height: '70px',
        backgroundColor: '#E91E63',
      })),
      transition('open => closed', [
        animate('.1s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ])
  ]
})
export class AnimationsComponent implements OnInit {
  isOpen: boolean = true;
  toggle() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
