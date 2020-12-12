import * as functions from 'firebase-functions';
import { h } from 'preact';
/** @jsx h */
import express from 'express';
import render from 'preact-render-to-string';

// const Foo = () => (
//   <div>
//     <h5>hello</h5>
//     <p>This page is ssr.</p>
//   </div>
// );

const ssr = express().get('*', (req, res) => {
  // let html = render(h(Foo, {}));
  // res.send(`<!DOCTYPE html><html><body>${html}</body></html>`);
  res.send(`<!DOCTYPE html><html><body><h1>hi</h1></body></html>`);
});

exports.ssr = functions.region('europe-west2').https.onRequest(ssr);
