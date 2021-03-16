import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SeparatedPanelComponent } from './separated-panel/separated-panel.component';
import { PrefsEditorPanelComponent } from './prefs-editor-panel/prefs-editor-panel.component';
import { TextfieldStepperComponent } from './textfield-stepper/textfield-stepper.component';
import { SwitchComponent } from './switch/switch.component';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    SeparatedPanelComponent,
    PrefsEditorPanelComponent,
    TextfieldStepperComponent,
    SwitchComponent,
    ThemePickerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
