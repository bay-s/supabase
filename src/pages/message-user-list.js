import React from 'react'
import { Link } from 'react-router-dom'
import akun from '../akun.jpg'


const MessageUserList = (props) => {

    return(
props.userData.length < 1 ? "" : props.userData.map(m => {
return <div className='is-flex justify-between align-center is-clickable user-list'>
<div className='is-flex align-center is-flex-gap-sm'>
<figure className="image is-48x48 avatar">
 <img className="is-rounded" src={m.avatar == null ? akun : m.avatar} />
</figure>
 <Link to={`/profile/${m.uid}`} className='has-text-dark is-size-7 is-title'>{m.username}</Link>     
</div>
</div>
})
    )
}

export default MessageUserList ;