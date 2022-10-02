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
useEffect(() => {
  const subscritpion = supabase
  .from("*") // here, you can put '*' if you want to listen to changes on every table or you can put name of a specifict table
  .on('postgres_changes', { event: '*', schema: '*' }, payload => {
    console.log('Change received!', payload)
    
  })
  .subscribe();

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
return () => {
  supabase.removeSubscription(subscritpion);
};
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

const postCard = data.length < 1 ? "" : data.map(item => {
 return <PostCard data={item} user={props.data}/>
})
  return (
<div class="container mx-auto my-5">
{/* START COLUMNS */}
  <div class="columns is-multiline is-centered">
{/* START COL CENTER */}
<div class="column  is-half">
{postCard}
</div>
{/* END COL CENTER */}
{/* START COL RIGHT  */}
<div class="column is-one-quarter py-5">
<HomeSidebar data={props.data}/>
</div>
{/* END COL RIGHT  */}
  </div>
{/*  END COUMNS  */}
  </div>
// END CONTAINER
  )
}

export default Home


// {err ? err : ""}
// {smooth == null ? "no data fopund" : smooth.map(item => {
//  return <div>
//    <Link to={`/update/${item.id}`}> <p>{item.id}</p></Link>
//    <p>{item.post_content}</p>
//    <button data-id={item.id} onClick={deletePost}>Delete</button>
//  </div>
// })
// }