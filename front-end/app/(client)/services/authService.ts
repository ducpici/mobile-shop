import { ajaxInstance } from "@/lib/ajaxConfig";
import type { User } from "@/types/user";

export const authService = {
  login: (data: { email: string; password: string }) =>
    ajaxInstance.get<User>(`/users?email=${data.email}&password=${data.password}`),
  checkEmailExists: (email: string) => ajaxInstance.get<User[]>(`/users?email=${email}`),
  register: (data: { name: string; email: string; password: string }) =>
    ajaxInstance.post<User>(`/users`, data),
};
