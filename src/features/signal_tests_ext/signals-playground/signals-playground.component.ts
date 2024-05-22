import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { mockArrayToIterate } from '../../../utils/glob-fns';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-signals-playground',
  standalone: true,
  imports: [],
  templateUrl: './signals-playground.component.html',
  styleUrl: './signals-playground.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsPlaygroundComponent {
  // Services:
  protected readonly apiService: ApiService = inject(ApiService);

  // ----------
  protected _mockArrToIter = mockArrayToIterate(5000);
  // -----------
  state = signal({
    user: {
      firstName: 'chau',
      lastName: 'tran',
    },
  });

  constructor() {}
}
