import React, { useEffect, useState } from  'react'
import { useParams } from 'react-router-dom'
import supabase from '../supabase-config'
import Avatar from './avatar'
import MessageAvatar from './message-chat-avatar'
import MessageAvatarHeader from './message-chat-header'
import MessageChatLeft from './message-chat-left'
import MessageChatRight from './message-chat-right'
import MessageReplyInput from './message-reply-input'


class MessageList extends React.Component{

constructor(){
  super()
  this.state = {
    user:[],
    userHeader:[],
    MessageId:'',
    message:[],
    reply:[],
    MessageDetail:[]
  }
}

componentDidMount(){
this.fetchMessage()
}
componentDidUpdate(){
  if(this.props.data.uid){
    // this.fetchMessage()
  }else{
    console.log('null');
  }
  }

 fetchMessage = async e => {
  const id = this.props.data.uid ? this.props.data.uid : null
  const {data,err} = await supabase.from('message')
  .select()
  .eq('owner_id',id)
  if(data){
    this.setState({message:data})
    // console.log(data);
    const test = []
console.log(data);
    data.forEach(m => {
      const id = m.sender_id
      test.push(id)
      const news =  [...new Set(test)];
      this.setState({user:news})
      // console.log(id);
      // this.getUserData(id) 
    })
  }
  if(err) console.log(err);
}

fetchMessageReply = async id => {

  const {data,err} = await supabase.from('message_reply')
  .select()
  .eq('sender_id',id)
  if(data){
    this.setState({reply:data})
    const test = []
    data.forEach(m => {
      const id = m.owner_id
      // test.push(id)
      // const news =  [...new Set(test)];
      // this.setState({user:news})
      // console.log(id);
      // this.getUserData(id) 
    })
  }
  if(err) console.log(err);
}



fetchMessageDetail = async (id) => {
if(!this.state.MessageId){
console.log("kosong");
  return
}
const {data,err} = await supabase.from('message')
.select()
.eq('sender_id',id)
const test = []
if(data){
  this.setState({MessageDetail:data})
  data.forEach(m => {
    const id = m.sender_id
    this.setState({userHeader:id})
  })
}
if(err) console.log(err);
}

OpenMessageTab = async e => {
e.preventDefault()
const id = e.target.dataset.message
console.log(e.target.parentElement.previousElementSibling);
this.setState({MessageId:id})
await this.fetchMessageDetail(id)
await this.fetchMessageReply(id)
}
  render() {  

  const height = {height:`${450}px`}
    return(
   <div className='container my-5 pt-2 mx-5'>
          <div className='column is-8 is-centered mx-auto p-0 my-5 pt-2'>
        <div className='container'>
          <div className='columns is-multiline h-100'>
    <div className='column is-one-third p-0'>
    {/* START LEFT COL */}
    <div className='card'>
    <header class="card-header align-center justify-between px-2">
    <a href='#' className='has-text-dark is-size-6 is-title'>{this.props.data.username}</a>  
    <button class="card-header-icon" aria-label="more options">
    <span class="icon">
    <i class="fa fa-plus" aria-hidden="true"></i>
    </span>
    </button>
    </header>
    <div className='is-flex is-flex-column is-flex-gap-md p-2 chat-box'  style={height}>
    {/* START USER COL */}
    {this.state.user.length < 1  ? "" : this.state.user.map((msg,index )=> {
  return <MessageAvatar msg={msg} index={index} openTab={this.OpenMessageTab }/>
    })
    }
    {/* END USER COL */}
    </div>
    {/* END USER LIST */}
    </div>
    {/* END LEFT COL INNER */}
            </div>
            {/* END LEFT COL */}
    <div className='column p-0'>
    {/* START CARD */}
    <div className='card'>
    <header class="card-header align-center is-flex-gap-md p-3">
{this.state.MessageId.length < 1 ? "" : <MessageAvatarHeader avatar_id={this.state.MessageId}/>}
    </header>
  <div className='p-3 is-flex is-flex-column is-flex-gap-lg chat-box' style={height}>
    {/* <MessageChatLeft />    */}
  {this.state.MessageId.length < 1 ? "" : this.state.MessageDetail.map(msg => {
return <MessageChatRight  msg={msg} />
  })
  }
  {this.state.MessageId.length < 1 ? "" : this.state.reply.map(msg => {
return <MessageChatLeft  msg={msg} />
  })
  }
    </div>
    {/* END MESSAGE */}
    {this.state.MessageId.length < 1 ? "" : <MessageReplyInput id={this.state.MessageId} user={this.props.data}/>
    }
    </div>
    {/* END CARD */}
    </div>
            {/* END COL RIGHT */}
          </div>
          {/* END COLUMNS */}
    </div>
    {/* END CONTAINER */}
    </div>
   </div>
    )
  }
}

export default MessageList;