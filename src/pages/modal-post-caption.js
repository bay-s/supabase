import React from 'react'
import { Link } from 'react-router-dom'
import akun from '../akun.jpg'
import AnimasiEllipsis from './animasi-ellips'


const ModalPostCaption = (props) => {

    return(
<div className='is-flex align-center is-flex-gap-md p-2'>
<figure className="image is-32x32 avatar">
 <img className="is-rounded" src={props.UserData.avatar == null ? akun : props.UserData.avatar} />
</figure>
<Link to={`/profile/${props.UserData.uid}`} className='has-text-dark'>{props.UserData.username}</Link>
<a href='#'>#{props.post.post_cat}</a>
<p className='is-size-7'>{props.post.post_content}</p>
</div>
    )
}

export default ModalPostCaption;