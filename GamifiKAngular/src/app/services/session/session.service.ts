import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { CommonService } from '../commonService/common.service';
import { UsersService } from '../userService/users.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  timedOut = false;
  lastPing?: Date = undefined;

  constructor(private idle:Idle, private keepAlive:Keepalive,private common:CommonService,
    private userService:UsersService, private router:Router) { }

  startIdle(){
    this.idle.setIdle(3600); //time to start the idle
    this.idle.setTimeout(7.200); //time to take the user out of the session
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); //interruptions

    this.idle.onIdleEnd.subscribe(()=>{
      this.reset();
    });
    this.idle.onTimeout.subscribe(()=>{
      this.timedOut = true;
      this.userService.logOut();
      this.router.navigate(['']);
    });
    this.idle.onIdleStart.subscribe(()=>{
      this.common.sweetAlertWithOutTimer("warning","Usted esta ausente, la sesion se cerrara pronto.");
    })

    this.keepAlive.interval(900);

    this.keepAlive.onPing.subscribe(() => this.lastPing = new Date());

    this.idle.watch();

  }

  reset(){
    this.idle.watch();
    this.timedOut = false;
  }


  checkIfIdle(){
    return this.idle.isIdling();
  }
  isTimeOut(){
    return this.timedOut;
  }
}
