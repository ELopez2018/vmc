import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Generic } from '../../interfaces/configs.interface';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSearchPublisher$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private showMatspinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor() { }
  public setLoaderSearchPublisher(loading: boolean) {
    this.loaderSearchPublisher$.next(loading)
  }
  public getLoaderSearchPublisher$(): Observable<boolean> {
    return this.loaderSearchPublisher$.asObservable()
  }

  public showMatspinner(){
    this.showMatspinner$.next(true);
  }

  public hideMatspinner(){
    this.showMatspinner$.next(false);
  }

  public getShowMatspinner$(): Observable<boolean> {
    return this.showMatspinner$.asObservable();
  }
}
