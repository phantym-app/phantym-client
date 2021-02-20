import 'preact';
import 'preact/hooks';

type ToggleableString = { [key: string]: boolean };

declare module 'preact' {
  namespace JSX {
    interface HTMLAttributes<any> {
      class?: string | ToggleableString | Array<string | ToggleableString>;
    }
  }
}

declare module 'preact/hooks' {
  function useEffect(effect: EffectCallback | ((...any: any) => Promise<void>), inputs?: Inputs): void;
}
