import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registerForm: FormGroup
  eventEmitter = new Subject();

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^[a-z0-9]{4,8}')]]
    });
    
    this.eventEmitter
    .pipe(debounceTime(300))
    .subscribe( 
      (data) => {
        this.accountService.register(data);
      }
    );
  }

  onSubmit(){
    this.eventEmitter.next({ 
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value  
    });
  }

  ngOnDestroy() {
    this.eventEmitter.unsubscribe();
  }
}
