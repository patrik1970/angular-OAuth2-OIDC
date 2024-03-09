import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './oauth.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private oauthService: OAuthService ){
    this.configureOauthService();
  }

  configureOauthService(){
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    //this.oauthService.loadDiscoveryDocumentAndLogin(); //For direct login uncomment this line 
    this.oauthService.loadDiscoveryDocumentAndTryLogin();  
  }

  //For direct login comment out from HERE
  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }
  //To HERE

  get token(){
    let claims:any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;   
  }

}
