import database from "../database";
import User from "../user/user";
import { Permission } from "./permission-entity";

export async function findUserPermissions(user: User): Promise<null | Permission[]> {    
    try {
        const userPermissions = await database.manager.query(`
            SELECT p.id, p.name
            FROM users_have_permissions AS uhp
            LEFT JOIN users AS u ON uhp.user_id = u.id
            LEFT JOIN permissions AS p ON uhp.permission_id = p.id
            WHERE u.id = ${user.id}
        `);
        return userPermissions;
    } catch (error) {
        return null;
    }
}