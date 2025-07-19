export interface User {
  id: string;
  nickname: string;
  role: string;
}

export interface UserToken {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

export interface AuthState {
  user: User | null;
  token: UserToken | null;
  isAuthenticated: boolean;
}
