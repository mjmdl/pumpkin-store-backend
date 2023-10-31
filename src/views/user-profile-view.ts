import {ViewEntity, ViewColumn} from "typeorm";

@ViewEntity({
	name: "user_profile_view",
	expression: `
		SELECT u.name  AS name,
			   u.email AS email
		FROM users AS u
	`,
})
export default class UserProfile {
	@ViewColumn()
	name: string;

	@ViewColumn()
	email: string;
}
