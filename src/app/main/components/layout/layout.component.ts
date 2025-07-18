import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('fullPageContainer') fullPageContainer!: ElementRef;
  @ViewChild('section0') section0!: ElementRef;
  @ViewChild('section1') section1!: ElementRef;
  @ViewChild('section2') section2!: ElementRef;
  @ViewChild('section3') section3!: ElementRef;

  activeSection = 0;
  isScrolling = false;
  isLoading = true;
  scrollProgress = 0;
  sections = [
    { label: 'Home' },
    { label: 'About' },
    { label: 'Projects' },
    { label: 'Contact' },
  ];

  private sectionElements: ElementRef[] = [];

  constructor() {}

  ngOnInit(): void {
    // Don't prevent scrolling - let it work naturally

    // Simulate loading time for better UX
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  ngAfterViewInit(): void {
    this.sectionElements = [
      this.section0,
      this.section1,
      this.section2,
      this.section3,
    ];
    this.setupIntersectionObserver();
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    // Don't interfere with normal scrolling, just let the browser handle it
    // The scroll-snap CSS will take care of snapping to sections
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.updateScrollProgress();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isScrolling) return;

    switch (event.key) {
      case 'ArrowDown':
      case 'PageDown':
        event.preventDefault();
        this.nextSection();
        break;
      case 'ArrowUp':
      case 'PageUp':
        event.preventDefault();
        this.previousSection();
        break;
      case 'Home':
        event.preventDefault();
        this.scrollToSection(0);
        break;
      case 'End':
        event.preventDefault();
        this.scrollToSection(this.sections.length - 1);
        break;
    }
  }

  // Touch events for mobile
  private touchStartY = 0;
  private touchEndY = 0;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.changedTouches[0].screenY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    this.touchEndY = event.changedTouches[0].screenY;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    if (this.isScrolling) return;

    const swipeThreshold = 50;
    const diff = this.touchStartY - this.touchEndY;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped up (scroll down)
        this.nextSection();
      } else {
        // Swiped down (scroll up)
        this.previousSection();
      }
    }
  }

  nextSection(): void {
    if (this.activeSection < this.sections.length - 1) {
      this.scrollToSection(this.activeSection + 1);
    }
  }

  previousSection(): void {
    if (this.activeSection > 0) {
      this.scrollToSection(this.activeSection - 1);
    }
  }

  scrollToSection(index: number): void {
    if (this.isScrolling || index === this.activeSection) return;

    this.isScrolling = true;
    this.activeSection = index;

    const targetElement = this.sectionElements[index];
    if (targetElement) {
      // Use native scrollIntoView for better compatibility
      targetElement.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Reset scrolling flag after animation
      setTimeout(() => {
        this.isScrolling = false;
      }, 800);
    }
  }

  private snapToNearestSection(): void {
    if (this.isScrolling) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const currentSection = Math.round(scrollTop / windowHeight);

    if (
      currentSection !== this.activeSection &&
      currentSection >= 0 &&
      currentSection < this.sections.length
    ) {
      this.scrollToSection(currentSection);
    }
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionIndex = this.sectionElements.findIndex(
            (section) => section.nativeElement === entry.target
          );
          if (sectionIndex !== -1 && !this.isScrolling) {
            this.activeSection = sectionIndex;
          }
        }
      });
    }, options);

    this.sectionElements.forEach((section) => {
      observer.observe(section.nativeElement);
    });
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  private updateScrollProgress(): void {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    this.scrollProgress = (winScroll / height) * 100;
  }
}
