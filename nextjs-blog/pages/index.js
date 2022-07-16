import Head from 'next/head'
import SideBar from '../components/Sidebar'
import Section from '../components/Section'
import React, { useState } from 'react'
import {Stack} from '@chakra-ui/react'

// pre-render data retrieving
export async function getStaticProps(){
  // get events from calendar
  console.log("revalidating...")
  const res = await fetch('http://localhost:3000/api/getCalendarEvents')
  const data = await res.json();
  return {
    props: { events:data }, 
    revalidate: 2,
  }
}

export default function Home( {events} ) {
  const [title, selectedTitle] = useState("Dashboard")
  const [myCalendar, setMyCalendar] = useState({month:null, year:null})
  function setCalendar(month, year){
    setMyCalendar({month:month, year:year})
  }
  function clickedTitle(title){
    selectedTitle(title)
  }

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
          <Section title={title} setCalendar={setCalendar} myCalendar={myCalendar} events={events}> </Section>
        </Stack>
      
      </main>

    </div>
  )
}
