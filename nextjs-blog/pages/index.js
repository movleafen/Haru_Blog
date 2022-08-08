import Head from 'next/head'
import SideBar from '../components/Sidebar'
import Section from '../components/Section'
import React, { useEffect, useState } from 'react'
import {Stack} from '@chakra-ui/react'

// pre-render data retrieving
export async function getStaticProps(){
  // get events from calendar
  const res = await fetch('http://localhost:3000/api/getCalendarEvents')
  const data = await res.json();
  return {
    props: { events:data }, 
  }
}

export default function Home( {events} ) {
  const [title, selectedTitle] = useState("Dashboard")
  const [myCalendar, setMyCalendar] = useState({month:null, year:null})
  const [myData, setMyData] = useState(events)
  function setCalendar(month, year){
    setMyCalendar({month:month, year:year})
  }
  function clickedTitle(title){
    selectedTitle(title)
  }

  useEffect(() => {
    
    console.log("watch my data:", myData)
  }, [myData])
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Stack gap="5vh"
          marginTop="2.5vh"
          maxH
          maxW
          direction="row"
          marginLeft="2vh"
        >
          <SideBar clickedTitle={clickedTitle}></SideBar>
          <Section title={title} setCalendar={setCalendar} myCalendar={myCalendar} events={myData} setMyData={setMyData}> </Section>
        </Stack>
      
      </main>

    </div>
  )
}
