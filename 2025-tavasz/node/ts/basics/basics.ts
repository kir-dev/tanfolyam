// interfaces
interface Kitty {
  name: string;
  age?: number;
  children: (Kitty | string)[];
}

const array: Kitty[] = [
  {
    name: "Cirmos",
    age: 1,
    children: ["Scruffles", "Snowballs II", { children: [], name: "d" }],
  },
  { name: "Foltos", children: [] },
];

// functions
function funnyLog(element: Kitty, index: number): void {
  console.log(`${index} - ${element.name}: ${element.age ?? "Újszülött"}.`);
}

const funnyLogArrayFunction = (element: Kitty, index: number): void => {
  console.log(`${index} - ${element.name}: ${element.age ?? "Újszülött"}.`);
};

console.log("Old way:");
for (let i = 0; i < array.length; ++i) {
  funnyLog(array[i], i);
}

console.log("\nArrow function way:");
array.forEach((element, index) => {
  funnyLog(element, index);
});
