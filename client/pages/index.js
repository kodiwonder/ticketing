import buildClient from "../api/build-client";

const LandingPage =  ({ currentUser }) => {
return (currentUser ? <h1> You are sign in!!</h1> : 
    <h1> You are not sign in</h1> );
}

LandingPage.getInitialProps = async (context) => {
   const { data } = await buildClient(context.ctx).get('/api/users/currentuser');
    return data
}

export default LandingPage;