import { HOST } from './env'

export const getFiles = (setFiles, query = null) => {
  return fetch(`${HOST}/files?query=${query || ""}`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${getAuthentication()}`,
    },
  })
    .then((res) => res.json())
    .then((res) => setFiles(res.files));
};

export const getFile = (id, setText, setCurrentId) => {
  return fetch(`${HOST}/files/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${getAuthentication()}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      setText(res.content);
      setCurrentId(id);
    });
};

export const postFile = (content, setCurrentId) => {
  return fetch(`${HOST}/files`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${getAuthentication()}`,
    },
    body: content,
  })
    .then((response) => response.json())
    .then((res) => setCurrentId(res.file.id.toString()));
};

export const updateFile = (content, currentId) => {
  return fetch(`${HOST}/files/${currentId}`, {
    method: "PUT",
    headers: {
      Authorization: `Basic ${getAuthentication()}`,
    },
    body: content,
  }).then((response) => response.json());
};

export const deleteFile = (currentId) => {
  return fetch(`${HOST}/files/${currentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${getAuthentication()}`,
    },
  }).then((response) => response.json());
};

const getAuthentication = () => {
  const name = localStorage.getItem("textli.n");
  const password = localStorage.getItem("textli.p");

  const token = name + ":" + password;
  return btoa(token);
};
