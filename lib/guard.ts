// // src/lib/guards.ts

// export function hasRole(userRole: string | undefined, allowed: string[] = []) {
//   if (!userRole) return false;
//   return allowed.includes(userRole);
// }

// export function canDo(userRole: string | undefined, permissionKey: keyof typeof Permissions) {
//   if (!userRole) return false;
//   return Permissions[permissionKey].includes(userRole);
// }
