import * as React from 'react';
import './FolderUsers.css';
import { SyntheticEvent } from "react";
import { Group, User } from "./Api";
import Select from 'react-select'

function hasPermissions(value: number, check: number): boolean {
	return (value & check) === check;
}

export interface FolderUsersProps {
	users: { [user: string]: number },
	allUsers?: User[],
	onAddUser: (name: string) => void;
	removeUser: (name: string) => void;
	edit: boolean;
	showEdit: (event: SyntheticEvent<any>) => void;
	onSetPermissions: (name: string, permissions: number) => void;
}

export function FolderUsers({ users, allUsers = [], onAddUser, removeUser, edit, showEdit, onSetPermissions }: FolderUsersProps) {
	if (edit) {
		const setPermissions = (change: number, userId: string): void => {
			const newPermissions = users[userId] ^ change;
			onSetPermissions(userId, newPermissions);
		};

		const rows = Object.keys(users).map(userId => {
			const permissions = users[userId];
			return <tr key={userId}>
				<td>
					{(
						allUsers
							.find(user => user.id === userId) || {
							id: userId,
							displayname: userId
						}
					).displayname
					}
				</td>
				<td className="permissions">
					<input type="checkbox"
						onChange={setPermissions.bind(null, OC.PERMISSION_UPDATE | OC.PERMISSION_CREATE, userId)}
						checked={hasPermissions(permissions, (OC.PERMISSION_UPDATE | OC.PERMISSION_CREATE))} />
				</td>
				<td className="permissions">
					<input type="checkbox"
						onChange={setPermissions.bind(null, OC.PERMISSION_SHARE, userId)}
						checked={hasPermissions(permissions, OC.PERMISSION_SHARE)} />
				</td>
				<td className="permissions">
					<input type="checkbox"
						onChange={setPermissions.bind(null, OC.PERMISSION_DELETE, userId)}
						checked={hasPermissions(permissions, (OC.PERMISSION_DELETE))} />
				</td>
				<td>
					<a onClick={removeUser.bind(this, userId)}>
						<img src={OC.imagePath('core', 'actions/close')} />
					</a>
				</td>
			</tr>
		});

		return <table className="user-edit"
			onClick={event => event.stopPropagation()}>
			<thead>
				<tr>
				<th>{t('templaterepo', 'User')}</th>
				<th>{t('templaterepo', 'Write')}</th>
				<th>{t('templaterepo', 'Share')}</th>
				<th>{t('templaterepo', 'Delete')}</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{rows}
				<tr>
					<td colSpan={5}>
						<UserSelect
							allUsers={allUsers.filter(i => !users[i.id])}
							onChange={onAddUser} />
					</td>
				</tr>
			</tbody>
		</table>
	} else {
		if (Object.keys(users).length === 0) {
			return <span>
				<em>無</em>
				<a className="icon icon-rename" onClick={showEdit} />
			</span>
		}
		return <a className="action-rename" onClick={showEdit}>
			{Object.keys(users)
				.map(userId => allUsers.find(user => user.id === userId) || {
					id: userId,
					displayname: userId
				})
				.map(user => user.displayname)
				.join(', ')
			}
		</a>
	}
}

interface UserSelectProps {
	allUsers: User[];
	onChange: (name: string) => void;
}

function UserSelect({ allUsers, onChange }: UserSelectProps) {
	if (allUsers.length === 0) {
		return <div>
			<p>{t('templaterepo', 'No other users available')}</p>
		</div>;
	}
	const options = allUsers.map(user => {
		return {
			value: user.id,
			label: user.displayname
		};
	});

	return <Select
		onChange={option => {
			onChange && onChange(option.value)
		}}
		options={options}
		placeholder={t('templaterepo', 'Add user')}
		styles={{
			input: (provided) => ({
				...provided,
				height: 30
			}),
			control: (provided) => ({
				...provided,
				backgroundColor: 'var(--color-main-background)'
			}),
			menu: (provided) => ({
				...provided,
				backgroundColor: 'var(--color-main-background)',
				borderColor: '#888'
			})
		}}
	/>
}
