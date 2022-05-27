import React from 'react'
import {
    Flex,
    Heading,
    Text,
    Icon
} from '@chakra-ui/react'

export default function NavHoverBox({ title, icon, description }) {
    return (
        <>
            <Flex
                pos="absolute"
                mt="calc(100px - 7.5px)"
                ml="-10px"
                width={0}
                height={0}
                borderTop="10px solid transparent"
                borderBottom="10px solid transparent"
                borderRight="10px solid blue.100"
            />
            <Flex
                h={200}
                w={200}
                width="100%"
                flexDir="column"
                alignItems="center"
                justify="center"
                backgroundColor="blue.100"
                borderRadius="10px"
                color="black"
                textAlign="center"
                overflow="hidden"
                boxShadow="0 0px 10px 0 rgba(0, 0, 0, 1)"
            >
                <Icon as={icon} fontSize="3xl" mb={4} />
                <Heading size="md" fontWeight="normal">{title}</Heading>
                <Text>{description}</Text>
            </Flex>
        </>
    )
}