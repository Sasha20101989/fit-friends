export const AUTH_TOKEN_KEY_NAME = 'fit-friends-token';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveTokens = (accessToken: Token, refreshToken: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, accessToken);
  document.cookie = `refreshToken=${refreshToken}; path=/;`;
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
