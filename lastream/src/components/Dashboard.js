import React from 'react'
import { useConversations } from '../context/ConversationsProvider'
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'

//Complete holder of Contact and Conversation Component
function Dashboard({ id }) {
  const { selectedConversation } = useConversations()
  
  return (
    <div className="d-flex" style ={{height: '100vh'}}>
    <Sidebar id = {id} />
    {selectedConversation && <OpenConversation />}
    </div>
  )
}

export default Dashboard