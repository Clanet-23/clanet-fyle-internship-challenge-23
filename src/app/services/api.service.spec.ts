import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user repositories', () => {
    const username = 'Clanet-23';
    const mockResponse = [{ name: 'Repo 1' }, { name: 'Repo 2' }];

    service.getUserRepositories(username).subscribe(repos => {
      expect(repos).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://api.github.com/users/${username}/repos');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
});
