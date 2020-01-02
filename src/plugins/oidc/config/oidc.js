export const oidcSettings = {
	authority: process.env.VUE_APP_OIDC_AUTHORITY,
	clientId: 'auth',
	redirectUri: process.env.VUE_APP_OIDC_REDIRECT_URI + 'oidc-callback',
	responseType: 'id_token token',
	scope: 'openid profile email',
	automaticSilentRenew: true,
	silentRedirectUri: process.env.VUE_APP_OIDC_REDIRECT_URI + 'silent-renew-oidc.html',
	postLogoutRedirectUri: process.env.VUE_APP_OIDC_REDIRECT_URI
}
