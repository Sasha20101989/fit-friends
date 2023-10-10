import * as crypto from 'node:crypto';

export function getFullServerPath(host: string, port: number){
  return `http://${host}:${port}`;
}

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
