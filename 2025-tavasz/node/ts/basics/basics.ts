// interfaces
interface Kitty {
  name: string;
  age?: number;
  children: Kitty[] | string[];
}

const array: Kitty[] = [
  {
    name: 'Cirmos',
    age: 1,
    children: ['Scruffles', 'Snowballs II'],
  },
  { name: 'Foltos', children: [] },
];

// functions
function logFunction(element: Kitty, index: number): void {
  console.log(`${index} - ${element.name}: ${element.age ?? 'Újszülött'}.`);
}

const logArrowFunction = (element: Kitty, index: number): void => {
  console.log(
    `${index} - ${element.name}: ${
      element.age ? 'Nem újszülött' : 'Újszülött'
    }.`
  );
};

console.log('Old way:');
for (let i = 0; i < array.length; ++i) {
  logFunction(array[i], i);
}

console.log('\nArrow function way:');
array.forEach((element, index) => {
  logArrowFunction(element, index);
});
