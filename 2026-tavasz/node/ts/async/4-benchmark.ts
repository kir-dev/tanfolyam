import { checkFriendsAwait } from './2-async-await';
import { checkFriendsFaster } from './3-concurrency';

const benchmark = async () => {
  console.time('checkFriendsAwait');
  await checkFriendsAwait();
  console.timeEnd('checkFriendsAwait');

  console.time('checkFriendsFaster');
  await checkFriendsFaster();
  console.timeEnd('checkFriendsFaster');
};

benchmark();
