import { Grid, GridItem, Center, Text } from "@chakra-ui/react"
export default function EachDay({content}){
    if (content != "")
        return (
                <Grid w="calc(100%/7)"
                    _hover={{ bg: "blue.100", 
                    shadow:"0 0px 10px 0 rgba(0, 0, 0, 1)" }} 
                    _focus={{ boxShadow: "outline" }} 
                    borderRadius="15px"
                    templateRows='repeat(3, 1fr)'
                    templateColumns='repeat(3, 1fr)'
                    gap={1}
                    > 
                    <GridItem rowSpan={3} colSpan={0}><Center>{content}</Center></GridItem>
                    <GridItem><Text>...</Text></GridItem>
                    <GridItem><Text>...</Text></GridItem>
                    <GridItem><Text>...</Text></GridItem>
                    <GridItem><Text>...</Text></GridItem>
                </Grid>
            )
    else
        return(
            <Grid w="calc(100%/7)"gap={1} />
        )
    }