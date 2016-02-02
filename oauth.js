var ids = {
	facebook: {
		clientID: process.env.FB_ID,
		clientSecret: process.env.FB_SECRET,
		callbackURL: 'http://www.devindescenza.me/auth/facebook/callback'
	},
	github: {
		clientID: process.env.GIT_ID,
		clientSecret: process.env.GIT_SECRET,
		callbackURL: 'http://www.devindescenza.me/auth/github/calback'
	},
	google: {
		clientID: process.env.GOOGLE_ID,
		clientSecret: process.env.GOOGLE_SECRET,
		callbackURL: 'http://www.devindescenza.me/auth/google/callback'
	},
	mongodb: {
		user: process.env.DB_USER,
		pass: process.env.DB_PASS
	}
};

module.exports = ids;