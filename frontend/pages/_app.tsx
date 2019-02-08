import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';
import { Store } from 'redux';
import makeStore from '../redux/store';
import {
	clearFlashMessages,
	refreshToken,
	setUser,
	setToken,
	sendFlashMessage
} from '../redux/actions';
import { getToken } from '../utils/session';
import Layout from '../components/Layout';
import Header from '../components/Header';
import FlashMessage from '../components/FlashMessage';

type Props = { store: Store };

class MyApp extends App<Props> {
	static async getInitialProps({ Component, ctx }) {
		// TODO: Find better way to refresh token w/o network request
		if (ctx.isServer) {
			// const { user } = ctx.req;
			// const token = getToken(ctx);
			// ctx.store.dispatch(setUser(user));
			// ctx.store.dispatch(setToken(token));
			await refreshToken(ctx)(ctx.store.dispatch);
		}
		return {
			pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
		};
	}

	async componentWillMount() {
		Router.onRouteChangeStart = url => {
			const state = this.props.store.getState().flashState;
			if (state.msgGreen || state.msgRed) clearFlashMessages()(this.props.store.dispatch);
		};
	}

	render() {
		const { Component, pageProps, store } = this.props as any;
		console.log('App props:', this.props);
		// const persistor = persistStore(store);

		return (
			<Container>
				<Provider store={store}>
					{/* <PersistGate persistor={persistor}> */}
					<Layout>
						<Component {...pageProps} />
					</Layout>
					{/* </PersistGate> */}
				</Provider>
			</Container>
		);
	}
}

export default withRedux(makeStore)(MyApp);
