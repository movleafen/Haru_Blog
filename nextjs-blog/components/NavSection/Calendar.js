import { Flex, Center, Text, Grid, GridItem, Box, Popover, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, ButtonGroup, Button} from "@chakra-ui/react"
import { FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import React, { useState, useEffect } from 'react'
import Moment from "moment"
import EachDay from "./Calendar/EachDay"
import moment from "moment"


function CheckEqualDate(left, right){
    console.log(left)
    console.log(right)
    if(right === left)
        return true
    else
        return false
}

// reinvent the wheel, cuz I can
export default function Calendar( {events, setCalendar, myCalendar} ){   
    const thisMoment = Moment()
    const arrayMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const [month, setMonth] = useState(myCalendar.month === null ? arrayMonths[thisMoment.month()] : myCalendar.month)
    const [year, setYear] = useState(myCalendar.year === null ? thisMoment.year() : myCalendar.year)
    const [sortedEvents, setSortedEvent] = useState([])
    var sortedEventsByDay = sortedEvents  
    
    // events.result.map((el, index) => {
    //     var tmpDate = Moment(el.date)
    //     let tDay = tmpDate.date()
    //     let tMonth = tmpDate.month()

    //     if(tMonth === thisMoment.month()) {
    //         if(tDay in sortedEventsByDay){
    //             sortedEventsByDay[tDay].push(JSON.stringify(el))
    //         }
    //         else{
    //             sortedEventsByDay[tDay] = new Array
    //             sortedEventsByDay[tDay][0] = JSON.stringify(el)
    //         }
    //     }
    // })
    
    function setEvents (currentMonth){
        sortedEventsByDay.length = 0
        events.result.map((el, index) => {
            
            var tmpDate = Moment(el.date)
            let tDay = tmpDate.date()
            let tMonth = tmpDate.month()
            
            currentMonth = currentMonth === undefined ? month : currentMonth
            console.log("an event in month", arrayMonths[tMonth])
            console.log("selected month", currentMonth)
            
            if(arrayMonths[tMonth] === currentMonth){
                if(tDay in sortedEventsByDay){
                    sortedEventsByDay[tDay].push(JSON.stringify(el))
                }
                else{
                    sortedEventsByDay[tDay] = new Array
                    sortedEventsByDay[tDay][0] = JSON.stringify(el)
                }
            }

        })
        setSortedEvent(sortedEvents)
        console.log(sortedEventsByDay)
    }

    useEffect(() => {
        setSortedEvent(sortedEvents)
        setEvents()
    }, [])

    useEffect(() => {
        setCalendar(month, year)
    }, [month])
     // populate days in a month
    var myCalendar = [] 

    function leftMonthArrow(month){
        // get arrayMonths index
        let index = arrayMonths.indexOf(month)
        let tMonth = month
        if(index === 0)
        {
            index = 11
            setYear(--year)
        }
        else
            index--
        tMonth = arrayMonths[index]
        setMonth(tMonth)
        setCalendar(arrayMonths[index], year)
        setEvents(tMonth)

    }
    function rightMonthArrow(month){
        // get arrayMonths index
        let index = arrayMonths.indexOf(month)
        let tMonth = month
        if(index === 11)
            {
                index = 0
                setYear(++year)
            }
        else
            index++
        tMonth = arrayMonths[index]
        setMonth(arrayMonths[index])
        setCalendar(arrayMonths[index], year)
        setEvents(tMonth)
    }
    function makeWeekDayLabels(item){
        return(
            <GridItem w="100%" h={10} marginLeft={10} key={item} >
                <Center w="calc(100%/7)"> {item} </Center>
            </GridItem>
            )
    }
    function makeGridItem(item, index){
        return( <GridItem marginLeft="5" key={index}> {item} </GridItem> )
        
    }
   
    var flag = false;
    var day = 1;
    thisMoment.year(year)
    thisMoment.month(month)
    let date = {year:thisMoment.year(), month:arrayMonths[thisMoment.month()]}

    for(let i = 0; i < 35; i++)
    {
        if(i < 7)
        {
            if(i === thisMoment.startOf('month').weekday()){
                flag = true;
            }
            if(flag === true)
            {
                let tmpData = day in sortedEventsByDay ? sortedEventsByDay[day] : null
                myCalendar[i] = <EachDay date={date} day={day} data={tmpData}/>
                day++;
            }
            else
            {
                myCalendar[i] = <EachDay date={null}/>
            }
        }
        else if (i >= 7 && i < 21)
        {
            let tmpData = day in sortedEventsByDay ? sortedEventsByDay[day] : null
            myCalendar[i] = <EachDay date={date} day={day} data={tmpData}/>
            day++
        }
        else if (i >= 21)
        {
            if(day > thisMoment.daysInMonth()){
                myCalendar[i] = <EachDay/>
            }
                
            else{
                let tmpData = day in sortedEventsByDay ? sortedEventsByDay[day] : null
                myCalendar[i] = <EachDay date={date} day={day} data={tmpData}/>
            }
            day++
        }
        
    }
    
    return (
        
        <Flex marginTop='8' w="100%" h="75%" direction="column">
            
            <Center h='100px'>
                <Button colorScheme="blackAlpha"  variant='outline' onClick={()=> leftMonthArrow(month)}>
                    <FiChevronLeft></FiChevronLeft>
                </Button>
                    <Center w="25%">{month} {year}</Center>
                <Button colorScheme='blackAlpha'  variant='outline' onClick={()=> rightMonthArrow(month)}>
                    <FiChevronRight></FiChevronRight>
                </Button>
            </Center>
            <Grid templateColumns='repeat(7, 6fr)' className="CalendarBody" w="100%" h="85%" background="gray.200" borderRadius="15px">
                {makeWeekDayLabels("Sunday")}
                {makeWeekDayLabels("Monday")}
                {makeWeekDayLabels("Tuesday")}
                {makeWeekDayLabels("Wednesday")}
                {makeWeekDayLabels("Thursday")}
                {makeWeekDayLabels("Friday")}
                {makeWeekDayLabels("Saturday")}
                
                { myCalendar.map( (el, index) => {return makeGridItem(el, index)} )}
            </Grid>
            
        </Flex>
    )
}