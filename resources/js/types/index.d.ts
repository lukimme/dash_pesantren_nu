export { type Role } from './role';
export { type Permission } from './permission';
export { type Program } from './program';
export { type Tingkat } from './tingkat';
export { type Pesantren, type PesantrenWithUserPermissions } from './pesantren';
export { type PermissionsHandler } from './permissions-handler';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
