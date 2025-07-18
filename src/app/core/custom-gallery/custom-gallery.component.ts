import { Component, OnInit, HostListener } from '@angular/core';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  category: 'before' | 'after';
}

@Component({
  selector: 'app-custom-gallery',
  templateUrl: './custom-gallery.component.html',
  styleUrls: ['./custom-gallery.component.scss'],
})
export class CustomGalleryComponent implements OnInit {
  images: GalleryImage[] = [
    {
      src: 'assets/images/IMG_0150.jpg',
      alt: 'Art transformation before',
      title: 'Living Room - Before',
      category: 'before',
    },
    {
      src: 'assets/images/IMG_0840.jpg',
      alt: 'Art transformation after',
      title: 'Living Room - After',
      category: 'after',
    },
    {
      src: 'assets/images/IMG_4362.jpg',
      alt: 'Bedroom transformation before',
      title: 'Bedroom - Before',
      category: 'before',
    },
    {
      src: 'assets/images/IMG_4589.jpg',
      alt: 'Bedroom transformation after',
      title: 'Bedroom - After',
      category: 'after',
    },
  ];

  selectedImage: GalleryImage | null = null;
  filteredImages: GalleryImage[] = [];
  activeFilter: 'all' | 'before' | 'after' = 'all';

  constructor() {}

  ngOnInit(): void {
    this.filteredImages = this.images;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.selectedImage) return;

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
  }

  filterImages(category: 'all' | 'before' | 'after'): void {
    this.activeFilter = category;

    if (category === 'all') {
      this.filteredImages = this.images;
    } else {
      this.filteredImages = this.images.filter(
        (img) => img.category === category
      );
    }
  }

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
