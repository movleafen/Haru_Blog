import { ScaleFade , Grid, GridItem, useDisclosure, Center, Box, Text, Popover, Menu, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, ButtonGroup, Button, PopoverTrigger, ListIcon, ListItem, background, Accordion, AccordionItem, AccordionButton, AccordionPanel, MenuButton, MenuList, MenuItem, HStack } from "@chakra-ui/react"
import React, { useState, useRef, useEffect } from "react"
import EditAndAdd from "./EditAndAdd";
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import DeleteEvent from "./DeleteEvent";

export default function EachDay({data, date, day, sortedEvents, setSortedEvent}){
    const deleteButtons = new Array(data != null || data != undefined ? data.length : 0).fill(false)
    const [isExpand, setExpand] = useState(deleteButtons)
    const { isOpen, onToggle } = useDisclosure()


    function setToggle(index){
        isExpand[index] = !isExpand[index]
        setExpand([...isExpand])
        onToggle()
    }

    function buttonTransfromation(isExpand, index){
        if(!isExpand)
            return (<>
                <Button bgColor="blue.900" key={index} w="25%" _focus={{ bg:"blue.500"}} _active={{ bg:"blue.500"} } _hover={{bg:"blue.500"}} onClick={()=> setToggle(index)}> <FiTrash2/> </Button>
            </>)
        else 
            return (<>
            <ScaleFade initialScale={0.2} in={true} w="50%">
                <Button fontSize="xs" bgColor="blue.900" w="25%" _active={{ bg:"red.500"} } _hover={{bg:"red.500"}}> Delete </Button>
                <Button fontSize="xs" bgColor="blue.900" key={index} w="25%" _active={{ bg:"blue.500"} } _hover={{bg:"blue.500"}} onClick={()=> setToggle(index)}> Cancel </Button>
            </ScaleFade>
                
             </>)
    }

    function listItems() {
        if(data != null || data != undefined){
            
            
            let tmpData = []
            data.map(data => tmpData.push(JSON.parse(data)))
            return <Accordion allowToggle>
                        {tmpData.map((data, index) => 
                            <AccordionItem key={index}>
                                <HStack p={2}>
                                    <AccordionButton _focus={{ boxShadow: "none"}} _hover={{bg:"blue.500"}}>
                                        <Box flex='1' textAlign='left' w="50%">
                                            {data.title} 
                                        </Box>
                                    </AccordionButton>
                                    {buttonTransfromation(isExpand[index], index)}
                                             
                                </HStack>
                                <AccordionPanel pb={4}>
                                    <Text fontSize='sm'>{data.content}</Text>
                                </AccordionPanel>
                            </AccordionItem>)
                        }                    
                    </Accordion>
        }
        else{
            return (<Text> Nothing in here </Text>)
        }
    }    

    if (date != null)
        return (
                <Popover
                    placement="right"
                >
                    <PopoverTrigger>
                        <Grid className="GridForPopover"
                            w="100%"
                            _hover={{ bg: "blue.100", shadow:"0 0px 10px 0 rgba(0, 0, 0, 1)" }} 
                            _focus={{ boxShadow: "outline" }} 
                            borderRadius="15px"
                            templateRows='repeat(3, 1fr)'
                            templateColumns='repeat(3, 1fr)'
                            gap={1}
                            > 
                            <GridItem rowSpan={3} colSpan={0}><Center fontSize="2xl">{day}</Center></GridItem>
                            <GridItem><Text>...</Text></GridItem>
                            
                        </Grid>
                    </PopoverTrigger>
                    <PopoverContent color='white' bg='blue.800' borderColor='blue.800' h="250px" _focus={{bg:""}}>
                        <PopoverHeader pt={2} fontWeight='bold' border='0'>
                            {date.month} {day}, {date.year}
                            </PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton/>
                            <PopoverBody h="400px">
                                <Box 
                                    sx={{
                                        '&::-webkit-scrollbar': {
                                          width: '16px',
                                          borderRadius: '8px',
                                          backgroundColor: `rgba(0, 0, 0, 0.05)`,
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                          backgroundColor: `rgba(0, 0, 0, 0.55)`,
                                          borderRadius: '8px'
                                        },
                                      }}
                                    overflowY={"scroll"} h="150px">
                                    {listItems()}
                                </Box>
                                
                            </PopoverBody>
                            <PopoverFooter
                            border='0'
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'
                            pb={2}
                        >
                        <Box fontSize='sm'></Box>
                        <ButtonGroup size='sm'>
                            <EditAndAdd date={date} day={day} sortedEvents={sortedEvents} setSortedEvent={setSortedEvent}/>
                        </ButtonGroup>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>
                
            )
    else
        return(
            <Grid w="calc(100%/7)"gap={1} />
        )
    }