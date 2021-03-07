import 'preact-router/match';

declare module 'preact-router/match' {
  export interface LinkProps {
    href?: string;
    class?;
  }
}
