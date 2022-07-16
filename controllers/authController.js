const register = async (_req, res) => {
  res.status(200).send('register');
};

const login = async (_req, res) => {
  res.status(200).send('login');
};

const updateUser = async (_req, res) => {
  res.status(200).send('updateUser');
};

export { register, login, updateUser };
