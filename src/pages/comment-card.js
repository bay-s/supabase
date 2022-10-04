import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import timeDifference from './timestamp'
import Avatar from './avatar'
import CommentReplyCard from './comment-reply-card'



const CommentCard = (props) => {
console.log(props.reply);
    return(
props.comment.length < 1 ? "" : props.comment.map(com => {
    return <div className='is-flex is-flex-column '>
    <div className='is-flex align-center is-flex-gap-md'>
    <Avatar id={com.author_id}/>
    <span className='is-size-7 is-title'>{com.comment_content}</span>
    </div>
    <div className='is-flex align-center is-flex-gap-sm px-4 mx-5'>
    <span className='is-size-7 is-title has-text-grey-light'>{timeDifference(com.created_at)}</span>
    <button className='btn-transparent is-small is-size-7 is-title' data-index={com.id} onClick={props.openReply }>Reply</button>
    </div>
    <div className='is-flex is-flex-column px-3'>
        <CommentReplyCard reply={props.reply} openReply={props.openReply }/>
    </div>
    </div>
})
    )
}

export default CommentCard;


// {reply.length < 1 ? "" : reply.map(m => {
//     return <div className='test'>
//     <span className='is-size-7 is-title'>{m.reply_content}</span>
//     </div>
// })}