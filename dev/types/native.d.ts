type fn = (any: any) => any;
declare function pipe(...fns: (fn | string)[]): (arg: any) => any;
declare function importScript(url: string): Promise<Event>;
