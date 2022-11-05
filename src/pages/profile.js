import React, { useContext, useEffect, useState } from 'react'
import supabase from '../supabase-config'
import { Link, useParams } from 'react-router-dom'
import ProfileInfo from './profile-user-info'
import PostCardUser from './post-card-user'
import Banner from './banner'
import BannerUser from './banner-user'
import PostCardSaved from './post-card-saved'
import { AppContext } from '../App'


const Profile = (props) => {
const {id} = useParams()
const {value} = useContext(AppContext)
const [tab,setTab] = useState('pictures')
const [data,setData] = useState([])
const [booMark,setBookMark] = useState([])
useEffect(() => {

fetchData()
fetchBookmark()
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

const fetchBookmark = async () => {
  const {data,error} = await supabase
  .from('bookmark')
  .select()
  .eq('mark_id',id)
  if(error) console.log(error);
  else {
    setBookMark(data)
  }
}
      const postCardSave = booMark == undefined ? "" : booMark.map(item => {
        console.log(item);
        return <PostCardSaved data={item} />
       })
const openTab = (e) => {
  const tabs = e.target.textContent.toLowerCase()
  const text = tabs.split(" ")
 setTab(text[0])
}
    return(
<div className='container m-4 mx-auto pt-4' >
<div class="column is-10 box is-centered p-0 mx-auto">
{id === value.data.uid ? <Banner  user={value.data} data={data}/> : <BannerUser user={value.data} data={data}/>}
{/* OFILE INFO  */}
<ProfileInfo key={id} data={data} id={id} />
{/* END PROFILE INFO */}
    {/* tabs*/}
<div className="tabs is-centered mx-5">
          <ul className="is-flex align-center justify-center">
    <li className={tab === 'pictures' ? 'text-center is-active' : 'text-center'}>
      <a class="navbar-item " data-tab='change' onClick={openTab }>
       Pictures
      </a>
    </li>
    <li className={tab === 'videos' ? 'text-center is-active' : 'text-center'}>
      <a class="navbar-item " data-tab='change' onClick={openTab }>
       Videos
      </a>
      </li>
      <li className={tab === 'saved' ? 'text-center is-active' : 'text-center'}>
      <a class={value.data.uid === id ? "navbar-item " : 'hide'} data-tab='change' onClick={openTab }>
       Saved
      </a>
      </li>
          </ul>
</div>
{/* END TABS */}
{/* POST CONTAINER */}
<div className={tab === 'pictures' ? 'columns is-multiline my-2 p-0 px-5 profile-post fade' : 'hide'}>
<PostCardUser id={id} />
</div>
<div className={tab === 'videos' ? 'columns is-multiline my-2 p-0 px-5 profile-post fade' : 'hide'}>
videos
</div>
<div className={tab === 'saved' ? 'columns is-multiline my-2 p-0 px-5 profile-post fade' : 'hide'}>
{postCardSave}
</div>
{/* END POST CONTAINER */}
       </div>
       {/* END COLUMN */}
  </div>
    )
}

export default Profile;
