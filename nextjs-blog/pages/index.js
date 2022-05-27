import Head from 'next/head'
import SideBar from '../components/Sidebar'
import Section from '../components/Section'
import React, { useState } from 'react'

import {
  Flex,
  Box,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
  Stack,
  Avatar

} from '@chakra-ui/react'

export default function Home() {
  const [title, selectedTitle] = useState("Dashboard")

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
          <Section title={title}> </Section>
        </Stack>
        
      
      </main>

    </div>
  )
}
