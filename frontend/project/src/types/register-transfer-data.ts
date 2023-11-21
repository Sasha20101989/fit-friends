import { Gender } from './gender.enum';
import { Location } from './location.enum';
import { Role } from './role.enum';


export type RegisterTransferData = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  gender: Gender;
  role: Role;
  birthDate?: string;
  location: Location
};
