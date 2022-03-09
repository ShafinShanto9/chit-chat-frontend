import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import {BellIcon, ChevronDownIcon,} from '@chakra-ui/icons'
import React, { useState } from 'react'
import { BsSearch, BsChatDots } from 'react-icons/bs'
import { MdOutlineSentimentSatisfied } from 'react-icons/md'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModel from './ProfileModal'
import { useNavigate } from 'react-router-dom'



const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const navigate = useNavigate()

  const { user } = ChatState()
  
  const logOutHandler = () => {
    localStorage.removeItem('userInfo')
    navigate('/')
  }

  return (
    <>
      <Box
      d="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="#292929"
      W="100%"
      p="5px 10px 5px 10px"
      >
        <Tooltip label="Search User to Chat" hasArrow placement='bottom-end'>
          <Button variant="ghost" _hover={{bg:'black'}}>
            <BsSearch />
            <Text d={{base:"none", md:"flex" , }} px="4">
              Search User <MdOutlineSentimentSatisfied/>
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize='2xl' fontFamily='work sans' fontWeight='bold'>
          <Box d="flex">
            <Box>
              CHIT - CHAT
            </Box>
            <Text d={{base:'none', md:'block'}} fontSize='xl' fontFamily='work sans' fontWeight='bold'>
              <BsChatDots />
              </Text>
          </Box>
        </Text>

        <Box>
          <Menu>
            <MenuButton>
              <BellIcon fontSize='2xl' m={1}/>
            </MenuButton>
          </Menu>
          
          <Menu >
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} bg='none' _hover={{bg:'black'}}>
              <Avatar size='sm' cursor='pointer' name={user.name} src={ user.pic}/>
            </MenuButton>
            <MenuList bg="#292929">
              <ProfileModel user={user}>
                <MenuItem>MyProfile</MenuItem>
              </ProfileModel>
              <MenuDivider/>
              <MenuItem onClick={logOutHandler}>LogOut</MenuItem>
            </MenuList>
          </Menu>

        </Box>

      </Box>
    </>
  )
}

export default SideDrawer