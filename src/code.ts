import { observable, Observable } from 'rxjs'; 
// import * as Rx from 'rxjs';

const obs$ = Observable.create((observer:any) => {
  try {
    observer.next('testin testn\'');
    observer.next('flexn flexn');
    throw 'stuff';
    observer.complete();
    
    observer.next('This will not send');
  } catch(err) {
    observer.error(err)
  }
});


const sub1 = obs$.subscribe(
  (resolved:any) => console.log(resolved)
)

