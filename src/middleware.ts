import { withAuth } from 'next-auth/middleware';

export { withAuth } from 'next-auth/middleware';

export default withAuth({
	pages: {
		signIn: '/login',
	},
});
