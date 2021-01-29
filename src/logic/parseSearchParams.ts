const parseSearchParams = (search: string): { [key: string]: string } =>
  Object.fromEntries(
    !search.length
      ? [[]]
      : search
          .split('?')[1]
          .split('&')
          .map(x => x.split('=')),
  );

export default parseSearchParams;
