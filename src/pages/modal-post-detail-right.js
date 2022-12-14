import React, { useEffect, useState ,useContext} from 'react'
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
import { AppContext } from '../App'
import Avatar from './avatar'



const ModalPostRight = (props) => {
    const [comment,setComment] = useState([])
    const [loader,setLoader] = useState(true)
    const [id,setId] = useState('')
    const [open,setOpen] = useState(false)
    const {value} = useContext(AppContext)

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
    
    const DeletePost = async (e) => {
        e.preventDefault()
        const id = parseInt(e.target.dataset.id)
        console.log(id);
        if(window.confirm("Are you sure do you want to delete this post ?")){
      const { error } = await supabase
      .from('post')
      .delete()
      .eq('id', id)
      if(!error) alert("Delete Sukses")
        }
    }

    const commentCard = comment.length < 1 ? <span className='mx-auto text-center'>No comment yet</span> : comment.map(item => {
        return props.post.id === item.post_id ? <CommentCard item={item} openReply={openReply } /> : ""
         })
         
    return(
<div className='column is-4 has-background-white p-0 is-flex is-flex-column h-100'>
<header class="modal-card-head p-0 p-3 justify-between">
<Avatar id={props.post.author_uid} />
{value.data.uid === props.post.author_uid ? <i class="fa fa-trash-o has-text-danger is-bold is-clickable"  data-id={props.post.id} aria-hidden="true" onClick={DeletePost}></i> : 
<button class="delete" aria-label="close"></button>
}
</header>
{/* START CAPTION */}
<ModalPostCaption post={props.post} UserData={props.UserData}/>
<hr className='navbar-divider'/>
{/* END CAPTION */}
<div className='is-flex is-flex-column is-flex-gap-md p-2 my-auto is-flex-grow-1 comment-container '>
{loader ? <AnimasiEllipsis /> : commentCard}
</div>
<hr className='navbar-divider'/>
<div className='is-flex is-flex-column p-2 align-start'>
<LikesCard  post={props.post} user={value.data}/>
<span className='is-title is-size-7'>{props.post.total_likes} likes</span>
<span className='is-title is-size-7'>{timeDifference(props.post.created_at)}</span>
</div>
{open ? <CommentReply post={props.post} id={id} comment={comment} user={value.data}/> : <CommentInput user={value.data} post={props.post}/>}
</div>
    )
}

export default ModalPostRight;

