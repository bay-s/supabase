
import React from 'react'
import { Link } from 'react-router-dom';
import img from '../akun.jpg'
import ReplyCard from './reply-card';

function CommentCard(props){
 

  const replyCard = Array.isArray(props.data.reply) ? props.data.reply.map((rep,index) => {
    console.log(rep);
return <ReplyCard  data={rep} index={index} key={index} openReply={props.openReply} />
       }) : ""
    return(

<div className='is-flex is-flex-column align-start p-2 is-flex-gap-md' key={props.index}>

<div className='media-left is-flex is-flex-gap-md align-center'>
<figure class="image is-32x32 avatar">
<img src={props.data.user_avatar === ''  ? img : props.data.user_avatar} className='is-rounded' />
</figure>
<div className='is-flex is-flex-column'>
<div class="is-flex is-flex-gap-md align-center mb-1">
<p class="subtitle text-small is-title p-0 m-0 is-bold" data-com_id={props.data.comment_author_id}><Link to={`/profile/${props.data.comment_author_id}`} className='has-text-dark text-small text-nowrap'>{props.data.comment_author_name}</Link></p>
<p className='post-text text-small p-0 m-0'>{props.data.comment_text}</p>
</div>
{/* START COMMENT TEXT */}
<div className="is-flex is-flex-gap-md align-center">
<time className='subtitle text-small has-text-grey-light p-0 m-0 is-title is-bold'>{props.date}</time>
<button className='no-border text-small has-text-weight-semibold has-text-dark' data-comment_id={props.data.comment_id} data-user={props.data.comment_author_name} data-post_id={props.data.comment_author_name} data-author_id={props.data.post_owner_id} title={props.index} onClick={props.openReply}>Reply</button>
</div>
{/* END COMMENT TEXT */}
</div>
{/* END COMMENT */}
</div>
<div className='border-left'>
<div className={props.data.reply.length > 0 ?  'is-flex px-4 align-center is-flex-gap-sm  is-clickable px-5' : "hide"} data-comment_id={props.data.comment_id} onClick={props.displayReply} >
<span className='text-small is-bold'>{props.view ? `View replies ${props.data.reply.length}` : "Hide replies"}</span>
</div>
{/* REPLY CONTAINER */}
<div className='hide px-5' ref={props.replyRef}>
<div className='is-flex is-flex-column is-flex-gap-md my-2 w-100'>
{replyCard}
</div>
</div>
</div>
{/* END REPLY CONTAINER */}
 </div>
    )
}

export default CommentCard;


