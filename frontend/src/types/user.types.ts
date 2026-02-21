type UserDTO = {
  email: string;
  username: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  avatarKey: string | null;
  firstName: string;
};

export default UserDTO;
