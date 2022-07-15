const createDoc = async (req, res) => {
  res.status(200).send('createDoc');
};

const deleteDoc = async (req, res) => {
  res.status(200).send('deleteDoc');
};

const getDoc = async (req, res) => {
  res.status(200).send('getDoc');
};

const getAllDocs = async (req, res) => {
  res.status(200).send('getAllDocs');
};

const updateDoc = async (req, res) => {
  res.status(200).send('updateDoc');
};

const showStats = async (req, res) => {
  res.status(200).send('showStats');
};

export { createDoc, deleteDoc, getDoc, getAllDocs, updateDoc, showStats };