import { provideHttpClient } from "@angular/common/http";
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "./environments/environment";

export const AppConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),

    importProvidersFrom(
      BrowserModule,
      AngularFireModule.initializeApp(environment.firebaseConfig)
    ),
  ],
};
