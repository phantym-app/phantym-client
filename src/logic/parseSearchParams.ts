const parseSearchParams = (search: string): { [key: string]: string } =>
  Object.fromEntries(
    search
      .split('?')[1]
      .split('&')
      .map(x => x.split('=')),
  );

export default parseSearchParams;
