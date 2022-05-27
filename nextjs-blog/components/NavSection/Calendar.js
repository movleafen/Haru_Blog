import { Flex, Box, Center, Square, Text, MenuList, MenuButton, Menu, Button, Icon, Grid, GridItem } from "@chakra-ui/react"
import { FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import React, { useState } from 'react'
import Moment from "moment"

// reinvent the wheel, cuz I can
export default function Calendar(){
    const oneDay =(content)=> {
                    if (content != "")
                        return (
                                <Grid w="calc(100%/7)"
                                    paddingLeft={5}
                                    _hover={{ bg: "blue.100", 
                                    shadow:"0 0px 10px 0 rgba(0, 0, 0, 1)" }} 
                                    _focus={{ boxShadow: "outline" }} 
                                    borderRadius="15px"
                                    templateRows='repeat(3, 1fr)'
                                    templateColumns='repeat(3, 1fr)'
                                    gap={1}
                                    > 
                                    <GridItem rowSpan={3} colSpan={0}><Center>{content}</Center></GridItem>
                                    <GridItem><Text>...</Text></GridItem>
                                    <GridItem><Text>...</Text></GridItem>
                                    <GridItem><Text>...</Text></GridItem>
                                    <GridItem><Text>...</Text></GridItem>
                                    
                                </Grid>
                                
                            )
                    else
                        return(
                            <Grid w="14%"> </Grid>
                        )
                    }

    const thisMoment = Moment();
    
    const arrayMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const [month, setMonth] = useState(arrayMonths[thisMoment.month()])
     // populate days in a month
    var monthCalendar = {firstRow:[7], secondRow:[7], thirdRow:[7], fourthRow:[7], fifthRow:[7]};

    function leftMonthArrow(month){
        // get arrayMonths index
        let index = arrayMonths.indexOf(month)
        if(index === 0)
            index = 11
        else
            index--
        setMonth(arrayMonths[index])
    }
    function rightMonthArrow(month){
        // get arrayMonths index
        let index = arrayMonths.indexOf(month)
        if(index === 11)
            index = 0
        else
            index++
        setMonth(arrayMonths[index])
    }
   
    var flag = false;
    var day = 1;
    thisMoment.month(month)
    // assign first pos for the first row
    for(let i = 0; i < 7; i++){
        if(i == thisMoment.weekday()){
            flag = true;
        }
        if(flag == true)
        {
            monthCalendar.firstRow[i] = oneDay(day);
            day++;
        }
        else
            monthCalendar.firstRow[i] = oneDay("")
    }
    // assign the rest of the rows
    for(let i =0; i < 7; i++){
        
        monthCalendar.secondRow[i] = oneDay(day)
        monthCalendar.thirdRow[i] = oneDay(day+7)
        monthCalendar.fourthRow[i] = oneDay(day+14)
        if(day + 21 > thisMoment.daysInMonth())
            monthCalendar.fifthRow[i] = oneDay("")
        else
            monthCalendar.fifthRow[i] = oneDay(day+21)

        day++
    }
    
    return (
        <Flex marginTop='8' w="100%" h="75%" direction="column">
            
            <Center h='100px'>
                <Button colorScheme="blackAlpha" marginRight="15%" variant='outline' onClick={()=> leftMonthArrow(month)}>
                    <FiChevronLeft></FiChevronLeft>
                </Button>
                    <Text w="10%">{month}</Text>
                <Button colorScheme='blackAlpha' marginLeft="15%" variant='outline' onClick={()=> rightMonthArrow(month)}>
                    <FiChevronRight></FiChevronRight>
                </Button>
            </Center>
            <Flex className="CalendarBody" w="100%" h="85%" direction="column" background="gray.200" borderRadius="15px">
                <Flex className="WeekdayLabel" w="100%" h="10%" direction="row">
                    <Center w="calc(100%/7)"> Monday </Center>
                    <Center w="calc(100%/7)"> Tuesday </Center>
                    <Center w="calc(100%/7)"> Wednesday </Center>
                    <Center w="calc(100%/7)"> Thursday </Center>
                    <Center w="calc(100%/7)"> Friday </Center>
                    <Center w="calc(100%/7)"> Saturday </Center>
                    <Center w="calc(100%/7)"> Sunday </Center>
                </Flex>
                <Flex className="FirstCalendarRow" h="18%" w="100%">
                        {monthCalendar.firstRow.map( (a)=> {
                            return a;
                        })}
                    
                </Flex>
                <Flex className="SecondCalendarRow" h="18%" w="100%">
                        {monthCalendar.secondRow.map( (a)=> {
                            return a;
                        })}
                    
                </Flex>
                <Flex className="ThirdCalendarRow" h="18%" w="100%">
                        {monthCalendar.thirdRow.map( (a)=> {
                            return a;
                        })}
                    
                </Flex>
                <Flex className="FourthCalendarRow" h="18%" w="100%">
                        {monthCalendar.fourthRow.map( (a)=> {
                            return a;
                        })}
                    
                </Flex>
                <Flex className="FifthCalendarRow" h="18%" w="100%">
                        {monthCalendar.fifthRow.map( (a)=> {
                            return a;
                        })}
                    
                </Flex>
            </Flex>
            <Flex>

            </Flex>
            
        </Flex>
    )
}