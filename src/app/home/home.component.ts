import { Component, OnInit } from '@angular/core';
import {TitleService} from '../services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.sendTitle('Dashboard');
  }

}
