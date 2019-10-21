import { observable, Observable, fromEvent } from 'rxjs'; 
import { Subject } from 'rxjs';
// import { setInterval } from 'timers';
// import * as Rx from 'rxjs';

function addItem(val:any) {
  var node = document.createElement("li");
  var textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById("output").appendChild(node);
}

const obs$ = Observable.create((observer:any) => {
  try {
    observer.next('testin testn\'');
    observer.next('flexn flexn');
    // observer.complete();
    setInterval(()=> {
      observer.next('...running ')
    }, 2000);    
  } catch(err) {
    observer.error(err)
  }
});

const mouseM$ = fromEvent(document, 'click');


const sub1 = obs$.subscribe(
  (resolved:any) => {
    // console.log(resolved)
    // addItem(resolved);
  }
)

// setTimeout(()=> {
//   const sub2 = obs$.subscribe(
//     (resolved:any) => {
//       addItem(resolved + ' from sub2 !!');
//     }
//   )
// }, 4000)

setTimeout(() => {
  sub1.unsubscribe();
}, 8001);

/////// with subject 
const subject1 = new Subject();

subject1.subscribe(
  success => console.log(success),
);

subject1.next('send 1')
subject1.next('send 2')




