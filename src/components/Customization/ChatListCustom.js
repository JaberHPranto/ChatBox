import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Grid, useDisclosure } from '@chakra-ui/react'
import React from 'react'

function ChatListCustom(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const handleRadioChecked = (value) => {
        props.handleTheme(value)
    }

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Choose Chat List Overlay</DrawerHeader>

                  <DrawerBody>
                      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                          <Box className="chatList-span blue" onClick={() => handleRadioChecked('blue')} ></Box>
                          <Box className="chatList-span yellow" onClick={() => handleRadioChecked('yellow')} ></Box>
                          <Box className="chatList-span red" onClick={() => handleRadioChecked('red')} ></Box>
                          <Box className="chatList-span pink" onClick={() => handleRadioChecked('pink')} ></Box>
                          <Box className="chatList-span green" onClick={() => handleRadioChecked('green')} ></Box>
                          <Box className="chatList-span purple" onClick={() => handleRadioChecked('purple')} ></Box>
                          <Box className="chatList-span brown" onClick={() => handleRadioChecked('brown')} ></Box>
                          <Box className="chatList-span dark" onClick={() => handleRadioChecked('dark')} ></Box>
                          <Box className="chatList-span orange" onClick={() => handleRadioChecked('orange')} ></Box>
                          <Box className="chatList-span mint" onClick={() => handleRadioChecked('mint')} ></Box>
                      </Grid>
                  </DrawerBody>
                  
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ChatListCustom