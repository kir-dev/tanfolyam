import { getFruit } from './2-async-await';

const makeSmoothieFaster = async() => {
    let a = getFruit('pineapple');
    let b = getFruit('strawberry');

    const smoothie = await Promise.all([a, b])

    return smoothie;
}


const fruitRace = async() => {
    const a = getFruit('pineapple');
    const b = getFruit('strawberry');

    const winner = await Promise.race([a, b])

    return winner;
}

fruitRace().then(console.log)
fruitRace().then(console.log)
fruitRace().then(console.log)
fruitRace().then(console.log)
fruitRace().then(console.log)
