import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'
import NavItem from './NavItem'

export default function Sidebar({clickedTitle}) {
    const [navSize, changeNavSize] = useState("large")
    const [selectedNavItem, setSelectedNavItem] = useState("Dashboard")
    
    function NavItemClicked(item){
        setSelectedNavItem(item);
        clickedTitle(item);
    }
    
    return (
        <Flex
            left="5"
            h="95vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.15)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                        
                    }}
                />
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." active={selectedNavItem==="Dashboard"} onClick={NavItemClicked}/>
                <NavItem navSize={navSize} icon={FiCalendar} title="Calendar" active={selectedNavItem==="Calendar"} onClick={NavItemClicked}/>
                <NavItem navSize={navSize} icon={FiUser} title="My Human" active={selectedNavItem==="Clients"} onClick={NavItemClicked}/>
                <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" active={selectedNavItem==="Reports"} onClick={NavItemClicked}/>
                <NavItem navSize={navSize} icon={FiSettings} title="Settings"  active={selectedNavItem==="Settings"} onClick={NavItemClicked}/>
            </Flex>
            
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="image/profile.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">Haru</Heading>
                        <Text color="gray">Admin</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}