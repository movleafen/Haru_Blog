import { List, Stack, Text} from "@chakra-ui/react"
import Script from "next/script"

export default function DashBoard(){
    return (
        <List>
            <Stack spacing={3}>
                <Text fontSize="4xl">
                    Hi, my name is Haru, and I am a Welsh Pembrokes Corgi. 
                </Text>
            </Stack>
            
        </List>     
    )
}