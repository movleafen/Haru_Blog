import { Flex, Center, Text, Grid, GridItem, Box, Popover, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, ButtonGroup, Button} from "@chakra-ui/react"
import { FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import React, { useState, useEffect } from 'react'
import Moment from "moment"
import EachDay from "./Calendar/EachDay"


// reinvent the wheel, cuz I can

export default function Calendar(){   
    const thisMoment = Moment()
    const arrayMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const [month, setMonth] = useState(arrayMonths[thisMoment.month()])
    const [year, setYear] = useState(thisMoment.year())
    const [posts, setPosts] = useState([])
     // populate days in a month
    var monthCalendar = {firstRow:[], secondRow:[], thirdRow:[], fourthRow:[], fifthRow:[]};

    const test = async () => {
        const res = await fetch("/api/hello")
        const json = await res.json()
        console.log(json)
        setPosts(json)
        
    }
    useEffect(() => {
        test();
    }, [])

    // test api sql
    function leftMonthArrow(month){
        // get arrayMonths index
        let index = arrayMonths.indexOf(month)
        if(index === 0)
        {
            index = 11
            setYear(--year)
        }
        else
            index--
        setMonth(arrayMonths[index])
    }
    function rightMonthArrow(month){
        // get arrayMonths index
        let index = arrayMonths.indexOf(month)
        if(index === 11)
            {
                index = 0
                setYear(++year)
            }
        else
            index++
        setMonth(arrayMonths[index])
    }
   
    var flag = false;
    var day = 1;
    thisMoment.year(year)
    thisMoment.month(month)
    let date = {year:thisMoment.year(), month:arrayMonths[thisMoment.month()]}

    // assign first pos for the first row
    for(let i = 0; i < 7; i++){
        if(i === thisMoment.startOf('month').weekday()){
            flag = true;
        }
        if(flag === true)
        {
            monthCalendar.firstRow[i]= <EachDay date={date} day={day} key={i}/>
            day++;
        }
        else
        { 
            monthCalendar.firstRow[i] = <EachDay date={null} key={i}/>
        }
    }

    // assign the rest of the rows
    for(let i =0; i < 7; i++){
        monthCalendar.secondRow[i] = <EachDay date={date} day={day} key={i}/>
        monthCalendar.thirdRow[i] = <EachDay date={date} day={day+7} key={i}/>
        monthCalendar.fourthRow[i] = <EachDay date={date} day={day+14} key={i}/>

        if(day + 21 > thisMoment.daysInMonth())
            monthCalendar.fifthRow[i] = <EachDay key={i}/>
        else
            monthCalendar.fifthRow[i] = <EachDay date={date} day={day+21} key={i}/>
        day++
    }

    return (
        
        <Flex marginTop='8' w="100%" h="75%" direction="column">
            
            <Center h='100px'>
                <Button colorScheme="blackAlpha"  variant='outline' onClick={()=> leftMonthArrow(month)}>
                    <FiChevronLeft></FiChevronLeft>
                </Button>
                    <Center w="25%">{month} {year} {posts.text}</Center>
                <Button colorScheme='blackAlpha'  variant='outline' onClick={()=> rightMonthArrow(month)}>
                    <FiChevronRight></FiChevronRight>
                </Button>
            </Center>
            <Flex className="CalendarBody" w="100%" h="85%" direction="column" background="gray.200" borderRadius="15px">
                <Flex className="WeekdayLabel" w="100%" h="10%" direction="row">
                    <Center w="calc(100%/7)"> Sunday </Center>
                    <Center w="calc(100%/7)"> Monday </Center>
                    <Center w="calc(100%/7)"> Tuesday </Center>
                    <Center w="calc(100%/7)"> Wednesday </Center>
                    <Center w="calc(100%/7)"> Thursday </Center>
                    <Center w="calc(100%/7)"> Friday </Center>
                    <Center w="calc(100%/7)"> Saturday </Center>
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