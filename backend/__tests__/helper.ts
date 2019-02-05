import * as faker from 'faker';
import { ValidationError } from 'class-validator';
import {
	Gender,
	ethnicities,
	ClassYear,
	gradYears,
	Major,
	Referral,
	ShirtSize
} from '../models/app.enums';

export const generateUser = () => {
	const first = faker.name.firstName();
	const last = faker.name.lastName();
	const domain = 'purdue.edu';
	const email = faker.internet.email(first, last, domain);

	const password = faker.internet.password(8);
	return {
		name: `${first} ${last}`,
		email,
		graduationYear: faker.random.number({
			min: 1900,
			max: 2025
		}),
		password,
		passwordConfirm: password
	};
};

export const generateApplication = () => {
	const gender = getRandomEnumVal(Gender);
	const ethnicity = getRandomVal(ethnicities);
	const classYear = getRandomEnumVal(ClassYear);
	const graduationYear = getRandomVal(gradYears);
	const major = getRandomEnumVal(Major);
	const referral = getRandomEnumVal(Referral);
	const hackathons = faker.random.number({ min: 0, max: 4 });
	const shirtSize = getRandomEnumVal(ShirtSize);
	const dietaryRestrictions = faker.lorem.word();
	const website = faker.internet.url();
	const answer1 = faker.lorem.paragraph(1);
	const answer2 = faker.lorem.paragraph(1);

	return {
		gender,
		ethnicity,
		classYear,
		graduationYear,
		major,
		referral,
		hackathons,
		shirtSize,
		dietaryRestrictions,
		website,
		answer1,
		answer2
	};
};

export const generateUsers = (num: number) => Array.from({ length: num }, generateUser);

export const generateApplications = (num: number) =>
	Array.from({ length: num }, generateApplication);

export const getError = (errors: ValidationError[]) => Object.values(errors[0].constraints).pop();

export const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

const getRandomEnumVal = <T>(E: T) => E[faker.random.arrayElement(Object.getOwnPropertyNames(E))];

const getRandomVal = <T>(A: T[]) => faker.random.arrayElement(A);