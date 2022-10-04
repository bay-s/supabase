import React  from 'react'
import { Link, useParams } from 'react-router-dom'
import img from '../akun.jpg'
import supabase from '../supabase-config'

class CommentReply extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            hide:false,
            comment:'',
            dataComment:[]
        }
    }
  
       
handlerChange = (e) => {
    const {name,value} = e.target
    this.setState({[name]:value})
    if(value.length > 0){
        this.setState({hide:true})
    }else{
        this.setState({hide:false})
    }
  }
  
  postReply  = async (e) => {
e.preventDefault()

 const {data,error} = await supabase.from('comment_reply')
 .insert([
    {
    reply_content:this.state.comment,
    post_id:this.props.post.id,
    author_id:this.props.user.uid,
    reply_to:this.props.id,
    comment_id:this.props.id
    }
  ])
  if(error) console.log(error);
  if(data){
    console.log(data);
    alert("Reply Sukses")
    // this.UpdateTotalComment()
  }
}

UpdateTotalComment = async () => {
    const { data, error } = await supabase.from('comment')
  .update({total_reply:this.props.comment.total_reply + 1})
  .eq('id',this.props.comment.id)
  if(data) console.log(data);
  if(error) console.log(error);
}
  render(){

    return(
<form class="field has-addons" onSubmit={this.postReply}>
    <input class="input no-radius" type="text" name='comment' placeholder="Write something" onChange={this.handlerChange}/>
{this.state.hide ? <button type='submit' class="button is-info no-radius">
      Reply
   </button> : <button class="button is-info no-radius" disabled>
      Reply
    </button>}
</form>
    )
  }
}

export default CommentReply;
