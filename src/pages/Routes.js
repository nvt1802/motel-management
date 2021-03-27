import React from 'react'
import Home from '../pages/Home'
import SignUp from '../pages/SignUp'
import { Route } from 'react-router-dom'

const routes = [
	{
		path: "/",
		exact: true,
		component: Home
	},
	{
		path: "/signUp",
		exact: true,
		component: SignUp
	},
	{
		path: '',
		exact: false,
		component: () => <div>NOT FOUND</div>
	}
];

export default routes

export const RouteWithSubRoutes = (route) => {
	return (<>
		<Route
			path={route.path}
			exact={route.exact}
			render={props => (<>
				<route.component {...props} routes={route.routes} />
			</>)}
		/>
	</>)
}