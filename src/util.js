import { HOST } from "./env";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastStyle } from "./ToastComponents";
import React from "react";

export const USERNAME_KEY = 'textli.n';
export const PASSWORD_KEY = 'textli.p';

const api = axios.create({
  baseURL: `${HOST}`,
});

export const getFiles = (setFiles, query = null) => {
  return api
    .get(`/files?query=${query || ""}`, {
      headers: {
        Authorization: `Basic ${getAuthentication()}`,
      },
    })
    .then((res) => res.data)
    .then((res) => setFiles(res.files));
};

export const getFile = (id) => {
  return api
    .get(`/files/${id}`, {
      headers: {
        Authorization: `Basic ${getAuthentication()}`,
      },
    })
    .then((res) => res.data);
};

export const postFile = (content) => {
  return api
    .post(
      "/files",
      { content },
      {
        headers: {
          Authorization: `Basic ${getAuthentication()}`,
        },
      }
    )
    .then((response) => response.data);
};

export const updateFile = (content, currentId) => {
  return api
    .put(
      `/files/${currentId}`,
      { content },
      {
        headers: {
          Authorization: `Basic ${getAuthentication()}`,
        },
      }
    )
    .then((response) => response.data);
};

export const deleteFile = (currentId) => {
  return api
    .delete(`/files/${currentId}`, {
      headers: {
        Authorization: `Basic ${getAuthentication()}`,
      },
    })
    .then((response) => response.data);
};

const getAuthentication = () => {
  const name = localStorage.getItem(USERNAME_KEY);
  const password = localStorage.getItem(PASSWORD_KEY);

  const token = name + ":" + password;
  return btoa(token);
};

export const handleError = (err, setShowLoginScreen) => {
  if(err.response.status) {
    setShowLoginScreen(true);
  } else {
    toast.error(<ToastStyle>{err.toString()}</ToastStyle>);
  }
};
