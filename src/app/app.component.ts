import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client';
import swal from 'sweetalert2'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  private _hubConnection: HubConnection;
  isClick=false;
  ismif=false;
  nick = 'אלמוני';
  message = '';
  messages: string[] = [];

  public sendMessage(): void {
    this._hubConnection
      .invoke('sendToAll', this.nick, this.message)
      .catch(err => console.error(err));
  }
  open()
  {
    
  }
  mifrat()
  {
    if(this.ismif==true)
    {
      this.ismif=false;
      return;
    }
  }
  con() {
    if(this.isClick==true)
    {
      this.isClick=false;

      return;
    }
 swal({
     
      title: ':הכנס את שמך',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: false,
      confirmButtonText: 'שלח',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        if(login)
        this.nick=login;
        else
        this.nick='אלמוני';
        this.isClick=true;
      },
    });

    this._hubConnection = new HubConnection('http://localhost:5000/chat');
    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

      this._hubConnection.on('sendToAll', (nick: string, receivedMessage: string) => {
        const text = `${nick}: ${receivedMessage}`;
        this.messages.push(text);
      });

    }
}
