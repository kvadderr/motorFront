export type SignUpDto = Readonly<{
  email: string;
  password?: string;
  phone?: string;
  role: string;
  token?: string;
  franchisee?: {};
}>;

export type SignUpWithoutPassDto = Exclude<
  SignUpDto,
  'password' | 'verificationPassword'
>;
