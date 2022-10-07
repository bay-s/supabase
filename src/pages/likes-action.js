import React from 'react'
import supabase from '../supabase-config'


class LikesCard extends React.Component{
constructor(props){
super(props)
this.state = {
    likes_id:[],
    isLikes:false,
}
}


componentDidMount(){
this.getIdLikes()
console.log(this.state.likes_id);
}

  
getIdLikes = async () => {
  const id = this.props.user.uid
  const { data, error } = await supabase.from('likes')
  .select()
  .eq('post_id',this.props.post.id)
  if(error){
    console.log(`${error} No data`);
  }
  if(data){
    console.log(data);
    data.map(likes => {
      this.setState({likes_id:likes.id})
      console.log(likes.id);
        if (likes.likes_id === id) {
            console.log("sama");
              this.setState({
                  isLikes:true
              })
          } else {
              console.log("salah");
              
          }
    })
  }
}

addLikes = async (e) => {
    e.preventDefault()
    const id = this.props.post.id
    const lid = parseInt(e.target.dataset.likes) 
    
    if(parseFloat(e.target.dataset.id) === id){
      if(e.target.classList.contains('likes')){
        console.log("ada like");
        e.target.classList.remove('likes')
        this.RemoveLikes(id,lid)
        }else{
         console.log("tidakada like");
         e.target.classList.add('likes')
         this.UpdateLikes(id)
        }
      }
}

UpdateLikes = async (id) => {
const { updata, err }= await supabase
.rpc('likes_inc', { x: 1, row_id: id})
if(updata){
    alert("Add likes sukes")
    console.log(updata);
  }if(err){
    alert(err)
    console.log(err);
  }

const { data, error } = await supabase
  .from('likes')
  .insert([
    { 
        likes_id: this.props.user.uid,
        post_id:id
    }
  ])
  if(data){
    alert("Add likes sukes")
    console.log(data);
  }if(error){
    alert(error)
    console.log(error);
  }
}

RemoveLikes = async (id,lid) => {
  const { updata, err }= await supabase
.rpc('likes_dec', { x: 1, row_id: id})
if(updata){
    alert("Remove likes sukes")
    console.log(updata);
  }if(err){
   console.log(err);
  }

const { data, error } = await supabase
.from('likes')
.delete()
.eq('id',lid)

if(data){
    alert("Remove likes sukes")
    console.log(data);
  }if(error){
    console.log(error);
  }
}
render(){

    const is_likes = this.state.isLikes ? <i className="fa fa-heart is-size-5 is-clickable likes"  data-likes={this.state.likes_id} data-id={this.props.post.id} onClick={this.addLikes}></i>
    : <i className="fa fa-heart-o  is-size-5 is-clickable" data-likes={this.state.likes_id} data-id={this.props.post.id} onClick={this.addLikes}></i>
    
    return(
<ul className='is-flex align-center is-flex-gap-md'>
<li>{is_likes}</li>
<li><i class="fa fa-paper-plane-o has-text-dark is-size-5 is-clickable" aria-hidden="true"></i></li>
<li><i class="fa fa-comment-o has-text-dark is-size-5 is-clickable" aria-hidden="true"></i></li>
</ul>
    )
}

}

export default LikesCard;