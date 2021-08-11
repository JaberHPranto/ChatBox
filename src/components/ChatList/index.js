import React, { useContext } from 'react';
import { ChatEngineContext } from 'react-chat-engine';
import ChatGroup from './ChatGroup';
import ChatLink from './ChatLink';

let styles = require('../../styles.json')

function ChatList(props) {

    const { setActiveChat } = useContext(ChatEngineContext)
    
    console.log(props);

    function hasReadLastMessage(chat) {
        var lastReadMessageID = -1
        chat.people.map(chat_person => {
            if (chat_person.person.username === props.userName) {
                lastReadMessageID = chat_person.last_read
            }
        })
        return !chat.last_message.id || lastReadMessageID === chat.last_message.id
    }


    function renderChannels() {
        const chatList = props.chats ? Object.values(props.chats) : []
        return chatList.map((chat, index) => {
            if (!chat.is_direct_chat) {
                return (
                    <ChatLink
                        key={`chat-${index}`}
                        title={`# ${chat.title}`}
                        bold={!hasReadLastMessage(chat)}
                        onClick = {() => setActiveChat(chat.id)}
                    />
                ) 

            } else {
                return <div key={`chat-${index}`} />
            }
        })
    }


    return (
        <div style={styles.chatList}>
            <div style={styles.titleContainer}>
                <ChatGroup 
                    title='Channels' 
                    placeholder='Create a Chat Group'
                    // onSubmit={(data) => onChannelCreate(data)}
                />
            </div>

            <div style={styles.chatsContainer}>
                { renderChannels() }
            </div>

            <div style={styles.titleContainer}>
                <ChatGroup 
                    title='Direct Messages' 
                    placeholder='Type a username'
                    // onSubmit={(data) => onDirectMessageCreate(data)}
                />
            </div>

            <div style={styles.chatsContainer}>
                {/* { renderDirectMessages() } */}
            </div>
        </div>
    );
}

export default ChatList