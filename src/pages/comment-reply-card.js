import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import timeDifference from './timestamp'
import Avatar from './avatar'



const CommentReplyCard = (props) => {


    return(
props.reply.length < 1 ? ""  : props.reply.map(com => {
            return <div className='is-flex is-flex-column '>
            <div className='is-flex align-center is-flex-gap-md'>
            <Avatar id={com.author_id}/>
            <span className='is-size-7 is-title'>{com.reply_content}</span>
            </div>
            <div className='is-flex align-center is-flex-gap-sm px-4 mx-5'>
            <span className='is-size-7 is-title has-text-grey-light'>{timeDifference(com.created_at)}</span>
            <button className='btn-transparent is-small is-size-7 is-title' data-index={com.id} onClick={props.openReply }>Reply</button>
            </div>
            </div>
})
    )
}

export default CommentReplyCard;
