import { Avatar, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'


const Profile = ({name,email,photo}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <button style={{outline:'none'}} onClick={onOpen} >Profile</button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='profile-header' >User Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
  
            <Wrap>
              <WrapItem className='profile-pic'>
                <Avatar size="2xl" name={name} src={photo} />{" "}
              </WrapItem>      
            </Wrap>
            <Text fontSize="2xl" align="center">{name}</Text>
            <Text fontSize="lg" fontWeight='light' align="center">{email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>OK</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Profile