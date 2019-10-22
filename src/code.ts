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



class NameEditing {
  firstNames:string[]
  lastNames:string[];
  result:string[];

  static regex = /[^a-zA-Z\s-]/gi;


  constructor() {

    this.firstNames = [];
    this.lastNames = [];
    this.result = [];
  }

  static joinBySpace(first:string, last:string) {
    return `${first} ${last}`;
  }


  static acceptByLength(first:string, last:string, len=25) {
    let value=NameEditing.joinBySpace(first, last);
    if (value.length <= len) {
      return value;
    } else {
      const initial = first[0].toLocaleUpperCase();
      return NameEditing.joinBySpace(initial, last).substr(0, len);
    }
  }

  createNameList(firstName:string, lastName:string) {
    let fullFName = firstName.replace(NameEditing.regex, '');
    // this.firstNames.push(fullFName.trim());
  
    let fullLName = lastName.replace(NameEditing.regex, '');
    // this.lastNames.push(fullLName.trim());
    
    //@cheeck for dash-combo
    // first combo
    let splitsBySpace_fn = fullFName.split(' ').filter(word => word.length);
    for (let s of splitsBySpace_fn) {
      this.firstNames.push(...s.split('-'))
    }
    this.firstNames = this.firstNames
      .filter(word => word.length)
    // unique items
      .filter((word, idx, all) => all.indexOf(word) === idx)
  
    //@refactor to one liners ?
    let splitsBySpace_ln = fullLName.split(' ').filter(word => word.length);
    for (let s of splitsBySpace_ln) {
      this.lastNames.push(...s.split('-').filter(word => word.length))
    }

    for (let l of this.lastNames) {
      for (let f of this.firstNames) {
        this.result.push(NameEditing.acceptByLength(f,l));
      }
    }
    
    // after all chartezian prod
    console.log(this.result)
  }

}

const n = new NameEditing();
n.createNameList('Ion-Ion john  Ultrameganamamescovici', 'Gigea Tiriac&__1Brontozaurix');
// =================== <> =================== //

function formatNameList(firstName:string, lastName:string) {
  const regex = /[^a-zA-Z\s-]/gi;
  let firstNames = [];
  let lastNames = [];

  let fullFName = firstName.replace(regex, '');
  firstNames.push(fullFName.trim());

  let fullLName = lastName.replace(regex, '');
  lastNames.push(fullLName.trim());


  // result.push(joinBySpace(fullFName, fullLName));
  // result.push(joinBySpace(fullLName, fullFName));

  let splitsBySpace = fullFName.split(' ').filter(word => word.length);
  firstNames.push(...splitsBySpace);


  let splitsByDash:any = [];

  for (const n of splitsBySpace) {
    const _s = n.split('-');
    // console.log('splits by dash: ', _s, _s.length);
    if (_s.length > 1) splitsByDash.push(..._s);
    // console.log('splits by dash ->>after ', splitsByDash);
  };

  firstNames.push(...splitsByDash);

}

formatNameList('Ion-Ion  Ultrameganamamescovici', 'Tiriac&__1Brontozaurix');

