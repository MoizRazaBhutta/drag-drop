import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil, tap, skipUntil } from 'rxjs/operators';
import { Label, LABELS, Option, OPTIONS } from '../data';

@Component({
  selector: 'app-label-game',
  templateUrl: './label-game.component.html',
  styleUrls: ['./label-game.component.scss'],
})
export class LabelGameComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private el: ElementRef) {}

  mouseDown$;
  mouseUp$;
  mouseMove$;
  score = 0;
  labels: Label[] = LABELS;
  options: Option[] = OPTIONS;
  currentDroppable = null;
  insideDropzone = false;

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    const dragElements = this.el.nativeElement.querySelectorAll('.option');
    Array.from(dragElements).forEach((element) =>
      this.createDraggableElement(element)
    );
  }
  ngOnDestroy(): void {}

  createDraggableElement(draggedElement) {
    this.mouseDown$ = fromEvent(draggedElement, 'mousedown');
    this.mouseMove$ = fromEvent(document, 'mousemove');
    this.mouseUp$ = fromEvent(document, 'mouseup');
    // this.mouseUp$.subscribe(console.log);

    let drag$ = this.mouseDown$.pipe(
      switchMap((downs: MouseEvent) =>
        this.mouseMove$.pipe(
          tap((ev: MouseEvent) => {
            ev.preventDefault();
            ev.stopPropagation();
          }),
          map((moves: MouseEvent) => ({
            element: downs.srcElement,
            downX: downs.offsetX,
            downY: downs.offsetY,
            movesX: moves.clientX,
            movesY: moves.clientY,
          })),
          takeUntil(this.mouseUp$)
        )
      )
    );

    drag$.subscribe(({ element, movesX, movesY, downX, downY }) => {
      element.style.position = 'absolute';
      element.style.top = `${movesY - downY}px`;
      element.style.left = `${movesX - downX}px`;

      element.hidden = true;
      let elementBelow = document.elementFromPoint(movesX, movesY);
      element.hidden = false;

      if (!elementBelow) {
        //some logic
      }

      let droppableBelow = elementBelow.closest('.drop-zone'); //select the dropzone otherwise null
      // console.log(this.currentDroppable);
      if (this.currentDroppable != droppableBelow) {
        if (this.currentDroppable) {
          //leaving logic
          this.leaveDropzone(this.currentDroppable, element);
        }
        this.currentDroppable = droppableBelow;
        if (this.currentDroppable) {
          //leaving logic
          this.enterDropzone(this.currentDroppable, element);
        }
      }
      //  else {
      //   // console.log(this.insideDropzone);
      //   if (!this.insideDropzone) {
      //     let mouseUp = fromEvent(element, 'mouseup').pipe(
      //       skipUntil(this.mouseDown$)
      //     );
      //     mouseUp.subscribe(console.log);
      //   }
      // }
    });

    // drag$.subscribe(console.log);

    // this.mouseOver$.subscribe(console.log);
  }
  leaveDropzone(dropElement, dragElement) {
    this.insideDropzone = false;
    let a = OPTIONS.find((item) => item.option == dragElement.innerText);
    let b = LABELS.find((item) => item.label == dropElement.innerText);

    if (a.correct == b.label) {
      this.score--;
    }
    console.log(this.score);
    // console.log(dropElement);
    // console.log(dragElement);
  }
  enterDropzone(dropElement, dragElement) {
    this.insideDropzone = true;
    let a = OPTIONS.find((item) => item.option == dragElement.innerText);
    let b = LABELS.find((item) => item.label == dropElement.innerText);

    if (a.correct == b.label) {
      this.score++;
    }
    console.log(this.score);

    // console.log(dropElement.innerText);
    // console.log(dragElement.innerText);
  }
}

/**
 * Problems
 * After unsubscribe do something when mouseUp make currentDroppable null
 * When mouseUp happens do check if the item is dropped in dropzone or not
 *
 */
