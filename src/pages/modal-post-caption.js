import React from 'react'
import { Link } from 'react-router-dom'
import akun from '../akun.jpg'
import AnimasiEllipsis from './animasi-ellips'
import timeDifference from './timestamp'



const ModalPostCaption = (props) => {

    return(
<div className='is-flex is-flex-column align-start'>
<div className='is-flex align-center is-flex-gap-md p-2'>
<figure className="image is-32x32 avatar">
 <img className="is-rounded" src={props.UserData.avatar == null ? akun : props.UserData.avatar} />
</figure>
<Link to={`/profile/${props.UserData.uid}`} className='has-text-dark is-size-7'>{props.UserData.username}</Link>
<p className='is-size-7'>{props.post.post_content}</p>
</div>
<div className='mx-5 px-5 is-flex is-flex-column'>
<a href='#' className='is-size-7'>#{props.post.post_cat}</a>
<span className='is-title is-size-7 has-text-grey'>{timeDifference(props.post.created_at)}</span>
</div>
</div>
    )
}

export default ModalPostCaption;