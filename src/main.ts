import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideOwlDateTime,
  provideOwlNativeDateTime,
  provideOwlDateTimeOptions,
  OWL_DATE_TIME_LOCALE
} from '../projects/picker/src/public_api';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    // OwlDateTime provider with native date adapter
    provideOwlDateTime(),
    provideOwlNativeDateTime(),
    // Custom options for multi-year view
    provideOwlDateTimeOptions({
      multiYear: {
        yearRows: 5,
        yearsPerRow: 3
      }
    }),
    // Custom locale
    {
      provide: OWL_DATE_TIME_LOCALE,
      useValue: 'en-US'
    }
  ]
})
