import 'preact';

type ToggleableString = { [key: string]: boolean };

declare module 'preact' {
  namespace JSX {
    interface HTMLAttributes<any> {
      class?: string | ToggleableString | Array<string | ToggleableString>;
    }
  }
}
