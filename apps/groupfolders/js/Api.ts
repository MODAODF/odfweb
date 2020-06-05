import { OCSResult } from "NC";
import Thenable = JQuery.Thenable;
import { FolderGroupsProps } from "./FolderGroups";

export interface Group {
	id: string;
	displayname: string;
}

export interface User {
	id: string;
	displayname: string;
}

export interface OCSUser {
	uid: string;
	displayname: string;
}

export interface OCSGroup {
	gid: string;
	displayname: string;
}

export interface ManageRuleProps {
	type: string;
	id: string;
	displayname: string;
}


export interface Folder {
	id: number;
	mount_point: string;
	quota: number;
	size: number;
	groups: { [group: string]: number };
	users: { [user: string]: number };
	manage: ManageRuleProps[];
}

export class Api {
	getUrl(endpoint: string): string {
		return OC.generateUrl(`apps/groupfolders/${endpoint}`);
	}

	listFolders(): Thenable<Folder[]> {
		return $.getJSON(this.getUrl('folders'))
			.then((data: OCSResult<Folder[]>) => Object.keys(data.ocs.data).map(id => data.ocs.data[id]));
	}

	listGroups(): Thenable<Group[]> {
		const version = parseInt(OC.config.version, 10);
		if (version >= 14) {
			return $.getJSON(OC.linkToOCS('cloud', 1) + 'groups/details')
				.then((data: OCSResult<{ groups: Group[]; }>) => data.ocs.data.groups);
		} else {
			return $.getJSON(OC.linkToOCS('cloud', 1) + 'groups')
				.then((data: OCSResult<{ groups: string[]; }>) => data.ocs.data.groups.map(group => {
					return {
						id: group,
						displayname: group
					};
				}));
		}
	}

	listUsers(): Thenable<User[]> {
		const version = parseInt(OC.config.version, 10);
		if (version >= 14) {
			return $.getJSON(OC.linkToOCS('cloud', 1) + 'users/details')
				.then((data: OCSResult<{ users: User[]; }>) => {
					// 讓 user[] 的型態轉為 Array
					let tmp: User[] = [];
					for (var x in data.ocs.data.users) {
						tmp.push(data.ocs.data.users[x]);
					}
					return tmp;
				});
		} else {
			return $.getJSON(OC.linkToOCS('cloud', 1) + 'users')
				.then((data: OCSResult<{ users: string[]; }>) => data.ocs.data.users.map(user => {
					return {
						id: user,
						displayname: user
					};
				}));
		}
	}

	createFolder(mountPoint: string): Thenable<number> {
		return $.post(this.getUrl('folders'), {
			mountpoint: mountPoint
		}, null, 'json').then((data: OCSResult<{ id: number; }>) => data.ocs.data.id);
	}

	deleteFolder(id: number): Thenable<void> {
		return $.ajax({
			url: this.getUrl(`folders/${id}`),
			type: 'DELETE'
		});
	}

	addGroup(folderId: number, group: string): Thenable<void> {
		return $.post(this.getUrl(`folders/${folderId}/groups`), {
			group
		});
	}

	removeGroup(folderId: number, group: string): Thenable<void> {
		return $.ajax({
			url: this.getUrl(`folders/${folderId}/groups/${group}`),
			type: 'DELETE'
		});
	}

	addUser(folderId: number, user: string): Thenable<void> {
		return $.post(this.getUrl(`folders/${folderId}/users`), {
			user
		});
	}

	removeUser(folderId: number, user: string): Thenable<void> {
		return $.ajax({
			url: this.getUrl(`folders/${folderId}/users/${user}`),
			type: 'DELETE'
		});
	}

	setPermissions(folderId: number, user: string, permissions: number): Thenable<void> {
		return $.post(this.getUrl(`folders/${folderId}/groups/${user}`), {
			permissions
		});
	}

	setPermissionsForUser(folderId: number, group: string, permissions: number): Thenable<void> {
		return $.post(this.getUrl(`folders/${folderId}/users/${group}`), {
			permissions
		});
	}

	setQuota(folderId: number, quota: number): Thenable<void> {
		return $.post(this.getUrl(`folders/${folderId}/quota`), {
			quota
		});
	}

	renameFolder(folderId: number, mountpoint: string): Thenable<void> {
		return $.post(this.getUrl(`folders/${folderId}/mountpoint`), {
			mountpoint
		});
	}
}
