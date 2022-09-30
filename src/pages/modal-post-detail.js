import React, { useState } from 'react'
import { Link} from 'react-router-dom';
import img from '../akun.jpg'
import DisplayComment from './display-comment';
import LikesCard from './likes-action';
import CommentInput from './comment-input';



function ModalPostDetail(props){

  const [reply,setReply] = useState(false)
  const [user,setUser] = useState("")
  const [author,setAuthor] = useState("")
  const  [comid,setComid] = useState("")
    const openReply = e => {
      e.preventDefault()
      const user = e.target.dataset.user
      const author = e.target.dataset.author_id
      const comid = e.target.dataset.comment_id
      setReply(!false)
      setUser(user)
      setAuthor(author)
      setComid(comid)
    }

    const comment = <DisplayComment key={props.id} post_id={props.post.post_id} user_id={props.post.user_id} avatar={props.avatar} user_name={props.post.name} openReply={openReply} com_id={comid} author_id={author} user={user}/>

    return(
  <div class="modal-card has-background-dark">
    <section class="modal-card-body columns  p-0">
{/* START COL LEFT */}
<div className='column is-8 p-0 m-0 '>
<figure class="h-100 image is-4by3">
<img src={props.post.post_image} alt="Placeholder image" />
</figure>
</div>
{/* end col left */}
<div className='column  p-0 m-0 h-100 is-flex is-flex-column justify-between'>
 <header class="modal-card-head has-background-white py-2 is-flex align-center justify-between">
<div className='media-left is-flex is-flex-gap-md align-center mt-2'>
<figure class="image is-32x32">
<img src={props.avatar === '' ? img : props.avatar} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0 ">
<p class="subtitle is-7 is-title p-0 mb-1"><Link to={`/profile/${props.post.user_id}`} className='has-text-dark'>{props.post.username}</Link></p>
</div>
</div>
{/* END MEDIA LEFT */}

<div className={props.id === props.post.user_id ? 'media-right px-3 mt-2' : 'hide'}>
<i className="fa fa-trash has-text-danger is-size-5 is-clickable open-delete" aria-hidden="true" onClick={props.openModalPost}></i>
</div>
</header>
<div className='media-left is-flex is-flex-gap-md align-center p-2'>
<figure class="image is-32x32 avatar">
<img src={props.avatar === '' ? img : props.avatar} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0">
<p class="subtitle is-7 is-title p-0"><a href="#0" className='has-text-dark'>{props.post.username}</a></p>
</div>
<span className='is-7 p-0'>{props.post.post_caption}</span>
</div>
{/* END CAPTION */}
{/* START COMMENT CONTENT */}
<div className='is-flex is-flex-column is-flex-gap-md p-2 my-auto is-flex-grow-1 comment-container'>
{props.post.total_comment > 0 ? comment : <NoCommentYet />} 
</div>
{/* ENDCOMMENT CONTENT */}
{/* START COMMENT*/}
<div className='is-flex is-flex-column mb-3'>
<div className='px-2 p-3 is-flex is-flex-column border-sm'>
{<LikesCard id={props.id } avatar={props.avatar} name={props.post.name} post_id={props.post.post_id} />}
<div className='mt-2'>
<p className='subtitle is-7 p-0 m-0 is-title is-bold'>
{props.post.total_likes > 0 ? `${props.post.total_likes} Like` : 'Be the first to'}
</p> 
<time className='subtitle is-7 p-0 m-0 is-title is-bold'>12 august 2022</time>
</div>
</div>
{/* START COMMENT INPUT */}
{reply ? <ReplyComment post_id={props.post.post_id} total_comment={props.post.total_comment} user_id={props.post.user_id} dataUser={props.dataUser} com_id={comid} author_id={author} user={user} />
: <PostComment post_id={props.post.post_id} total_comment={props.post.total_comment} user_id={props.user_id} dataUser={props.dataUser}/> 
}
{/* END COMMENT */}
</div>
{/* END COMMENT */}
            </div>
    </section>
  </div>

    )

}

export default ModalPostDetail;


