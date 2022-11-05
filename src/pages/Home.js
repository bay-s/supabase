import { useState } from 'react'
import { useEffect } from 'react'
import supabase from '../supabase-config'
import {Link} from 'react-router-dom'
import PostCard from './post-card'
import HomeSidebar from './home-sidebar'


const Home = (props) => {
const [err,setErr] = useState(null)
const [data,setData] = useState([])
const [message,setMessage] = useState('')
const [isMark,setIsMark] = useState([])
useEffect(() => {
const fetchData = async () => {
  const {data,error} = await supabase
  .from('post')
  .select()
  if(error){
    setErr(true)
    setMessage(`Something wrong ${error.message}`)
    console.log(error);
  }
  if(data){
    setData(data)
    setErr(false)
    setMessage('')
    console.log(data);
  }
}
fetchData()
getBookMark()
},[])

const deletePost = async (e) => {
  e.preventDefault()
  const id = e.target.dataset.id
  console.log(id);
  if(window.confirm("Are you sure want to delete this ?")){
    const {data,error} = await supabase
    .from('smoothies')
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

const getBookMark = async () => {
  const { data, error } = await supabase
  .from('bookmark')
  .select()
  if(error) console.log(error);
  else {
      setIsMark(data)
  }
 }


const postCard = data.length < 1 ? "" : data.map((item ,index)=> {
  return <PostCard data={item} leng={data.length}  index={index}/>
})
  return (
<div class="container mx-auto my-5 pt-3">
{/* START COLUMNS */}
  <div class="columns is-multiline is-centered">
{/* START COL CENTER */}
<div class="column  is-half">
{postCard}
</div>
{/* END COL CENTER */}
{/* START COL RIGHT  */}
<div class="column is-one-quarter py-5">
<HomeSidebar />
</div>
{/* END COL RIGHT  */}
  </div>
{/*  END COUMNS  */}
  </div>
// END CONTAINER
  )
}

export default Home
