function enumerateItems(input: string[]): string {
  return input.join(', ').replace(/, ([^,]*)$/, ' und $1');
}

const StringUtils = { enumerate: enumerateItems };

export default StringUtils;
