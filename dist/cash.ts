
interface Cash {
  [index: number]: Window & Document & HTMLElement & Element & Node; //FIXME: Quick and dirty way of getting rid of most type errors
  length: number;
  splice ( start: number, deleteCount?: number );
  splice ( start: number, deleteCount: number, ...items: Ele[] );
}

interface CashStatic {
  fn: Cash;
}

type plainObject = { [index: string]: any };
type falsy = undefined | null | false | 0 | '';

type Ele = Window | Document | HTMLElement | Element | Node;
type Selector = falsy | string | Function | HTMLCollection | NodeList | Ele | Ele[] | ArrayLike<any> | Cash;
type Comparator = string | Function | Ele | Cash;
type Context = Document | HTMLElement | Element;


const doc = document,
      win = window,
      div = doc.createElement ( 'div' ),
      {filter, indexOf, map, push, reverse, slice, some, splice} = Array.prototype;

const idRe = /^#[\w-]*$/,
      classRe = /^\.[\w-]*$/,
      htmlRe = /<.+>/,
      tagRe = /^\w+$/;


// @require ./variables.ts

function find ( selector: string, context: Context = doc ) {

  return context !== doc && context.nodeType !== 1 && context.nodeType !== 9
           ? []
           : classRe.test ( selector )
             ? context.getElementsByClassName ( selector.slice ( 1 ) )
             : tagRe.test ( selector )
               ? context.getElementsByTagName ( selector )
               : context.querySelectorAll ( selector );

}


// @require ./find.ts
// @require ./variables.ts

class Cash {

  constructor ( selector?: Selector, context: Context | Cash = doc ) {

    if ( !selector ) return;

    if ( isCash ( selector ) ) return selector;

    let eles: any = selector;

    if ( isString ( selector ) ) {

      const ctx = isCash ( context ) ? context[0] : context;

      eles = idRe.test ( selector )
                ? ( ctx as Document ).getElementById ( selector.slice ( 1 ) )
                : htmlRe.test ( selector )
                  ? parseHTML ( selector )
                  : find ( selector, ctx );

      if ( !eles ) return;

    } else if ( isFunction ( selector ) ) {

      return this.ready ( selector ); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality

    }

    if ( eles.nodeType || eles === win ) eles = [eles];

    this.length = eles.length;

    for ( let i = 0, l = this.length; i < l; i++ ) {

      this[i] = eles[i];

    }

  }

  init ( selector?: Selector, context?: Context | Cash ) {

    return new Cash ( selector, context );

  }

}

const cash = Cash.prototype.init as typeof Cash.prototype.init & CashStatic;

cash.fn = cash.prototype = Cash.prototype; // Ensuring that `cash () instanceof cash`

Cash.prototype.length = 0;
Cash.prototype.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome

if ( typeof Symbol === 'function' ) {
  Cash.prototype[Symbol['iterator']] = Array.prototype[Symbol['iterator']];
}


// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  get (): Ele[];
  get ( index: number ): Ele;
}

Cash.prototype.get = function ( this: Cash, index?: number ) {

  if ( index === undefined ) return slice.call ( this );

  return this[index < 0 ? index + this.length : index];

};


// @require core/cash.ts
// @require ./get.ts

interface Cash {
  eq ( index: number ): Cash;
}

Cash.prototype.eq = function ( this: Cash, index: number ) {
  return cash ( this.get ( index ) );
};


// @require core/cash.ts
// @require ./eq.ts

interface Cash {
  first (): Cash;
}

Cash.prototype.first = function ( this: Cash ) {
  return this.eq ( 0 );
};


// @require core/cash.ts
// @require ./eq.ts

interface Cash {
  last (): Cash;
}

Cash.prototype.last = function ( this: Cash ) {
  return this.eq ( -1 );
};


// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  map ( callback: Function ): Cash;
}

Cash.prototype.map = function ( this: Cash, callback: Function ) {
  return cash ( map.call ( this, ( ele, i ) => callback.call ( ele, i, ele ) ) );
};


// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  slice ( start?: number, end?: number ): Cash;
}

Cash.prototype.slice = function ( this: Cash ) {
  return cash ( slice.apply ( this, arguments ) );
};


// @require ./cash.ts

const dashAlphaRe = /-([a-z])/g;

function camelCaseReplace ( all, letter ) {
  return letter.toUpperCase ();
}

function camelCase ( str: string ) {
  return str.replace ( dashAlphaRe, camelCaseReplace );
}

interface CashStatic {
  camelCase ( str: string ): string;
}

cash.camelCase = camelCase;


// @require ./cash.ts

function each ( arr: ArrayLike<any>, callback: Function ): void {

  for ( let i = 0, l = arr.length; i < l; i++ ) {

    if ( callback.call ( arr[i], i, arr[i] ) === false ) break;

  }

}

interface CashStatic {
  each ( arr: ArrayLike<any>, callback: Function ): void;
}

cash.each = each;


// @require core/cash.ts
// @require core/each.ts

interface Cash {
  each ( callback: Function ): this;
}

Cash.prototype.each = function ( this: Cash, callback: Function ) {
  each ( this, callback );
  return this;
};


// @require core/cash.ts
// @require collection/each.ts

interface Cash {
  removeProp ( prop: string ): this;
}

Cash.prototype.removeProp = function ( this: Cash, prop: string ) {
  return this.each ( ( i, ele ) => { delete ele[prop] } );
};


// @require ./cash.ts

function extend ( target, ...objs: any[] ) {

  let args = arguments,
      length = args.length;

  for ( let i = ( length < 2 ? 0 : 1 ); i < length; i++ ) {
    for ( let key in args[i] ) {
      target[key] = args[i][key];
    }
  }

  return target;

}

interface Cash {
  extend ( plugins: plainObject ): this;
}

Cash.prototype.extend = function ( plugins: plainObject ) {
  return extend ( cash.fn, plugins );
};

interface CashStatic {
  extend ( target, ...objs: any[] );
}

cash.extend = extend;


// @require ./cash.ts

let guid = 1;

interface CashStatic {
  guid: number;
}

cash.guid = guid;


// @require ./cash.ts

function matches ( ele: HTMLElement, selector: string ): boolean {

  const matches = ele && ( ele.matches || ele['webkitMatchesSelector'] || ele['mozMatchesSelector'] || ele['msMatchesSelector'] || ele['oMatchesSelector'] );

  return !!matches && matches.call ( ele, selector );

}

interface CashStatic {
  matches ( ele: HTMLElement, selector: string ): boolean;
}

cash.matches = matches;


// @require ./variables.ts

function pluck ( arr: ArrayLike<any>, prop: string, deep?: boolean ): ArrayLike<any> {

  const plucked = [];

  for ( let i = 0, l = arr.length; i < l; i++ ) {

    let val = arr[i][prop];

    while ( val != null ) {

      plucked.push ( val );

      if ( !deep ) break;

      val = val[prop];

    }

  }

  return plucked;

}


// @require ./cash.ts

function isCash ( x ): x is Cash {
  return x instanceof Cash;
}

function isFunction ( x ): x is Function {
  return typeof x === 'function';
}

function isString ( x ): x is string {
  return typeof x === 'string';
}

function isNumeric ( x ): boolean {
  return !isNaN ( parseFloat ( x ) ) && isFinite ( x );
}

const {isArray} = Array;

interface CashStatic {
  isFunction ( x ): x is Function;
  isString ( x ): x is string;
  isNumeric ( x ): boolean;
  isArray ( x ): x is Array<any>;
}

cash.isFunction = isFunction;
cash.isString = isString;
cash.isNumeric = isNumeric;
cash.isArray = isArray;


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  prop ( prop: string );
  prop ( prop: string, value ): this;
  prop ( props: plainObject ): this;
}

Cash.prototype.prop = function ( this: Cash, prop: string | plainObject, value? ) {

  if ( !prop ) return;

  if ( isString ( prop ) ) {

    if ( arguments.length < 2 ) return this[0] && this[0][prop];

    return this.each ( ( i, ele ) => { ele[prop] = value } );

  }

  for ( let key in prop ) {

    this.prop ( key, prop[key] );

  }

  return this;

};


// @require ./matches.ts
// @require ./type_checking.ts

function getCompareFunction ( comparator: Comparator ): Function {

  return isString ( comparator )
           ? ( i, ele ) => matches ( ele, comparator )
           : isFunction ( comparator )
             ? comparator
             : isCash ( comparator )
               ? ( i, ele ) => comparator.is ( ele )
               : ( i, ele ) => ele === comparator;

}


// @require core/cash.ts
// @require core/get_compare_function.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require collection/get.ts

interface Cash {
  filter ( comparator: Comparator ): Cash;
}

Cash.prototype.filter = function ( this: Cash, comparator: Comparator ) {

  if ( !comparator ) return cash ();

  const compare = getCompareFunction ( comparator );

  return cash ( filter.call ( this, ( ele, i ) => compare.call ( ele, i, ele ) ) );

};


// @require collection/filter.ts

function filtered ( collection: Cash, comparator?: Comparator ): Cash {
  return !comparator || !collection.length ? collection : collection.filter ( comparator );
}


// @require ./type_checking.ts

const splitValuesRe = /\S+/g;

function getSplitValues ( str: string ) {
  return isString ( str ) ? str.match ( splitValuesRe ) || [] : [];
}


// @require core/cash.ts
// @require core/get_split_values.ts
// @require collection/each.ts

interface Cash {
  hasClass ( cls: string ): boolean;
}

Cash.prototype.hasClass = function ( this: Cash, cls: string ) {
  return cls && some.call ( this, ele => ele.classList.contains ( cls ) );
};


// @require core/cash.ts
// @require core/get_split_values.ts
// @require collection/each.ts

interface Cash {
  removeAttr ( attrs: string ): this;
}

Cash.prototype.removeAttr = function ( this: Cash, attr: string ) {

  const attrs = getSplitValues ( attr );

  if ( !attrs.length ) return this;

  return this.each ( ( i, ele ) => {
    each ( attrs, ( i, a ) => {
      ele.removeAttribute ( a );
    });
  });

};


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./remove_attr.ts

interface Cash {
  attr ( attrs: string );
  attr ( attrs: string, value ): this;
  attr ( attrs: plainObject ): this;
}

function attr ( this: Cash, attr: string );
function attr ( this: Cash, attr: string, value ): Cash;
function attr ( this: Cash, attr: plainObject ): Cash;
function attr ( this: Cash, attr: string | plainObject, value? ) {

  if ( !attr ) return;

  if ( isString ( attr ) ) {

    if ( arguments.length < 2 ) {

      if ( !this[0] ) return;

      const value = this[0].getAttribute ( attr );

      return value === null ? undefined : value;

    }

    if ( value === null ) return this.removeAttr ( attr );

    return this.each ( ( i, ele ) => { ele.setAttribute ( attr, value ) } );

  }

  for ( let key in attr ) {

    this.attr ( key, attr[key] );

  }

  return this;

}

Cash.prototype.attr = attr;


// @require core/cash.ts
// @require core/each.ts
// @require core/get_split_values.ts
// @require collection/each.ts

interface Cash {
  toggleClass ( classes: string, force?: boolean ): this;
}

Cash.prototype.toggleClass = function ( this: Cash, cls: string, force?: boolean ) {

  const classes = getSplitValues ( cls ),
        isForce = ( force !== undefined );

  if ( !classes.length ) return this;

  return this.each ( ( i, ele ) => {
    each ( classes, ( i, c ) => {
      if ( isForce ) {
        force ? ele.classList.add ( c ) : ele.classList.remove ( c );
      } else {
        ele.classList.toggle ( c );
      }
    });
  });

};


// @require core/cash.ts
// @require ./toggle_class.ts

interface Cash {
  addClass ( classes: string ): this;
}

Cash.prototype.addClass = function ( this: Cash, cls: string ) {
  return this.toggleClass ( cls, true );
};


// @require core/cash.ts
// @require ./attr.ts
// @require ./toggle_class.ts

interface Cash {
  removeClass ( classes?: string ): this;
}

Cash.prototype.removeClass = function ( this: Cash, cls?: string ) {
  return !arguments.length ? this.attr ( 'class', '' ) : this.toggleClass ( cls as string, false );
};


// @optional ./add_class.ts
// @optional ./attr.ts
// @optional ./has_class.ts
// @optional ./prop.ts
// @optional ./remove_attr.ts
// @optional ./remove_class.ts
// @optional ./remove_prop.ts
// @optional ./toggle_class.ts


// @require ./cash.ts
// @require ./variables

function unique ( arr: ArrayLike<any> ): ArrayLike<any> {
  return arr.length > 1 ? filter.call ( arr, ( item, index, self ) => indexOf.call ( self, item ) === index ) : arr;
}

interface CashStatic {
  unique ( arr: ArrayLike<any> ): ArrayLike<any>;
}

cash.unique = unique;


// @require core/cash.ts
// @require core/unique.ts
// @require ./get.ts

interface Cash {
  add ( selector: Selector, context?: Context ): Cash;
}

Cash.prototype.add = function ( this: Cash, selector: Selector, context?: Context ) {
  return cash ( unique ( this.get ().concat ( cash ( selector, context ).get () ) ) );
};


// @require core/variables.ts

function computeStyle ( ele: HTMLElement, prop: string, isVariable?: boolean ): undefined | string {

  if ( ele.nodeType !== 1 || !prop ) return;

  const style = win.getComputedStyle ( ele, null );

  return prop ? ( isVariable ? style.getPropertyValue ( prop ) || undefined : style[prop] ) : style;

}


// @require ./compute_style.ts

function computeStyleInt ( ele: HTMLElement, prop: string ): number {

  return parseInt ( computeStyle ( ele, prop ), 10 ) || 0;

}


const cssVariableRe = /^--/;


// @require ./variables.ts

function isCSSVariable ( prop: string ): boolean {

  return cssVariableRe.test ( prop );

}


// @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts

const prefixedProps: plainObject = {},
      {style} = div,
      vendorsPrefixes = ['webkit', 'moz', 'ms', 'o'];

function getPrefixedProp ( prop: string, isVariable: boolean = isCSSVariable ( prop ) ): string {

  if ( isVariable ) return prop;

  if ( !prefixedProps[prop] ) {

    const propCC = camelCase ( prop ),
          propUC = `${propCC.charAt ( 0 ).toUpperCase ()}${propCC.slice ( 1 )}`,
          props = ( `${propCC} ${vendorsPrefixes.join ( `${propUC} ` )}${propUC}` ).split ( ' ' );

    each ( props, ( i, p ) => {
      if ( p in style ) {
        prefixedProps[prop] = p;
        return false;
      }
    });

  }

  return prefixedProps[prop];

};

interface CashStatic {
  prefixedProp ( prop: string, isVariable?: boolean ): string;
}

cash.prefixedProp = getPrefixedProp;


// @require core/type_checking.ts
// @require ./is_css_variable.ts

const numericProps = {
  animationIterationCount: true,
  columnCount: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true
};

function getSuffixedValue ( prop: string, value: number | string, isVariable: boolean = isCSSVariable ( prop ) ): number | string {

  return !isVariable && !numericProps[prop] && isNumeric ( value ) ? `${value}px` : value;

}


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/compute_style.ts
// @require ./helpers/get_prefixed_prop.ts
// @require ./helpers/get_suffixed_value.ts
// @require ./helpers/is_css_variable.ts

interface Cash {
  css ( prop: string );
  css ( prop: string, value ): this;
  css ( props: plainObject ): this;
}

function css ( this: Cash, prop: string );
function css ( this: Cash, prop: string, value ): Cash;
function css ( this: Cash, prop: plainObject ): Cash;
function css ( this: Cash, prop: string | plainObject, value? ) {

  if ( isString ( prop ) ) {

    const isVariable = isCSSVariable ( prop );

    prop = getPrefixedProp ( prop, isVariable );

    if ( arguments.length < 2 ) return this[0] && computeStyle ( this[0], prop, isVariable );

    if ( !prop ) return this;

    value = getSuffixedValue ( prop, value, isVariable );

    return this.each ( ( i, ele ) => {

      if ( ele.nodeType !== 1 ) return;

      if ( isVariable ) {

        ele.style.setProperty ( prop, value );

      } else {

        ele.style[prop as string] = value; //TSC

      }

    });

  }

  for ( let key in prop ) {

    this.css ( key, prop[key] );

  }

  return this;

};

Cash.prototype.css = css;


// @optional ./css.ts


// @require core/camel_case.ts

function getData ( ele: HTMLElement, key: string ) {

  const value = ele.dataset ? ele.dataset[key] || ele.dataset[camelCase ( key )] : ele.getAttribute ( `data-${key}` );

  try {
    return JSON.parse ( value );
  } catch {}

  return value;

}


// @require core/camel_case.ts

function setData ( ele: HTMLElement, key: string, value ): void {

  try {
    value = JSON.stringify ( value );
  } catch {}

  if ( ele.dataset ) {

    ele.dataset[camelCase ( key )] = value;

  } else {

    ele.setAttribute ( `data-${key}`, value );

  }

}


const dataAttributeRe = /^data-(.+)/;


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_data.ts
// @require ./helpers/set_data.ts
// @require ./helpers/variables.ts

interface Cash {
  data (): plainObject | undefined;
  data ( name: string );
  data ( name: string, value ): this;
  data ( datas: plainObject ): this;
}

function data ( this: Cash ): plainObject | undefined;
function data ( this: Cash, name: string );
function data ( this: Cash, name: string, value ): Cash;
function data ( this: Cash, name: plainObject ): Cash;
function data ( this: Cash, name?: string | plainObject, value? ) {

  if ( !name ) {

    if ( !this[0] ) return;

    const datas = {};

    each ( this[0].attributes, ( i, attr ) => {

      const match = attr.name.match ( dataAttributeRe );

      if ( !match ) return;

      datas[match[1]] = this.data ( match[1] );

    });

    return datas;

  }

  if ( isString ( name ) ) {

    if ( value === undefined ) return this[0] && getData ( this[0], name );

    return this.each ( ( i, ele ) => setData ( ele, name, value ) );

  }

  for ( let key in name ) {

    this.data ( key, name[key] );

  }

  return this;

}

Cash.prototype.data = data;


// @optional ./data.ts


// @require css/helpers/compute_style_int.ts

function getExtraSpace ( ele: HTMLElement, xAxis?: boolean ): number {
  return computeStyleInt ( ele, `border${ xAxis ? 'Left' : 'Top' }Width` ) + computeStyleInt ( ele, `padding${ xAxis ? 'Left' : 'Top' }` ) + computeStyleInt ( ele, `padding${ xAxis ? 'Right' : 'Bottom' }` ) + computeStyleInt ( ele, `border${ xAxis ? 'Right' : 'Bottom' }Width` );
}


// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts

interface Cash {
  innerWidth (): number;
  innerHeight (): number;
}

each ( ['Width', 'Height'], ( i, prop: string ) => {

  Cash.prototype[`inner${prop}`] = function () {

    if ( !this[0] ) return;

    if ( this[0] === win ) return win[`inner${prop}`];

    return this[0][`client${prop}`];

  };

});


// @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require css/helpers/compute_style.ts
// @require css/helpers/get_suffixed_value.ts
// @require ./helpers/get_extra_space.ts

interface Cash {
  width (): number;
  width ( value: number | string ): this;
  height (): number;
  height ( value: number | string ): this;
}

each ( ['width', 'height'], ( index: number, prop: string ) => {

  Cash.prototype[prop] = function ( value?: number | string ) {

    if ( !this[0] ) return value === undefined ? undefined : this;

    if ( !arguments.length ) {

      if ( this[0] === win ) return this[0][ camelCase ( `outer-${prop}` )];

      return this[0].getBoundingClientRect ()[prop] - getExtraSpace ( this[0], !index );

    }

    const valueNumber = parseInt ( value as string, 10 );

    return this.each ( ( i, ele ) => {

      if ( ele.nodeType !== 1 ) return;

      const boxSizing = computeStyle ( ele, 'boxSizing' );

      ele.style[prop] = getSuffixedValue ( prop, valueNumber + ( boxSizing === 'border-box' ? getExtraSpace ( ele, !index ) : 0 ) );

    });

  };

});


// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require css/helpers/compute_style_int.ts

interface Cash {
  outerWidth ( includeMargins?: boolean ): number;
  outerHeight ( includeMargins?: boolean ): number;
}

each ( ['Width', 'Height'], ( index: number, prop: string ) => {

  Cash.prototype[`outer${prop}`] = function ( includeMargins?: boolean ) {

    if ( !this[0] ) return;

    if ( this[0] === win ) return win[`outer${prop}`];

    return this[0][`offset${prop}`] + ( includeMargins ? computeStyleInt ( this[0], `margin${ !index ? 'Left' : 'Top' }` ) + computeStyleInt ( this[0], `margin${ !index ? 'Right' : 'Bottom' }` ) : 0 );

  };

});


// @optional ./inner.ts
// @optional ./normal.ts
// @optional ./outer.ts


// @require css/helpers/compute_style.ts

const defaultDisplay = {};

function getDefaultDisplay ( tagName: string ): string {

  if ( defaultDisplay[tagName] ) return defaultDisplay[tagName];

  const ele = doc.createElement ( tagName );

  doc.body.appendChild ( ele );

  const display = computeStyle ( ele, 'display' );

  doc.body.removeChild ( ele );

  return defaultDisplay[tagName] = display !== 'none' ? display : 'block';

}


// @require css/helpers/compute_style.ts

function isHidden ( ele: HTMLElement ): boolean {

  return computeStyle ( ele, 'display' ) === 'none';

}


// @require core/cash.ts
// @require ./helpers/get_default_display.ts

interface Cash {
  toggle ( force?: boolean ): this;
}

Cash.prototype.toggle = function ( this: Cash, force?: boolean ) {

  return this.each ( ( i, ele ) => {

    force = force !== undefined ? force : isHidden ( ele );

    if ( force ) {

      ele.style.display = '';

      if ( isHidden ( ele ) ) {

        ele.style.display = getDefaultDisplay ( ele.tagName );

      }

    } else {

      ele.style.display = 'none';

    }

  });

};


// @require core/cash.ts
// @require ./toggle.ts

interface Cash {
  hide (): this;
}

Cash.prototype.hide = function ( this: Cash ) {
  return this.toggle ( false );
};


// @require core/cash.ts
// @require ./toggle.ts

interface Cash {
  show (): this;
}

Cash.prototype.show = function ( this: Cash ) {
  return this.toggle ( true );
};


// @optional ./hide.ts
// @optional ./show.ts
// @optional ./toggle.ts


function hasNamespaces ( ns1: string[], ns2: string[] ): boolean {

  return !ns2 || !some.call ( ns2, ns => ns1.indexOf ( ns ) < 0 );

}


const eventsNamespace = '__cashEvents',
      eventsNamespacesSeparator = '.',
      eventsFocus = { focus: 'focusin', blur: 'focusout' },
      eventsHover = { mouseenter: 'mouseover', mouseleave: 'mouseout' },
      eventsMouseRe = /^(?:mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;


// @require ./variables.ts

function getEventNameBubbling ( name: string ) {

  return eventsHover[name] || eventsFocus[name] || name;

}


// @require ./variables.ts

function getEventsCache ( ele: Ele ): plainObject {

  return ele[eventsNamespace] = ( ele[eventsNamespace] || {} );

}


// @require core/guid.ts
// @require events/helpers/get_events_cache.ts

function addEvent ( ele: Ele, name: string, namespaces: string[], selector: string, callback: Function ): void {

  callback['guid'] = ( callback['guid'] || guid++ );

  const eventCache = getEventsCache ( ele );

  eventCache[name] = ( eventCache[name] || [] );
  eventCache[name].push ([ namespaces, selector, callback ]);

  ele.addEventListener ( name, callback as EventListener ); //TSC

}


// @require ./variables.ts

function parseEventName ( eventName: string ): [string, string[]] {

  const parts = eventName.split ( eventsNamespacesSeparator );

  return [parts[0], parts.slice ( 1 ).sort ()]; // [name, namespace[]]

}


// @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts

function removeEvent ( ele: Ele, name?: string, namespaces?: string[], selector?: string, callback?: Function ): void {

  const cache = getEventsCache ( ele );

  if ( !name ) {

    for ( name in cache ) {

      removeEvent ( ele, name, namespaces, selector, callback );

    }

    delete ele[eventsNamespace];

  } else if ( cache[name] ) {

    cache[name] = cache[name].filter ( ([ ns, sel, cb ]) => {

      if ( ( callback && cb['guid'] !== callback['guid'] ) || !hasNamespaces ( ns, namespaces ) || ( selector && selector !== sel ) ) return true;

      ele.removeEventListener ( name, cb );

    });

  }

}


// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_event_name_bubbling.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/remove_event.ts

interface Cash {
  off (): this;
  off ( events: string ): this;
  off ( events: string, callback: Function ): this;
  off ( events: string, selector: string, callback: Function ): this;
}

Cash.prototype.off = function ( this: Cash, eventFullName?: string, selector?: string | Function, callback?: Function ) {

  if ( eventFullName === undefined ) {

    this.each ( ( i, ele ) => removeEvent ( ele ) );

  } else {

    if ( isFunction ( selector ) ) {

      callback = selector;
      selector = '';

    }

    each ( getSplitValues ( eventFullName ), ( i, eventFullName ) => {

      const [name, namespaces] = parseEventName ( getEventNameBubbling ( eventFullName ) );

      this.each ( ( i, ele ) => removeEvent ( ele, name, namespaces, selector as string, callback ) ); //TSC

    });

  }

  return this;

};


// @require core/cash.ts
// @require core/get_split_values.ts
// @require core/guid.ts
// @require core/matches.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/variables.ts
// @require ./helpers/add_event.ts
// @require ./helpers/get_event_name_bubbling.ts
// @require ./helpers/has_namespaces.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/remove_event.ts

interface Cash {
  on ( events: plainObject ): this;
  on ( events: string, callback: Function, _one?: boolean ): this;
  on ( events: string, selector: string | Function, callback: Function, _one?: boolean ): this;
}

function on ( this: Cash, eventFullName: plainObject ): Cash;
function on ( this: Cash, eventFullName: string, callback: Function, _one?: boolean ): Cash;
function on ( this: Cash, eventFullName: string, selector: string | Function, callback: Function, _one?: boolean ): Cash;
function on ( this: Cash, eventFullName: string | plainObject, selector?: string | Function, callback?: boolean | Function, _one?: boolean ) {

  if ( !isString ( eventFullName ) ) {

    for ( let key in eventFullName ) {

      this.on ( key, selector, eventFullName[key] );

    }

    return this;

  }

  if ( isFunction ( selector ) ) {

    callback = selector;
    selector = '';

  }

  each ( getSplitValues ( eventFullName ), ( i, eventFullName ) => {

    const [name, namespaces] = parseEventName ( getEventNameBubbling ( eventFullName ) );

    this.each ( ( i, ele ) => {

      const finalCallback = function ( event ) {

        if ( event.namespace && !hasNamespaces ( namespaces, event.namespace.split ( eventsNamespacesSeparator ) ) ) return;

        let thisArg = ele;

        if ( selector ) {

          let target = event.target;

          while ( !matches ( target, selector as string ) ) { //TSC
            if ( target === ele ) return;
            target = target.parentNode;
            if ( !target ) return;
          }

          thisArg = target;

          event.__delegate = true;

        }

        if ( event.__delegate ) {

          Object.defineProperty ( event, 'currentTarget', {
            configurable: true,
            get () { // We need to set a getter for IE10 to work
              return thisArg;
            }
          });

        }

        const returnValue = ( callback as Function ).call ( thisArg, event, event.data ); //TSC

        if ( _one ) {

          removeEvent ( ele, name, namespaces, selector as string, finalCallback ); //TSC

        }

        if ( returnValue === false ) {

          event.preventDefault ();
          event.stopPropagation ();

        }

      };

      finalCallback['guid'] = callback['guid'] = ( callback['guid'] || guid++ );

      addEvent ( ele, name, namespaces, selector as string, finalCallback ); //TSC

    });

  });

  return this;

}

Cash.prototype.on = on;


// @require core/cash.ts
// @require ./on.ts

interface Cash {
  one ( events: plainObject ): this;
  one ( events: string, callback: Function ): this;
  one ( events: string, selector: string | Function, callback: Function ): this;
}

function one ( this: Cash, eventFullName: plainObject ): Cash;
function one ( this: Cash, eventFullName: string, callback: Function ): Cash;
function one ( this: Cash, eventFullName: string, selector: string | Function, callback: Function ): Cash;
function one ( this: Cash, eventFullName: string | plainObject, selector?: string | Function, callback?: Function ) {
  return this.on ( ( eventFullName as string ), selector, callback, true ); //TSC
};

Cash.prototype.one = one;


// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  ready ( callback: Function ): this;
}

Cash.prototype.ready = function ( this: Cash, callback: Function ) {

  const finalCallback = () => callback ( cash );

  if ( doc.readyState !== 'loading' ) {

    setTimeout ( finalCallback );

  } else {

    doc.addEventListener ( 'DOMContentLoaded', finalCallback );

  }

  return this;

};


// @require core/cash.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require collection/each.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/variables.ts

interface Cash {
  trigger ( event: string | Event, data? ): this;
}

Cash.prototype.trigger = function ( this: Cash, eventFullName: string | Event, data? ) {

  let evt: string | Event = eventFullName;

  if ( isString ( eventFullName ) ) {

    const [name, namespaces] = parseEventName ( eventFullName ),
          type = eventsMouseRe.test ( name ) ? 'MouseEvents' : 'HTMLEvents';

    evt = doc.createEvent ( type );
    evt.initEvent ( name, true, true );
    evt['namespace'] = namespaces.join ( eventsNamespacesSeparator );

  }

  evt['data'] = data;

  const isEventFocus = ( evt['type'] in eventsFocus );

  return this.each ( ( i, ele ) => {

    if ( isEventFocus && isFunction ( ele[evt['type']] ) ) {

      ele[evt['type']]();

    } else {

      ele.dispatchEvent ( evt );

    }

  });

};


// @optional ./off.ts
// @optional ./on.ts
// @optional ./one.ts
// @optional ./ready.ts
// @optional ./trigger.ts


// @require core/pluck.ts
// @require core/variables.ts

function getValue ( ele ): string | string[] {

  if ( ele.multiple ) return pluck ( filter.call ( ele.options, option => option.selected && !option.disabled && !option.parentNode.disabled ), 'value' ) as string[];

  return ele.value || '';

}


const queryEncodeSpaceRe = /%20/g;

function queryEncode ( prop: string, value: string ): string {

  return `&${encodeURIComponent ( prop )}=${encodeURIComponent ( value ).replace ( queryEncodeSpaceRe, '+' )}`;

}


// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require ./helpers/get_value.ts
// @require ./helpers/query_encode.ts

const skippableRe = /file|reset|submit|button|image/i,
      checkableRe = /radio|checkbox/i;

interface Cash {
  serialize (): string;
}

Cash.prototype.serialize = function ( this: Cash ) {

  let query = '';

  this.each ( ( i, ele ) => {

    each ( ele.elements || [ele], ( i, ele ) => {

      if ( ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test ( ele.type ) || ( checkableRe.test ( ele.type ) && !ele.checked ) ) return;

      const value = getValue ( ele );

      if ( value === undefined ) return;

      const values = isArray ( value ) ? value : [value];

      each ( values, ( i, value ) => {
        query += queryEncode ( ele.name, value );
      });

    });

  });

  return query.substr ( 1 );

};


// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_value.ts

interface Cash {
  val (): string | string[];
  val ( value ): this;
}

function val ( this: Cash ): string | string[];
function val ( this: Cash, value: string | string[] ): Cash;
function val ( this: Cash, value?: string | string[] ): string | string[] | Cash {

  if ( value === undefined ) return this[0] && getValue ( this[0] );

  return this.each ( ( i, ele ) => {

    if ( ele.tagName === 'SELECT' ) {

      const eleValue = isArray ( value ) ? value : ( value === null ? [] : [value] );

      each ( ele.options, ( i, option ) => {

        option.selected = eleValue.indexOf ( option.value ) >= 0;

      });

    } else {

      ele.value = value === null ? '' : value;

    }

  });

}

Cash.prototype.val = val;


// @optional ./serialize.ts
// @optional ./val.ts


// @require core/cash.ts
// @require collection/map.ts

interface Cash {
  clone (): this;
}

Cash.prototype.clone = function ( this: Cash ) {
  return this.map ( ( i, ele ) => ele.cloneNode ( true ) );
};


// @require core/cash.ts
// @require collection/each.ts

interface Cash {
  detach (): this;
}

Cash.prototype.detach = function ( this: Cash ) {
  return this.each ( ( i, ele ) => {
    if ( ele.parentNode ) {
      ele.parentNode.removeChild ( ele )
    }
  });
};


// @require ./cash.ts
// @require ./variables.ts
// @require ./type_checking.ts
// @require collection/get.ts
// @require manipulation/detach.ts

const fragmentRe = /^\s*<(\w+)[^>]*>/,
      singleTagRe = /^\s*<(\w+)\s*\/?>(?:<\/\1>)?\s*$/;

let containers: { [index: string]: HTMLElement };

function initContainers () {

  if ( containers ) return;

  const table = doc.createElement ( 'table' ),
        tr = doc.createElement ( 'tr' );

  containers = {
    '*': div,
    tr: doc.createElement ( 'tbody' ),
    td: tr,
    th: tr,
    thead: table,
    tbody: table,
    tfoot: table,
  };

}

function parseHTML ( html: string ): Ele[] {

  initContainers ();

  if ( !isString ( html ) ) return [];

  if ( singleTagRe.test ( html ) ) return [doc.createElement ( RegExp.$1 )];

  const fragment = fragmentRe.test ( html ) && RegExp.$1,
        container = containers[fragment] || containers['*'];

  container.innerHTML = html;

  return cash ( container.childNodes ).detach ().get ();

}

interface CashStatic {
  parseHTML ( html: string ): Ele[];
}

cash.parseHTML = parseHTML;


// @optional ./camel_case.ts
// @optional ./each.ts
// @optional ./extend.ts
// @optional ./find.ts
// @optional ./get_compare_function.ts
// @optional ./get_split_values.ts
// @optional ./guid.ts
// @optional ./matches.ts
// @optional ./parse_html.ts
// @optional ./unique.ts
// @optional ./variables.ts
// @require ./cash.ts
// @require ./type_checking.ts


// @require core/cash.ts

interface Cash {
  empty (): this;
}

Cash.prototype.empty = function ( this: Cash ) {

  const ele = this[0];

  if ( ele ) {

    while ( ele.firstChild ) {

      ele.removeChild ( ele.firstChild );

    }

  }

  return this;

};


// @require core/cash.ts
// @require collection/each.ts

interface Cash {
  html (): string;
  html ( html: string ): this;
}

function html ( this: Cash ): string;
function html ( this: Cash, html: string ): Cash;
function html ( this: Cash, html?: string ): string | Cash {

  if ( html === undefined ) return this[0] && this[0].innerHTML;

  return this.each ( ( i, ele ) => { ele.innerHTML = html } );

}

Cash.prototype.html = html;


// @require core/cash.ts
// @require events/off.ts
// @require ./detach.ts

interface Cash {
  remove (): this;
}

Cash.prototype.remove = function ( this: Cash ) {
  return this.detach ().off ();
};


// @require core/cash.ts
// @require collection/each.ts

interface Cash {
  text (): string;
  text ( text: string ): this;
}

function text ( this: Cash ): string;
function text ( this: Cash, text: string ): Cash;
function text ( this: Cash, text?: string ): string | Cash {

  if ( text === undefined ) return this[0] ? this[0].textContent : '';

  return this.each ( ( i, ele ) => { ele.textContent = text } );

};

Cash.prototype.text = text;


// @require core/cash.ts

interface Cash {
  unwrap (): this;
}

Cash.prototype.unwrap = function ( this: Cash ) {

  this.parent ().each ( ( i, ele ) => {

    const $ele = cash ( ele );

    $ele.replaceWith ( $ele.children () );

  });

  return this;

};


// @require core/cash.ts
// @require core/variables.ts

const docEle = doc.documentElement;

interface Cash {
  offset (): undefined | {
    top: number,
    left: number
  };
}

Cash.prototype.offset = function ( this: Cash ) {

  const ele = this[0];

  if ( !ele ) return;

  const rect = ele.getBoundingClientRect ();

  return {
    top: rect.top + win.pageYOffset - docEle.clientTop,
    left: rect.left + win.pageXOffset - docEle.clientLeft
  };

};


// @require core/cash.ts

interface Cash {
  offsetParent (): Cash;
}

Cash.prototype.offsetParent = function ( this: Cash ) {
  return cash ( this[0] && this[0].offsetParent );
};


// @require core/cash.ts

interface Cash {
  position (): undefined | {
    top: number,
    left: number
  };
}

Cash.prototype.position = function ( this: Cash ) {

  const ele = this[0];

  if ( !ele ) return;

  return {
    left: ele.offsetLeft,
    top: ele.offsetTop
  };

};


// @optional ./offset.ts
// @optional ./offset_parent.ts
// @optional ./position.ts


// @require core/cash.ts
// @require core/filtered.ts
// @require core/unique.ts
// @require core/variables.ts
// @require collection/each.ts
// @require collection/filter.ts

interface Cash {
  children ( comparator?: Comparator ): Cash;
}

Cash.prototype.children = function ( this: Cash, comparator?: Comparator ) {

  let result: Ele[] | Cash = [];

  this.each ( ( i, ele ) => { push.apply ( result, ele.children ) } );

  return filtered ( cash ( unique ( result ) ), comparator );

};


// @require core/cash.ts
// @require core/unique.ts
// @require collection/each.ts

interface Cash {
  contents (): Cash;
}

Cash.prototype.contents = function ( this: Cash ) {

  let result: Ele[] = [];

  this.each ( ( i, ele ) => {

    push.apply ( result, ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.childNodes );

  });

  return cash ( unique ( result ) );

};


// @require core/cash.ts
// @require core/unique.ts
// @require core/find.ts
// @require core/variables.ts

interface Cash {
  find ( selector: string ): Cash;
}

Cash.prototype.find = function ( this: Cash, selector: string ) {

  const result: Ele[] = [];

  for ( let i = 0, l = this.length; i < l; i++ ) {
    const found = find ( selector, this[i] );
    if ( found.length ) {
      push.apply ( result, found );
    }
  }

  return cash ( unique ( result ) );

};


// @require collection/filter.ts
// @require collection/filter.ts
// @require traversal/find.ts

const scriptTypeRe = /^$|^module$|\/(?:java|ecma)script/i,
      HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function evalScripts ( node: Node ) {

  const collection = cash ( node );

  collection.filter ( 'script' ).add ( collection.find ( 'script' ) ).each ( ( i, ele ) => {
    if ( !ele.src && scriptTypeRe.test ( ele.type ) ) { // The script type is supported
      if ( ele.ownerDocument.documentElement.contains ( ele ) ) { // The element is attached to the DOM // Using `documentElement` for broader browser support
        eval ( ele.textContent.replace ( HTMLCDATARe, '' ) );
      }
    }
  });

}


// @require ./eval_scripts.ts

function insertElement ( anchor: Node, child: Node, prepend?: boolean, prependTarget?: Node ): void {

  if ( prepend ) {

    anchor.insertBefore ( child, prependTarget );

  } else {

    anchor.appendChild ( child );

  }

  evalScripts ( child );

}


// @require core/each.ts
// @require core/type_checking.ts
// @require ./insert_element.ts

function insertContent ( parent: Cash, child: Cash, prepend?: boolean ): void {

  each ( parent, ( index: number, parentEle: HTMLElement ) => {
    each ( child, ( i, childEle: HTMLElement ) => {
      insertElement ( parentEle, !index ? childEle : childEle.cloneNode ( true ), prepend, prepend && parentEle.firstChild );
    });
  });

}


// @require core/cash.ts
// @require core/each.ts
// @require ./helpers/insert_content.ts

interface Cash {
  append ( ...selectors: Selector[] ): this;
}

Cash.prototype.append = function ( this: Cash ) {
  each ( arguments, ( i, selector: Selector ) => {
    insertContent ( this, cash ( selector ) );
  });
  return this;
};


// @require core/cash.ts
// @require ./helpers/insert_content.ts

interface Cash {
  appendTo ( selector: Selector ): this;
}

Cash.prototype.appendTo = function ( this: Cash, selector: Selector ) {
  insertContent ( cash ( selector ), this );
  return this;
};


// @require core/cash.ts
// @require collection/each.ts
// @require ./helpers/insert_element.ts

interface Cash {
  insertAfter ( selector: Selector ): this;
}

Cash.prototype.insertAfter = function ( this: Cash, selector: Selector ) {

  cash ( selector ).each ( ( index: number, ele: HTMLElement ) => {

    const parent = ele.parentNode;

    if ( parent ) {
      this.each ( ( i, e ) => {
        insertElement ( parent, !index ? e : e.cloneNode ( true ), true, ele.nextSibling );
      });
    }

  });

  return this;

};


// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require collection/slice.ts
// @require ./insert_after.ts

interface Cash {
  after ( ...selectors: Selector[] ): this;
}

Cash.prototype.after = function ( this: Cash ) {
  each ( reverse.apply ( arguments ), ( i, selector: Selector ) => {
    reverse.apply ( cash ( selector ).slice () ).insertAfter ( this );
  });
  return this;
};


// @require core/cash.ts
// @require collection/each.ts
// @require ./helpers/insert_element.ts

interface Cash {
  insertBefore ( selector: Selector ): this;
}

Cash.prototype.insertBefore = function ( this: Cash, selector: Selector ) {

  cash ( selector ).each ( ( index: number, ele: HTMLElement ) => {

    const parent = ele.parentNode;

    if ( parent ) {
      this.each ( ( i, e ) => {
        insertElement ( parent, !index ? e : e.cloneNode ( true ), true, ele );
      });
    }

  });

  return this;

};


// @require core/cash.ts
// @require core/each.ts
// @require ./insert_before.ts

interface Cash {
  before ( ...selectors: Selector[] ): this;
}

Cash.prototype.before = function ( this: Cash ) {
  each ( arguments, ( i, selector: Selector ) => {
    cash ( selector ).insertBefore ( this );
  });
  return this;
};


// @require core/cash.ts
// @require core/each.ts
// @require ./helpers/insert_content.ts

interface Cash {
  prepend ( ...selectors: Selector[] ): this;
}

Cash.prototype.prepend = function ( this: Cash ) {
  each ( arguments, ( i, selector: Selector ) => {
    insertContent ( this, cash ( selector ), true );
  });
  return this;
};


// @require core/cash.ts
// @require core/variables.ts
// @require collection/slice.ts
// @require ./helpers/insert_content.ts

interface Cash {
  prependTo ( selector: Selector ): this;
}

Cash.prototype.prependTo = function ( this: Cash, selector: Selector ) {
  insertContent ( cash ( selector ), reverse.apply ( this.slice () ), true );
  return this;
};


// @require core/cash.ts
// @require ./before.ts
// @require ./remove.ts

interface Cash {
  replaceWith ( selector: Selector ): this;
}

Cash.prototype.replaceWith = function ( this: Cash, selector: Selector ) {
  return this.before ( selector ).remove ();
};


// @require core/cash.ts
// @require ./replace_with.ts

interface Cash {
  replaceAll ( selector: Selector ): this;
}

Cash.prototype.replaceAll = function ( this: Cash, selector: Selector ) {
  cash ( selector ).replaceWith ( this );
  return this;
};


// @require core/cash.ts
// @require collection/first.ts
// @require manipulation/append_to.ts

interface Cash {
  wrapAll ( selector?: Selector ): this;
}

Cash.prototype.wrapAll = function ( this: Cash, selector?: Selector ) {

  if ( this[0] ) {

    const structure = cash ( selector );

    this.first ().before ( structure );

    let wrapper = structure[0] as Element;

    while ( wrapper.children.length ) wrapper = wrapper.firstElementChild;

    this.appendTo ( wrapper );

  }

  return this;

};


// @require core/cash.ts
// @require collection/each.ts
// @require ./wrap_all.ts

interface Cash {
  wrap ( selector?: Selector ): this;
}

Cash.prototype.wrap = function ( this: Cash, selector?: Selector ) {

  return this.each ( ( index, ele ) => {

    const wrapper = cash ( selector )[0];

    cash ( ele ).wrapAll ( !index ? wrapper : wrapper.cloneNode ( true ) );

  });

};


// @require core/cash.ts
// @require collection/first.ts
// @require manipulation/append_to.ts

interface Cash {
  wrapInner ( selector?: Selector ): this;
}

Cash.prototype.wrapInner = function ( this: Cash, selector?: Selector ) {

  return this.each ( ( i, ele ) => {

    const $ele = cash ( ele ),
          contents = $ele.contents ();

    contents.length ? contents.wrapAll ( selector ) : $ele.append ( selector );

  });

};


// @optional ./after.ts
// @optional ./append.ts
// @optional ./append_to.ts
// @optional ./before.ts
// @optional ./clone.ts
// @optional ./detach.ts
// @optional ./empty.ts
// @optional ./html.ts
// @optional ./insert_after.ts
// @optional ./insert_before.ts
// @optional ./prepend.ts
// @optional ./prepend_to.ts
// @optional ./remove.ts
// @optional ./replace_all.ts
// @optional ./replace_with.ts
// @optional ./text.ts
// @optional ./unwrap.ts
// @optional ./wrap.ts
// @optional ./wrap_all.ts
// @optional ./wrap_inner.ts


// @require core/cash.ts
// @require core/find.ts
// @require core/type_checking.ts
// @require collection/filter.ts

interface Cash {
  has ( selector: string | HTMLElement ): Cash;
}

Cash.prototype.has = function ( this: Cash, selector: string | HTMLElement ) {

  const comparator = isString ( selector )
                       ? ( i, ele ) => !!find ( selector, ele ).length
                       : ( i, ele ) => ele.contains ( selector );

  return this.filter ( comparator );

};


// @require core/cash.ts
// @require core/get_compare_function.ts
// @require collection/each.ts

interface Cash {
  is ( comparator: Comparator ): boolean;
}

Cash.prototype.is = function ( this: Cash, comparator: Comparator ) {

  if ( !comparator || !this[0] ) return false;

  const compare = getCompareFunction ( comparator );

  let check = false;

  this.each ( ( i, ele ) => {
    check = compare.call ( ele, i, ele );
    return !check;
  });

  return check;

};


// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  next ( comparator?: Comparator, _all?: boolean ): Cash;
}

Cash.prototype.next = function ( this: Cash, comparator?: Comparator, _all?: boolean ) {

  return filtered ( cash ( unique ( pluck ( this, 'nextElementSibling', _all ) ) ), comparator );

};


// @require ./next.ts

interface Cash {
  nextAll ( comparator?: Comparator): Cash;
}

Cash.prototype.nextAll = function ( this: Cash, comparator?: Comparator ) {

  return this.next ( comparator, true );

};


// @require core/cash.ts
// @require core/get_compare_function.ts
// @require collection/filter.ts

interface Cash {
  not ( comparator: Comparator ): Cash;
}

Cash.prototype.not = function ( this: Cash, comparator: Comparator ) {

  if ( !comparator || !this[0] ) return this;

  const compare = getCompareFunction ( comparator );

  return this.filter ( ( i, ele ) => !compare.call ( ele, i, ele ) );

};


// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  parent ( comparator?: Comparator ): Cash;
}

Cash.prototype.parent = function ( this: Cash, comparator?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, 'parentNode' ) ) ), comparator );

};


// @require core/cash.ts
// @require core/variables.ts
// @require traversal/children.ts
// @require traversal/parent.ts
// @require ./get.ts

interface Cash {
  index ( selector?: Selector ): number;
}

Cash.prototype.index = function ( this: Cash, selector?: Selector ) {

  const child = selector ? cash ( selector )[0] : this[0],
        collection = selector ? this : cash ( child ).parent ().children ();

  return indexOf.call ( collection, child );

};


// @optional ./add.ts
// @optional ./each.ts
// @optional ./eq.ts
// @optional ./filter.ts
// @optional ./first.ts
// @optional ./get.ts
// @optional ./indexFn.ts
// @optional ./last.ts
// @optional ./map.ts
// @optional ./slice.ts


// @require core/cash.ts
// @require collection/filter.ts
// @require ./is.ts
// @require ./parent.ts

interface Cash {
  closest ( comparator: Comparator ): Cash;
}

Cash.prototype.closest = function ( this: Cash, comparator: Comparator ) {

  if ( !comparator || !this[0] ) return cash ();

  const filtered = this.filter ( comparator );

  if ( filtered.length ) return filtered;

  return this.parent ().closest ( comparator );

};


// @require core/cash.ts
// @require core/filtered.ts
// @require core/matches.ts
// @require core/unique.ts
// @require core/variables.ts
// @require collection/each.ts

interface Cash {
  parents ( comparator?: Comparator ): Cash;
}

Cash.prototype.parents = function ( this: Cash, comparator?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, 'parentElement', true ) ) ), comparator );

};


// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  prev ( comparator?: Comparator, _all?: boolean ): Cash;
}

Cash.prototype.prev = function ( this: Cash, comparator?: Comparator, _all?: boolean ) {

  return filtered ( cash ( unique ( pluck ( this, 'previousElementSibling', _all ) ) ), comparator );

};


// @require ./prev.ts

interface Cash {
  prevAll ( comparator?: Comparator ): Cash;
}

Cash.prototype.prevAll = function ( this: Cash, comparator?: Comparator ) {

  return this.prev ( comparator, true );

};


// @require core/cash.ts
// @require core/filtered.ts
// @require collection/filter.ts
// @require ./children.ts
// @require ./parent.ts

interface Cash {
  siblings ( comparator?: Comparator ): Cash;
}

Cash.prototype.siblings = function ( this: Cash, comparator?: Comparator ) {

  const ele = this[0];

  return filtered ( this.parent ().children ().filter ( ( i, child ) => child !== ele ), comparator );

};


// @optional ./children.ts
// @optional ./closest.ts
// @optional ./contents.ts
// @optional ./find.ts
// @optional ./has.ts
// @optional ./is.ts
// @optional ./next.ts
// @optional ./not.ts
// @optional ./parent.ts
// @optional ./parents.ts
// @optional ./prev.ts
// @optional ./siblings.ts


// @optional attributes/index.ts
// @optional collection/index.ts
// @optional css/index.ts
// @optional data/index.ts
// @optional dimensions/index.ts
// @optional effects/index.ts
// @optional events/index.ts
// @optional forms/index.ts
// @optional manipulation/index.ts
// @optional offset/index.ts
// @optional traversal/index.ts
// @require core/index.ts


// @priority -100
// @require ./cash.ts

export default cash;
