// src/lib/roles.ts
export const Roles = {
  ADMIN: "admin",
  SERVER: "server",
  CASHIER: "cashier",
  COOK: "cook",
} as const;

export type Role = typeof Roles[keyof typeof Roles];

export const Permissions = {
  MANAGE_USERS: [Roles.ADMIN],
  TAKE_ORDER: [Roles.SERVER, Roles.ADMIN],
  DO_PAYMENT: [Roles.CASHIER, Roles.ADMIN],
  MANAGE_KITCHEN: [Roles.COOK, Roles.ADMIN],
  VIEW_REPORTS: [Roles.ADMIN, Roles.CASHIER, Roles.SERVER],
};
