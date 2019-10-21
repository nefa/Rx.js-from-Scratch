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


  createNameList(firstName:string, lastName:string) {
    let fullFName = firstName.replace(NameEditing.regex, '');
    this.firstNames.push(fullFName.trim());
  
    let fullLName = lastName.replace(NameEditing.regex, '');
    this.lastNames.push(fullLName.trim());

    // first combo
    let splitsBySpace = fullFName.split(' ').filter(word => word.length);
    this.firstNames.push(...splitsBySpace);
    //@refactor to one liners ?

    // after all chartezian prod
    this.result.push(...this.firstNames);
    console.log(this.result)
  }

  static acceptByLength(first:string, last:string, len=25) {
    let value=NameEditing.joinBySpace(first, last);
    if (value.length <= len) {
      return value;
    } else {
      const initial = first[0].toLocaleUpperCase();
      return NameEditing.joinBySpace(initial, last);
    }
  }

}

const n = new NameEditing();
n.createNameList('Ion-Ion  Ultrameganamamescovici', 'Tiriac&__1Brontozaurix');
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
    console.log('splits by dash: ', _s, _s.length);
    if (_s.length > 1) splitsByDash.push(..._s);
    console.log('splits by dash ->>after ', splitsByDash);
  };

  firstNames.push(...splitsByDash);

}

formatNameList('Ion-Ion  Ultrameganamamescovici', 'Tiriac&__1Brontozaurix');

