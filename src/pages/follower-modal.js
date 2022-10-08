import React from 'react'
import Avatar from './avatar';


const ModalFollower = (props) => {

    return(
<div className={props.openFollower ? "modal is-active" : "modal"}>
  <div class="modal-background"></div>
  <div class="modal-follow">
  <header class="is-flex justify-between align-center p-0 p-2">
     <p class="is-title is-size-7 ">Follower</p>
      <button class="delete" aria-label="close" onClick={props.ViewFollower}></button>
    </header>
    <hr className='navbar-divider' />
    <section class="modal-card-body">
    {props.follower.length < 1 ? "No follower" : props.follower.map(item => {
        return <Avatar id={item.follower_id}/>
     })}
    </section>
  </div>
  <button class="modal-close is-large" aria-label="close" onClick={props.ViewFollower}></button>
</div>
    )
}

export default ModalFollower;