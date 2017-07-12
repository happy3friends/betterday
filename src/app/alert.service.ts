import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

export class AlertService {
  showAlert = false;
  alertMessage = 'teszt';
  alertSuccess = 'alert-danger';

  alertObservableSubscription: Subscription;

  setAlert(message: string, succes: boolean) {
    this.alertMessage = message;
    succes ? this.alertSuccess = 'alert-success' : this.alertSuccess = 'alert-danger';
    this.showAlert = true;

    const alertObservable = Observable.create((observer: Observer<boolean>) => {
      setTimeout(() => {
        observer.next(true);
      }, 500);
      setTimeout(() => {
        observer.next(false);
      }, 4000);
    });

    this.alertObservableSubscription = alertObservable.subscribe(
      (bool: boolean) => {
        this.showAlert = bool;
      }
    );
  }
}
