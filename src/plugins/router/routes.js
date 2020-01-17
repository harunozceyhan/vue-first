import Dashboard from '@/components/common/pages/Dashboard'
import Profile from '@/components/common/pages/Profile'
import OidcCallback from '@/components/common/oidc/OidcCallback'
import OidcCallbackError from '@/components/common/oidc/OidcCallbackError'
import Operation from '../../components/parameters/Operation'
import Siparis from '../../components/parameters/Siparis'
import Worker from '../../components/parameters/Worker'
import Card from '../../components/parameters/Card'
import Classroom from '../../components/student/Classroom'
import Lessson from '../../components/student/Lesson'
import Teacher from '../../components/student/Teacher'
import Student from '../../components/student/Student'

const routes = [
	{ path: '*', redirect: '/dashboard' },
	{ path: '/dashboard', component: Dashboard },
	{ path: '/profile', component: Profile },
	{ path: '/oidc-callback', component: OidcCallback, name: 'oidcCallback' },
	{ path: '/oidc-callback-error', component: OidcCallbackError, name: 'oidcCallbackError', meta: { isPublic: true } },
	{ path: '/operation', component: Operation },
	{ path: '/worker', component: Worker },
	{ path: '/siparis', component: Siparis },
	{ path: '/card', component: Card },
	{ path: '/classroom', component: Classroom },
	{ path: '/lesson', component: Lessson },
	{ path: '/teacher', component: Teacher },
	{ path: '/student', component: Student }
]

export default routes
