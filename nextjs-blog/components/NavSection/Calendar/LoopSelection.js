import { Menu, MenuButton, MenuList, Flex, Box, Heading, Text, useDisclosure, MenuItem, Center } from "@chakra-ui/react"
import { useRef, useState, useEffect } from "react";

export default function LoopSelection(){
    const hours =  [...Array.from(Array(12).keys()), ...Array.from(Array(12).keys())]
    const minutes = [...Array.from(Array(60).keys()), ...Array.from(Array(60).keys())]
    const [optionHour, setOptionHour] = useState(1)
    const [optionMinute, setOptionMinute] = useState(0)
    const [midday, setMidday] = useState("AM")
    const myRef = useRef(null)
    const executeScroll = () =>{ 
        let el = myRef.current
        let height = el.scrollHeight
        let clientHeight = el.getBoundingClientRect().height
        // workout arround without useEffect on this one, because chakra-ui manu-list resets scrolling upon OPEN
        setTimeout(function (){el.scrollTo(0, (height - clientHeight)/2)}, 50)
    }    

    // infinity loop scrolling? will add that later 
    const elementScrollDataForHours = (value) => {
        let scrollClientHeight = value.currentTarget.getBoundingClientRect().height
        let scrollTop = value.currentTarget.scrollTop
        let scrollHeight = value.currentTarget.scrollHeight
        if(scrollTop == 0)
            value.currentTarget.scrollTo(0, (scrollHeight/hours.length)*(hours.length/2))
        if(scrollTop === (scrollHeight - scrollClientHeight))
            value.currentTarget.scrollTo(0, (scrollHeight/hours.length)*((hours.length/2)-2))
        // console.log(scrollTop, scrollHeight, scrollClientHeight)
    }

    const elementScrollDataForMinutes = (value) => {
        let scrollClientHeight = value.currentTarget.getBoundingClientRect().height
        let scrollTop = value.currentTarget.scrollTop
        let scrollHeight = value.currentTarget.scrollHeight
        if(scrollTop == 0)
            value.currentTarget.scrollTo(0, (scrollHeight/minutes.length)*(minutes.length/2))
        if(scrollTop === (scrollHeight - scrollClientHeight))
            value.currentTarget.scrollTo(0, (scrollHeight/minutes.length)*((minutes.length/2)-2))
        console.log(scrollTop, scrollHeight, scrollClientHeight)
        
    }

    function DisplayHour(time, type){
        if(time.length === 0)
            time = type === "hours" ? prepHours : prepMinutes
        
        const selectType = type === "hours" ? setOptionHour : setOptionMinute 
        const displayCenter = (el) => {
            if(optionHour === el+1)
                return <Center>{type==="hours" ? el+1 : el}</Center>
            else
                return <Center>{type==="hours" ? el+1 : el}</Center>
        }
        
        return <>
            {time.map((el, index) => {
                return <MenuItem key={index}
                        w="100%" 
                        _hover={{bg:"blue.500"}}
                        _focus={{bg:"blue.600"}} 
                        onClick={()=>selectType(type === "hours"? el+1 : (el === 0 ? '00' : el) )}
                        >
                            {displayCenter(el)}
                        </MenuItem>
            })}
        </>
    }

    return(
        <>
        <Menu>
            <MenuButton  
                onClick={executeScroll}
                w="15%" 
                bg="whiteAlpha.400" 
                _hover={{ 
                    boxShadow:"0 0px 20px 0 rgba(0, 0, 0, 1)", 
                    bg:"blue.500"
                    }}
                    > 
                {optionHour}  
            </MenuButton>
            <MenuList
                    border="none"
                    h={30}
                    mt={-100}
                    minWidth="0"
                    bg={{opacity:"0"}}
                >
                    <Flex
                        h={100}
                        w={20}
                        width="100%"
                        flexDir="column"
                        alignItems="center"
                        justify="center"
                        backgroundColor="blue.800"
                        borderRadius="5px"
                        color="white"
                        textAlign="center"
                        overflow="hidden"
                        boxShadow="0 0px 20px 0 rgba(0, 0, 0, 1)"
                    >
                        <Box
                            className="myBox"
                            ref={myRef}
                            onScroll={elementScrollDataForHours}
                            width="100%"
                            overflowY="auto"
                            css={{
                                '&::-webkit-scrollbar': {
                                width: '1px',
                                },
                            }} 
                            > 
                            {DisplayHour(hours, "hours")}
                        </Box>
                    </Flex>
            </MenuList>
        </Menu>
        <Center fontSize="lg" w="10px" bg="gray">:</Center>
        <Menu>
            <MenuButton  onClick={executeScroll} w="15%" bg="whiteAlpha.400" _hover={{ boxShadow:"0 0px 20px 0 rgba(0, 0, 0, 1)", bg:"blue.500"}}> {optionMinute}  </MenuButton>
            <MenuList 
                    border="none"
                    h={30}
                    mt={-100}
                    minWidth="0"
                    bg={{opacity:"0"}}
                >
                    <Flex
                        
                        h={100}
                        w={20}
                        width="100%"
                        flexDir="column"
                        alignItems="center"
                        justify="center"
                        backgroundColor="blue.800"
                        borderRadius="5px"
                        color="white"
                        textAlign="center"
                        overflow="hidden"
                        boxShadow="0 0px 20px 0 rgba(0, 0, 0, 1)"
                    >
                        <Box
                            ref={myRef}
                            onScroll={elementScrollDataForMinutes}
                            width="100%"
                            overflowY="auto"
                            css={{
                                '&::-webkit-scrollbar': {
                                width: '1px',
                                },
                                
                            }}
                            >
                            {DisplayHour(minutes, "minutes")}
                        </Box>
                        
                    </Flex>
            </MenuList>
        </Menu>
        <Menu>
            <MenuButton  w="15%" bg="whiteAlpha.400" _hover={{ boxShadow:"0 0px 20px 0 rgba(0, 0, 0, 1)", bg:"blue.500"}}> {midday}  </MenuButton>
            <MenuList 
                    border="none"
                    h={30}
                    mt={-100}
                    minWidth="0"
                    bg={{opacity:"0"}}
                >
                    <Flex
                        
                        h={100}
                        w={20}
                        width="100%"
                        flexDir="column"
                        alignItems="center"
                        justify="center"
                        backgroundColor="blue.800"
                        borderRadius="5px"
                        color="white"
                        textAlign="center"
                        overflow="hidden"
                        boxShadow="0 0px 20px 0 rgba(0, 0, 0, 1)"
                    >
                        <Box
                            scrollMarginY = "50%"
                            width="100%"
                            overflowY="auto"
                            css={{
                                '&::-webkit-scrollbar': {
                                width: '1px',
                                },
                                
                            }}
                            >
                            <MenuItem w="100%" _hover={{bg:"blue.500"}} _focus={{bg:"blue.600"}} onClick={()=>setMidday("AM")}>AM</MenuItem>
                            <MenuItem w="100%" _hover={{bg:"blue.500"}} _focus={{bg:"blue.600"}} onClick={()=>setMidday("PM")}>PM</MenuItem>
                        </Box>
                        
                    </Flex>
            </MenuList>
        </Menu>
        
        </>)

}