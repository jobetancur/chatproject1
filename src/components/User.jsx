import React, {useEffect, useState} from 'react'
import profile_image from '../img/profile_image.png'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase'
import emailjs from '@emailjs/browser';
import Email from '../svg/Email';

const User = ({ user, selectUser, user1, chat, userLogged }) => {
  
  const user2 = user?.uid
  const [data, setData] = useState('')

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    let unsub = onSnapshot(doc(db, 'lastMsg', id), doc => {
      setData(doc.data())
    })
    return () => unsub()
  }, [])

  const sendEmail = (event) => {
    event.preventDefault()
    emailjs.sendForm('service_146u8tf', 'template_r74u0pu', event.target, 'c3Gkm9-Nf0vJFCRKY')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <>
      <form onSubmit={sendEmail} >
        <div style={{display: 'none'}} >
          <input type="text" name='user_name' value={userLogged.name}/>
          <input type="text" name='user_email' value={userLogged.email}/>
          <input type="text" name='user_message' value={'Tienes un nuevo mensaje sin leer'}/>
          <input type="text" name='user_reply' value={user.email} />
        </div>

        <div className={`user_wrapper ${chat.name === user.name && 'selected_user' } `} onClick={() => selectUser(user)} >
          <div className="user_info">
              <div className="user_detail">
                <img src={user.avatar || profile_image} alt="avatar" className='avatar' />
                <h4> {user.name} </h4>
                {data?.from !== user1 && data?.unread && <small className='unread'  >New!</small> }
              </div> 
              <div className={`user_status ${user.isOnline ? 'online' : 'offline'}`}></div>  
          </div>
        {data && (
          <p className='truncate'>
            <strong> {data.from === user1 ? 'Me:' : null } </strong>
            {data.text}
          </p>
          )}
          <button type='submit' className='btnEmail'> <Email/> </button>
        </div>
        
      <div onClick={() => selectUser(user)} className={`sm_container ${chat.name === user.name && 'selected_user' } `}>
        <img src={user.avatar || profile_image} alt="avatar" className='avatar sm_screen' />
      </div>
      </form>

      
    </>  
  )
}

export default User