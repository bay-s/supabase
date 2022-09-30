import React from 'react'
import { Link } from 'react-router-dom';
import akun from '../akun.jpg'
import ButtonUser from './button-user';
import ButtonUserLogin from './button-user-login';


const ProfileInfo = (props) => {

    return(
<div class="is-flex justify-between align-center my-1 p-3">
        <div class="is-flex  is-flex-gap-xl align-center">
         <div class="is-flex is-flex-column is-flex-gap-sm align-center">
             <figure class="image is-96x96 avatar">
               <img class="is-rounded" src={props.data.avatar == null ? akun : props.data.avatar} />
             </figure>
             <h3 class="is-title is-bold is-size-5">{props.data.username}</h3>
            </div>
             <div className='is-flex is-flex-column align-start px-2'>
             <nav class="is-flex align-center justify-center is-flex-gap-xl my-2">
                 <div class="level-item has-text-centered">
                   <div>
                     <p class="heading is-size-7">Post</p>
                     <p class="title is-6">{props.data.total_post < 1 ? "0" : props.data.total_post}</p>
                   </div>
                 </div>
                 <div class="level-item has-text-centered">
                   <div>
                     <p class="heading is-size-7">Following</p>
                     <p class="title is-6">{props.data.total_following < 1 ? "0" : props.data.total_following}</p>
                   </div>
                 </div>
                 <div class="level-item has-text-centered">
                   <div>
                     <p class="heading is-size-7">Followers</p>
                     <p class="title is-6">{props.data.total_follower < 1 ? "0" : props.data.total_follower}</p>
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
           <div class="is-flex is-flex-column is-flex-gap-sm">
           {props.id === props.user.uid ? <ButtonUserLogin /> : <ButtonUser id={props.id} user_login_id={props.user.uid} user={props.user} data={props.data}/>}
           </div>
      {/* end buttton */}
</div>
    )
}

export default ProfileInfo;


