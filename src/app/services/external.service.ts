import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

getURL() {
  return 'http://localhost:52281/';
}

  constructor() { }
}
