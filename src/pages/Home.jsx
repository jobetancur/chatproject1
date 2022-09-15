import React from 'react'
import { useEffect, useState } from 'react'
import { db, auth, storage } from '../firebase'
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import User from '../components/User'
import MessageForm from '../components/MessageForm'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import Message from '../components/Message'

const Home = () => {

  const [users, setUsers] = useState([])
  const [chat, setChat] = useState('')
  const [text, setText] = useState('')
  const [img, setImg] = useState('')
  const [msgs, setMsgs] = useState([])
  const [userLogged, setUserLogged] = useState()
  const [changeEmail, setChangeEmail] = useState(false)

  const user1 = auth.currentUser.uid

  useEffect(() => {
    getDoc(doc(db, 'users', auth.currentUser.uid)).then(docSnap => {
            if(docSnap.exists){
                setUserLogged(docSnap.data())
            }
        });
  }, [])

  useEffect(() => {
    const usersRef = collection(db, 'users')
    // Create query object
    const q = query(usersRef, where('uid', 'not-in', [user1]))
    // Execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = []
      querySnapshot.forEach(doc => {
        users.push(doc.data())
      })
      setUsers(users)
    })
    return () => unsub()
  }, [])
  
  const selectUser = async (user) => {
    setChat(user)

    const user2 = user.uid
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

    const msgsRef = collection(db, 'messages', id, 'chat')
    const q = query(msgsRef, orderBy('createdAt', 'asc'))

    onSnapshot(q, querySnapshot => {
      let msgs = []
      querySnapshot.forEach(doc => {
        msgs.push(doc.data())
      })
      setMsgs(msgs)
    })

    //Petición del último mensaje entre el usuario logueado y el usuario seleccionado.
    const docSnap = await getDoc(doc(db, 'lastMsg', id))
    //Si el ultimo mensaje existe y el mensaje está en el usuario seleccionado.
    if (docSnap.data() && docSnap.data().from !== user1) {
      //Actualiza el ultimo mensaje en doc, sete el unread por false.
      await updateDoc(doc(db, 'lastMsg', id), {
        unread: false
      })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const user2 = chat.uid
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      )
      const snap = await uploadBytes(imgRef, img)
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
      url = dlUrl
    }

    await addDoc(collection(db, 'messages', id, 'chat'), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || ''
    })

    await setDoc(doc(db, 'lastMsg', id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || '',
      unread: true
    })

    setText('')
  }

  console.log(chat);

  return (
    <div>
      <div className="home_container">
        <div className="users_container">
          {users.map(user =>
            <User
              key={user.id}
              user={user}
              selectUser={selectUser}
              user1={user1}
              chat={chat}
              userLogged={userLogged}
            />
          )}  
        </div>
        <div className="messages_container">
          {
            chat ?
            <>
            <div className='messages_user user_selected1' >
              <img src={chat.avatar} alt="" className='avatar' />
              <h3> {chat.name} </h3>    
            </div>
            <div className="messages">
                  {msgs.length ? msgs.map((msg, index) =>
                    <Message
                      key={index}
                      msg={msg}
                      user1={user1} 
                    />)
                    :
                    null}      
            </div>
              <MessageForm
                handleSubmit={handleSubmit}
                text={text}
                setText={setText}
                setImg={setImg}  
                setChangeEmail={setChangeEmail}
                changeEmail={changeEmail}
                userLogged={userLogged}
                userChat={chat}  
              />    
            </>
              :
            <div>
              <h3 className='no_conv'>Select a user to initiate a conversation</h3>    
            </div>  
          }
        </div>
      </div>
    </div>
  )
}

export default Home