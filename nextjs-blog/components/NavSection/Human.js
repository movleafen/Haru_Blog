import { Container, Flex, Stack, Text, Box, Avatar } from "@chakra-ui/react";
import { FiSmartphone, FiMail} from "react-icons/fi"

export default function Human(){

    return <>
            <Flex marginY={5}>
                <Box className="left-side" w="50%">
                    <Text fontSize='4xl'>Human name: Mov Leafen</Text>
                    <Text color="blue.300">React Developer | .Net Developer </Text>
                    <Text>Las Vegas, Nevada</Text>
                    <Flex>
                        <Box marginY={1}><FiSmartphone/></Box>
                        <Text>702 426-1235 | </Text>
                        <Box marginY={1} marginX={1}><FiMail/></Box>
                        <Text>mov.leafen@gmail.com </Text>
                    </Flex>
                    

                </Box>
                <Box className="right-side" marginLeft={5}>
                    <Avatar size='2xl' name='Mov Leafen' />
                </Box>
            </Flex>
          
            
        </>
            
}

