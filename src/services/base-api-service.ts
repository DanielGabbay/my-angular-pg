import { inject } from "@angular/core";
import { ApiService } from "./api.service";
import { ApiName } from "../data/api.types";

export abstract class BaseApiService {
  // Providers and Services:
  protected readonly apiService: ApiService = inject(ApiService);

  constructor(protected readonly apiName: ApiName) {}
}
