export interface User {
  username: string,
  email: string,
  password: string
}

export interface isUserExist {
  condition: boolean,
  username?: string
  message?: string
}

export interface userFacebookDb {
  userId: string,
  username: string,
  email: string,
  firstName: string,
  lastName: string
}

export interface userGoogleDb {
  email: string,
  username: string
}

export type readDataFromObject = {
  [key: string]: any;
};

