import {Component, OnInit, OnDestroy} from '@angular/core';
import {TitleService} from './services/title.service';
import {Subscription} from 'rxjs/Subscription';
import {AppUserApi} from './shared/sdk/services/custom/AppUser';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  location: any;
  title: any;
  subscription: Subscription;

  public constructor(private titleService: TitleService,
                     private router: Router) {

    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.location = event.url.split('/')[1];
      }
    });

    // subscribe to home component messages
    this.subscription = this.titleService.getTitle().subscribe(title => {
      this.title = title.text;
    });

  }

  ngOnInit(): void {
  }


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
