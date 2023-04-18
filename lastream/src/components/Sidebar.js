import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'

function Sidebar( {id}) {
const [activeKey, setActiveKey] = useState('conversations') 
const [modalOpen, setModalOpen] = useState(false)
const conversationsOpen = activeKey === "conversations"
 
function closeModal(){
    setModalOpen(false)
}

return (
    <div style={{width: '275px'}} className="d-flex flex-column bg-light border">
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
            <Nav variant='tabs' className='justify-content-center'>
                <Nav.Item>
                    <Nav.Link eventKey="conversations">Conversations</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="contacts">Contacts</Nav.Link>
                </Nav.Item>
            </Nav>
            <Tab.Content className="overflow-auto flex-grow-1 border-right">
                <Tab.Pane eventKey="conversations">
                    <Conversations />
                </Tab.Pane>
                <Tab.Pane eventKey="contacts">
                    <Contacts />
                </Tab.Pane>
            </Tab.Content>
            <div className='p-2 border-top border-right small'>
                Your id is <span className='text-muted'>{id}</span>
            </div>
            <Button onClick={()=>setModalOpen(true)}className='rounded-0'>
                New {conversationsOpen ? 'Conversations' : 'Contacts'}
            </Button>
        </Tab.Container>
        <Modal show={modalOpen} onHide={closeModal}>
            {conversationsOpen ? 
            <NewConversationModal closeModal={closeModal}/> : <NewContactModal closeModal={closeModal}/>}
        </Modal>
    </div>
  )
}

export default Sidebar