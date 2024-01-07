const axios = require('axios').default;

class Api {
	baseUrl = 'http://localhost:8080';
	accessToken = null;
	refreshToken = null;

	get loggedIn() {
		return !!this.accessToken;
	}

	logout() {
		this.accessToken = null;
		this.refreshToken = null;
	}

	setTokens({ accessToken, refreshToken }) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}

	async request(route, method, data) {
		const headers = {};

		if (this.loggedIn) {
			headers['Authorization'] = 'Bearer ' + this.accessToken;
		}

		const res = await axios({
			method,
			url: this.baseUrl + route,
			headers,
			data,
			validateStatus: () => true,
		});

		if (res.status === 401) {
			if (await this.requestAccessToken()) {
				return await this.request(route, method, body);
			} else {
				return false;
			}
		}

		return res.data;
	}

	async requestAccessToken() {
		this.accessToken = null;

		const tokenRequest = await axios({
			method: 'post',
			url: this.baseUrl + '/auth/access-token',
			data: { refreshToken: this.refreshToken },
			validateStatus: () => true,
		});

		if (tokenRequest.status === 401) {
			this.refreshToken = null;

			return false;
		}

		this.accessToken = tokenRequest.data;

		return true;
	}
}

const api = new Api();

async function login(user) {
	const tokens = await api.request('/auth/login', 'post', user);
	api.setTokens(tokens);
}

async function logout() {
	await api.request('/auth/logout', 'post', {
		refreshToken: api.refreshToken,
	});

	api.logout();
}

async function hardLogout() {
	await api.request('/auth/hard-logout', 'post');

	api.logout();
}

async function main() {
	const user = {
		email: 'a@a.com',
		password: 'pass1',
	};

	await login(user);
	console.log('Logged in');
	await logout();
}

main().then(() => {
	console.log('Done.');
});
