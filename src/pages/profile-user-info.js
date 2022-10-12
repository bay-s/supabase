import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import akun from '../akun.jpg'
import supabase from '../supabase-config';
import ButtonUser from './button-user';
import ButtonUserLogin from './button-user-login';
import ModalFollower from './follower-modal';
import ModalFollowing from './following-modal';
import { AppContext } from '../App'
import ProfileCurrentUser from './profile-user-login';
import ProfileUser from './profile-user';



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
<div className="is-flex justify-between align-center my-1 p-3 user-info">
      {props.id === value.data.uid ? <ProfileCurrentUser ViewFollowing={ViewFollowing} ViewFollower={ViewFollower} /> : <ProfileUser ViewFollowing={ViewFollowing} ViewFollower={ViewFollower} data={props.data}/>}
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


