import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  EmailService,
  ContactFormData,
} from '../../../core/services/email.service';

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
  isMobileMenuOpen = false; // Mobile menu state
  sections = [
    { label: 'Home' },
    { label: 'About' },
    { label: 'Projects' },
    { label: 'Contact' },
  ];

  // Contact form
  contactForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';

  private sectionElements: ElementRef[] = [];

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private cdr: ChangeDetectorRef
  ) {
    // Initialize contact form
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.isMobileMenuOpen) return;

    const target = event.target as Element;
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburgerBtn = document.querySelector('.hamburger-btn');

    // If click is outside the menu and not on the hamburger button, close menu
    if (
      mobileMenu &&
      hamburgerBtn &&
      !mobileMenu.contains(target) &&
      !hamburgerBtn.contains(target)
    ) {
      this.closeMobileMenu();
    }
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
    // Disable keyboard navigation on mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile || this.isScrolling) return;

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

  // Touch events for mobile - make less aggressive
  private touchStartY = 0;
  private touchEndY = 0;
  private isMobile = false;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.changedTouches[0].screenY;
    this.isMobile = true;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    this.touchEndY = event.changedTouches[0].screenY;

    // Allow touch navigation but with much higher threshold on mobile
    if (!this.isInGallerySection(event)) {
      this.handleSwipe();
    }
  }
  private isInGallerySection(event: TouchEvent): boolean {
    // Check if the touch event originated from within the gallery section
    const target = event.target as Element;
    return (
      target?.closest('.gallery-section') !== null ||
      target?.closest('.gallery-grid') !== null ||
      target?.closest('.custom-gallery') !== null
    );
  }

  private isInAboutSection(event: TouchEvent): boolean {
    // Check if the touch event originated from within the about section
    const target = event.target as Element;
    return target?.closest('.about-section') !== null;
  }

  private handleSwipe(): void {
    if (this.isScrolling) return;

    // Much higher threshold on mobile for less aggressive navigation
    const isMobile = window.innerWidth <= 768;
    const baseThreshold = isMobile ? 200 : 50; // Very high threshold on mobile
    const diff = this.touchStartY - this.touchEndY;

    if (Math.abs(diff) > baseThreshold) {
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
    if (index === this.activeSection) {
      return;
    }

    // Don't prevent scrolling if it's manual navigation
    this.isScrolling = true;
    this.activeSection = index;

    const targetElement = this.sectionElements[index];

    if (targetElement) {
      // Always use smooth scrolling for manual navigation
      targetElement.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Reset scrolling flag after animation
      setTimeout(() => {
        this.isScrolling = false;
      }, 1000); // Longer timeout to ensure smooth completion
    } else {
      console.error('Target element not found for index:', index);
    }
  }

  // Mobile menu methods
  toggleMobileMenu(event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Manually trigger change detection
    this.cdr.detectChanges();
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.cdr.detectChanges();
  }

  navigateToSection(index: number): void {
    // Close menu first, then navigate
    this.closeMobileMenu();

    // Add a small delay to ensure menu closes before scrolling
    setTimeout(() => {
      this.scrollToSection(index);
    }, 100);
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
    // Cleanup: restore body scroll
    document.body.style.overflow = 'auto';
  }

  private updateScrollProgress(): void {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    this.scrollProgress = (winScroll / height) * 100;
  }

  // Contact form methods
  onSubmitContactForm(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitMessage = '';

      const formData: ContactFormData = this.contactForm.value;

      this.emailService.sendEmail(formData).subscribe({
        next: (response) => {
          this.submitMessage =
            "Thank you! Your message has been sent successfully. We'll get back to you soon.";
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error sending email:', error);
          this.submitMessage =
            'Sorry, there was an error sending your message. Please try again or contact us directly.';
          this.isSubmitting = false;
        },
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach((key) => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  // Helper method to check if a form field has an error
  hasFormError(fieldName: string, errorType: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.hasError(errorType) && field.touched : false;
  }

  // Helper method to get form field
  getFormField(fieldName: string) {
    return this.contactForm.get(fieldName);
  }
}
