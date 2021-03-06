import React from 'react';
import { ApplyBanner } from './ApplyBanner';
import { Schedule } from './Schedule';
import { Faq } from './Faq';
import { Sponsors } from './Sponsors';
import Head from 'next/head';

export const HomePage = () => {
	return (
		<>
			<Head>
				<link rel="preconnect" href="https://khms0.googleapis.com" />
				<link rel="preconnect" href="https://maps.gstatic.com" />
			</Head>
			<div
				id="banner"
				style={{ zIndex: -1 }}
				className="uk-section section-primary uk-section-default uk-flex hero"
			>
				<div
					className="foreground"
					style={{
						zIndex: 2,
						backgroundImage: `url(${require('../../static/images/HomeForegroundEdited.png')})`,
						backgroundRepeat: 'no',
						backgroundPosition: 'center top',
						height: '2430px',
						alignItems: 'center'
					}}
				>
					<div style={{ height: '700px' }}></div>
					<ApplyBanner />
					<Schedule />
					<Faq />
					<Sponsors />
				</div>
			</div>
		</>
	);
};
