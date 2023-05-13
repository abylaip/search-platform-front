export interface IUser {
  id?: string;
  email: string;
  userType?: null;
  phoneNumber?: string;
  surname?: string;
  patronymic?: string;
  birthDate?: string;
  status: string;
  profile?: null;
  thesisStatus: string;
}

export interface IDiploma {
  title: string;
  description: string;
}
