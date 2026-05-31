export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: "ADMIN";
};

export type LoginResponse = {
  token: string;
  user: AdminUser;
};
