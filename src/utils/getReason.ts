export function getReason(comment = '', prefix = 'für'): string {
  return comment ? ` ${prefix} "${comment}"` : '';
}
