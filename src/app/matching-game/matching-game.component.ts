import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Observable, Subject, Subscription, fromEvent } from 'rxjs';
import { ANIMALS, Pair } from '../data';
import {
  pairwise,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
  take,
} from 'rxjs/operators';

@Component({
  selector: 'app-matching-game',
  templateUrl: './matching-game.component.html',
  styleUrls: ['./matching-game.component.scss'],
})
export class MatchingGameComponent implements OnInit, OnDestroy, AfterViewInit {
  animals: Pair[] = ANIMALS;
  solvedPair: Pair[] = [];
  unsolvedPairLeft: Pair[] = [];
  unsolvedPairRight: Pair[] = [];
  leftPartSelectedId: number = -1;
  rightPartSelectedId: number = -1;

  @ViewChild('left') left: ElementRef;
  @ViewChild('right') right: ElementRef;

  mouseDown$: any;
  mouseMove$: any;
  mouseUp$: any;

  assignmentStream = new Subject<{ pair: Pair; side: string }>();

  private solvedStream = new Observable<Pair>();
  private failedStream = new Observable<string>();

  private s_Subscription: Subscription;
  private f_Subscription: Subscription;

  constructor(private el: ElementRef) {}
  ngAfterViewInit() {
    const elements = this.el.nativeElement.querySelectorAll('.item');
    Array.from(elements).forEach((element) =>
      this.createDraggableElement(element)
    );
    // fromEvent(this.right.nativeElement, 'drop').subscribe((res) =>
    //   console.log(res)
    // );
  }

  ngOnInit(): void {
    this.unsolvedPairLeft = [...this.animals];
    this.unsolvedPairRight = this.shuffledArray(this.unsolvedPairLeft);

    const stream = this.assignmentStream.pipe(
      pairwise(), //converting into pairs
      filter((comb) => comb[0].side != comb[1].side) //removing all similar pairs
    );
    const stream1 = stream.pipe(
      filter((comb) => comb[0].pair === comb[1].pair) //all correct streams
    );
    const stream2 = stream.pipe(
      filter((comb) => comb[0].pair !== comb[1].pair) //not correct streams
    );

    this.solvedStream = stream1.pipe(
      map((comb) => {
        return comb[0].pair; //pair only of correct streams
      })
    );
    this.failedStream = stream2.pipe(
      map((comb) => {
        return comb[0].side;
      })
    );

    this.s_Subscription = this.solvedStream.subscribe((pair) =>
      this.handleSolvedAssignment(pair)
    );
    this.f_Subscription = this.failedStream.subscribe((side) =>
      this.handleFailedAssignment(side)
    );
  }

  private handleSolvedAssignment(pair: Pair): void {
    this.solvedPair.push(pair);
    this.remove(this.unsolvedPairLeft, pair);
    this.remove(this.unsolvedPairRight, pair);
    this.leftPartSelectedId = -1;
    this.rightPartSelectedId = -1;
  }
  private handleFailedAssignment(side1: string): void {
    if (side1 == 'left') {
      this.leftPartSelectedId = -1;
    } else {
      this.rightPartSelectedId = -1;
    }
  }

  shuffledArray(arr: any[]): any[] {
    let arr1 = [...arr];
    let j, x;
    for (let i = arr1.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr1[i];
      arr1[i] = arr1[j];
      arr1[j] = x;
    }
    return arr1;
  }

  private remove(array: Pair[], pair: Pair) {
    let index = array.indexOf(pair);

    if (index > -1) {
      array.splice(index, 1);
    }
  }

  ngOnDestroy() {
    this.s_Subscription.unsubscribe();
    this.f_Subscription.unsubscribe();
  }

  // TODO implement RxJS drag and drop
  createDraggableElement(element) {
    this.mouseDown$ = fromEvent(element, 'mousedown');
    this.mouseMove$ = fromEvent(document, 'mousemove');
    this.mouseUp$ = fromEvent(document, 'mouseup');

    let dragStart$ = this.mouseDown$;
    let dragMove$ = dragStart$.pipe(
      // whenever we press mouse down
      switchMap((start: MouseEvent) =>
        this.mouseMove$.pipe(
          tap((ev: MouseEvent) => {
            ev.preventDefault();
            ev.stopPropagation();
          }),
          map((moveEvent: MouseEvent) => ({
            start: start,
            originalEvent: moveEvent,
            pageX: moveEvent.pageX - start.offsetX,
            pageY: moveEvent.pageY - start.offsetY,
          })),
          // each time we move a cursor
          takeUntil(this.mouseUp$) // but only until we release the mouse button
        )
      )
    );
    // dragMove$.subscribe((res) => console.log(res));

    dragMove$.subscribe((move) => {
      // console.log(move.start.target.innerText);
      fromEvent(this.right.nativeElement, 'drop').subscribe((res: MouseEvent) =>
        console.log(res.target)
      );
      console.log(move.originalEvent.target.innerText);
      element.style.position = 'absolute';
      // element.style.zIndex = '-1';
      element.style.left = move.pageX + 'px';
      element.style.top = move.pageY + 'px';
    });
    let dropStream$ = dragMove$.pipe(
      switchMap(() => this.mouseUp$.pipe(take(1)))
    );
    dropStream$.subscribe((res) => console.log(res));
  }

  onDrop(event) {
    console.log(event);
  }
}
