import { PictureOutlined, SendOutlined } from '@ant-design/icons';
import { Input } from "@chakra-ui/react";
import React, { useState } from 'react';
import { isTyping, sendMessage } from 'react-chat-engine';

function MessageForm(props) {
    const [value, setValue] = useState("")
    const { creds, chatId } = props

    const handleChange = (e) => {
        setValue(e.target.value)
        isTyping(creds, chatId, (data) => console.log(data))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const text = value.trim()
        const sender_username = creds?.userName
        if (text.length > 0) {
            sendMessage(creds, chatId, { text,sender_username }, r => console.log('Message Send', r))
        }
        setValue("")
    }

    return (
        <div className="message-form-container">
            <form className="message-form" onSubmit={handleSubmit}>
                <div className="form-input">
                <Input
                    placeholder="Send message..."
                    value={value}
                    onChange={handleChange.bind(this)}
                    // onSubmit={handleSubmit}
                >
                </Input>

                </div>

                <label htmlFor="upload-button">
                    <span className="image-button">
                        <PictureOutlined className="picture-icon" />
                    </span>      
                </label>
                
                <input
                    type="file"
                    multiple={false}
                    id="upload-button"
                    style={{ display: 'none' }}
                    // onChange={handleUpload.bind(this)}
                />
                <button type="submit" className="send-button">
                    <SendOutlined className="send-icon" />
                </button>

            </form>
        </div>    

    )
}

export default MessageForm
