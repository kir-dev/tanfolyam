import fetch from 'node-fetch';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export const fetchUser = async (userId: string): Promise<User> => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
    (res) => res.json()
  );
};

// Tegyük fel, hogy a Facebook backendjén dolgozunk, a barátnak jelölés funkciót szeretnénk implementálni
// Azt a kis feladatot kaptuk, hogy írjunk egy segédfüggvényt,
// ami két felhasználó adait lekéri az adatbázisból, és egy tömbben visszaküldi.
