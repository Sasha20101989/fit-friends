export enum Token {
  Access = 'accessToken',
  Refresh = 'refreshToken'
}

export const getRefreshToken = (): string => {
  const token = localStorage.getItem(Token.Refresh);
  return token ?? '';
};

export const getAccessToken = (): string => {
  const cookies = document.cookie.split('; ');
  const accessTokenCookie = cookies.find((cookie) => cookie.startsWith(`${Token.Access}=`));

  if (accessTokenCookie) {
    const [, accessToken] = accessTokenCookie.split('=');
    return accessToken;
  }

  return '';
};

export const updateAccessToken = (accessToken: Token.Access) => {
  document.cookie = `${Token.Access}=; path=/;`;
  document.cookie = `${Token.Access}=${accessToken}; path=/;`;
};

export const updateRefreshToken = (refreshToken: Token.Refresh): void => {
  localStorage.removeItem(Token.Refresh);
  localStorage.setItem(Token.Refresh, refreshToken);
};
