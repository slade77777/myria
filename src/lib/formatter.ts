export function formatCurrency(num: number | string, trun?: number) {
  let formattedValue = num;
  if (trun) {
    // @ts-ignore
    formattedValue = formattedValue.toFixed(trun);
  } else {
    formattedValue = formattedValue.toString();
  }
  const pt = `\\B(?=(\\d{3})+(?!\\d))`;
  const rex = new RegExp(pt, 'g');
  formattedValue = formattedValue.toString().replace(rex, ',');
  return formattedValue;
}
