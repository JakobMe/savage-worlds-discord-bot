import moment from 'moment';

export function getTimestamp(): string {
  return moment().format('DD.MM.YYYY HH:mm:ss');
}
