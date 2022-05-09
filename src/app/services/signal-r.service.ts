import { Injectable } from "@angular/core";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from "@microsoft/signalr";

//import { MessagePackHubProtocol } from "@aspnet/signalr-protocol-msgpack";

@Injectable({
  providedIn: "root"
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

//"http://smartdeliverymiddlewaresignalr.azurewebsites.net/api?userId=order8"

  public startConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(
        "https://iotplatformdapi.azurewebsites.net",
        {
          accessTokenFactory: () => {
            return this.generateAccessToken("123");
          }
        }
      )
      /*  {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets
        }*/

      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection.on("SignalHub", Msg => {
      console.log(Msg);
    });

    this.hubConnection
      .start()
      //.then(() => this.hubConnection.invoke('SendToDriver', 'Hello'));
      .then(() => console.log("Connection started"))
      .catch(err => console.log("Error while starting connection: " + err));
    console.log(this.hubConnection);
  };
  public generateAccessToken(userName) {
    return "token123";
  }
  public addTransferChartDataListener = () => {
    this.hubConnection.on("SignalReceived", Msg => {
      console.log(Msg);
    });
  };
}
