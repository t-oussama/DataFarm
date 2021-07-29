import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { ProxyService } from '../../services/proxy/proxy.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {
  public url = 'https://appear.in';
  public iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

  @ViewChild('iframe') iframe: ElementRef;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    window.addEventListener('message', this.handleMessage.bind(this), false);
  }

  handleMessage(event) {
    if (typeof(event.data) === 'string') {
      const message = JSON.parse(event.data);
      switch (message.type) {
           case 'location_update':
              // this.pushNavigationLocation(message.data);
              this.url = message.data;
              break;
      }
    }
  }

  goBack() {
    this.iframe.nativeElement.contentWindow.postMessage(JSON.stringify({type: 'go_back', data: null}), '*');
  }

  goForward() {
    this.iframe.nativeElement.contentWindow.postMessage(JSON.stringify({type: 'go_forward', data: null}), '*');
  }

  onUrlSubmit() {
    // this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.proxyService.getProxyRequestURL(this.url));
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    console.log('this.url', this.url);
  }
}
