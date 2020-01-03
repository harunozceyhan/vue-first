import Dashboard from '@/components/common/pages/Dashboard'
import Profile from '@/components/common/pages/Profile'
import OidcCallback from '@/components/common/oidc/OidcCallback'
import OidcCallbackError from '@/components/common/oidc/OidcCallbackError'
import Operation from '../../components/parameters/Operation'
import HelloWorld from '../../components/HelloWorld'
import HelloWorld2 from '../../components/HelloWorld2'

const routes = [
	{ path: '*', redirect: '/dashboard' },
	{ path: '/dashboard', component: Dashboard },
	{ path: '/profile', component: Profile },
	{ path: '/oidc-callback', component: OidcCallback, name: 'oidcCallback' },
	{ path: '/oidc-callback-error', component: OidcCallbackError, name: 'oidcCallbackError', meta: { isPublic: true } },
	{ path: '/operation', component: Operation },
	{ path: '/hello', component: HelloWorld },
	{ path: '/hello2', component: HelloWorld2 }
]

export default routes
