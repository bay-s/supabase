import React, { useEffect, useState } from 'react'
import { Link, useParams} from 'react-router-dom'
import akun from '../akun.jpg'
import supabase from '../supabase-config';
import UploadAvatar from './edit-avatar.js';

// function EditProfile(props){
//   const {id} = useParams()
//  const [data,setData] = useState([])

//     return(
//      <EditProfileCard id={id} />
//     )

// }

// export default EditProfile;


class EditProfile extends React.Component{
  constructor(){
    super()
    this.state = {
      error:false,
      sukses:false,
      pesan:'',
      hide:false,
      isSubmit:false,
      isUpload:false,
     data:[],
     username:'',
     fullname:'',
     phone:'0',
     website:'',
     biodata:'',
     imgUpload:'',
     url:''
    }
  }
  
  async componentDidMount(){
  if(this.props.data){
    this.setState({
      username:this.props.data.username,
      fullname:this.props.data.fullname,
      biodata:this.props.data.biodata,
      website:this.props.data.link,
      phone:this.props.data.phone,
    })
  }

  }

  handlerChange = async (e) => {
    const {name,value} = e.target
    console.log(this.state.biodata);
    console.log(this.state.username);
    this.setState(prev => {
      return{
   [name]:value,
   isSubmit:true,
      }
    })
  }


  UpdateProfile = async (e) => {
    e.preventDefault()
    const id = this.props.data.uid

    this.setState({isSubmit:false})

    const {data,error} = await supabase
    .from('users')
    .update({
      username:this.state.username,
      fullname:this.state.fullname,
      phone:this.state.phone,
      link:this.state.link,
      biodata:this.state.biodata
    })
    .eq('uid',id)
    if(error){
      console.log(error);
      this.setState({
        error:true,
        sukses:false,
        pesan:`Something wrong ${error.message}`
      })
    }
    if(data){
      console.log(data);
      this.setState({
        error:false,
        sukses:true,
        isSubmit:false,
        pesan:'Update Sukses'
      })
    }
  }


  render(){

    return(
    <div className="container my-5" >
  <div className='columns is-multiline  mx-6 is-centered'>
        <div className='column is-two-thirds box '>
<div className='p-3'>
<UploadAvatar id={this.props.data.uid} data={this.props.data}/>
{/* END UPLOAD INPUT */}
<form className='is-flex is-flex-direction-column is-flex-gap-lg' onSubmit={this.UpdateProfile}>
<div class="field">
<label class="label">Fullname</label>
<div class="control">
<input class="input  is-link has-text-dark" type="text" name='fullname' placeholder={this.props.data.fullname} defaultValue={this.props.data.fullname} onChange={this.handlerChange}/>
</div>
</div>

<div class="field">
<label class="label">Username</label>
<div class="control">
<input class="input  is-link" type="text" name='username' placeholder={this.props.data.username}  defaultValue={this.props.data.username}  onChange={this.handlerChange}/>
</div>
</div>

<div class="field">
<label class="label">Website Link</label>
<div class="control">
<input class="input  is-link" type="text" name='link' placeholder={this.props.data.link} defaultValue={this.props.data.link} onChange={this.handlerChange}/>
</div>
</div>


<div class="field ">
<label class="label">Phone</label>
  <div class="field-body">
    <div class="field is-expanded">
      <div class="field has-addons">
        <p class="control">
          <a class="button is-static ">
            +62
          </a>
        </p>
        <p class="control is-expanded">
          <input class="input is-link" type="tel" name='phone' placeholder={this.props.data.phone} defaultValue={this.props.data.phone} onChange={this.handlerChange}/>
        </p>
      </div>
      <p class="help">Do not enter the first zero</p>
    </div>
  </div>
</div>

<div class="field">
<label class="label">Bio</label>
<textarea class="textarea is-link is-small" name='biodata' placeholder={this.props.data.biodata} defaultValue={this.props.data.biodata} onChange={this.handlerChange}></textarea>
</div>


<article class={this.state.error ? "message is-danger" : 'hide'}>
  <div class="message-body">
 <i> {this.state.pesan}</i>
  </div>
</article>
<article class={this.state.sukses ? "message is-success" : 'hide'}>
  <div class="message-body">
 <i> {this.state.pesan}</i>
  </div>
</article>

<div class="field">
{this.state.isSubmit ?  <button class="button is-link" title="Disabled button">Submit</button> : <button class="button is-link" title="Disabled button" disabled>Submit</button>}
</div>
                </form>
            </div>
        </div>
    </div>
</div>

    )
  }
}


export default EditProfile;