import * as v from 'valibot';

export const UserItemSchema = v.object({
  id: v.string(),
  name: v.string(),
  email: v.pipe(v.string(), v.email()),
  role: v.picklist(['admin', 'editor', 'viewer']),
  status: v.picklist(['active', 'inactive', 'pending']),
  lastActive: v.string(),
});

export type UserItem = v.InferOutput<typeof UserItemSchema>;

export const UserListResponseSchema = v.object({
  items: v.array(UserItemSchema),
  total: v.number(),
  page: v.number(),
  limit: v.number(),
});

export type UserListResponse = v.InferOutput<typeof UserListResponseSchema>;
