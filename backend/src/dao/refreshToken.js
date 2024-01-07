const asyncRedis = require('async-redis');
const client = asyncRedis.createClient();

const generateRefreshTokensRedisKey = (userId) => `userRefreshTokens:${userId}`;

class RefreshTokenDAO {
	// Checks if a refresh token is in our redis store
	checkRefreshToken(userId, refreshToken) {
		const refreshTokensKey = generateRefreshTokensRedisKey(userId);

		return client.sismember(refreshTokensKey, refreshToken);
	}

	// Stores refresh token, removing one if we're at maximum capacity
	async storeRefreshToken(userId, refreshToken) {
		const refreshTokensKey = generateRefreshTokensRedisKey(userId);

		if (
			(await client.scard(refreshTokensKey)) ===
			+process.env.MAX_REFRESH_TOKENS_PER_USER
		) {
			const randomRefreshToken = await client.srandmember(
				refreshTokensKey
			);
			await client.srem(refreshTokensKey, randomRefreshToken);
		}

		// Store the new refresh token
		await client.sadd(refreshTokensKey, refreshToken);
	}

	deleteRefreshToken(userId, refreshToken) {
		const refreshTokensKey = generateRefreshTokensRedisKey(userId);

		return client.srem(refreshTokensKey, refreshToken);
	}

	deleteAllRefreshTokens(userId) {
		const refreshTokensKey = generateRefreshTokensRedisKey(userId);

		return client.del(refreshTokensKey);
	}
}

module.exports = new RefreshTokenDAO();
