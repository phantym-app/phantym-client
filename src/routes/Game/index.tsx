// import { h } from 'preact';

// import { useLocation } from 'react-router-dom';
// import { useState } from 'preact/hooks';
// import useScript from '@logic/useScript';

// import parseSearchParams from '@logic/parseSearchParams';
// // import { getGameBlob } from '@logic/firebase/storage';

// //   <link rel="shortcut icon" href="TemplateData/favicon.ico" />
// //   <link rel="stylesheet" href="TemplateData/style.css" />

// function Game() {
//   const { search } = useLocation();
//   const { id: gameId, room: roomId } = parseSearchParams(search);

//   const [unityInstance, setUnityInstance] = useState<any>(undefined);

//   const scriptsLoaded = Promise.all([useScript('TemplateData/UnityProgress.js'), useScript('UnityLoader.js')]);
//   scriptsLoaded.then(instantiateGame).then(setUnityInstance);

//   async function instantiateGame() {
//     const { UnityLoader, UnityProgress }: any = window;

//     if (UnityLoader === undefined || UnityProgress === undefined) {
//       throw 'UnityLoader or UnityProgress failed to load';
//     }

//     // const gameBlob = await getGameBlob();
//     // const gameBlobUrl = URL.createObjectURL(gameBlob);

//     const config = `{
//       "companyName": "DefaultCompany",
//       "productName": "webPlatformer",
//       "productVersion": "1.4.0",
//       "dataUrl": "https://firebasestorage.googleapis.com/v0/b/un-sole.appspot.com/o/games%2Fwebplatformer%2FwebPlatformer.data.unityweb?alt=media&token=5db7ce6e-6d48-45f9-a15b-ea44d32ae21b",
//       "wasmCodeUrl": "https://firebasestorage.googleapis.com/v0/b/un-sole.appspot.com/o/games%2Fwebplatformer%2FwebPlatformer.wasm.code.unityweb?alt=media&token=f0c22a10-2bcd-4b8f-a068-c6356be0cc66",
//       "wasmFrameworkUrl": "https://firebasestorage.googleapis.com/v0/b/un-sole.appspot.com/o/games%2Fwebplatformer%2FwebPlatformer.wasm.framework.unityweb?alt=media&token=1bae2784-99f1-4c5c-8da9-91fa7a7c584a",
//       "graphicsAPI": ["WebGL 2.0", "WebGL 1.0"],
//       "webglContextAttributes": { "preserveDrawingBuffer": false },
//       "splashScreenStyle": "Dark",
//       "backgroundColor": "#231F20",
//       "cacheControl": { "default": "must-revalidate" },
//       "developmentBuild": false,
//       "multithreading": false,
//       "unityVersion": "2019.4.14f1"
//     }`;

//     const bytes = new TextEncoder().encode(config);
//     const blobUrl = URL.createObjectURL(new Blob([bytes], { type: 'application/json;charset=utf-8' }));
//     return UnityLoader.instantiate('unityContainer', blobUrl, {
//       onProgress: UnityProgress,
//     });
//   }

//   return (
//     <div class='webgl-content'>
//       <div id='unityContainer' style='width: 960px; height: 600px'></div>
//       <div class='getGameBlobter'>
//         <div class='webgl-logo'></div>
//         <div
//           class='fullscreen'
//           onClick={function () {
//             unityInstance.SetFullscreen(1);
//           }}></div>
//         <div class='title'>webPlatformer</div>
//       </div>
//     </div>
//   );
// }

// export default Game;
