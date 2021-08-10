import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ChatEngine } from 'react-chat-engine'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { auth } from '../firebase'

function Chats() {
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    const { user } = useAuth()
    console.log(user);

    const handleSignOut = async () => {
        await auth.signOut();
        history.push("/")
    }

    // for handling images
    const getFile = async (url) => {
        const response = await fetch(url)
        const data = await response.blob()

        return new File([data],"userPhoto.jpg",{type:"image/jpeg"})
    }

    useEffect(() => {
        if (!user) {
            history.push("/")
            return;
        }

        axios.get("https://api.chatengine.io/users/me", {
            headers: {
                "projectId": "05705edc-c48e-4f8d-8eda-a05bc16ce02b",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        }).then(() => {
            setLoading(false)
        }).catch(() => {
            const formData = new FormData()
            formData.append("email", user.email)
            formData.append("username", user.email)
            formData.append("secret", user.uid)
            
            getFile(user.photoURL)
                .then((avatar) => {
                    formData.append('avatar', avatar, avatar.name)
                    
                    // create the user
                    axios.post("https://api.chatengine.io/users",
                        formData,
                        {
                            headers: {
                                "private-key": "8510852e-5b4f-4ebc-a4d6-5a85ea05be37"
                            }
                        }
                    )
                        .then(() => setLoading(false))
                        .catch((error) => console.log(error))
                    
                })  
            })

        }, [user, history])

        if(!user || loading) return "Loading..."
        return (
            <div>
                <div className="chats-page">
                    <div className="nav-bar">
                        <div className="logo-tab">ChatBox</div>
                        <div className="logout-tab" onClick={handleSignOut}>Logout</div>
                    </div>

                    <ChatEngine
                        height="calc(100vh - 66px)"
                        projectID="05705edc-c48e-4f8d-8eda-a05bc16ce02b"
                        userName={user.email}
                        userSecret={user.uid}
                    />

                </div>
            </div>
        )
    }

export default Chats
