import faker from 'faker';
import { IRefill } from '../interfaces/refills';

export const useFakeRefills = (count: number): IRefill[] => {
  const array = Array.from(Array(count).keys());

  const fakeData = array
    .map(
      (a): IRefill => {
        return {
          id: faker.random.uuid(),
          drugName: faker.commerce.productName(),
          drugDose: faker.random.number(100),
          lastFilled: faker.date.past(),
          rxNumber: faker.random.number({ min: 60000, max: 69999 }).toString(),
        };
      }
    )
    .sort((a: IRefill, b: IRefill) => a.lastFilled < b.lastFilled);

  return fakeData;
};
