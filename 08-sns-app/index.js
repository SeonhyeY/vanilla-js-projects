const feed = document.querySelector('.feed');

const getUserById = (id) => {
  const URL = `https://jsonplaceholder.typicode.com/users/${id}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
};

const createPost = async (post) => {
  const wrap = document.createElement('div');
  const user = document.createElement('a');
  const article = document.createElement('div');

  wrap.id = post.id;
  article.innerText = post.body;

  const userInfo = await getUserById(post.userId);
  user.innerText = `@${userInfo.username}`;
  user.href = './user.html';
  user.addEventListener('click', () => {
    localStorage.setItem('userId', post.userId);
  });

  wrap.className = 'post';
  user.className = 'user';
  article.className = 'article';

  wrap.append(user, article);
  feed.append(wrap);
};

const getAllPosts = () => {
  const URL = 'https://jsonplaceholder.typicode.com/posts';

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
        createPost(post);
      });
    });
};
if (feed) getAllPosts();
