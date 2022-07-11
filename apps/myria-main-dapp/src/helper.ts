function truncateString(string: string, firstSymbols: number = 4, lastSymbols: number = 4) {
  if (!string) {
    return '';
  }

  const firstLetters = string.slice(0, firstSymbols);
  const lastLetters = string.substr(string.length - lastSymbols);
  return firstLetters + '...' + lastLetters;
}

export default truncateString;
