import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../context/ContactsProvider'
import {useConversations } from '../context/ConversationsProvider'

//create a new conversation from contacts
export default function NewConversationModal({closeModal}) {
    const [selectedContactIds, setSelectedContactIds] = useState([])
    const { contacts } = useContacts()
    const { createConversation } = useConversations()

    function handleCheckBoxChange(contactId){
      setSelectedContactIds(prevSelectedContactIds =>{
        if (prevSelectedContactIds.includes(contactId)){
            return prevSelectedContactIds.filter(prevId =>{
              return contactId !== prevId
            })
        } else{
          return [...prevSelectedContactIds, contactId]
        }
      })
    }

    function handleSubmit(e){
      e.preventDefault()
      createConversation(selectedContactIds)
      closeModal()
    }

    return (
    <div>
        <Modal.Header closeButton>Create Conversation</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {contacts.map(contact =>(
                    <Form.Group controlId={contact.id} key={contact.id}>
                      <Form.Check 
                      type="checkbox" 
                      value={selectedContactIds.includes(contact.id)} 
                      label={contact.name} 
                      onChange={()=>handleCheckBoxChange(contact.id)}/>
                    </Form.Group>      
                ))}
                <Button type="submit">Create Conversation</Button>
            </Form>
        </Modal.Body>
    </div>
  )
}
