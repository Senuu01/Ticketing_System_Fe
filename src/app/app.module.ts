import { NgModule } from '@angular/core';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {AppComponent} from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
    // No declarations needed for standalone components
  ],
  providers: []
})
export class AppModule {}


bootstrapApplication(AppComponent, {
  providers: []
});

