import Dashboard from '@/components/common/pages/Dashboard'
import Profile from '@/components/common/pages/Profile'
import OidcCallback from '@/components/common/oidc/OidcCallback'
import OidcCallbackError from '@/components/common/oidc/OidcCallbackError'
import Operation from '../../components/parameters/Operation'
import Siparis from '../../components/parameters/Siparis'
import Worker from '../../components/parameters/Worker'
import Card from '../../components/parameters/Card'

const routes = [
	{ path: '*', redirect: '/dashboard' },
	{ path: '/dashboard', component: Dashboard },
	{ path: '/profile', component: Profile },
	{ path: '/oidc-callback', component: OidcCallback, name: 'oidcCallback' },
	{ path: '/oidc-callback-error', component: OidcCallbackError, name: 'oidcCallbackError', meta: { isPublic: true } },
	{ path: '/operation', component: Operation },
	{ path: '/worker', component: Worker },
	{ path: '/siparis', component: Siparis },
	{ path: '/card', component: Card }
]

export default routes
