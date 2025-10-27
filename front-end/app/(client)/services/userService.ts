import { ajaxInstance } from "@/lib/ajaxConfig";
import type { User } from "@/types/user";

export const userService = {
  getUser: (id: number) => ajaxInstance.get<User>(`/users/${id}`),
  updateUser: (data: User) => ajaxInstance.put<User>(`/users/${data.id}`, data),
  getAll: () => ajaxInstance.get<User[]>("/users"),
};
