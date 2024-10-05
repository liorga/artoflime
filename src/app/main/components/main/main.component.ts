import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  isSmallScreen = false; // Add this to track small screen

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .subscribe((result) => {
        this.isSmallScreen = result.matches; // Update based on screen size

        this.cdr.detectChanges(); // Manually trigger change detection
      });
  }

  ngOnInit(): void {}

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  closeSidenav() {
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }
}
