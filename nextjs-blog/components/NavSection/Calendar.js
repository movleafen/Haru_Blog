import { Skeleton, Flex, Stack, Center, Text, Grid, GridItem, Box, Popover, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, ButtonGroup, Button, useFocusEffect} from "@chakra-ui/react"
import { FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import React, { Component , useState, useEffect } from 'react'
import Moment from "moment"
import EachDay from "./Calendar/EachDay"
import moment from "moment"




// reinvent the wheel, cuz I can
export default function Calendar( {events, setCalendar, myCalendar, setMyData} ){   
    //const events = null;
    const [isLoaded, setIsLoaded] = useState(false)
    const thisMoment = Moment()
    const arrayMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const [month, setMonth] = useState(myCalendar.month === null ? arrayMonths[thisMoment.month()] : myCalendar.month)
    const [year, setYear] = useState(myCalendar.year === null ? thisMoment.year() : myCalendar.year)
    const [sortedEvents, setSortedEvent] = useState([])
    var sortedEventsByDay = sortedEvents  
    
    async function fetchEventsData(){
        const res = await fetch('http://localhost:3000/api/getCalendarEvents')
        const data = await res.json();
        console.log("fetch data:", data)
        setMyData(data)
    }

    function resetMyData(){
        console.log("reset")
        fetchEventsData()
    }

    function setEvents (currentMonth){
        sortedEventsByDay.length = 0
        if(events != null) {
            events.result.map((el) => {
                var tmpDate = Moment(el.date)
                let tDay = tmpDate.date()
                let tMonth = tmpDate.month()
            
                currentMonth = currentMonth === undefined ? month : currentMonth
                
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
        }
        
       // setSortedEvent(sortedEvents)
    }

    useEffect(() => {
        setSortedEvent(sortedEvents)
        setEvents()
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
    thisMoment.year(year)
    thisMoment.month(month)
    let date = {year:thisMoment.year(), month:arrayMonths[thisMoment.month()], day:1}

    for(let i = 0; i < 35; i++)
    {
        if(i < 7)
        {
            if(i === thisMoment.startOf('month').weekday()){
                flag = true;
            }
            if(flag === true){
                let tmpData = date.day in sortedEventsByDay ? sortedEventsByDay[date.day] : null
                myCalendar[i] = <EachDay date={date} day={date.day} data={tmpData} sortedEvents={sortedEvents} setSortedEvent={setSortedEvent} resetMyData={resetMyData}/>
                date.day++;
            }
            else{
                myCalendar[i] = <EachDay date={null}/>
            }
        }
        else if (i >= 7 && i < 21)
        {
            let tmpData = date.day in sortedEventsByDay ? sortedEventsByDay[date.day] : null
            myCalendar[i] = <EachDay date={date} day={date.day} data={tmpData} sortedEvents={sortedEvents} setSortedEvent={setSortedEvent} resetMyData={resetMyData}/>
            date.day++
        }
        else if (i >= 21)
        {
            if(date.day > thisMoment.daysInMonth()){
                myCalendar[i] = <EachDay/>
            }
                
            else{
                let tmpData = date.day in sortedEventsByDay ? sortedEventsByDay[date.day] : null
                myCalendar[i] = <EachDay date={date} day={date.day} data={tmpData} sortedEvents={sortedEvents} setSortedEvent={setSortedEvent} resetMyData={resetMyData}/>
            }
            date.day++
        }
    }

    return (
        <>
            {isLoaded ? 
                <Stack>
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                </Stack>
                :
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
            }
        
            
        

        
        </>
    )
}