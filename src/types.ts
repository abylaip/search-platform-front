export interface IUser {
  id?: number;
  email: string;
  phoneNumber: string;
  firstName: string;
  surname: string;
  patronymic: string;
  birthDate: string;
  profile: {
    id?: number;
    iin: string;
    organization: {
      id?: 0;
      nameKk: string;
      nameRu: string;
      nameEn: string;
    };
  };
  agreement: boolean;
}

export interface IDiploma {
  id?: number;
  createdAt: string;
  modifiedAt: string;
  name: string;
  dissertAbstract: string;
  users: [
    {
      id: 0;
    }
  ];
  files: [
    {
      name: string;
      size: number;
      mimeType: string;
      hash: string;
    }
  ];
}
