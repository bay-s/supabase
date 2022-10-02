import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabase-config';
import timeDifference from './timestamp';
import akun from '../akun.jpg'
import AnimasiSkeleton from './animasi-skeleton';



const MessageChatRight = (props) => {

    const [userMessage,setUserMessage] = useState([])
    const [loader,setLoader] = useState(true)
    useEffect(() => {
        const getUserMessage = async () => {
            const id = props.msg.sender_id
            const {data,err} = await supabase.from('users')
            .select()
            .eq('uid',id)
            if(data){
                setUserMessage(data)
                setLoader(false)
                console.log(data);
            }
            if(err) console.log(err);
        }
        getUserMessage()
    },[])

    const createMarkup = () => {
        return {__html:props.msg.message_content};
      }
      
    const user = userMessage.length < 1 ? "" : userMessage.map(m => {
        console.log(m.username);
        return <div className='is-flex align-center is-flex-gap-md'>
        <div class="image is-32x32 avatar">
         <img className="is-rounded" src={m.avatar === '' ? akun : m.avatar} alt="User name" />
        </div>
        <div className='is-flex is-flex-column'>
        <Link to={`/profile/${m.uid}`} className='is-title is-size-7 p-0'>{m.username}</Link>
        <span className='is-title is-size-7 p-0'>{timeDifference(props.msg.created_at)}</span>
        </div>
        </div>
    })


return(
loader ? <AnimasiSkeleton /> : <div class="answer right">
{/* START AVATAR LEFT */}
{/* {user} */}
{/* END AVATAR LEFT */}
<div className='is-flex is-flex-column message'>
<p className='text is-size-7 text-right'>
<div dangerouslySetInnerHTML={createMarkup()} />
<span className='is-title is-size-7 p-0'>{timeDifference(props.msg.created_at)}</span>
</p>
</div>
{/* END TEXT */}
 </div> 
    )
}

export default MessageChatRight;