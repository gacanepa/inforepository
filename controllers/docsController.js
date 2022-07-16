const createDoc = async (_req, res) => {
  res.status(200).send('createDoc');
};

const deleteDoc = async (_req, res) => {
  res.status(200).send('deleteDoc');
};

const getDoc = async (_req, res) => {
  res.status(200).send('getDoc');
};

const getAllDocs = async (_req, res) => {
  res.status(200).send('getAllDocs');
};

const updateDoc = async (_req, res) => {
  res.status(200).send('updateDoc');
};

const showStats = async (_req, res) => {
  res.status(200).send('showStats');
};

export { createDoc, deleteDoc, getDoc, getAllDocs, updateDoc, showStats };