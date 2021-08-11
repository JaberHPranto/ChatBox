import { FacebookFilled, GoogleOutlined } from '@ant-design/icons'
import "firebase/app"
import firebase from 'firebase/app'
import React from 'react'
import { auth } from '../firebase'


function Login() {
    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Welcome to Chat Box</h2>
                <div className="login-button google" onClick={()=> auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}><GoogleOutlined />
                Sign in with Google</div>
                <br/><br/>
                <div className="login-button facebook" onClick={()=> auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}><FacebookFilled/>
                Sign in with Facebook</div>
            </div>
        </div>
    )
}

export default Login
