import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Headrs from '../components/headrs';


const AppComponent =  ({ Component, pageProps, currentUser }) => {
return <div>
        <Headrs currentUser = { currentUser } />
        <Component {...pageProps}/>
    </div>
}

AppComponent.getInitialProps = async appContext => {
    let pageProps = {};
    if(appContext.Component.getInitialProps){
        pageProps = await appContext.Component.getInitialProps(appContext);
    }
    const { data } = await buildClient(appContext.ctx).get('/api/users/currentuser');
    return {
        pageProps,
        ...data
    }

}

export default AppComponent;