import { Flex, Center, Text, Grid, GridItem, Box, Popover, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, ButtonGroup, Button} from "@chakra-ui/react"
import { FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import React, { useState, useEffect } from 'react'
import Moment from "moment"
import EachDay from "./Calendar/EachDay"


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
    
    var sortedEvent = []
    events.result.map((el, index) => {
        thisMoment.startOf('day')
        var myDate = thisMoment.format()
        if(events.result[index].active)
            console.log(myDate, el.date)
        if(thisMoment.isSame(Moment(el.date)))
            console.log( "same")
        else
            console.log("not same")
    })

    useEffect(() => {
        setCalendar(month, year)
    }, [])
     // populate days in a month
    var myCalendar = []

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
        setCalendar(arrayMonths[index], year)
        
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
        setCalendar(arrayMonths[index], year)
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

    // assign first pos for the first row
    for(let i = 0; i < 7; i++){
        if(i === thisMoment.startOf('month').weekday()){
            flag = true;
        }
        if(flag === true)
        {
            myCalendar[i] = <EachDay date={date} day={day} />
            day++;
        }
        else
        {
            myCalendar[i] = <EachDay date={null}/>
        }
    }

    // assign the rest of the rows
    // day is starting from 8 here 
    for(let i =0; i < 7; i++){
        myCalendar[i+7] = <EachDay date={date} day={day}/>
        myCalendar[i+14]  = <EachDay date={date} day={day+7}/>
        myCalendar[i+21] =  <EachDay date={date} day={day+14}/>

        if(day + 21 > thisMoment.daysInMonth()){
            myCalendar[i+28] = <EachDay/>
        }
            
        else{
            myCalendar[i+28] = <EachDay date={date} day={day+21}/>
        }
        day++
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