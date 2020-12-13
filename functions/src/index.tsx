import * as functions from 'firebase-functions';
import { h } from 'preact';

import express from 'express';
import render from 'preact-render-to-string';

import Game from '../../src/routes/Game';

const template = (innerHtml?: string) => `
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Unity WebGL Player | webFPS</title>
    <link rel="shortcut icon" href="TemplateData/favicon.ico" />
    <link rel="stylesheet" href="TemplateData/style.css" />

    <script src="TemplateData/UnityProgress.js"></script>
    <script src="Build/UnityLoader.js"></script>
    <script>
      UnityLoader.instantiate("unityContainer", "Build/Desktop.json", {
        onProgress: UnityProgress,
      })
    </script>
  </head>
  <body style="background-color: #202020">
    <div class="webgl-content" style="width: 90%; height: 90%">
      <div id="unityContainer" style="width: 100%; height: 100%"></div>

      <div class="fullscreen" onclick="unityInstance.SetFullscreen(1)"></div>
    </div>
    ${innerHtml}
  </body>
</html>
`;

const ssr = express().get('*', (req, res) => {
  // let html = render(<Game />);
  res.send(template());
});

exports.ssr = functions.region('europe-west2').https.onRequest(ssr);
