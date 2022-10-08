

import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import akun from '../akun.jpg'
import supabase from '../supabase-config';
import ButtonUser from './button-user';
import ButtonUserLogin from './button-user-login';
import ModalFollower from './follower-modal';
import ModalFollowing from './following-modal';
import { AppContext } from '../App'

const ProfileInfo = (props) => {
  const [following,setFollowing] = useState([])
  const [follower,setFollower] = useState([])
  const [openFollower,setOpenFollower] = useState(false)
  const [openFollowing,setOpenFollowing] = useState(false)
  const {value} = useContext(AppContext)

  const ViewFollower = async (e) => {
    e.preventDefault()
    setOpenFollower(!openFollower)
    const { data, error } = await supabase
    .from('follow')
    .select()
    .eq('user_id',props.data.uid)
    if(data){
     setFollower(data)
    }if(error) console.log(`No data ${error.message}`);
  }

  const ViewFollowing = async (e) => {
    e.preventDefault()
    setOpenFollowing(!openFollowing)
    const { data, error } = await supabase
    .from('following')
    .select()
    .eq('user_id',props.data.uid)
    if(data){
      setFollowing(data)
    }if(error) console.log(`No data ${error.message}`);
  }


    return(
<div className="is-flex justify-between align-center my-1 p-3">
<div className="is-flex  is-flex-gap-xl align-center">
         <div className="is-flex is-flex-column is-flex-gap-sm align-center">
             <figure className="image is-96x96 avatar">
               <img className="is-rounded" src={props.data.avatar == null || '' ? akun : props.data.avatar} />
             </figure>
             <h3 className="is-title is-bold is-size-5">{props.data.username}</h3>
            </div>
             <div className='is-flex is-flex-column align-start px-2'>
             <nav className="is-flex align-center justify-center is-flex-gap-xl my-2">
                 <div className="level-item has-text-centered">
                 <div className='is-flex is-flex-column is-flex-gap-sm'>
                     <p className="heading is-size-7">Post</p>
                     <p className="title is-6">{props.data.total_post < 1 ? "0" : props.data.total_post}</p>
                   </div>
                 </div>
                 <div className="level-item has-text-centered">
                   <div className='is-flex is-flex-column is-flex-gap-sm'>
                     <button className='button is-size-7  is-small' onClick={ViewFollowing}>Following</button>
                     <p className="title is-6">{props.data.total_following < 1 ? "0" : props.data.total_following}</p>
                   </div>
                 </div>
                 <div className="level-item has-text-centered">
                 <div className='is-flex is-flex-column is-flex-gap-sm'>
                   <button className='button is-size-7 is-small' onClick={ViewFollower}>Follower</button>
                     <p className="title is-6">{props.data.total_follower < 1 ? "0" : props.data.total_follower}</p>
                   </div>
                 </div>
               </nav>

              <div className='is-flex align-start is-flex-column '>
              <h3 className='has-text-weight-semibold'>{props.data.fullname}</h3>
              <p className='lh-sm is-size-7'>0{props.data.phone}</p>
               {props.data.link === '' ? '' : <a href={props.data.link} className='is-size-6' >{props.data.link}</a>}
               <p className='lh-sm is-size-7'>{props.data.biodata}</p>
              </div>
             </div>
        </div>
           {/* end profile left  */}
           <div className="is-flex is-flex-column is-flex-gap-sm">
           {props.id === value.data.uid ? <ButtonUserLogin /> : <ButtonUser id={props.id} user_login_id={props.user.uid} user={props.user} data={props.data}/>}
           </div>
      {/* end buttton */}

      <ModalFollower follower={follower} openFollower={openFollower} ViewFollower={ViewFollower} />
      <ModalFollowing following={following} openFollowing={openFollowing} ViewFollowing={ViewFollowing}/>
</div>
    )
}

export default ProfileInfo;


