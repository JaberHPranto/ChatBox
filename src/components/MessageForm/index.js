import { PictureOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import { Input } from "@chakra-ui/react";
import Picker from 'emoji-picker-react';
import React, { useState } from 'react';
import { isTyping, sendMessage } from 'react-chat-engine';

function MessageForm(props) {
    const [value, setValue] = useState("")
    const [emojiPickerState, setEmojiPickerState] = useState(false)
    const { creds, chatId } = props


    const handleChange = (e) => {
        setValue(e.target.value)
        isTyping(creds, chatId, () => {})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const text = value.trim()
        const sender_username = creds?.userName
        if (text.length > 0) {
            sendMessage(creds, chatId, { text,sender_username }, r => console.log('Message Send', r))
        }
        setValue("")
        if(emojiPickerState) setEmojiPickerState(!emojiPickerState)
    }

    const handleUpload = (event) => {
        const sender_username = creds?.userName
        sendMessage(creds, chatId, { files: event.target.files, text: '' ,sender_username}, r => console.log('Image Send', r));
    }

    // Handling Emojis
    const toggleEmojiPicker = () =>{
        setEmojiPickerState(!emojiPickerState)
    }
    function onEmojiClick(event,emojiObject) {
        setValue(value + `${emojiObject?.emoji}`);
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
                    onChange={handleUpload.bind(this)}
                />

                <label htmlFor="emoji">
                    <span className="image-button">
                        <SmileOutlined className="picture-icon" onClick={()=>toggleEmojiPicker()} />
                    </span>      
                </label>

                <button type="submit" className="send-button">
                    <SendOutlined className="send-icon" />
                </button>

            </form>
            <span>{emojiPickerState && <Picker
                onEmojiClick={onEmojiClick}
                disableAutoFocus={true}
                
            />} 
            </span>

        </div>    

    )
}

export default MessageForm
