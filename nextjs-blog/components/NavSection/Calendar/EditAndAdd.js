import { background, ButtonGroup, Flex, InputGroup, InputLeftAddon, MenuButton, PopoverFooter, useDisclosure, useToast } from "@chakra-ui/react"
import { Button, Container, Menu, Popover, PopoverTrigger, Input, PopoverContent, Text, PopoverHeader, PopoverCloseButton, PopoverBody, PopoverArrow, Box } from "@chakra-ui/react"
import React, { useRef, useState } from "react"
import LoopSelection from "./LoopSelection"
import FocusLock, { AutoFocusInside } from 'react-focus-lock';
import moment from "moment";

export default function EditAndAdd({date, day, sortedEvents, setSortedEvent, resetMyData}){
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState('no title')
  const [content, setContent] = useState('no content')
  const [time, setTime] = useState(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
  const [optionHour, setOptionHour] = useState(1)
  const [optionMinute, setOptionMinute] = useState(0)
  const [midday, setMidday] = useState("AM")
  const toast = useToast()

  const handleChange = (event) => {
    event.target.name === "title" ? setTitle(event.target.value) : setContent(event.target.value) 
  }

  const submitSave = async () => {
    const myMoment = new moment
    myMoment.set('year', date.year)
    myMoment.set('month', date.month)
    myMoment.set('date', day)
    myMoment.set('hour', midday=="AM" ? optionHour : optionHour+12)
    myMoment.set('minute', optionMinute)
    myMoment.set('second', 0)
    const res = await fetch('api/postCalendarEvent', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        content: content,
        time: myMoment.format("YYYY-MM-DD HH:mm:ss")
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await res.json()
    
    if(res.status == 200){
      // append
      console.log(result[0].insertId)
      const myEvent = {eventid:result[0].insertId, title:title, content:content, date:myMoment.format("YYYY-MM-DD HH:mm:ss"), active:1}
      const tmpEvn = [...sortedEvents]
      tmpEvn[day] = tmpEvn[day] === undefined ? [] : tmpEvn[day]
      tmpEvn[day].push(JSON.stringify(myEvent))
      resetMyData()
      setSortedEvent(tmpEvn)
      toast({
        title: 'Succefully Added.',
        description: `An event has been added - ${moment().format("MMM Do YY")}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position:'top'
      })
      onClose()
      
    }
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
                  <InputLeftAddon bg="blue.900" w="25%" children='Title' outlineColor="black" borderColor="gray.500"/>
                  <Input placeholder='title' borderColor="gray.500" name="title" onChange={handleChange} />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg="blue.900" w="25%" children='Content'borderColor="gray.500" />
                  <Input placeholder='body' h="100px" borderColor="gray.500" name="content" onChange={handleChange}/>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg="blue.900" w="25%" children='Time' borderColor="gray.500"/>
                  <Flex borderStyle="double" borderColor="gray" borderWidth="1px" borderRadius="5px" w="100%">
                    <LoopSelection setOptionHour={setOptionHour} optionHour={optionHour} setOptionMinute={setOptionMinute} optionMinute={optionMinute} setMidday={setMidday} midday={midday}/>
                  </Flex>
                  
                </InputGroup>
                
              </PopoverBody>
              <PopoverFooter>
                <ButtonGroup>
                  <Button colorScheme="blue" onClick={submitSave}>Save</Button>
                  <Button colorScheme="blue" onClick={onClose}>Close</Button>
                </ButtonGroup>
                
              </PopoverFooter>
          </PopoverContent>
        )
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