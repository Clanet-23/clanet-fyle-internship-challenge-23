import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Repository } from './services/repository.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  username: string = '';
  repositories: Repository[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  onFormSubmit(event: Event) {
    event.preventDefault();
    this.apiService.getUserRepositories(this.username).subscribe(
      (data: Repository[]) => {
        this.repositories = data;
        this.errorMessage = '';
      },
      (error: any) => {
        this.repositories = [];
        this.errorMessage = error.message;
      }
    );
  }

  openGitHubProfile(username: string) {
    window.open('https://github.com/${username}', '_blank');
  }

  openGitHubRepository(repoUrl: string) {
    window.open(repoUrl, '_blank');
  }
}