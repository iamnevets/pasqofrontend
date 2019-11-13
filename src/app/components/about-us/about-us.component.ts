import { Component, OnInit } from '@angular/core';
import { faEnvelope, faPhone, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { HomePageService } from '../home-page/home-page.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faHeart = faHeart;

  constructor(private homePageService: HomePageService) {
    this.homePageService.isHome = true;
  }

  ngOnInit() {
  }

}
