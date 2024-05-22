import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';

export const AppConfig: ApplicationConfig = {
  providers: [provideHttpClient(), importProvidersFrom()],
};
