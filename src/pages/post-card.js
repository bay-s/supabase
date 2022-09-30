import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import akun from '../akun.jpg'
import LikesCard from './likes-action'
import supabase from '../supabase-config'
import CommentInput from './comment-input'
import LoaderCard from './loader'



function PostCard(props){

  const [UserData,setUserData] = useState([])
  const [loader,setLoader] = useState(true)
  const id = props.data.author_uid
  useEffect(() => {
    const fetchData = async () => {
      const {data,error} = await supabase
      .from('users')
      .select()
      .eq('uid',id)
      .single()
      if(error){
        console.log(error);
      }
      if(data){
        setUserData(data)
        setLoader(false)
        console.log(data);
      }
    }
    fetchData()
   
  },[])



 const timeDifference = () => {

  const times = props.data.created_at
  const previous = new Date(times)
  const current = new Date()

    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let  msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

   let elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }
    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
      console.log('approximately ' + Math.round(elapsed/msPerMonth) + ' months ago');
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
      console.log('approximately ' + Math.round(elapsed/msPerYear ) + ' years ago');
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}
    return(
      loader ? <LoaderCard /> :
<div className="column">      
      <div className="card">
        <header className="card-header align-center justify-between px-3">
          <div className="is-flex align-center">
            <figure className="image is-32x32 avatar">
              <img className="is-rounded" src={UserData.avatar === '' ? akun : UserData.avatar} />
            </figure>
            <p className="card-header-title"><Link to={`/profile/${UserData.uid}`} className='has-text-dark'>{UserData.username}</Link></p>
          </div>
          <i className="fa fa-ellipsis-h"></i>
        </header>
{/* end header  */}
        <div class="card-image">
          <figure className="image is-4by3">
            <img
             src={props.data.post_image ==='' ? "https://bulma.io/images/placeholders/1280x960.png" : props.data.post_image }

            />
          </figure>
        </div>
        <div className="card-content p-2">
          <div className="is-flex align-center justify-between px-2 py-2">
          <LikesCard post={props.data} />
          <i class="fa fa-bookmark-o is-size-5 is-clickable"></i>
          </div>

          <div className="content p-0 p-2">
            {props.data.post_content}
            <br/>
            {props.data.total_likes} Likes
            <a href="#">#css</a> <a href="#">#{props.data.post_cat}</a>
            <br/>
            <time datetime={props.data.created_at} className="is-title is-bold text-small">{ timeDifference()}</time>
          </div>
        </div>
        <CommentInput post={props.data}/>
 {/* END CARD CONTENT */}
      </div>
  </div>   
// end column card
    )
}

export default PostCard;


// <ul className="is-flex align-center is-flex-gap-md">
// <li><i className="fa fa-heart-o is-size-5 is-clickable"></i></li>
// <li><i className="fa fa-comment-o is-size-5 is-clickable"></i></li>
// <li><i className="fa fa-paper-plane-o is-size-5 is-clickable"></i></li> 
// </ul>