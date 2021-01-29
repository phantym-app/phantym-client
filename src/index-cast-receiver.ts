import App from './routes/Cast/Cast.svelte';
import './global.scss';

var app = new App({ target: document.body });
export default app;

if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.$destroy();
  });
}
