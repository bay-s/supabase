import React, { useEffect, useState } from 'react'
import banners from '../banner2.jpg'
import supabase from '../supabase-config'
import { Link, useParams } from 'react-router-dom'
import test3 from '../banner.jpg'
import ProfileInfo from './profile-user-info'
import PostCardUser from './post-card-user'
import NoPost from './no-post'

const Profile = (props) => {
const {id} = useParams()
const [err,setErr] = useState(false)
const [data,setData] = useState([])
const [post,setPost] = useState([])
useEffect(() => {

fetchData()
fetchPost()
},[])

const fetchData = async () => {
  const {data,error} = await supabase
  .from('users')
  .select()
  .eq('uid',id)
  .single()
  if(error){
    setErr("Has some error")
    console.log(error);
  }
  if(data){
    setData(data)
    setErr(false)
    console.log(data);
  }
}

const fetchPost = async () => {
  const {data,error} = await supabase
  .from('post')
  .select()
  .eq('author_uid',id)
  .select()
  if(error){
    setErr("Has some error")
    console.log(error);
  }
  if(data){
    setPost(data)
    setErr(false)
    console.log(data);
  }
}


const deletePost = async (e) => {
  e.preventDefault()
  const id = e.target.dataset.id
  console.log(id);
  if(window.confirm("Are you sure want to delete this ?")){
    const {data,error} = await supabase
    .from('post')
    .delete()
    .match('id',id)
    if(error){
    console.log(error);
    }
    if(data){
      alert("delete sukses")
      console.log(data);
    }
  }else{
    console.log("nothing");
  }
}

    const banner =  {
        backgroundImage:`url(${banners})`,
        height:`${200}px`
      }

      const postCard = post.length < 1  ? "" : post.map(item => {
        return <PostCardUser data={item}/>
       })

    return(
<div className='container m-4 mx-auto ' >
<div class="column is-10 box is-centered p-0 mx-auto">
<div class="banner" style={banner}></div>
{/* OFILE INFO  */}
<ProfileInfo data={data} id={id} user={props.user}/>
{/* END PROFILE INFO */}
    {/* tabs*/}
<div className="tabs is-centered mx-5">
          <ul className="is-flex align-center justify-center">
            <li className="is-active hvr-underline-from-left is-flex align-center">
               <i className="fa fa-picture-o" aria-hidden="true"></i>
               <a href="#" >Pictures</a>
            </li>
            <li className="hvr-underline-from-left  is-flex align-center">
            <i className="fa fa-video-camera" aria-hidden="true"></i>
            <a href="#">Videos</a>
             </li>
             <li className="hvr-underline-from-left  is-flex align-center">
             <i class="fa fa-bookmark-o" aria-hidden="true"></i>
              <a href="#" >Saved</a>
             </li>
          </ul>
</div>
{/* END TABS */}
{/* POST CONTAINER */}
<div className='columns is-multiline my-2 p-0 px-5'>
{postCard === '' ? <NoPost /> : postCard}

</div>
{/* END POST CONTAINER */}
       </div>
       {/* END COLUMN */}
     </div>
    )
}

export default Profile;