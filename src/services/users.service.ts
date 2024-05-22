import { inject, Injectable, Injector } from "@angular/core";
import { ApiService } from "./api.service";
import { ApiName } from "../data/api.types";
import { Observable } from "rxjs";
import { UserEntity } from "../data/user.type";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  readonly apiService: ApiService = inject(ApiService);
  public readonly apiName: ApiName = ApiName.Users;

  // Constructor:
  constructor(private injector: Injector) {}

  // Methods:
  public getAllUsers(): Observable<UserEntity[]> {
    return this.apiService.get<UserEntity>(this.apiName);
  }
}
