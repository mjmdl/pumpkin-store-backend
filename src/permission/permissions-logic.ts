import database from "../database";
import User from "../user/user";
import {Permission} from "./permission-entity";

export async function findUserPermissions(user: User): Promise<null | Permission[]> {
    try {
        const userPermissions = await database.manager.query(`
            SELECT p.id, p.name
            FROM users_have_permissions AS uhp
            INNER JOIN users AS u ON uhp.user_id = u.id
            INNER JOIN permissions AS p ON uhp.permission_id = p.id
            WHERE u.id = ${user.id}
        `);
        return userPermissions;
    } catch (error) {
        return null;
    }
}

export async function userHasPermissions(user: User, ...requiredPermissions: string[]): Promise<boolean> {
    const userPermissions = await findUserPermissions(user);
    if (!userPermissions || userPermissions.length === 0) {
        return false;
    }

    const userPermissionNames = userPermissions.map(permission => permission.name);
    const permissionsLacking = requiredPermissions.filter(
        permission => !userPermissionNames.includes(permission)
    );

    return permissionsLacking.length === 0;
}