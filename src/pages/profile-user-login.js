import React, { useContext } from 'react'
import akun from '../akun.jpg'
import { AppContext } from '../App'


const ProfileCurrentUser = (props) => {
    const {value} = useContext(AppContext);
console.log(value);
    return(
<div className="is-flex  is-flex-gap-xl align-center">
         <div className="is-flex is-flex-column is-flex-gap-sm align-center">
             <figure className="image is-96x96 avatar">
               <img className="is-rounded" src={value.data.avatar == null || '' ? akun : value.data.avatar} />
             </figure>
             <h3 className="is-title is-bold is-size-5">{value.data.username}</h3>
            </div>
             <div className='is-flex is-flex-column align-start px-2'>
             <nav className="is-flex align-center justify-center is-flex-gap-xl my-2">
                 <div className="level-item has-text-centered">
                 <div className='is-flex is-flex-column is-flex-gap-sm'>
                     <p className="heading is-size-7">Post</p>
                     <p className="title is-6">{value.data.total_post < 1 ? "0" : value.data.total_post}</p>
                   </div>
                 </div>
                 <div className="level-item has-text-centered">
                   <div className='is-flex is-flex-column is-flex-gap-sm'>
                     <button className='button is-size-7  is-small' onClick={props.ViewFollowing}>Following</button>
                     <p className="title is-6">{value.data.total_following < 1 ? "0" : value.data.total_following}</p>
                   </div>
                 </div>
                 <div className="level-item has-text-centered">
                 <div className='is-flex is-flex-column is-flex-gap-sm'>
                   <button className='button is-size-7 is-small' onClick={props.ViewFollower}>Follower</button>
                     <p className="title is-6">{value.data.total_follower < 1 ? "0" : value.data.total_follower}</p>
                   </div>
                 </div>
               </nav>

              <div className='is-flex align-start is-flex-column '>
              <h3 className='has-text-weight-semibold'>{value.data.fullname}</h3>
              <p className='lh-sm is-size-7'>{value.data.phone}</p>
               {value.data.link === '' ? '' : <a href={value.data.link} className='is-size-6' >{value.data.link}</a>}
               <p className='lh-sm is-size-7'>{value.data.biodata}</p>
          </div>
    </div>
 </div>
    )
}

export default ProfileCurrentUser;