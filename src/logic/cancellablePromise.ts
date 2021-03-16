export default class CancellablePromise<T> extends Promise<T> {
  cancelled = false;

  constructor(executor: (resolve: (value: T) => void, reject: (reason?: any) => void) => void) {
    super((resolve, reject) =>
      executor(value => {
        if (!this.cancelled) resolve(value);
      }, reject),
    );
  }

  cancel() {
    this.cancelled = true;
  }
}
