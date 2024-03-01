import { Component, OnInit } from '@angular/core';
import { WelcomeService } from '../../welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(public welcomeService: WelcomeService) {}
  data: string = '';
  ngOnInit(): void {
    this.welcomeService.getWelcomeMessage().subscribe((data: any) => {
      console.log(data);
      this.data = data;
    });
  }
}
