import React from 'react'
import { ChatEngineWrapper, ChatFeed, ChatSettings, Socket } from 'react-chat-engine'
import { Col } from 'react-grid-system'
import ChatList from '../components/ChatList/index'



const ChatEngine = ({userName,userSecret,projectID}) => {
    return (
        <ChatEngineWrapper>
            <Socket 
                projectID={projectID}
                userName={userName}
                userSecret={userSecret}
                
            />

            <Col xs={0} sm={3}>
                {/* {renderChatList={(chatEngineState) => <ChatList {...chatEngineState} />}}; */}
                <ChatList />

            </Col>

            <Col xs={12} sm={6}>
                <ChatFeed />
            </Col>

            <Col xs={0} sm={3}>
                <ChatSettings />
            </Col>
        </ChatEngineWrapper>
    )
}

export default ChatEngine