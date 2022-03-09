import { ViewIcon } from '@chakra-ui/icons'
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { IconBase } from 'react-icons/lib'

const ProfileModel = ({user, children}) => {
   const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {
        children ? (<span onClick={onOpen}>{children}</span>) : (
          <IconButton
            d={{ base: 'flex' }}
            icon={<ViewIcon />}
            onClick={onOpen}
          >
          </IconButton>
        )
      }

      <Modal base={{size:"xs"}} size='lg'  isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay/>
        <ModalContent bg="#292929" style={{color: '#BB86FC'}} h="410px">
          <ModalHeader
            fontSize='40px'
            d='flex'
            justifyContent='center'
            fontFamily='work sans'
          >
            {user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center" justifyContent="space-between">
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name} 
            />

            <Text fontSize={{base:"28px", md:"30px"}} fontFamily="Work sans">
              Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter d={{ base:'none' , md:'block'}}>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModel