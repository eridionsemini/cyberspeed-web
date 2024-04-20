import {Movie as MovieType} from 'movies-sdk';

export const isFavourite = (favourites: Array<MovieType>, id: string) =>
  favourites.some(fav => fav.imdbID === id);

export const debounce = <F extends (...args: any[]) => any>(func: F, delay: number): F => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  } as any;
};

export function convertStringToArray(inputString: string): string[] {
  const words: string[] = [];

  const wordList = inputString.split(',');
  wordList.forEach(word => {
    const trimmedWord = word.trim();
    if (trimmedWord !== '') {
      words.push(trimmedWord);
    }
  });

  return words;
}

export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunkedArray: T[][] = [];
  let index = 0;
  if (!array) return [[]];
  while (index < array.length) {
    chunkedArray.push(array.slice(index, index + chunkSize));
    index += chunkSize;
  }

  return chunkedArray;
}
