import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Providers and Services
  private readonly http: HttpClient = inject(HttpClient);

  // Constants
  public static readonly BASE_API_URL: URL = new URL(
    'https://dg-server-39118-default-rtdb.europe-west1.firebasedatabase.app'
  );
  // Constructor
  constructor() {
    const usersApi = this.generateApiUrl('/users.json');
    console.log(usersApi);
  }

  public generateApiUrl(apiPath: string): string {
    // Ensure that the apiPath does not start with a '/' and does not end with '/' or '.json'
    const matchApiPath = apiPath.match(/^\/?(.*?)(\.json)?\/?$/);
    if (matchApiPath) {
      // Clean up the apiPath by removing leading '/', trailing '/' and '.json'
      const cleanedApiPath = matchApiPath[1];
      apiPath = cleanedApiPath;
    }

    const newApiUrl = new URL(ApiService.BASE_API_URL);
    newApiUrl.pathname = newApiUrl.pathname + apiPath;
    // beacuse we are using firebase we need to add .json to the end of the url
    newApiUrl.pathname = newApiUrl.pathname + '.json';
    return newApiUrl.toString();
  }
}

type ApiUrlType = {
  url: URL;
};
