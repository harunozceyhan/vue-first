import Dashboard from '@/components/common/pages/Dashboard'
import Profile from '@/components/common/pages/Profile'
import HelloWorld from '../../components/HelloWorld'
import HelloWorld2 from '../../components/HelloWorld2'

const routes = [
	{ path: '*', redirect: '/dashboard' },
	{ path: '/dashboard', component: Dashboard },
	{ path: '/profile', component: Profile },
	{ path: '/hello', component: HelloWorld },
	{ path: '/hello2', component: HelloWorld2 }
]

export default routes
