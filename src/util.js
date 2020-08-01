import { HOST } from "./env";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastStyle } from "./ToastComponents";
import React from "react";

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
  const name = localStorage.getItem("textli.n");
  const password = localStorage.getItem("textli.p");

  const token = name + ":" + password;
  return btoa(token);
};

export const showErrorToast = (err) => {
  toast.error(<ToastStyle>{err.toString()}</ToastStyle>);
};
