import React from 'react';
import { AnnouncementLabel } from '../../../shared/announcement.enums';
import { IAnnouncement } from '../../@types';

interface Props extends IAnnouncement {
	onRelease?: (id: string) => void;
}

export default ({ _id, title, body, labels, released, onRelease }: Props) => {
	return (
		<div>
			Title: {title}
			<br />
			Body: {body}
			<br />
			Labels: {labels}
			<br />
			{!released && (
				<button id={_id} onClick={e => onRelease(e.target.id)}>
					Release
				</button>
			)}
		</div>
	);
};