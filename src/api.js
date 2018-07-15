import axios from 'axios';
const url = 'https://hb-northcoders-news-api.herokuapp.com/api';

export const getUsernames = () => {
  return axios.get(`${url}/users`).then(res => {
    return res.data.users.map(user => user.username);
  });
};

export const getArticles = () => {
  return axios.get(`${url}/articles`).then(res => {
    return res.data.articles;
  });
};

export const getComments = article_id => {
  return axios.get(`${url}/articles/${article_id}/comments`).then(res => {
    return res.data.comments;
  });
};

export const getArticleById = article_id => {
  return axios.get(`${url}/articles/${article_id}`).then(res => {
    return res.data.article;
  });
};

export const getTopics = () => {
  return axios.get(`${url}/topics`).then(res => {
    return res.data.topics;
  });
};

export const getArticlesByTopic = topic => {
  return axios.get(`${url}/topics/${topic}/articles`).then(res => {
    return res.data.articles;
  });
};

export const castVote = (contentType, contentId, voteInc) => {
  return axios
    .put(`${url}/${contentType}/${contentId}?vote=${voteInc}`)
    .then(res => {
      return res.data;
    });
};

export const postComment = (articleId, newComment) => {
  return axios
    .post(`${url}/articles/${articleId}/comments`, {
      comment: newComment
    })
    .then(res => {
      return res.data.comment;
    });
};

export const postArticle = (
  newArticleTitle,
  newArticleBody,
  newArticleTopic
) => {
  return axios
    .post(`${url}/topics/${newArticleTopic}/articles`, {
      title: newArticleTitle,
      body: newArticleBody
    })
    .then(res => {
      return res.data.article;
    });
};

export const deleteComment = commentId => {
  return axios.delete(`${url}/comments/${commentId}`).then(res => {
    return res.data;
  });
};
