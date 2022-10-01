import React, { useEffect, useState } from 'react'
import supabase from '../supabase-config'
import akun from '../akun.jpg'
import { Link } from 'react-router-dom'
import timeDifference from './timestamp'



const CommentCard = (props) => {

    const [userComment,setUserComment] = useState([])

    useEffect(() => {
        const getUserComment = async () => {
            const id =props.item.author_id
            const {data,err} = await supabase.from('users')
            .select()
            .eq('uid',id)
            if(data){
                setUserComment(data)
                console.log(data);
            }
            if(err) console.log(err);
        }
        getUserComment()
    },[])

    const user = userComment.length < 1 ? "" : userComment.map(m => {
        return <div className='is-flex align-center is-flex-gap-md'>
        <figure className="image is-32x32 avatar">
         <img className="is-rounded" src={m.avatar == null ? akun : m.avatar} />
        </figure>
        <Link to={`/profile/${m.author_id}`} className='has-text-dark is-size-7 is-title'>{m.username}</Link>
        </div>
    })
    return(
<div className='is-flex is-flex-column is-flex-gap-sm'>
<div className='is-flex align-center is-flex-gap-md'>
{user}
<span className='is-size-7 is-title'>{props.item.comment_content}</span>
</div>
<div className='is-flex align-center is-flex-gap-sm px-4 mx-5'>
<span className='is-size-7 is-title has-text-grey-light'>{timeDifference(props.item.created_at)}</span>
<button className='btn-transparent is-small is-size-7 is-title'>Reply</button>
</div>
</div>
    )
}

export default CommentCard;

