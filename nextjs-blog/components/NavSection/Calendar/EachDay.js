import { Grid, GridItem, Center, Box, Text, Popover, UnorderedList, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, ButtonGroup, Button, PopoverTrigger, ListIcon, ListItem, background } from "@chakra-ui/react"
import React from "react"
export default function EachDay({content, date, day}){
    const [isOpen, setIsOpen] = React.useState(false);
    const open = () => setIsOpen(!isOpen);

    if (date != null)
        return (
                <Popover
                    placement="right"
                >
                    <PopoverTrigger>
                        <Grid
                            w="100%"
                            _hover={{ bg: "blue.100", shadow:"0 0px 10px 0 rgba(0, 0, 0, 1)" }} 
                            _focus={{ boxShadow: "outline" }} 
                            borderRadius="15px"
                            templateRows='repeat(3, 1fr)'
                            templateColumns='repeat(3, 1fr)'
                            gap={1}
                            onClick={open}
                            > 
                            <GridItem rowSpan={3} colSpan={0}><Center>{day}</Center></GridItem>
                            <GridItem><Text>...</Text></GridItem>
                            <GridItem><Text>...</Text></GridItem>
                            <GridItem><Text>...</Text></GridItem>
                            <GridItem><Text>...</Text></GridItem>
                        </Grid>
                    </PopoverTrigger>
                    <PopoverContent color='white' bg='blue.800' borderColor='blue.800' h="250px">
                        <PopoverHeader pt={4} fontWeight='bold' border='0'>
                            {date.month} {day}, {date.year}
                            </PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody h="200px">
                                <Box 
                                    sx={{
                                        '&::-webkit-scrollbar': {
                                          width: '16px',
                                          borderRadius: '8px',
                                          backgroundColor: `rgba(0, 0, 0, 0.05)`,
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                          backgroundColor: `rgba(0, 0, 0, 0.55)`,
                                          borderRadius: '8px'
                                        },
                                      }}
                                    overflowY={"scroll"} h="100px">
                                    <UnorderedList>
                                        <ListItem>Lorem ipsum dolor sit amet</ListItem>
                                        <ListItem>Consectetur adipiscing elit</ListItem>
                                        <ListItem>Integer molestie lorem at massa</ListItem>
                                        <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                                        <ListItem>Lorem ipsum dolor sit amet</ListItem>
                                        <ListItem>Consectetur adipiscing elit</ListItem>
                                        <ListItem>Integer molestie lorem at massa</ListItem>
                                        <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                                    </UnorderedList>
                                </Box>
                                
                            </PopoverBody>
                            <PopoverFooter
                            border='0'
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'
                            pb={4}
                        >
                        <Box fontSize='sm'>Step 2 of 4</Box>
                        <ButtonGroup size='sm'>
                            <Button colorScheme='green'>Setup Email</Button>
                        </ButtonGroup>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>
                
            )
    else
        return(
            <Grid w="calc(100%/7)"gap={1} />
        )
    }