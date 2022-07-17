import { background, ButtonGroup, Flex, InputGroup, InputLeftAddon, MenuButton, PopoverFooter, useDisclosure } from "@chakra-ui/react"
import { Button, Container, Menu, Popover, PopoverTrigger, Input, PopoverContent, Text, PopoverHeader, PopoverCloseButton, PopoverBody, PopoverArrow, Box } from "@chakra-ui/react"
import React, { useState } from "react"
import LoopSelection from "./LoopSelection"
import FocusLock, { AutoFocusInside } from 'react-focus-lock';

import { FiClock } from "react-icons/fi"
import reactSelect from "react-select";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

export default function EditAndAdd({}){
  const initialFocusRef = React.useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState('no title')
  const [content, setContent] = useState('no content')
  const [time, setTime] = useState('no time')


  const submitSave = async () => {
    const res = await fetch('api/postCalendarEvent', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
        time
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    console.log(data)
  }

  const setOnClose = ()=> { 
    console.log("click?")
    submitSave()
    // onClose
  }

  const renderPopoverContent = ()=> {
    if(isOpen)
      return (
          <PopoverContent bg='blue.800' color='white' w="50vh" >
              <PopoverHeader fontWeight='semibold'>Add Schedule</PopoverHeader>
              <PopoverArrow bg='pink.500' />
              <PopoverCloseButton _hover={{bg:"blue.500"}}/>
              <PopoverBody>
                <InputGroup>
                  <InputLeftAddon bg="blue.900" w="20%" children='Title' outlineColor="black" borderColor="gray.500"/>
                  <Input placeholder='title' borderColor="gray.500"/>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg="blue.900" w="20%" children='Content'borderColor="gray.500" />
                  <Input placeholder='body' h="100px" borderColor="gray.500"/>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg="blue.900" w="20%" children='Time' borderColor="gray.500"/>
                  <Flex borderStyle="double" borderColor="gray" borderWidth="1px" borderRadius="5px" w="100%">
                    <LoopSelection/>
                  </Flex>
                  
                </InputGroup>
                
              </PopoverBody>
              <PopoverFooter>
                <ButtonGroup>
                  <Button colorScheme="blue" onClick={setOnClose}>Save</Button>
                  <Button colorScheme="blue" onClick={onClose}>Close</Button>
                </ButtonGroup>
                
              </PopoverFooter>
          </PopoverContent>)
      else 
        return <></>
  }


  return (
      <>
      <Popover onClose={onClose}       
          placement='bottom'>
        <PopoverTrigger>
          <Button onClick={onOpen} colorScheme='blue'>Add Schedule</Button>
        </PopoverTrigger>
        {renderPopoverContent(isOpen)}
      </Popover>
  </>
  )
}