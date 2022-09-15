import React, { useState } from 'react'
import useUsersData from '../hooks/useUsersData'
import Attachment from '../svg/Attachment'

const MessageForm = ({ handleSubmit, text, setText, setImg, setChangeEmail, changeEmail }) => {

  const { emailUserLogged, emailUser } = useUsersData()
  
  

  const changeState = () => {
    if (changeEmail === false) {
      setChangeEmail(true)
    } else {
      setChangeEmail(false)
    }
  }
 
  return (
    <form className='message_form' onSubmit={handleSubmit} >
        <label htmlFor="img">
            <Attachment/>      
        </label>
        <input
            type="file"
            id='img'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={(e) => setImg(e.target.files[0])}  
        />
        <div>
            <input
                type="text"
                placeholder='Enter your message'
                value={text}
                onChange={(e) => setText(e.target.value)} />
        </div>
        <div>
          <button className='btn' onClick={changeState} >Send</button>    
        </div>  
    </form>
  )
}

export default MessageForm