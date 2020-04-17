import { Card } from '../interfaces/card.interface';

const colors: string[] = ['Kreuz', 'Karo', 'Herz', 'Pik'];
const types: string[] = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Bube',
  'Dame',
  'König',
  'Ass'
];

const joker: Card = {
  label: 'Joker',
  value: 54,
  icon: ':black_joker:'
};

export const cardsConfig: Card[] = types
  .reduce((list, type) => {
    return [
      ...list,
      ...colors.map(color => ({
        label: `${color} ${type}`,
        value: 0,
        icon: ''
      }))
    ].map((card, i) => ({ ...card, value: i + 1 }));
  }, [])
  .concat([joker, joker]);
