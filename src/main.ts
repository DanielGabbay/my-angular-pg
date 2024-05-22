import { Component, Injector } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import "zone.js";
import { FormsModule } from "@angular/forms";
import { SignalsPlaygroundComponent } from "./features/signal_tests_ext/signals-playground/signals-playground.component";
import { AppConfig } from "./app.config";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FormsModule, SignalsPlaygroundComponent],
  templateUrl: "./main.html",
  styleUrl: "./main.scss",
})
export class App {
  name = "Angular PG";

  constructor() {}
}
export let MainInjector: Injector = null;
bootstrapApplication(App, AppConfig).then((app) => {
  MainInjector = app.injector;
});
