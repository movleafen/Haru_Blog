import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    useDisclosure,
    Box,
  } from '@chakra-ui/react'
import { useRef } from 'react'

export default function DeleteEvent(){
    const { isOpen, onToggle, onClose } = useDisclosure()
    const myRef = useRef()

    return (
    <>
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                <AccordionButton>
                    <Box flex='1' textAlign='left' pb={3} w="30vh">
                    Section 1 title
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={3} w="30vh">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                <AccordionButton>
                    <Box flex='1' textAlign='left' pb={3} w="30vh">
                    Section 2 title
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={3} w="30vh">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    </>
    )
}