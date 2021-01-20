// const pipe = (...fns) => (args = null) => fns.reduce((A, fn) => (typeof fn === 'string' ? A[fn] : fn(A)), args);

type fn = (any: any) => any;

declare function pipe(...fns: (fn | string)[]): (arg: any) => any;
