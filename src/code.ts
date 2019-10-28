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



"use strict";

let reg = /[^a-zA-Z\s-]/gi;

class NameEditing {
  constructor() {
    this.firstNames = [];
    this.lastNames = [];
    this.result = [];
  }

  static joinBySpace(first, last) {
    return `${first} ${last}`;
  }

  static acceptByLength(name, maxLen=25) {
    return (name && name.length <= maxLen) ? name : '';
  }

  static mergeEvenOdds(collectionEven=[], collectionOdds=[], index=0) {
    let evenIterator = index;
    let oddsIterator = index + 1;
    const result = [];
    collectionEven.forEach((val) => {
      result[evenIterator] = val;
      evenIterator += 2;
    });
    collectionOdds.forEach((val) => {
      result[oddsIterator] = val;
      oddsIterator += 2;
    });
    return result;
  }

  static joinByDash(first, last) {
    return [`${first}-${last}`, `${last}-${first}`];
  }

  createSeparateFirstNames(name) {
    const splitsBySpace = name.split(' ').filter(word => word.length);

    // for (const word of splitsBySpace) {
    //   // add full name
    //   if (word.length) this.firstNames.push(word);
    // }

    const allNames = [];
    for (const word of /* this.firstNames */ splitsBySpace) {
      const dashed = word.split('-');
      if (dashed[0].length && dashed[0].length) allNames.push(dashed[0]);
      if (dashed[1] && dashed[1].length) allNames.push(dashed[1]);
    }

    // @TODO use functional statics
    this.firstNames.push(...allNames);
    this.firstNames = this.firstNames
      .filter(word => word.length)
      // unique items
      .filter((word, idx, all) => all.indexOf(word) === idx);
    console.log("firstNames", this.firstNames);  
  }

  createSeparateLastNames(name) {
    /* ... */
    const splitsBySpace = name.split(' ').filter(word => word.length);

    // for (const word of splitsBySpace) {
    //   // add full name
    //   if (word.length) this.firstNames.push(word);
    // }

    const allNames = [];
    for (const word of /* this.lastNames */ splitsBySpace) {
      const dashed = word.split('-');
      if (dashed[0].length) allNames.push(dashed[0]);
      if (dashed[1] && dashed[1].length) allNames.push(dashed[1]);
    }

    // @TODO use functional statics
    this.lastNames.push(...allNames);
    this.lastNames = this.lastNames
      .filter(word => word.length)
      // unique items
      .filter((word, idx, all) => all.indexOf(word) === idx);
    console.log("lastNames", this.lastNames);  
  }

  createNameList(firstName, lastName) {
    /* run init() */
    const fn = firstName.replace(reg, '');
    const ln = lastName.replace(reg, '');

    this.createSeparateFirstNames(fn);
    this.createSeparateLastNames(ln);

    // @select and push by iterators odds and evens combined

    if (this.lastNames.length && this.firstNames.length) {
      const _lastNames = [...this.lastNames];
      const _firstNames = [...this.firstNames];

      let forward = [];
      for (const l of _lastNames) {
        for (const f of _firstNames) {
          forward.push(NameEditing.joinBySpace(f, l));
          forward.push(NameEditing.joinBySpace(l, f));
        }
      }

      let reversed = [];
      for (const f of _firstNames) {
        for (const l of _lastNames) {
          reversed.push(NameEditing.joinBySpace(f, l));
          reversed.push(NameEditing.joinBySpace(l, f));
        }
      }

      forward = forward
        .filter(word => word.length)
        .filter((word, idx, all) => all.indexOf(word) === idx);

      reversed = reversed
        .filter(word => word.length)
        .filter((word, idx, all) => all.indexOf(word) === idx);

      // @push separate names
      this.result.push(...NameEditing.mergeEvenOdds(forward, reversed)
        .filter(word => word.length && word.length <= 25));

      // @push firstNames by lastName
      // Priority 2
      const priorityFn = [];
      this.firstNames.forEach((_fn) => {
        priorityFn.push(NameEditing.acceptByLength(NameEditing.joinBySpace(_fn, ln)));
        priorityFn.push(NameEditing.acceptByLength(NameEditing.joinBySpace(ln, _fn)));
      });
      this.result.unshift(...priorityFn)
      this.result = this.result
        .filter(word => word.length && word.length <= 25)
        .filter((word, idx, all) => all.indexOf(word) === idx);
      console.log("after merged odds", this.result)  
    }
    /** ========================================================== */

    // @select and push priority names
    // @push first clean names as first priority
    // Priority 1

    if (this.result.length) {
      this.result = this.result.map(word => word.toLocaleUpperCase());
      // @exit here
    } else {
      // fallback for very long names
      // for very long Last names and short first name
      for (const _ln of this.lastNames) {
        for (const _fn of this.firstNames) {
          this.result.push(...NameEditing.acceptByHighPriority(_fn, _ln))
         
          this.result = this.result
            .filter(word => word.length && word.length <= 25)
            .filter((word, idx, all) => all.indexOf(word) === idx);
        }
      }

      if (this.result.length) {
        this.result = this.result.map(word => word.toLocaleUpperCase());
        // @exit here
      } else {
        // fallback to initials
        for (const _ln of this.lastNames) {
          for (const _fn of this.firstNames) {
            const initial = _fn[0];
            this.result.push(NameEditing.joinBySpace(initial, _ln), NameEditing.joinBySpace(_ln, initial))
            this.result = this.result
              .filter(word => word.length && word.length <= 25)
              .filter((word, idx, all) => all.indexOf(word) === idx);
          }
        }
        
        if (this.result.length) {
          this.result = this.result.map(word => word.toLocaleUpperCase());
          // @exit here
        } else {
          // fallback for very long last names only
          for (const _ln of this.lastNames) {
            this.result.push(_ln.substr(0, 25));
          }
          
        }
      }

      // clear all again
      this.result = this.result
        .filter(word => word.length)
        .filter((word, idx, all) => all.indexOf(word) === idx)
        .map(word => word.toLocaleUpperCase());
        console.log("truncated last", this.result);
    }
  }

  static acceptByHighPriority(fn, ln) {
    const name = NameEditing.acceptByLength(NameEditing.joinBySpace(fn, ln));
    if (name.length) {
      const nameRev = NameEditing.joinBySpace(fn, ln);
      return [name, nameRev];
    }
    return '';
  }

  get list() {
    return this.result;
    
  }
}

const nList = new NameEditing();
nList.createNameList("Viorel Marius Ianis", "Constantin Elias David");
console.log(nList.list.slice(0,10));

const n = new NameEditing();
n.createNameList('Jan-Pierre', 'Peter-Jack Jacksovicovichi');
// =================== <> =================== //


/**
 * First Name: "John-Dave"
Last Name: "VeryVeryLongLongNamer-ExtraExtraLongLongNamey"
▿ 8 elements
 - "J VERYVERYLONGLONGNAMER"
 - "VERYVERYLONGLONGNAMER J"
 - "D VERYVERYLONGLONGNAMER"
 - "VERYVERYLONGLONGNAMER D"
 - "J EXTRAEXTRALONGLONGNAMEY"
 - "EXTRAEXTRALONGLONGNAMEY J"
 - "D EXTRAEXTRALONGLONGNAMEY"
 - "EXTRAEXTRALONGLONGNAMEY D"

Generating suggestions for:

First Name: "John-Dave"
Last Name: "VeryVeryLongLongLastNameName-AnotherVeryVeryLongNameName"
▿ 2 elements
 - "VERYVERYLONGLONGLASTNAMEN"
 - "ANOTHERVERYVERYLONGNAMENA"

Generating suggestions for:

First Name: "Viorel Marius Ianis"
Last Name: "Constantin Elias David"
▿ 10 elements
 - "VIOREL CONSTANTIN"
 - "CONSTANTIN VIOREL"
 - "MARIUS CONSTANTIN"
 - "CONSTANTIN MARIUS"
 - "IANIS CONSTANTIN"
 - "CONSTANTIN IANIS"
 - "VIOREL ELIAS"
 - "ELIAS VIOREL"
 - "VIOREL DAVID"
 - "DAVID VIOREL"
 * 
 * 
 */