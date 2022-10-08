import React from 'react'
import Avatar from './avatar';


const ModalFollowing = (props) => {

    return(
<div className={props.openFollowing ? "modal is-active" : "modal"}>
  <div class="modal-background"></div>
  <div class="modal-follow">
    <header class="is-flex justify-between align-center p-0 p-2">
      <p class="is-title is-size-7">Following</p>
      <button class="delete" aria-label="close" onClick={props.ViewFollowing}></button>
    </header>
    <hr className='navbar-divider' />
    <section class="modal-card-body">
     {props.following.length < 1 ? "No following" : props.following.map(item => {
        return <Avatar id={item.following_id}/>
     })}
    </section>
  </div>
  <button class="modal-close is-large" aria-label="close" onClick={props.ViewFollowing}></button>
</div>
    )
}

export default ModalFollowing;