import { Subject } from 'rxjs';

export class UIService {
  loadingStateChanged = new Subject<boolean>();
}
