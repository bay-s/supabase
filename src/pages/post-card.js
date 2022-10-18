import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import akun from '../akun.jpg'
import LikesCard from './likes-action'
import supabase from '../supabase-config'
import CommentInput from './comment-input'
import LoaderCard from './loader'
import ModalPostDetail from './modal-post-detail'
import timeDifference from './timestamp'
import Avatar from './avatar'


function PostCard(props){

  const [UserData,setUserData] = useState([])
  const [loader,setLoader] = useState(true)
  const [openModal,setOpenModal] = useState(false)

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

const openModalPost = e => {
  e.preventDefault()
  setOpenModal(!openModal)
  console.log("Tes");

}
    return(
      loader ? <LoaderCard /> :
<>      
<div className="column">      
      <div className="card">
        <header className="card-header align-center justify-between p-2">
          <Avatar id={props.data.author_uid} />
          <i className="fa fa-ellipsis-h"></i>
        </header>
{/* end header  */}
        <div class="card-image">
          <figure className="image is-4by3">
          <Link to={`/post/${props.data.id}`}>
          <img
             src={props.data.post_image == null || '' ? "https://bulma.io/images/placeholders/1280x960.png" : props.data.post_image }
             className='is-clickable is-hidden-mobile'  />
          </Link>
             {/* onClick={openModalPost} */}
          <img
             src={props.data.post_image == null || '' ? "https://bulma.io/images/placeholders/1280x960.png" : props.data.post_image }
             className='is-clickable is-hidden-tablet'  />
          </figure>
        </div>
        <div className="card-content p-2">
          <div className="is-flex align-center justify-between px-2 py-2">
          <LikesCard post={props.data} user={props.user}/>
          <i class="fa fa-bookmark-o is-size-5 is-clickable"></i>
          </div>
          <div className="content p-0 p-2 is-flex is-flex-column">
            <span className='is-size-7 is-title'>{props.data.post_content}</span>
            <span className='is-size-7 is-title'>{props.data.total_likes} Likes</span>
            <a href="#" className='is-size-7 '>#{props.data.post_cat}</a>
            <a href="#" className={props.data.total_comment < 1 ? 'hide' : 'is-size-7 has-text-grey'}>View {props.data.total_comment} comment</a>
            <time datetime={props.data.created_at} className="is-title is-bold text-small">{ timeDifference(props.data.created_at)}</time>
          </div>
        </div>
        <CommentInput post={props.data}/>
 {/* END CARD CONTENT */}
      </div>
  </div>   
{/* // end column card */}

<div className={openModal ? 'modal is-active modal-post' : 'modal'}>
<div class="modal-background"></div>
<ModalPostDetail post={props.data} UserData={UserData} user={props.user}/>
<button class="modal-close is-large open-post" aria-label="close" onClick={openModalPost}></button>
 </div>
</>
    )
}

export default PostCard;
