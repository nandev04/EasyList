interface usersType {
  username: string;
  password: string;
  email: string;
  id: string;
}

interface CreateUserType extends Omit<usersType, 'password' | 'id'> {
  hashPassword: string;
}

export { usersType, CreateUserType };
