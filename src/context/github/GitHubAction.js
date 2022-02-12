import { createSearchParams } from 'react-router-dom';
import axios from 'axios';
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

// Search users

export const searchUsers = async (text) => {
  const params = createSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

// Get user and repos

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return {
    user: user.data,
    repos: repos.data,
  };
};

// //search a single user
// export const searchUser = async (userid) => {
//   const response = await fetch(`${GITHUB_URL}/users/${userid}`, {
//     headers: {
//       Authorization: `token ${GITHUB_TOKEN}`,
//     },
//   });
//   const data = await response.json();

//   if (response.status === '404') {
//     window.location = '/notfound';
//   } else {
//     return data;
//   }
// };

// // Get user repos

// export const getUserRepos = async (userid) => {
//   const params = createSearchParams({
//     sort: 'created',
//     per_page: 10,
//   });

//   const response = await fetch(
//     `${GITHUB_URL}/users/${userid}/repos?${params}`,
//     {
//       headers: {
//         Authorization: `token ${GITHUB_TOKEN}`,
//       },
//     }
//   );
//   const data = await response.json();
//   return data;
// };

// clear user
