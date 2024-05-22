import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { mockArrayToIterate } from "../../../utils/glob-fns";
import { UsersService } from "../../../services/users.service";

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
  protected readonly usersService: UsersService = inject(UsersService);

  // Constants:
  protected _mockArrToIter = mockArrayToIterate(5000);

  // Data:

  // Constructor:
  constructor() {}

  // Methods:
  ngOnInit(): void {
    debugger;

    // this.usersService.getAllUsers().subscribe((users) => {
    //   console.log(users);
    //   debugger;
    // });
  }
}
