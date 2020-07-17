export const toF = (c: number): number => (c * 9) / 5 + 32;

export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));
