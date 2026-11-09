export interface IApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface IAdminJwtPayload {
  adminId: string;
  email: string;
}