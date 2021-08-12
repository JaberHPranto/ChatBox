import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';
import Profile from './Profile';


function NavBar() {

    const { user } = useAuth()
    const history = useHistory()
    
    const handleSignOut = async () => {
        await auth.signOut();
        history.push("/")
    }
    // console.log(user.email);
    // console.log(user.displayName);
    // console.log(user.photoURL)

    return (
        <div>
            <div className="nav-bar">
                <div className="logo-tab">ChatBox</div>
                <div className="logout-tab" onClick={handleSignOut}>Logout</div>
                <div className="profile-tab"><Profile name={user.displayName} email={user.email} photo={user.photoURL} /></div>
            </div>
            
        </div>
    )
}

export default NavBar
