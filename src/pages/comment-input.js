import React  from 'react'
import { Link, useParams } from 'react-router-dom'
import img from '../akun.jpg'
import supabase from '../supabase-config'

class CommentInput extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            hide:false,
            comment:''
        }
    }

       
handlerChange = (e) => {
    const {name,value} = e.target
    console.log(this.props);
    this.setState({[name]:value})
    if(value.length > 0){
        this.setState({hide:true})
    }else{
        this.setState({hide:false})
    }
  }
  
postComment = async (e) => {
e.preventDefault()
 const {data,error} = await supabase.from('comment')
 .insert([
    {comment_content:this.state.comment,
    post_id:this.props.post.id,
    author_id:this.props.author_uid }
  ])
  if(error) console.log(error);
  if(data){
    console.log(data);
    alert("Comment Sukses")
    this.UpdateTotalComment()
  }
}

UpdateTotalComment = async () => {
    const { data, error } = await supabase.from('post')
  .update({total_comment:this.props.post.total_comment + 1})
  .eq('id',this.props.post.id)
  if(data) console.log(data);
  if(error) console.log(error);
}
  render(){

    return(
<form class="field has-addons" onSubmit={this.postComment}>
    <input class="input no-radius" type="text" name='comment' placeholder="Write something" onChange={this.handlerChange}/>
{this.state.hide ? <button type='submit' class="button is-info no-radius">
      Post
   </button> : <button class="button is-info no-radius" disabled>
      Post
    </button>}
</form>
    )
  }
}

export default CommentInput;
