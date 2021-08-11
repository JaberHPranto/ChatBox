import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'

const ChatGroup = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef()
    
    const [value, setValue] = useState('')

    function onSubmit(e) {
        e.preventDefault()
        props.onSubmit({ value })
        onClose()
        setValue('')
    }


  return (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{ color: 'white', fontSize: '1.3rem', fontWeight:'bold',marginBottom:'-10px'}}>{props.title}</div>
          <div>

          <Button onClick={onOpen}>+</Button>
        
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                        <ModalHeader>{props.header}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl onSubmit={onSubmit}>
                    <Input ref={initialRef} placeholder={props.placeholder} value={value} 
                    onChange={e => setValue(e.target.value)} />
                    </FormControl>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onSubmit}>
                    Create
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
          </div>
    </div>
  )
}

export default ChatGroup
