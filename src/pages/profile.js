import React, { useEffect, useState } from 'react'
import supabase from '../supabase-config'
import { Link, useParams } from 'react-router-dom'
import ProfileInfo from './profile-user-info'
import PostCardUser from './post-card-user'
import Banner from './banner'
import BannerUser from './banner-user'



const Profile = (props) => {
const {id} = useParams()
const [err,setErr] = useState(false)
const [data,setData] = useState([])

useEffect(() => {
fetchData()
},[])

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
    setData(data)
    console.log(data);
  }
}

      // const postCard = post.length < 1  ? "" : post.map(item => {
      //   return <PostCardUser key={post} data={item} />
      //  })

    return(
<div className='container m-4 mx-auto pt-4' >
<div class="column is-10 box is-centered p-0 mx-auto">
{id === props.user.uid ? <Banner  user={props.user} data={data}/> : <BannerUser user={props.user} data={data}/>}
{/* OFILE INFO  */}
<ProfileInfo key={id} data={data} id={id} user={props.user}/>
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
<div className='columns is-multiline my-2 p-0 px-5 profile-post'>
<PostCardUser id={id} />
</div>
{/* END POST CONTAINER */}
       </div>
       {/* END COLUMN */}
  </div>
    )
}

export default Profile;
