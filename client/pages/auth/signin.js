import { useState } from 'react';
import Router from 'next/router';
import userRequest from '../../hooks/user-request';

export default () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors} = userRequest({
        url: '/api/users/signin', 
        method: 'post', 
        body: { email, password},
        onSuccess: () => Router.push('/')
    });

    const submit = async (e) =>{
        e.preventDefault();
        doRequest();
    }

    return (
        <form onSubmit={submit}>
            <h1>Sign in</h1>
            <div className="form-group">
                <label>Email Adrress</label>
                <input onChange={e => setEmail(e.target.value)} value={ email } className="form-control"></input>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)} value={ password } className="form-control"></input>
            </div>
             {errors}
            <button className="btn btn-primary">Sign in</button>
        </form>
    )
}