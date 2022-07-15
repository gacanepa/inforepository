const register = async (req, res) => {
  res.status(200).send('register');
};

const login = async (req, res) => {
  res.status(200).send('login');
};

const updateUser = async (req, res) => {
  res.status(200).send('updateUser');
};

export { register, login, updateUser };
