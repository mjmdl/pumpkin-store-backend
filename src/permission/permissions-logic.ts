import {FindOptionsWhere} from 'typeorm';
import database from "../database";
import User from "../user/user-entity";
import {UserPermissionsUpdate} from './permission-dto';
import {Permission} from "./permission-entity";
import {findUserBy} from '../user/user-logic';

export async function findPermissionBy(where: FindOptionsWhere<Permission>): Promise<null | Permission> {
    try {
        const permission = await database.manager.findOneByOrFail(Permission, where);
        return permission;
    } catch (error) {
        return null;
    }
}

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

export async function updateUserPermissions(user: User, permissionsUpdate: UserPermissionsUpdate): Promise<boolean> {
    const targetUser = await findUserBy({id: user.id});
    targetUser.permissions = await findUserPermissions(targetUser);

    permissionsUpdate.give.forEach(async (givePermission) => {
        const permission = await findPermissionBy({name: givePermission});
        if (!permission) {
            return;
        }
        targetUser.permissions.push(permission);
    });

    targetUser.permissions = targetUser.permissions.filter(
        userPermission => !permissionsUpdate.deny.includes(userPermission.name)
    );

    console.log('user:', targetUser);

    try {
        const updatedUser = await database.manager.save(targetUser);
        return !!updatedUser;
    } catch (error) {
        return false;
    }
}