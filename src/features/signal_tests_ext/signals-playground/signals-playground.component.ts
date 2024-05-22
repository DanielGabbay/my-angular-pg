import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { mockArrayToIterate } from "../../../utils/glob-fns";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-signals-playground",
  standalone: true,
  imports: [],
  templateUrl: "./signals-playground.component.html",
  styleUrl: "./signals-playground.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsPlaygroundComponent implements OnInit {
  // Services:
  protected readonly apiService: ApiService = inject(ApiService);

  // Constants:
  protected _mockArrToIter = mockArrayToIterate(5000);

  // Data:

  // Constructor:
  constructor() {}

  // Methods:
  ngOnInit(): void {}
}
