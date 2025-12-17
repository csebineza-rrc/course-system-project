/**
 * @param hasRole - An array of allowed roles
 * @param allowSameUser - Boolean flag indicating whether a user can access their own resources
 * @example { hasRole: ["admin", "manager"], allowSameUser: true } as AuthorizationOptions
 */
export interface AuthorizationOptions {
    hasRole: Array<"admin" | "instructor" | "student" >;
    allowSameUser?: boolean;
}
