import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  // Providers and Services
  private readonly http: HttpClient = inject(HttpClient);

  // Constants
  public static readonly BASE_API_URL: URL = new URL(
    "https://dg-server-39118-default-rtdb.europe-west1.firebasedatabase.app"
  );

  // Constructor
  constructor() {
    const usersApi = this.generateApiUrl("/users.json");
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
    newApiUrl.pathname = newApiUrl.pathname + ".json";
    return newApiUrl.toString();
  }

  // --------------------- API Calls ---------------------
  // GET
  public get<Response>(apiPath: string): Observable<Response> {
    return this.http.get<Response>(this.generateApiUrl(apiPath));
  }

  // POST
  public post<Request, Response>(
    apiPath: string,
    body: Request
  ): Observable<Response> {
    return this.http.post<Response>(this.generateApiUrl(apiPath), body);
  }

  // PUT
  public put<Request, Response>(
    apiPath: string,
    body: Request
  ): Observable<Response> {
    return this.http.put<Response>(this.generateApiUrl(apiPath), body);
  }

  // DELETE
  public delete<Response>(apiPath: string): Observable<Response> {
    return this.http.delete<Response>(this.generateApiUrl(apiPath));
  }

  // PATCH
  public patch<Request, Response>(
    apiPath: string,
    body: Request
  ): Observable<Response> {
    return this.http.patch<Response>(this.generateApiUrl(apiPath), body);
  }
}

type ApiUrlType = {
  url: URL;
};
