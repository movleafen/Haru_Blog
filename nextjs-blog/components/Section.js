import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Box,
    Spacer,
    Stack
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'
import DashBoard from './NavSection/Dashboard'
import Calendar from './NavSection/Calendar'

export default function Section({title, setCalendar, myCalendar, events}){
    let content
    switch (title) {
        case "Dashboard": 
        content = <DashBoard/>
            break;
        case "Calendar": 
        content = <Calendar setCalendar={setCalendar} myCalendar={myCalendar} events={events}/>
            break;
        
        default:
            content = <Text> No Found!</Text>
            break;
    }
    
    return (
        <Flex 
            pos="sticky"
            flexDir="row"
            h="95vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.25)"
            borderRadius="30px"
            w="100vh"
            justifyContent="flex-start"
                  
        >
            <Flex
                marginTop="2.5vh"
                marginStart="5vh"
                flexDir="column"
                justifyContent="flex-start"
                w="90vh"
            >
                <Flex
                    h="13vh"
                    w="85vh">
                    <Box p='2'>
                    <Heading size='3xl'> {title} </Heading>
                    </Box>
                    <Spacer/>
                    <Avatar size='xl' marginTop="-1vh">
                    </Avatar>
                </Flex>
                
                <Divider orientation='horizontal' shadow="dark-lg" colorScheme="telegram"/>
                {content}
                

            </Flex>
           
        </Flex>
    )
}