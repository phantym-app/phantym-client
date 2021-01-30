const pipe = (...fns) => args => fns.reduce((A, fn) => fn(A), args);
export default pipe;
