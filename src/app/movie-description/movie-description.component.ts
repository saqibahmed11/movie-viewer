import { Component, Input } from '@angular/core';
import { Ratings } from "../Ratings";

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.css']
})

export class MovieDescriptionComponent {
  @Input() filmDetails:
    {
      title: string,
      opening_crawl: string,
      director: string,
      poster: string,
      ratings: Ratings[]
    } =
    {
      title: '',
      opening_crawl: '',
      director: '',
      poster: '',
      ratings: []
    };

  public formatRating(rating: Ratings): string {
    if (rating.Source === 'Rotten Tomatoes') {
      return `${rating.Source}: ${rating.Value}`;
    } else if (rating.Source === 'Internet Movie Database' || rating.Source === 'Metacritic') {
      const [numeratorStr, denominatorStr] = rating.Value.split('/');
      const numerator = parseFloat(numeratorStr);
      const denominator = parseFloat(denominatorStr);
      if (denominator !== 0) {
        const result = Math.floor((numerator / denominator) * 100);
        if (!isNaN(result)) {
          return `${rating.Source}: ${result}%`;
        }
      }
    }
    return `${rating.Source}: N/A`;
  }

  public averageRating() {
    let totalRating = 0;
    let ratingCount = 0;

    for (const rating of this.filmDetails.ratings) {
      const formattedRating = this.formatRating(rating);
      const value = parseFloat(formattedRating.split(':')[1].trim());

      if (!isNaN(value)) {
        totalRating += value;
        ratingCount++;
      }
    }

    if (ratingCount > 0) {
      return Math.floor(totalRating / ratingCount);
    } else {
      return 0;
    }
  }

  public getStarCount(): number[] {
    const maxStars = 10;
    const average = this.averageRating();
    const starFraction = average / 100;
    const filledStarCount = Math.round(starFraction * maxStars);
    const stars: number[] = [];

    for (let i = 0; i < maxStars; i++) {
      if (i < filledStarCount) {
        stars.push(1);
      } else {
        stars.push(0);
      }
    }
    return stars;
  }
}
