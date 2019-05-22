import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  eventEmitter = new Subject();

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^[a-z0-9]{4,8}')]]
    });
    
    this.eventEmitter
    .pipe(debounceTime(300))
    .subscribe(
      (data) => {
        this.accountService.login(data);
      }
    );
  }

  onsubmit(){
    this.eventEmitter.next({ 
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value  
    });
  }

  ngOnDestroy() {
    this.eventEmitter.unsubscribe();
  }
}
