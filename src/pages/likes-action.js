import React from 'react'
import supabase from '../supabase-config'


class LikesCard extends React.Component{
constructor(props){
super(props)
this.state = {
    likes_id:[],
    isLikes:false,
    total_likes:this.props.post.total_likes
}
}


componentDidMount(){
this.getIdLikes()
console.log(this.state.likes_id);
}

getIdLikes = async () => {
  const id = this.props.user.uid
  console.log(this.props.user.uid);
  const { data, error } = await supabase
  .from('likes')
  .select()
  if(error){
    console.log(`${error} No data`);
  }
  if(data){
    console.log(data);
    data.map(likes => {
        if (likes.likes_id === id) {
            console.log("sama");
              this.setState({
                  likes_id:likes.likes_id,
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
    const user_id = this.props.user.uid
    if(parseFloat(e.target.dataset.id) === id){
      if(e.target.classList.contains('likes')){
        this.setState({total_likes: this.state.total_likes - 1}, () => {
          console.log(this.state.total_likes)
         });
        console.log("ada like");
        e.target.classList.remove('likes')
        await this.RemoveLikes(id)
        }else{
         console.log("tidakada like");
         this.setState({total_likes: this.state.total_likes + 1}, () => {
          console.log(this.state.total_likes)
         });
         e.target.classList.add('likes')
         await this.UpdateLikes(id)
        }
      }
}

UpdateLikes = async (id) => {

const { updata, err } = await supabase.from('post')
.update({ total_likes:this.state.total_likes + 1})
.eq('id',id)
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

RemoveLikes = async (id) => {
const { updata, err } = await supabase.from('post')
.update({ total_likes:this.state.total_likes - 1})
.eq('id',id)
if(updata){
    alert("Remove likes sukes")
    console.log(updata);
  }if(err){
   console.log(err);
  }

const { data, error } = await supabase
.from('likes')
.delete()
.eq('likes_id',this.props.user.uid)

if(data){
    alert("Remove likes sukes")
    console.log(data);
  }if(error){
    console.log(error);
  }
}
render(){

    const is_likes = this.state.isLikes ? <i className="fa fa-heart likes is-size-5 is-clickable"  data-id={this.props.post.id} onClick={this.addLikes}></i>
    : <i className="fa fa-heart-o  is-size-5 is-clickable"  data-id={this.props.post.id} onClick={this.addLikes}></i>
    
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