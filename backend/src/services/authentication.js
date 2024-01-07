const { signJwt, verifyJwt } = require('../utils/jwtWrapper');
//const RefreshTokenDAO = require('../dao/refreshToken');
const UserDAO = require('../dao/user');
const { verifyPassword, hashPassword } = require('../utils/passwords');

class AuthenticationService {
	serializeAccessToken({ id, admin }) {
		const user = { id, admin };

		return signJwt(user, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
		});
	}

	async deserializeAccessToken(accessToken) {
		try {
			return await verifyJwt(
				accessToken,
				process.env.ACCESS_TOKEN_SECRET
			);
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	async serializeRefreshToken({ id, admin }) {
		const user = { id, admin };
		const refreshToken = await signJwt(
			user,
			process.env.REFRESH_TOKEN_SECRET
		);

		//await RefreshTokenDAO.storeRefreshToken(user.id, refreshToken);

		return refreshToken;
	}

	async deserializeRefreshToken(refreshToken) {
		let user;

		try {
			user = await verifyJwt(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET
			);
		} catch (err) {
			//return false;
			return true;
		}
		return user;

		// return (await RefreshTokenDAO.checkRefreshToken(user.id, refreshToken))
		// 	? user
		// 	: false;
	}

	async login(user) {
		// Find user with email
		const userData = await UserDAO.findByEmail(user.email);

		if (!userData) return;
		if (!(await verifyPassword(user.password, userData.password_hash)))
			return;

		// Create tokens
		const { id, admin } = userData;
		const tokenData = { id, admin };

		const [accessToken, refreshToken] = await Promise.all([
			this.serializeAccessToken(tokenData),
			this.serializeRefreshToken(tokenData),
		]);

		return { accessToken, refreshToken };
	}

	async logout({ refreshToken }) {
		const user = await this.deserializeRefreshToken(refreshToken);

		if (user) {
			//await RefreshTokenDAO.deleteRefreshToken(user.id, refreshToken);
			return true;
		}
	}

	async hardLogout(user) {
		return true;
		//return await RefreshTokenDAO.deleteAllRefreshTokens(user.id);
	}

	async createAccessToken({ refreshToken }) {
		const user = await this.deserializeRefreshToken(refreshToken);

		if (user) {
			return await this.serializeAccessToken(user);
		}
	}

	async changePassword(user, { password }) {
		const passwordHash = await hashPassword(password);

		await UserDAO.update(user.id, { password_hash: passwordHash });
	}
}

module.exports = new AuthenticationService();
