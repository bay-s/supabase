import React, { useContext, useEffect, useState } from 'react'
import supabase from '../supabase-config'
import { useParams } from 'react-router-dom'
import ModalPostRight from './modal-post-detail-right'
import { AppContext } from '../App'


const SinglePost = (props) => {
    const {id} = useParams();
    const [loader,setLoader] = useState(false)
    const [posts,setPosts] = useState([])
    const [UserData,setUserData] = useState([])
    const {value} = useContext(AppContext)
    useEffect(() => {
      const getSinglePost = async () => {
        const {data,err} = await supabase.from('post')
        .select()
        .eq('id',id)
        if(data){
            setPosts(data[0])
            console.log(data);
            console.log(data[0]);
        }if(err) console.log(`Something wrong ${err.message}`);
      }
      getSinglePost();
    },[])

    





    const fetchData = async (uid) => {
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

   
    return(
<div className='container my-5 pt-3'>
<div className='column is-8 mx-auto is-centered '>
<div className='columns is-multiline box p-0 h-500px'>
{/* START POST LEFT */}
<div className='column is-8  p-0 h-100'>
<img src={posts.post_image} className='w-100 h-100 post-image'/>
</div>
{/* END POST LEFT */}
{/* START POST RIGHT */}
<ModalPostRight key={posts} post={posts} user={value.data} UserData={UserData} />
{/* END POST RIGHT */}
</div>
  </div>
</div>
    )
}

export default SinglePost;