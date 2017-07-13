import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

export class AlertService {
  showAlert = false;
  alertMessage = 'teszt';
  alertSuccess = 'alert-danger';

  alertObservableSubscription: Subscription;

  setAlert(message: string, succes: boolean, startTime = 500, hideTime = 4000) {
    this.alertMessage = message;
    succes ? this.alertSuccess = 'alert-success' : this.alertSuccess = 'alert-danger';
    this.showAlert = true;

    let alertObserver = null;
    const alertObservable = Observable.create((observer: Observer<boolean>) => {
      alertObserver = observer;
      setTimeout(() => {
        observer.next(true);
      }, startTime);
      setTimeout(() => {
        observer.next(false);
      }, hideTime);
    });

    this.alertObservableSubscription = alertObservable.subscribe(
      (bool: boolean) => {
        this.showAlert = bool;
      }
    );

    return alertObserver;
  }
}
