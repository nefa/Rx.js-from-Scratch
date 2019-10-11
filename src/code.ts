import { observable, Observable } from 'rxjs'; 
// import * as Rx from 'rxjs';

const obs$ = Observable.create((observer:any) => {
  observer.next('testin testn\'');
  observer.next('flexn flexn');
});


obs$.subscribe(
  (resolved:any) => console.log(resolved)
)