import { Injectable, inject } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { ApiName } from "../data/api.types";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  public readonly apiName: ApiName;
  // Providers and Services
  private readonly db: AngularFireDatabase = inject(AngularFireDatabase);

  // Constants
  public static readonly BASE_API_URL: URL = new URL(
    "https://dg-server-39118-default-rtdb.europe-west1.firebasedatabase.app"
  );

  // Constructor
  constructor() {}

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

  // Methods:

  // GET: Get all items of the specified type from the database.
  public get<T>(apiName: ApiName): Observable<T[]> {
    return this.db.list<T>(apiName).valueChanges();
  }

  // POST: Add the item to the database. Throws an error if the item already exists.
  public post<T>(apiName: ApiName, item: T): Observable<T> {
    // Get the id of the item
    const id = item["id"];
    if (!id) {
      throw new Error("Item does not have an id.");
    }

    return new Observable((observer) => {
      this.db
        .list<T>(apiName)
        .set(id, item)
        .then(() => {
          observer.next(item);
        });
    });
  }

  // PUT: Update the item in the database. Throws an error if the item does not exist.
  public put<T>(apiName: ApiName, item: T): Observable<T> {
    // Get the id of the item
    const id = item["id"];
    if (!id) {
      throw new Error("Item does not have an id.");
    }

    return new Observable((observer) => {
      this.db
        .list<T>(apiName)
        .update(id, item)
        .then(() => {
          observer.next(item);
        });
    });
  }

  // DELETE: Delete the item from the database. Throws an error if the item does not exist.
  public delete<T>(apiName: ApiName, item: T): Observable<T> {
    // Get the id of the item
    const id = item["id"];
    if (!id) {
      throw new Error("Item does not have an id.");
    }

    return new Observable((observer) => {
      this.db
        .list<T>(apiName)
        .remove(id)
        .then(() => {
          observer.next(item);
        });
    });
  }
}

type ApiUrlType = {
  url: URL;
};
