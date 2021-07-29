import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserComponent } from './browser/browser.component';
import { ProxyService } from '../services/proxy/proxy.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [BrowserComponent],
})
export class ComponentsModule { }
