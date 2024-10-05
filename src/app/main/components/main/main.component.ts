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
  isExpanded = false;
  isSmallScreen = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
        this.cdr.detectChanges(); // Manually trigger change detection
      });
  }

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.sidenav.open();
    } else {
      this.sidenav.close();
    }
  }

  closeSidenav() {
    this.sidenav.close();
    this.isExpanded = false;
  }

  ngOnInit(): void {}
}
