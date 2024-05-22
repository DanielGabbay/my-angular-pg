import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { BaseApiService } from "./base-api-service";
import { ApiName } from "../data/api.types";

@Injectable({
  providedIn: "root",
})
export class UsersService extends BaseApiService {
  // Constructor:
  constructor() {
    super(ApiName.Users);
  }
}
