import React  from 'react'
import { Link, useParams } from 'react-router-dom'
import img from '../akun.jpg'
import supabase from '../supabase-config'
import ReactQuill from 'react-quill';

class MessageReplyInput extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hide:false,
            formats:[
                'header',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent',
                'link', 'image'
              ],
              modules: {
                toolbar: [
                  [{ 'header': [1, 2, false] }],
                  ['bold', 'italic', 'underline','strike', 'blockquote'],
                  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                  ['link', 'image'],
                  ['clean']
                ],
              },
              value:[],
              hide:false
        }
        
    }

handlerChange = (e) => {
  console.log(e);
    this.setState({value:e})
    if(this.state.value.length > 0){
        this.setState({hide:true})
    }else{
        this.setState({hide:false})
    }
  }
  
SendMessage =  async (e) => {
e.preventDefault()

if(!this.state.value){
    alert("input field required")
    return
}
 const {data,error} = await supabase.from('message_reply')
 .insert([
    {
    message_content:this.state.value,
    owner_id:this.props.user.uid,
    sender_id:this.props.id
}
  ])
  if(error) console.log(error);
  if(data){
    console.log(data);
    this.setState({value:""})
    alert("Reply Sukses")
  }
}

// UpdateTotalComment = async () => {
//     const { data, error } = await supabase.from('post')
//   .update({total_comment:this.props.post.total_comment + 1})
//   .eq('id',this.props.post.id)
//   if(data) console.log(data);
//   if(error) console.log(error);
// }
  render(){

    return(
<form class="field is-flex is-flex-column is-flex-gap-md w-100" onSubmit={this.SendMessage}>
<ReactQuill theme="snow" value={this.state.value} onChange={this.handlerChange} name='quill'  modules={this.state.modules} formats={this.state.formats}/>
{this.state.hide ? <button type='submit' class="button is-info no-radius">
      Post
   </button> : <button class="button is-info no-radius" disabled>
      Post
    </button>}
</form>
    )
  }
}

export default MessageReplyInput;

