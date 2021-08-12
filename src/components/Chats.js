import { Spinner } from "@chakra-ui/react"
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { ChatEngine } from 'react-chat-engine'
import { useHistory } from 'react-router-dom'
import ChatList from '../components/ChatList/index'
import MessageForm from '../components/MessageForm/index'
import { useAuth } from '../contexts/AuthContext'
import NavBar from "./NavBar"

function Chats() {
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const didMountRef = useRef(false) 

    const { user } = useAuth()

    // for handling images
    const getFile = async (url) => {
        const response = await fetch(url)
        const data = await response.blob()

        return new File([data],"userPhoto.jpg",{type:"image/jpeg"})
    }

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current=true
        }
        if (!user || user === null) {
            history.push("/")
            return;
        }

        axios.get("https://api.chatengine.io/users/me/", {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email,
                "user-secret": user.uid,
            }
        }).then(() => {
            setLoading(false)
        }).catch(() => {
            const formData = new FormData()
            formData.append("email", user.email)
            formData.append("username", user.email)
            formData.append("first_name", user.displayName)
            formData.append("secret", user.uid)
            
            getFile(user.photoURL)
                .then((avatar) => {
                    formData.append('avatar', avatar, avatar.name)
                    
                    // create the user
                    axios.post("https://api.chatengine.io/users/",
                        formData,
                        {
                            headers: {
                                "private-key": process.env.REACT_APP_CHAT_ENGINE_SECRET_KEY
                            }
                        }
                    )
                        .then(() => setLoading(false))
                        .catch((error) => console.log(error))
                    
                })  
            })

    }, [user, history])
    

    if (!user || loading)
        return (
                <Spinner thickness="4px" speed="0.5s" emptyColor="gray.200" color="blue.500" size="xl" />
        )
    
        return (
            <div>
                <div className="chats-page">
                    <NavBar />
                    <ChatEngine
                        height="calc(100vh - 66px)"
                        className="chat-eng"
                        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                        userName={user.email}
                        userSecret={user.uid}
                        offset={7}
                        renderChatList={(chatEngineState) => <ChatList {...chatEngineState} />}
                        renderNewMessageForm={(creds, chatId) => <MessageForm creds={creds} chatId={chatId}/>}
                    />
                </div>
                
            </div>
        )
    }

export default Chats
