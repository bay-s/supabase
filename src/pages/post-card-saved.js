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
<div className='column is-4'>
{
  post.length < 1 ? "" : post.map((item ,index)=> {
        return <PostCard data={item}  user={props.data} index={index}/>
      })
}      
</div>
    )
}

export default PostCardSaved;
