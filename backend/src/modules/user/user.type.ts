interface usersType {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  id: string;
}

interface CreateUserType extends Omit<usersType, 'password'> {
  hashPassword: string;
}

export { usersType, CreateUserType };
