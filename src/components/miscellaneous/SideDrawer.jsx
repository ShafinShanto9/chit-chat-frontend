import { Avatar, Box, Button,  Input,  Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, toast, Tooltip,useDisclosure, useToast} from '@chakra-ui/react'
import {BellIcon, ChevronDownIcon,} from '@chakra-ui/icons'
import React, { useState } from 'react'
import { BsSearch, BsChatDots } from 'react-icons/bs'
import { MdOutlineSentimentSatisfied } from 'react-icons/md'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModel from './ProfileModal'
import { useNavigate } from 'react-router-dom'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

import axios from 'axios'
import ChatLoading from '../ChatLoading'
import UserListItem from '../UserAvatar/UserListItem'



const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const { user } = ChatState()
  
  // LogOut Functionality
  const logOutHandler = () => {
    localStorage.removeItem('userInfo')
    navigate('/')
  }

  // User Search

  const handleSearch = async() => {
    if (!search) {
      toast({
        title: "Please Enter Value To search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

      try {
        setLoading(true)

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }

        const { data } = await axios.get(`/api/user?search=${search}`, config)
        
        setLoading(false)
        setSearchResult(data)
      } catch (error) {

        toast({
        title: "Error Occured",
        dscription:"Failed To Load Search Resutl",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
        
    }
    
  }

  //  Access Single User Chats
  const accessChat = (userId) => {}

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
          <Button variant="ghost" _hover={{bg:'black'}} onClick={onOpen}>
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

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg="#292929" style={{color: '#BB86FC'}}>
          <DrawerHeader borderBottom='1px solid black'>Search User</DrawerHeader>
          <DrawerBody>
            <Box d='flex' pb={2}>
              <Input
                borderColor={'black'}
                placeholder='searh by name or email'
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                bg={'black'}
                onClick={handleSearch}
              >
                GO</Button>
            </Box>

            {
              loading ? (
                <ChatLoading/>
              ):(
                  searchResult?.map(user => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={()=>accessChat(user._id)}
                    />
                ))
              )
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer