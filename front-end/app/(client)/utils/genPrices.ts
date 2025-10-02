export function generatePrices(max: number, step: number = 1000000): number[] {
  const prices: number[] = [];
  for (let i = 0; i <= max; i += step) {
    prices.push(i);
  }
  return prices;
}
