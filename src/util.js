const HOST = 'localhost:5000';

export const getFiles = (setFiles) => {
  fetch(`http://${HOST}/files`).then(res => res.json()).then(res => setFiles(res.files))
}

export const getFile = (id, setText, setCurrentId) => {
  return fetch(`http://${HOST}/files/${id}`).then(res => res.json()).then(res => { setText(res.content); setCurrentId(id) });
}

export const postFile = (content, setCurrentId) => {
  return fetch(`http://${HOST}/files`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/text',
    },
    body: content,
  })
    .then(response => response.json()).then(res => setCurrentId(res.file.id.toString()));
};

export const updateFile = (content, currentId) => {
  return fetch(`http://${HOST}/files/${currentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/text',
    },
    body: content,
  })
    .then(response => response.json());
}

export const deleteFile = (currentId) => {
  return fetch(`http://${HOST}/files/${currentId}`, { method: 'DELETE' }).then(response => response.json());
}
