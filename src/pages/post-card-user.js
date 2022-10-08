import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import akun from '../akun.jpg'
import supabase from '../supabase-config'
import LoaderCard from './loader'

function PostCardUser(props){

  const [loader,setLoader] = useState(true)

  useEffect(() => {
     const interval = setInterval(() => {
    if(props.data) setLoader(false)
    console.log(loader);
     }, 1000);

     return () => clearInterval(interval)
  })

    return(
      loader ? <div className='column is-4'>
        <div class="card loading">
      <div class="image"></div>
      <div class="content">
        <h4></h4>
        <div class="description">
        </div>
      </div>
    </div>
      </div> :
<div className="column is-4">      
      <div className="card post-card is-relative">
        <div class="card-image">
          <figure className="image is-4by3">
            <img className='is-clickable'
             src={props.data.post_image ==='' ? "https://bulma.io/images/placeholders/1280x960.png" : props.data.post_image }
            />
          </figure>
        </div>
       <div className='captions is-flex align-center is-flex-gap-md'>
        <div className='is-flex align-center is-flex-gap-md'>
       <i class="fa fa-heart has-text-white" aria-hidden="true"></i>
       <span className='has-text-white is-size-6 is-bold'>{props.data.total_likes < 1 ? "0" : props.data.total_likes}</span>
        </div>
        <div className='is-flex align-center is-flex-gap-md'>
       <i class="fa fa-comment has-text-white is-size-5" aria-hidden="true"></i>
       <span className='has-text-white is-size-6 is-bold'>{props.data.total_comment < 1 ? "0" : props.data.total_comment}</span>
        </div>
       </div>
  </div>   
</div>
// end column card
    )
}

export default PostCardUser;