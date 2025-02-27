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

// Promise
const checkFriendsPromise = () => {
  let user1;
  return fetchUser('1')
    .then((value) => {
      user1 = value;
      return fetchUser('2');
    })
    .then((user2) => [user2, user1]);
};

// Async + Await
export const checkFriendsAwait = async () => {
  try {
    const user1 = await fetchUser('1');
    const user2 = await fetchUser('2');
    return [user1, user2];
  } catch {}
};

// checkFriendsPromise().then((a) => console.log(a));
// checkFriendsAwait().then(console.log);
