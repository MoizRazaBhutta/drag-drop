import { Component, OnInit } from '@angular/core';
import * as introJS from 'intro.js/intro.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'drag-drop';
  introJS = introJS();

  ngOnInit() {
    this.introJS.setOptions({
      steps: [
        {
          element: document.querySelector('h1'),
          intro: 'This is h1',
        },
      ],
    });
  }
  startIntro(){
    this.introJS.start()
  }
}
