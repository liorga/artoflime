import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  category: 'residential' | 'commercial' | 'heritage';
}

type ViewMode = 'carousel' | 'grid';

@Component({
  selector: 'app-custom-gallery',
  templateUrl: './custom-gallery.component.html',
  styleUrls: ['./custom-gallery.component.scss'],
})
export class CustomGalleryComponent implements OnInit {
  @ViewChild('galleryGrid', { static: false }) galleryGrid!: ElementRef;

  images: GalleryImage[] = [
    {
      src: 'assets/images/artoflime0.jpg',
      alt: 'Art of Lime project 1',
      category: 'heritage',
    },
    {
      src: 'assets/images/artoflime1.jpeg',
      alt: 'Art of Lime project 2',
      category: 'heritage',
    },
    {
      src: 'assets/images/artoflime2.jpeg',
      alt: 'Art of Lime project 3',
      category: 'commercial',
    },
    {
      src: 'assets/images/artoflime3.jpeg',
      alt: 'Art of Lime project 4',
      category: 'residential',
    },
    {
      src: 'assets/images/artoflime4.jpeg',
      alt: 'Art of Lime project 5',
      category: 'heritage',
    },
    {
      src: 'assets/images/artoflime5.jpeg',
      alt: 'Art of Lime project 6',
      category: 'commercial',
    },
    {
      src: 'assets/images/artoflime6.jpeg',
      alt: 'Art of Lime project 7',
      category: 'residential',
    },
    {
      src: 'assets/images/artoflime7.jpeg',
      alt: 'Art of Lime project 8',
      category: 'heritage',
    },
    {
      src: 'assets/images/artoflime8.jpeg',
      alt: 'Art of Lime project 9',
      category: 'commercial',
    },
    {
      src: 'assets/images/artoflime9.jpeg',
      alt: 'Art of Lime project 10',
      category: 'commercial',
    },
  ];

  selectedImage: GalleryImage | null = null;
  filteredImages: GalleryImage[] = [];
  viewMode: ViewMode = 'carousel';
  currentImageIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.filteredImages = this.images;
    this.setupMobileScrollProtection();
  }

  private setupMobileScrollProtection(): void {
    // Prevent mobile gallery scroll from affecting main page scroll
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        if (this.galleryGrid && this.galleryGrid.nativeElement) {
          const gridElement = this.galleryGrid.nativeElement;
          gridElement.style.overscrollBehavior = 'contain';
          gridElement.style.touchAction = 'pan-y';
        }
      }, 100);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.selectedImage) {
      // Lightbox navigation
      switch (event.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.previousImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.nextImage();
          break;
      }
    } else if (this.viewMode === 'carousel') {
      // Carousel navigation
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          this.previousCarouselImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.nextCarouselImage();
          break;
      }
    }
  }

  // View Mode Management
  setViewMode(mode: ViewMode): void {
    this.viewMode = mode;
    // Re-setup mobile protection when switching modes
    this.setupMobileScrollProtection();
  }

  // Carousel Navigation
  nextCarouselImage(): void {
    if (this.filteredImages.length > 0) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.filteredImages.length;
    }
  }

  previousCarouselImage(): void {
    if (this.filteredImages.length > 0) {
      this.currentImageIndex =
        this.currentImageIndex === 0
          ? this.filteredImages.length - 1
          : this.currentImageIndex - 1;
    }
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex = index;
  }

  // Lightbox Management
  openLightbox(image: GalleryImage): void {
    this.selectedImage = image;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.selectedImage = null;
    document.body.style.overflow = 'auto';
  }

  nextImage(): void {
    if (!this.selectedImage) return;

    const currentIndex = this.filteredImages.findIndex(
      (img) => img === this.selectedImage
    );
    const nextIndex = (currentIndex + 1) % this.filteredImages.length;
    this.selectedImage = this.filteredImages[nextIndex];
  }

  previousImage(): void {
    if (!this.selectedImage) return;

    const currentIndex = this.filteredImages.findIndex(
      (img) => img === this.selectedImage
    );
    const prevIndex =
      currentIndex === 0 ? this.filteredImages.length - 1 : currentIndex - 1;
    this.selectedImage = this.filteredImages[prevIndex];
  }
}
