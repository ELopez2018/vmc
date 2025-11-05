import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-base-component',
    template: '',
    styles: [],
    standalone: false
})
export class BaseComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
  protected subs: Subscription = new Subscription()

  addSubscription(sub: Subscription) {
    this.subs.add(sub)
  }
}
