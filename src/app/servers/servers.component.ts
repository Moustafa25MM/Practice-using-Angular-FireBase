import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  allowNewServer = false;
  myServer = 'No Server was created';
  constructor(){
    setTimeout(()=>{
        this.allowNewServer = true;
    },3000)
  }
  onCreateServer(){
    this.myServer = "My Server was Created";
  }
  onUpdateServerName(event:Event){
    this.myServer = (<HTMLInputElement>event.target).value;
  }
}
