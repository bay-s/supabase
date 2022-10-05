import React, { useEffect, useState } from 'react'
import akun from '../akun.jpg'
import MessageChatLeft from './message-chat-left'
import MessageChatRight from './message-chat-right'
import MessageUserList from './message-user-list'
import { useParams } from 'react-router-dom'
import supabase from '../supabase-config'
import MessageInput from './message-input'

const Message = (props) => {
   const {id} = useParams()
   const ID = props.user.uid
   const [userData,setUserData] = useState([])
   const [message,setMessage] = useState([])
console.log(id);
  useEffect(() => {
    const getUser = async () => {
      const {data,err} = await supabase.from('users')
      .select()
      .eq('uid',id)
      if(data){
        console.log(data);
        setUserData(data)
      }
      if(err) console.log(err);
     }

     getUser()
     fetchMessage()
  },[])


  const fetchMessage = async e => {
    const {data,err} = await supabase.from('message')
    .select()
    .eq('sender_id',ID)
    if(data){
      setMessage(data)
      console.log(data);
    }
    if(err) console.log(err);
  }

   const height = {height:`${350}px`}
  return(
    <div className='column is-8 is-centered mx-auto p-0 my-5 pt-2'>
    <div className='container'>
      <div className='columns'>
<div className='column is-one-third p-0'>
{/* START LEFT COL */}
<div className='card'>
<header class="card-header align-center justify-between px-2">
<a href='#' className='has-text-dark is-size-6 is-title'>{props.user.username}</a>  
<button class="card-header-icon" aria-label="more options">
<span class="icon">
<i class="fa fa-plus" aria-hidden="true"></i>
</span>
</button>
</header>
<div className='is-flex is-flex-column is-flex-gap-md p-2 chat-box'  style={{height:`${450}px`}}>
{/* START USER COL */}
<MessageUserList  userData={userData}/>
{/* END USER COL */}
</div>
{/* END USER LIST */}
</div>
{/* END LEFT COL INNER */}
        </div>
        {/* END LEFT COL */}
<div className='column p-0'>
{/* START CARD */}
<div className='card'>
<header class="card-header align-center is-flex-gap-md px-2">
<MessageUserList  userData={userData}/> 
</header>
<div className='p-3 is-flex is-flex-column is-flex-gap-lg chat-box' style={height}>
{message.length < 1 ? "" : message.map(msg => {
  return <MessageChatRight msg={msg}/>
})}
</div>
{/* END MESSAGE */}
<MessageInput id={id} user={props.user}/>
</div>
{/* END CARD */}
</div>
        {/* END COL RIGHT */}
      </div>
      {/* END COLUMNS */}
</div>
{/* END CONTAINER */}
</div>
  )
}

export default Message;

