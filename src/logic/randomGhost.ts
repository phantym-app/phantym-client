const randomChoose = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

export default () =>
  randomChoose([
    'Spirit',
    'Wraith',
    'Phantom',
    'Poltergeist',
    'Banshee',
    'Revenant',
    'Shade',
    'Yurei',
    '👻',
    'Casper',
    'Ghost',
    'Spectre',
  ]);
