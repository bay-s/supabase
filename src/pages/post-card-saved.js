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
import Bookmarked from './bookmark'
import PostCard from './post-card'


function PostCardSaved(props){
    const [UserData,setUserData] = useState([])
    const [loader,setLoader] = useState(true)
    const [openModal,setOpenModal] = useState(false)
    const [post,setPost] = useState([])
  
    const id = props.data.mark_id
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
      fetchPost()
    },[])
  
    const fetchPost = async () => {
      const {data,error} = await supabase
      .from('post')
      .select()
      .eq('id',props.data.post_id)
      if(error) console.log(error);
      else{
          setPost(data)
          console.log(data);
      }
    }
  const openModalPost = e => {
    e.preventDefault()
    setOpenModal(!openModal)
    console.log("Tes");
  
  }
  
  
    return(
  post.length < 1 ? "" : post.map((item ,index)=> {
    return <div className="column is-4">      
  <div className="card post-card is-relative">
    <div class="card-image">
      <figure className="image is-4by3">
      <Link to={`/post/${item.id}`}>
        <img className='is-clickable'
         src={item.post_image ==='' ? "https://bulma.io/images/placeholders/1280x960.png" : item.post_image }
        />
        </Link>
      </figure>
    </div>
   <div className='captions is-flex align-center is-flex-gap-md'>
    <div className='is-flex align-center is-flex-gap-md'>
   <i class="fa fa-heart has-text-white" aria-hidden="true"></i>
   <span className='has-text-white is-size-6 is-bold'>{item.total_likes < 1 ? "0" : item.total_likes}</span>
    </div>
    <div className='is-flex align-center is-flex-gap-md'>
   <i class="fa fa-comment has-text-white is-size-5" aria-hidden="true"></i>
   <span className='has-text-white is-size-6 is-bold'>{item.total_comment < 1 ? "0" : item.total_comment}</span>
    </div>
   </div>
</div>   
</div>
      })
    )
}

export default PostCardSaved;

