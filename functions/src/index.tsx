import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert('C:/Users/Oliwer/unsole/un-sole-firebase-adminsdk-libmh-1bbd4b3d11.json'),
  storageBucket: 'gs://un-sole.appspot.com',
});

const bucket = admin.storage().bucket();

const template = `
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
  </body>
</html>
`;

const app = express().use(cors({ origin: true }));

app.get('*', (req, res) => {
  bucket
    .file('games/webplatformer/webPlatformer.framework.wasm')
    .download()
    .then(foo => foo);

  res.send(template);
});

exports.game = functions.https.onRequest(app);
