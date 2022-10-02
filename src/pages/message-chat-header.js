import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../supabase-config'
import timeDifference from './timestamp'
import akun from '../akun.jpg'


const MessageAvatarHeader = (props) => {
    const [user,setUser] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const {data,err} = await supabase.from('users')
        .select()
        .eq('uid',props.msg)
        if(data) {
            console.log(data);
            setUser(data)
        }
        if(err) console.log(err);
      }

      fetchData()
    },[])
    return(
         user.length < 1 ? "" : user.map(m => {
            return  <div className='is-flex align-center is-flex-gap-md is-clickable user-list' data-message={m.uid} onClick={props.openTab}>
            <div class="image is-48x48 avatar" data-message={m.uid}>
             <img className="is-rounded" src={m.avatar === '' ? akun : m.avatar} alt="User name" data-message={m.uid}/>
            </div>
            <div className='is-flex is-flex-column' data-message={m.uid}>
            <button className='is-title is-size-7 p-0 btn-transparent' data-message={m.uid}>{m.username}</button>
            </div>
        </div>
        })
    )
}

export default MessageAvatarHeader ;

