import React, { useContext, useEffect, useState } from 'react'
import supabase from '../supabase-config'
import akun from '../akun.jpg'
import { Link } from 'react-router-dom'
import timeDifference from './timestamp'
import Avatar from './avatar'
import CommentReplyCard from './comment-reply-card'
import { AppContext } from '../App'



const CommentCard = (props) => {
    const [reply,setReply] = useState([])
    const [viewReply,setViewReply] = useState(false)
    const [deletes,SetDeletes] = useState(false)
    const {value} = useContext(AppContext)
     useEffect(() => {
        getReplyComment()
    },[])

  const getReplyComment = async () => {
    const {data,err} = await supabase.from('comment_reply')
    .select()
    .eq('comment_id',props.item.id)
    if(data) { 
        console.log(data);
    setReply(data)
    }
    if(err)  console.log(err);
  }

const DisplayReply = e => {
    e.preventDefault()
    setViewReply(!viewReply)
}

const DeleteComment = async (e) => {
   const id = e.target.dataset.id 
  if(window.confirm("Are you sure want to delete this comment ?")) {
    const { data,error } = await supabase
    .from('comment')
    .delete()
    .eq('id', id)
    if(data) { 
        alert(`Delete sukses ${data}`)
        SetDeletes(!deletes)
    }
    if(error) alert(error.message)
  }
}


    return(
<div className={deletes ? 'hide' : 'is-flex is-flex-column'}>
<div className='is-flex align-center is-flex-gap-md'>
<Avatar id={props.item.author_id}/>
<span className='is-size-7 is-title'>{props.item.comment_content}</span>
</div>
<div className='is-flex align-center is-flex-gap-sm px-4 mx-5 mb-3'>
<span className='is-size-7 is-title has-text-grey-grey'>{timeDifference(props.item.created_at)}</span>
<button className='btn-transparent is-small is-size-7 is-title' data-index={props.item.id} onClick={props.openReply }>Reply</button>
<i className={value.data.uid === props.item.author_id ? "fa fa-trash-o is-size-7 has-text-danger is-clickable": 'hide'} data-id={props.item.id} aria-hidden="true" onClick={DeleteComment}></i>
</div>
{/* --------------- */}
<div className=''>
<div className={reply.length < 1 ? 'hide' : ''}>
<button className='btn-transparent is-small text-small is-title has-text-grey mx-5 px-4' onClick={DisplayReply} >{!viewReply ? `View replies ${reply.length}` : "Hide replies"}</button>
</div>
<div className={viewReply ? 'is-flex is-flex-column mx-5 py-2' : 'hide'}>
    <CommentReplyCard reply={reply} id={props.item.id} openReply={props.openReply }/>
</div>
</div>
{/* --------------- */}
</div>
    )
}

export default CommentCard;

// const user = userComment.length < 1 ? "" : userComment.map(m => {
//     return <div className='is-flex align-center is-flex-gap-md'>
//     <figure className="image is-32x32 avatar">
//      <img className="is-rounded" src={m.avatar === '' ? akun : m.avatar} />
//     </figure>
//     <Link to={`/profile/${m.author_id}`} className='has-text-dark is-size-7 is-title'>{m.username}</Link>
//     </div>
// })

