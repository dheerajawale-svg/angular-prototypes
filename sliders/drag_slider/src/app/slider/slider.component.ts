import { AfterContentInit, Component, ContentChildren, ElementRef, QueryList, ViewChild } from '@angular/core';
import { SliderItemDirective } from './slider-item.directive';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterContentInit {
  @ContentChildren(SliderItemDirective, { read: ElementRef }) items! : QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('slides')  slidesContainer!: ElementRef<HTMLDivElement>;

  private slidesIndex = 0;

  interval: any;

  get currentItem(): ElementRef<HTMLDivElement> {
    return this.items.find((item, index) => index === this.slidesIndex)!;
  }

  ngAfterContentInit() {
    console.log('items', this.items);
  }

  ngAfterViewInit() {
    console.log('slides', this.slidesContainer);
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.onClickRight(true);
    },3000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  onClickLeft(fromTimer?: boolean) {

    if(!fromTimer) {
      this.pauseTimer();
    }

    this.slidesContainer.nativeElement.scrollLeft -= this.currentItem.nativeElement.offsetWidth;

    if (this.slidesIndex > 0) {
      this.slidesIndex--;
    }
    else {
      this.onClickRight();
    }
  }

  onClickRight(fromTimer?: boolean) {

    if(!fromTimer) {
      this.pauseTimer();
    }

    this.slidesContainer.nativeElement.scrollLeft += this.currentItem.nativeElement.offsetWidth;

    if (this.slidesIndex < this.items.length - 1) {
      this.slidesIndex++
    }
    else {
      this.onClickLeft();
    }
  }

}
