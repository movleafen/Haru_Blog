import { Flex, Box, Center, Square, Text, MenuList, MenuButton, Menu, Button, Icon, Grid, GridItem } from "@chakra-ui/react"
import { FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import React, { useState } from 'react'
import Moment from "moment"
import EachDay from "./Calendar/EachDay"

// reinvent the wheel, cuz I can
export default function Calendar(){   
    const thisMoment = Moment()
    const arrayMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const [month, setMonth] = useState(arrayMonths[thisMoment.month()])
     // populate days in a month
    var monthCalendar = {firstRow:[], secondRow:[], thirdRow:[], fourthRow:[], fifthRow:[]};

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
        if(i === thisMoment.weekday()){
            flag = true;
        }
        if(flag === true)
        {
            console.log("w: " + i)
            //monthCalendar.firstRow = new Object
            monthCalendar.firstRow[i]= <EachDay content={day} key={i}/>
            day++;
        }
        else
        { 
            monthCalendar.firstRow[i] = <EachDay content="" key={i}/>
        }
    }

    // assign the rest of the rows
    for(let i =0; i < 7; i++){
        monthCalendar.secondRow[i] = <EachDay content={day} key={i}/>
        monthCalendar.thirdRow[i] = <EachDay content={day+7} key={i}/>
        monthCalendar.fourthRow[i] = <EachDay content={day+14} key={i}/>
        if(day + 21 > thisMoment.daysInMonth())
            monthCalendar.fifthRow[i] = <EachDay content="" key={i}/>
        else
            monthCalendar.fifthRow[i] = <EachDay content={day+21} key={i}/>
        day++
    }
    console.log(thisMoment.daysInMonth())
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
                        {monthCalendar.firstRow}
                </Flex>
                <Flex className="SecondCalendarRow" h="18%" w="100%">
                        {monthCalendar.secondRow}
                </Flex> 
                <Flex className="ThirdCalendarRow" h="18%" w="100%">
                        {monthCalendar.thirdRow}
                </Flex>
                <Flex className="FourthCalendarRow" h="18%" w="100%">
                        {monthCalendar.fourthRow}
                </Flex>
                <Flex className="FifthCalendarRow" h="18%" w="100%">
                        {monthCalendar.fifthRow}
                </Flex>
            </Flex>
            <Flex>

            </Flex>
            
        </Flex>
    )
}