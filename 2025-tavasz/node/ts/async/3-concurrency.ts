import { fetchUser } from './2-async-await';

export const checkFriendsFaster = async () => {
  const a = fetchUser('1');
  const b = fetchUser('2');

  const users = await Promise.all([a, b]);

  return users;
};
