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
    organization?: {
      id?: 0;
      nameKk: string;
      nameRu: string;
      nameEn: string;
    };
  };
  agreement: boolean;
}

export interface IDiploma {
  content: IDiplomaContent[];
}

export interface IDiplomaContent {
  id?: number;
  createdAt: string;
  createdBy: number;
  modifiedAt: string;
  name: string;
  category: string;
  dissertAbstract: string;
  organizationName: string;
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

export interface IOrganization {
  content: IOrganizationContent[];
}

interface IOrganizationContent {
  id: number;
  nameRu: string;
}

export interface IToken {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}
