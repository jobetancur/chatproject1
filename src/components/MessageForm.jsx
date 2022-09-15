import React from 'react'
import Attachment from '../svg/Attachment'
import emailjs from '@emailjs/browser';

const MessageForm = ({ handleSubmit, text, setText, setImg, userChat, userLogged }) => {

  const sendEmail = () => {
    
    emailjs.sendForm('service_ufsgnqc', 'template_zzyfmee', 'form', 'YF23lBilOvmM5MuhY')
      .then((result) => {
          console.log('SUCCESS!', result.status, result.text);
      }, (error) => {
          console.log(error.text);
      });
  }
  
  return (
    <form className='message_form' onSubmit={handleSubmit} >
      <div style={{display: 'none'}} id='form' >
          <input type="text" name='user_name' value={userLogged.name}/>
          <input type="text" name='user_email' value={userLogged.email}/>
          <input type="text" name='user_message' value={`Tienes un nuevo mensaje sin leer: ${text}`}/>
          <input type="text" name='user_reply' value={userChat.email} />
        </div>
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
          <button className='btn' onClick={sendEmail} >Send</button>    
        </div>  
    </form>
  )
}

export default MessageForm