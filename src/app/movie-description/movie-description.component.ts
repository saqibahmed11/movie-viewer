import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.css']
})
export class MovieDescriptionComponent {
  @Input() filmDetails: { title: string, opening_crawl: string, director: string } = { title: '', opening_crawl: '', director: '' };

}
