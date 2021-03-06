import * as sendGrid from '@sendgrid/mail';
import CONFIG from '../config';
import { IUserModel, UserDto } from '../models/user';
import { Service } from 'typedi';

sendGrid.setApiKey(CONFIG.SENDGRID_KEY);

@Service('emailService')
export class EmailService {
	sendResetEmail(user: IUserModel) {
		const url =
			CONFIG.NODE_ENV !== 'production'
				? 'http://localhost:5000'
				: 'https://www.helloworldpurdue.com';

		sendGrid.send({
			templateId: 'd-f534db9ac5df4fa5a0dc273095582e9d',
			from: `${CONFIG.ORG_NAME} <${CONFIG.EMAIL}>`,
			to: user.email,
			dynamicTemplateData: {
				name: user.name,
				url,
				token: user.resetPasswordToken
			},
			mailSettings: {
				sandboxMode: {
					enable: CONFIG.NODE_ENV === 'test'
				}
			}
		} as any);
	}

	sendAccountCreatedEmail(user: IUserModel) {
		const url =
			CONFIG.NODE_ENV !== 'production'
				? 'http://localhost:5000'
				: 'https://www.helloworldpurdue.com';

		return sendGrid.send({
			templateId: 'd-0bba1a0346c24bd69a46d81d2e950e55',
			from: `${CONFIG.ORG_NAME} <${CONFIG.EMAIL}>`,
			to: user.email,
			dynamicTemplateData: {
				name: user.name,
				url,
				token: user.resetPasswordToken
			},
			mailSettings: {
				sandboxMode: {
					enable: CONFIG.NODE_ENV === 'test'
				}
			}
		} as any);
	}

	sendErrorEmail(error: Error) {
		return sendGrid.send({
			templateId: 'd-9fbbdf1f9c90423a80d69b83885eefa8',
			from: `${CONFIG.ORG_NAME} <${CONFIG.EMAIL}>`,
			to: 'purduehackers@gmail.com',
			dynamicTemplateData: {
				timestamp: new Date(Date.now()).toLocaleString([], {
					timeZone: 'America/New_York'
				}),
				error,
				message: error.message.replace(/\n/g, '<br>'),
				stack: error.stack ? error.stack.replace(/\n/g, '<br>&emsp;') : 'No Stack'
			},
			mailSettings: {
				sandboxMode: {
					enable: CONFIG.NODE_ENV !== 'production'
				}
			}
		} as any);
	}

	sendAcceptanceEmails(users: UserDto[]) {
		return this.sendMassEmail('d-316e8d8337dc460eb12148c82a51ba86', users);
	}

	sendRejectedEmails(users: UserDto[]) {
		return this.sendMassEmail('d-54335b858a324aa89c948856653bf40e', users);
	}

	sendWaitlistedEmails(users: UserDto[]) {
		return this.sendMassEmail('d-29fa0a4a1e064e7383afadc49062273c', users);
	}

	private sendMassEmail(templateId: string, users: UserDto[]) {
		if (users.length)
			return sendGrid.send({
				templateId,
				from: `${CONFIG.ORG_NAME} <${CONFIG.EMAIL}>`,
				personalizations: users.map(user => ({
					to: user.email,
					// eslint-disable-next-line
					dynamic_template_data: {
						name: user.name
					}
				})),
				isMultiple: true,
				mailSettings: {
					sandboxMode: {
						enable: CONFIG.NODE_ENV === 'test'
					}
				}
			});
	}
}
