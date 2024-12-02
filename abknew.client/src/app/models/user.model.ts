export interface User
{
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  usercode: string;
  email: string;
  password: string;
  profileImage: string;
  remarks?: string;
  isOnline?: boolean;
  phone: string;
  userRoles?: string;
  emailVerifiedAt?: string;
  lastActivity?: string;
  createdAt: string;
  roleId: string;
}
