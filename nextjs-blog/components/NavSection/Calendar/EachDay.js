import { Grid, GridItem, Center, Box, Text, Popover, UnorderedList, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, ButtonGroup, Button, PopoverTrigger, ListIcon, ListItem, background, Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@chakra-ui/react"
import React from "react"
import EditAndAdd from "./EditAndAdd";

export default function EachDay({data, date, day}){
    const [isOpen, setIsOpen] = React.useState(false);
    const open = () => setIsOpen(!isOpen);
  

    function listItems() {
        if(data != null || data != undefined){
            let tmpData = []
            data.map(data => tmpData.push(JSON.parse(data)))
            console.log(tmpData)
            return <Accordion allowToggle>
                        {tmpData.map(data => 
                            <AccordionItem key={data.title}>
                                <AccordionButton _focus={{ boxShadow: "none"}} _hover={{bg:"blue.900"}}>
                                    <Box flex='1' textAlign='left'>
                                        {data.title}
                                    </Box>
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <Text fontSize='sm'>{data.content}</Text>
                                
                                </AccordionPanel>
                            </AccordionItem>)
                        }                    
                    </Accordion>
        }
        else{
            return (<Text> Nothing in here </Text>)
        }
    }    

    if (date != null)
        return (
                <Popover
                    placement="right"
                >
                    <PopoverTrigger>
                        <Grid className="GridForPopover"
                            w="100%"
                            _hover={{ bg: "blue.100", shadow:"0 0px 10px 0 rgba(0, 0, 0, 1)" }} 
                            _focus={{ boxShadow: "outline" }} 
                            borderRadius="15px"
                            templateRows='repeat(3, 1fr)'
                            templateColumns='repeat(3, 1fr)'
                            gap={1}
                            > 
                            <GridItem rowSpan={3} colSpan={0}><Center>{day}</Center></GridItem>
                            <GridItem><Text>...</Text></GridItem>
                            <GridItem><Text>...</Text></GridItem>
                            <GridItem><Text>...</Text></GridItem>
                            <GridItem><Text>...</Text></GridItem>
                        </Grid>
                    </PopoverTrigger>
                    <PopoverContent color='white' bg='blue.800' borderColor='blue.800' h="250px">
                        <PopoverHeader pt={2} fontWeight='bold' border='0'>
                            {date.month} {day}, {date.year}
                            </PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody h="400px">
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
                                    overflowY={"scroll"} h="150px">
                                    {listItems()}
                                </Box>
                                
                            </PopoverBody>
                            <PopoverFooter
                            border='0'
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'
                            pb={2}
                        >
                        <Box fontSize='sm'></Box>
                        <ButtonGroup size='sm'>
                            <EditAndAdd/>
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