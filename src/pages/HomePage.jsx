import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'



const HomePage = () => {
  const navigate = useNavigate()
  
   useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'))
        if (user) {
            navigate('/chats')
        }
    },[navigate])
  return (
    <Container maxW='xl' centerContent>
       <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"#292929"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        
      >
        <Text fontSize="4xl" fontFamily="Work sans" textColor={'#BB86FC'} fontWeight="bold">
          Chit - Chat
        </Text>
      </Box>
      <Box bg="#292929" w="100%" p={4} borderRadius="lg" color="#BB86FC">
        <Tabs variant='soft-rounded' colorScheme={'purple'}>
        <TabList mb='1em'>
          <Tab width='50%'>Login</Tab>
          <Tab width='50%'>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login/>
          </TabPanel>
          <TabPanel>
            <Signup/>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </Box>
    </Container>
  )
}
export default HomePage
