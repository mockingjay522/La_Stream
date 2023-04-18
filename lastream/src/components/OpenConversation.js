import React, { useState, useCallback } from 'react'
import {Button, Form, InputGroup} from 'react-bootstrap'
import { useConversations } from '../context/ConversationsProvider'
import Axios from "axios"


//Open a selected conversation
function OpenConversation() {

  const orgid = window.localStorage.getItem("orgId")
  const senderemail = window.localStorage.getItem("employeeSession")
  const [text, setText] = useState('')
  const setRef = useCallback(node =>{
    if(node){
    node.scrollIntoView({smooth: true})}
  }, [])
  const {sendMessage, selectedConversation} = useConversations()
    
  async function handleSubmit(e){
     e.preventDefault()

     await Axios.post(`http://localhost:3001/postMessage`, {
       orgid: orgid,
       senderemail: senderemail,
       receiveremail: "abc",
       message: text
      }).then((res)=>{
      
    })
     
     sendMessage(selectedConversation.recipients.map(recipient => recipient.id), text)
     setText('')

     
  }

  return (
    <div className='d-flex flex-column flex-grow-1'>
        <div className='flex-grow-1 overflow-auto'>
          <div className="d-flex flex-column align-items-start justify-content-end px-3">
            {selectedConversation.messages.map((message, index)=>{
              const lastMessage = selectedConversation.messages.length-1 ===index
              return (
                <div
                  ref={lastMessage ? setRef: null}
                  key={index}
                  className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end' : ''}`}
                >
                  <div className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>{message.text}</div>
                  <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                  {message.fromMe ? 'You' : message.senderName}</div>
                </div>
              )
              })}
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='m-2'>
                <InputGroup>
                    <Form.Control 
                        as="textarea" 
                        required 
                        value={text}
                        onChange={e => setText(e.target.value)}
                        style={{height: '75px', resize: 'none'}} />
                        <InputGroup>
                        <Button type="submit">Send</Button>
                        </InputGroup>
                </InputGroup>
            </Form.Group>
        </Form>
    </div>
  )
}

export default OpenConversation