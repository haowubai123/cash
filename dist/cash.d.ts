interface Event {
    namespace: string;
    data: any;
    relatedTarget?: Node | null;
    ___ifocus?: boolean;
    ___iblur?: boolean;
    ___ot?: string;
    ___td?: boolean;
}
interface Cash {
    [Symbol.iterator](): IterableIterator<EleLoose>;
    [index: number]: EleLoose | undefined;
    length: number;
    splice(start: number, deleteCount?: number): EleLoose[];
    splice(start: number, deleteCount: number, ...items: Ele[]): EleLoose[];
}
interface CashStatic {
    fn: Cash;
}
type falsy = undefined | null | false | 0 | '';
type Ele = Window | Document | HTMLElement | Element | Node;
type EleLoose = HTMLElement & Element & Node;
type Selector = falsy | string | Function | HTMLCollection | NodeList | Ele | Ele[] | ArrayLike<Ele> | Cash;
type Comparator = string | Ele | Cash | ((this: EleLoose, index: number, ele: EleLoose) => boolean);
type Context = Document | HTMLElement | Element;
type PlainObject<T> = Record<string, T>;
type EventCallback = {
    (event: any, data?: any): any;
    guid?: number;
};
declare class Cash {
    constructor(selector?: Selector, context?: Context | Cash);
    init(selector?: Selector, context?: Context | Cash): Cash;
}
declare const cash: ((selector?: Selector, context?: Context | Cash) => Cash) & CashStatic;
interface CashStatic {
    isWindow(x: unknown): x is Window;
    isFunction(x: unknown): x is Function;
    isArray(x: unknown): x is Array<any>;
    isNumeric(x: unknown): boolean;
    isPlainObject(x: unknown): x is PlainObject<any>;
}
type EachArrayCallback<T> = (this: T, index: number, ele: T) => any;
type EachObjectCallback<T> = (this: T, key: string, value: T) => any;
interface CashStatic {
    each<T>(arr: ArrayLike<T>, callback: EachArrayCallback<T>): void;
    each<T>(obj: PlainObject<T>, callback: EachObjectCallback<T>): void;
}
interface Cash {
    each(callback: EachArrayCallback<EleLoose>): this;
}
interface Cash {
    empty(): this;
}
interface CashStatic {
    extend(): any;
    extend(deep: true, target: any, ...sources: any[]): any;
    extend(target: any): typeof cash;
    extend(target: any, ...sources: any[]): any;
}
interface Cash {
    extend(plugins: Record<any, any>): this;
}
interface Cash {
    toggleClass(classes: string, force?: boolean): this;
}
interface Cash {
    addClass(classes: string): this;
}
interface Cash {
    removeAttr(attrs: string): this;
}
interface Cash {
    attr(): undefined;
    attr(attrs: string): string | null;
    attr(attrs: string, value: string): this;
    attr(attrs: Record<string, string>): this;
}
interface Cash {
    removeClass(classes?: string): this;
}
interface Cash {
    hasClass(cls: string): boolean;
}
interface Cash {
    get(): EleLoose[];
    get(index: number): EleLoose | undefined;
}
interface Cash {
    eq(index: number): Cash;
}
interface Cash {
    first(): Cash;
}
interface Cash {
    last(): Cash;
}
interface Cash {
    text(): string;
    text(text: string): this;
}
interface Cash {
    filter(comparator?: Comparator): Cash;
}
interface Cash {
    detach(comparator?: Comparator): this;
}
interface CashStatic {
    parseHTML(html: string): EleLoose[];
}
interface Cash {
    has(selector: string | Node): Cash;
}
interface Cash {
    not(comparator?: Comparator): Cash;
}
interface Cash {
    val(): string | string[];
    val(value: string | string[]): this;
}
interface Cash {
    is(comparator?: Comparator): boolean;
}
interface CashStatic {
    guid: number;
}
interface CashStatic {
    unique<T>(arr: ArrayLike<T>): ArrayLike<T>;
}
interface Cash {
    add(selector: Selector, context?: Context): Cash;
}
interface Cash {
    children(comparator?: Comparator): Cash;
}
interface Cash {
    parent(comparator?: Comparator): Cash;
}
interface Cash {
    index(selector?: Selector): number;
}
interface Cash {
    closest(comparator?: Comparator): Cash;
}
interface Cash {
    siblings(comparator?: Comparator): Cash;
}
interface Cash {
    find(selector: string): Cash;
}
interface Cash {
    after(...selectors: Selector[]): this;
}
interface Cash {
    append(...selectors: Selector[]): this;
}
interface Cash {
    html(): string;
    html(html: string): this;
}
interface Cash {
    appendTo(selector: Selector): this;
}
interface Cash {
    wrapInner(selector?: Selector): this;
}
interface Cash {
    before(...selectors: Selector[]): this;
}
interface Cash {
    wrapAll(selector?: Selector): this;
}
interface Cash {
    wrap(selector?: Selector): this;
}
interface Cash {
    insertAfter(selector: Selector): this;
}
interface Cash {
    insertBefore(selector: Selector): this;
}
interface Cash {
    prepend(...selectors: Selector[]): this;
}
interface Cash {
    prependTo(selector: Selector): this;
}
interface Cash {
    contents(): Cash;
}
interface Cash {
    next(comparator?: Comparator, _all?: boolean, _until?: Comparator): Cash;
}
interface Cash {
    nextAll(comparator?: Comparator): Cash;
}
interface Cash {
    nextUntil(until?: Comparator, comparator?: Comparator): Cash;
}
interface Cash {
    parents(comparator?: Comparator, _until?: Comparator): Cash;
}
interface Cash {
    parentsUntil(until?: Comparator, comparator?: Comparator): Cash;
}
interface Cash {
    prev(comparator?: Comparator, _all?: boolean, _until?: Comparator): Cash;
}
interface Cash {
    prevAll(comparator?: Comparator): Cash;
}
interface Cash {
    prevUntil(until?: Comparator, comparator?: Comparator): Cash;
}
type MapCallback<T> = (this: T, index: number, ele: T) => Ele;
interface Cash {
    map(callback: MapCallback<EleLoose>): Cash;
}
interface Cash {
    clone(): this;
}
interface Cash {
    offsetParent(): Cash;
}
interface Cash {
    slice(start?: number, end?: number): Cash;
}
interface Cash {
    ready(callback: Function): this;
}
interface Cash {
    unwrap(): this;
}
interface Cash {
    offset(): undefined | {
        top: number;
        left: number;
    };
}
interface Cash {
    position(): undefined | {
        top: number;
        left: number;
    };
}
interface Cash {
    prop(prop: string): any;
    prop(prop: string, value: any): this;
    prop(props: Record<string, any>): this;
}
interface Cash {
    removeProp(prop: string): this;
}
interface Cash {
    css(prop: string): string | undefined;
    css(prop: string, value: number | string): this;
    css(props: Record<string, number | string>): this;
}
interface Cash {
    data(): Record<string, any> | undefined;
    data(name: string): any;
    data(name: string, value: any): this;
    data(datas: Record<string, any>): this;
}
interface Cash {
    innerWidth(): number | undefined;
    innerHeight(): number | undefined;
    outerWidth(includeMargins?: boolean): number;
    outerHeight(includeMargins?: boolean): number;
}
interface Cash {
    width(): number;
    width(value: number | string): this;
    height(): number;
    height(value: number | string): this;
}
interface Cash {
    toggle(force?: boolean): this;
}
interface Cash {
    hide(): this;
}
interface Cash {
    show(): this;
}
interface Cash {
    trigger(event: Event | string, data?: any): this;
}
interface Cash {
    off(): this;
    off(events: string): this;
    off(events: Record<string, EventCallback>): this;
    off(events: string, callback: EventCallback): this;
    off(events: string, selector: string, callback: EventCallback): this;
}
interface Cash {
    remove(comparator?: Comparator): this;
}
interface Cash {
    replaceWith(selector: Selector): this;
}
interface Cash {
    replaceAll(selector: Selector): this;
}
interface Cash {
    on(events: Record<string, EventCallback>): this;
    on(events: Record<string, EventCallback>, selector: string): this;
    on(events: Record<string, EventCallback>, data: any): this;
    on(events: Record<string, EventCallback>, selector: string | null | undefined, data: any): this;
    on(events: string, callback: EventCallback): this;
    on(events: string, selector: string, callback: EventCallback): this;
    on(events: string, data: any, callback: EventCallback): this;
    on(events: string, selector: string | null | undefined, data: any, callback: EventCallback, _one?: boolean): this;
}
interface Cash {
    one(events: Record<string, EventCallback>): this;
    one(events: Record<string, EventCallback>, selector: string): this;
    one(events: Record<string, EventCallback>, data: any): this;
    one(events: Record<string, EventCallback>, selector: string | null | undefined, data: any): this;
    one(events: string, callback: EventCallback): this;
    one(events: string, selector: string, callback: EventCallback): this;
    one(events: string, data: any, callback: EventCallback): this;
    one(events: string, selector: string | null | undefined, data: any, callback: EventCallback): this;
}
interface Cash {
    serialize(): string;
}
export default cash;
export { Cash, CashStatic, Ele as Element, Selector, Comparator, Context };
