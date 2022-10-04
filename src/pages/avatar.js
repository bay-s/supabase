import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../supabase-config'
import akun from '../akun.jpg'

const Avatar = (props) => {
    
    const [userComment,setUserComment] = useState([])
     useEffect(() => {
        const getUserComment = async () => {
            const id = props.id
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



    return(
userComment.length < 1 ? "" : userComment.map(m => {
    return <div className='is-flex align-center is-flex-gap-md'>
    <figure className="image is-32x32 avatar">
     <img className="is-rounded" src={m.avatar === '' ? akun : m.avatar} />
    </figure>
    <Link to={`/profile/${m.author_id}`} className='has-text-dark is-size-7 is-title'>{m.username}</Link>
</div>
})
    )
}

export default Avatar;
// const user = userComment.length < 1 ? "" : userComment.map(m => {
//     return <div className='is-flex align-center is-flex-gap-md'>
//     <figure className="image is-32x32 avatar">
//      <img className="is-rounded" src={m.avatar === '' ? akun : m.avatar} />
//     </figure>
//     <Link to={`/profile/${m.author_id}`} className='has-text-dark is-size-7 is-title'>{m.username}</Link>
//     </div>
// })

