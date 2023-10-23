import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { Apollo } from 'apollo-angular';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [Apollo] });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
