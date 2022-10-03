import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../supabase-config'
import timeDifference from './timestamp'
import akun from '../akun.jpg'


class MessageAvatarHeader extends React.Component{
constructor(){
  super()
  this.state = {
    user:[]
  }
}

async componentDidMount(){
await this.fetchData()
}
async componentDidUpdate(){
 await this.fetchData()
}
fetchData = async () => {
    const {data,err} = await supabase.from('users')
    .select()
    .eq('uid',this.props.avatar_id)
    if(data) {
        console.log(data);
      this.setState({user:data})
    }
    if(err) console.log(err);
  }
render(){
  console.log(this.props.avatar_id);
  return(
       this.state.user.length < 1 ? "" : this.state.user.map(m => {
          return  <div className='is-flex align-center is-flex-gap-md is-clickable user-list' data-message={m.uid} >
          <div class="image is-48x48 avatar" data-message={m.uid}>
           <img className="is-rounded" src={m.avatar === '' ? akun : m.avatar} alt="User name" data-message={m.uid}/>
          </div>
          <div className='is-flex is-flex-column' data-message={m.uid}>
          <button className='is-title is-size-7 p-0 btn-transparent' data-message={m.uid}>{m.username}</button>
          </div>
      </div>
      })
  )
}
}

export default MessageAvatarHeader ;


// const [user,setUser] = useState([])

// useEffect(() => {
//   const fetchData = async () => {
//     const {data,err} = await supabase.from('users')
//     .select()
//     .eq('uid',props.avatar_id)
//     if(data) {
//         console.log(data);
//         setUser(data)
//     }
//     if(err) console.log(err);
//   }

//   fetchData()
// },[])