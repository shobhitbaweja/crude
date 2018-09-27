
import { Component, OnInit, AfterViewInit } from '@angular/core';
import {formatDate } from '@angular/common';
import {HttpClient, HttpHeaders } from '@angular/common/http';
// import { Upstox } from './../../up_module/upstox/lib/src/UpstoxAPI';

const Upstox = require ('upstox');

declare var params: {
  'apiSecret': 'MODM7ggMdn3wHEe0wEFSe34K4ZFBDF6V4ud90czr',
  'code': '9aae99914da0cb1f72eb9e892d7af2c5c52ac500',
  'redirect_uri': 'http://localhost:4200/'
};

const upstox = new Upstox('MODM7ggMdn3wHEe0wEFSe34K4ZFBDF6V4ud90czr');
let title = 'user';
let token = 'tk';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) { }
  stitle = 'crude';  cprice: number;  call = 'sell'; calloptions = ['buy', 'sell'];
  trigger_span: number;  trigger: number;  today = new Date();  lastTime: any;
  my_price: number; temp_price: number;  my_set_trigger: number;  my_set_trigger_span: number;
  upstox_code: any;  params: any;  upstox_token = 'na';
  code: string;


  ngOnInit(): void {

    /*

   this.upstox = new Upstox('MODM7ggMdn3wHEe0wEFSe34K4ZFBDF6V4ud90czr');

   const upstox = require('upstox');
   const upstox = new Upstox('MODM7ggMdn3wHEe0wEFSe34K4ZFBDF6V4ud90czr');
   const loginURL = upstox.getLoginUri('http://upstox.com:3000');*/

   this.code = new URLSearchParams(window.location.search).get('code');


    this.cprice = 1234;
    this.trigger_span = 5;

    if (this.call === 'buy') {
      this.stepUp();
    }
    if (this.call === 'sell') {
      this.stepDown();
    }
    this.lastTime = formatDate(this.today, 'hh:mm:ss a', 'en-US', '+0530');

    this.my_price = this.cprice;
    this.temp_price = this.cprice;
    this.my_set_trigger = this.trigger;
    this.my_set_trigger_span = 0;
    this.setUpstox();
  }

  setUpstox() {
  //  const code = new URLSearchParams(window.location.search).get('code');
    // console.log(code);

 this.params = {'apiSecret': 'ifj1qcpl9c', 'code': this.code, 'redirect_uri': 'http://localhost:4200/'};

 // console.log(this.params);

  let accessToken = '';

     upstox.getAccessToken(this.params)
     .then(function(response) {
     //  console.log(response.access_token);
       accessToken = response.access_token;
     //  console.log('l-' + accessToken);
       upstox.setToken(accessToken);
       token = accessToken;
     })
     .catch(function(err) {
         // handle error
         console.log('le-' + accessToken);
         console.log('err ' + err);
     });

    // upstox.setToken(accessToken);

    // this.showContract();

  }

  ngAfterViewInit() {
    console.log('fully loaded');


    setTimeout(() => {

      if ( this.code == null || token === 'tk') {
        window.location.href = upstox.getLoginUri('http://localhost:4200/');
      }

      console.log('running');
      
      upstox.setToken(token);
     // this.getBalance();
     this.getPosition();
     this.getProfile();
     this.saveToken(token, title);
    // this.showContract();
 }, 1000);

   // this.showContract();
   // upstox = new Upstox('MODM7ggMdn3wHEe0wEFSe34K4ZFBDF6V4ud90czr');


    httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200/');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,cotent-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
/*

    console.log('https://api.upstox.com/index/oauth/token'+'{"api_key":"MODM7ggMdn3wHEe0wEFSe34K4ZFBDF6V4ud90czr", "code" : "'+ this.code +'", "grant_type" : "authorization_code", "redirect_uri" : "http://localhost:4200/"}');
       // tslint:disable-next-line:max-line-length
       return this.http.post('https://api.upstox.com/index/oauth/token', '{"api_key":"MODM7ggMdn3wHEe0wEFSe34K4ZFBDF6V4ud90czr", "code" : "' + this.code + '", "grant_type" : "authorization_code", "redirect_uri" : "http://localhost:4200/"}', httpOptions)
       .subscribe(data => {
         console.log('got_it', data);
       });*/

       //  return this.http.post('https://api.upstox.com/index/oauth/token', '{"x-api_key":"MODM7ggMdn3wHEe0wEFSe34K4ZFBDF6V4ud90czr", "code" : "{9aae99914da0cb1f72eb9e892d7af2c5c52ac500}", "grant_type" : "authorization_code", "redirect_uri" : "{http://localhost:4200/}"}', httpOptions)
  }

 saveToken(mytoken, mytitle): void {
    this.upstox_token = mytoken;
    this.stitle = mytitle;
    console.log(mytoken + '-' + mytitle);
  }

  getBalance() {
    upstox.getBalance({'type': 'commodity'})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      //  done();
      console.log(error);
    });
  }

  getPosition() {
    upstox.getPositions()
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      //  done();
      console.log(error);
    });
  }

  getProfile() {
    let st_title = '';
    upstox.getProfile()
    .then(function (response) {
      st_title = response.data.name;
      title = st_title;
    })
    .catch(function (error) {
      //  done();
      console.log(error);
    });

    setTimeout(() => {
      this.saveToken(token, title);
      this.showContract();
     // this.setSocket();
    }, 1000 );

  }

   showContract() {
   // console.log(upstox.getLoginUri('http://localhost:4200/'));
   
    upstox.getMasterContract({exchange: 'mcx_fo'})
    .then(function(response) {
        console.log(response.data);
    })
    .catch(function(err) {
        console.log(err);
    });

  }

  setSocket() {
    upstox.connectSocket()
    .then(function() {
        // Socket Connection successfull
        // Now you can setup listeners
        upstox.on("orderUpdate", function(message) {
            //message for order updates
        });
        upstox.on("positionUpdate", function(message) {
            //message for position conversion
        });
        upstox.on("tradeUpdate", function(message) {
            //message for trade updates
        });
        upstox.on("liveFeed", function(message) {
            //message for live feed

            console.log( 'websocket message' + message);
        });
        upstox.on("disconnected", function(message) {
            //listener after socket connection is disconnected
        });
        upstox.on("error", function(error) {
            //error listener
            console.log( 'websocket' + error);
        });
        //You can call upstox.closeSocket() to disconnect
    }).catch(function(err) {
        // Something went wrong.
        console.log( 'websocket err' + err);
    });
  }

  callChecker() {

    if (this.call === 'buy') {
      this.stepUp();
    }
    if (this.call === 'sell') {
      this.stepDown();
    }
    this.lastTime = formatDate(this.today, 'hh:mm:ss a', 'en-US', '+0530');

    this.temp_price = this.cprice;
  }


  stepUp() {
    this.trigger = (this.cprice) - (this.trigger_span);
    if (this.cprice > this.my_price  && this.cprice > this.temp_price) {
        this.my_set_trigger = this.my_set_trigger + this.my_set_trigger_span;
        if (this.my_set_trigger_span < 2 && this.cprice > this.my_set_trigger) {
            this.my_set_trigger_span = this.my_set_trigger_span + 1;
          } else {
            this.my_set_trigger_span = 0;
          }

      } else {
        if (this.cprice > this.my_set_trigger) {
            this.my_set_trigger_span = 1;
            this.my_set_trigger = this.my_set_trigger + this.my_set_trigger_span;
          } else {
            this.my_set_trigger_span = 0;
          }

      }


  }

  stepDown() {
    this.trigger = (this.cprice) + (this.trigger_span);
    if (this.cprice < this.my_price  && this.cprice < this.temp_price) {
      this.my_set_trigger = this.my_set_trigger - this.my_set_trigger_span;
      if (this.my_set_trigger_span < 2 && this.cprice < this.my_set_trigger) {
          this.my_set_trigger_span = this.my_set_trigger_span + 1;
        } else {
          this.my_set_trigger_span = 0;
        }

    } else {
      if (this.cprice < this.my_set_trigger) {
          this.my_set_trigger_span = 1;
          this.my_set_trigger = this.my_set_trigger - this.my_set_trigger_span;
        } else {
          this.my_set_trigger_span = 0;
        }

    }
  }


}
