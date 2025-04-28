import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import Glide from '@glidejs/glide';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('glide', { static: false }) glideElement!: ElementRef;
  private glideInstance: any;

  // slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'];
  slides = [
    'assets/images/IMG_0150.jpg',
    'assets/images/IMG_0840.jpg',
    'assets/images/IMG_4362.jpg',
    'assets/images/IMG_4589.jpg',
  ];

  images: string[] = [];
  ngAfterViewInit() {
    // Ensure the component initializes after Angular finishes rendering
    setTimeout(() => {
      this.initGlide();
    }, 200);
  }

  private initGlide() {
    if (this.glideElement?.nativeElement) {
      // Destroy existing instance before creating a new one
      if (this.glideInstance) {
        this.glideInstance.destroy();
      }

      this.glideInstance = new Glide(this.glideElement.nativeElement, {
        type: 'carousel',
        perView: 3,
        focusAt: 'center',
        breakpoints: {
          800: { perView: 1 },
          1024: { perView: 2 },
        },
      });

      this.glideInstance.mount();
    }
  }

  ngOnDestroy() {
    // Clean up Glide when the component is destroyed
    if (this.glideInstance) {
      this.glideInstance.destroy();
    }
  }
}
