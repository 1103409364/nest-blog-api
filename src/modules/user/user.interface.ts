export interface UserData {
  username: string;
  email: string;
  token: string;
  bio: string;
  image?: string;
  following?: boolean;
}

export interface UserRO {
  user: UserData;
}
