declare function pipe(...fns: (fn | string)[]): (arg: any) => any;
declare function loadScript(url: string): Promise<Event>;
declare function wait(ms: number): <T>(v: T) => Promise<T>;
