import React, { useEffect, useState } from 'react'
import AnimasiSkeleton from './animasi-skeleton'
import timeDifference from './timestamp'


const MessageChatLeft = (props) => {
    const [loader,setLoader] = useState(true)
    
    useEffect(() => {
        if(props.msg) setLoader(false)
    },[])
    const createMarkup = () => {
        return {__html:props.msg.message_content};
      }
      

    return(
        loader ? <AnimasiSkeleton /> : <div class="answer left">
        {/* START AVATAR LEFT */}
        {/* {user} */}
        {/* END AVATAR LEFT */}
        <div className='is-flex is-flex-column message'>
        <p className='text is-size-7 text-right '>
        <div dangerouslySetInnerHTML={createMarkup()} />
        <span className='is-title is-size-7 p-0'>{timeDifference(props.msg.created_at)}</span>
        </p>
        </div>
        {/* END TEXT */}
         </div>  
    )
}

export default MessageChatLeft;

