import React, { useEffect, useState } from 'react'
import supabase from '../supabase-config'
import CommentCard from './comment-card'
import CommentInput from './comment-input'
import LikesCard from './likes-action'
import akun from '../akun.jpg'
import { Link } from 'react-router-dom'
import ModalPostCaption from './modal-post-caption'
import AnimasiEllipsis from './animasi-ellips'
import timeDifference from './timestamp'
import CommentReply from './commen-input-reply'

const ModalPostRight = (props) => {
    const [comment,setComment] = useState([])
    const [loader,setLoader] = useState(true)
    const [id,setId] = useState('')
    const [open,setOpen] = useState(false)
    
    useEffect(() => {
        getComment()
    },[])

    const getComment = async () => {
        const id = parseFloat(props.post.id)
        const {data,error} = await supabase.from('comment')
        .select()
        .eq('post_id',id)
        if(data){
            console.log(data);
            setComment(data)
            setLoader(false)
        }
        if(error) console.log(error);
    }

    const openReply = e => {
        e.preventDefault()
        setOpen(!open)
        const index = e.target.dataset.index
        setId(index)
        }

    const commentCard = comment.length < 1 ? "No comment yet" : comment.map(item => {
        return props.post.id === item.post_id ? <CommentCard item={item} openReply={openReply }/> : ""
         })
         
    return(
<div className='column is-4 has-background-white h-100 p-0 is-flex is-flex-column'>
<header class="modal-card-head p-0 p-3 justify-between">
<div className='is-flex align-center is-flex-gap-md'>
<figure className="image is-32x32 avatar">
 <img className="is-rounded" src={props.UserData.avatar == null ? akun : props.UserData.avatar} />
</figure>
<Link to={`/profile/${props.UserData.uid}`} className='has-text-dark'>{props.UserData.username}</Link>
</div>
<button class="delete" aria-label="close"></button>
</header>
{/* START CAPTION */}
<ModalPostCaption post={props.post} UserData={props.UserData}/>
<hr className='navbar-divider'/>
{/* END CAPTION */}
<div className='is-flex is-flex-column is-flex-gap-md p-2 my-auto is-flex-grow-1 comment-container'>
{loader ? <AnimasiEllipsis /> : commentCard}
</div>
<hr className='navbar-divider'/>
<div className='is-flex is-flex-column p-2 align-start'>
<LikesCard  post={props.post} user={props.user}/>
<span className='is-title is-size-7'>{props.post.total_likes} likes</span>
<span className='is-title is-size-7'>{timeDifference(props.post.created_at)}</span>
</div>
{open ? <CommentReply post={props.post} id={id} comment={comment} user={props.user}/> : <CommentInput user={props.user} post={props.post}/>}
</div>
    )
}

export default ModalPostRight;


// {reply ? <ReplyComment post_id={props.post.post_id} total_comment={props.post.total_comment} user_id={props.post.user_id} dataUser={props.dataUser} com_id={comid} author_id={author} user={user} />
// : <PostComment post_id={props.post.post_id} total_comment={props.post.total_comment} user_id={props.user_id} dataUser={props.dataUser}/> 
// }