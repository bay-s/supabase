import React, { useEffect, useState } from 'react'
import { Link, useParams} from 'react-router-dom'
import akun from '../akun.jpg'
import supabase from '../supabase-config';
import ChangePassword from './change-password';
import EditProfileForm from './edit-profile-form';

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
     url:'',
     tab:'edit'
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


  openTab = (e) => {
    e.preventDefault()
    const tabs = e.target.textContent.toLowerCase()
    const text = tabs.split(" ")
    this.setState({tab:text[0]})
  }
  render(){

    const data = {
      UpdateProfile:this.UpdateProfile,
      handlerChange:this.handlerChange,
      error:this.state.error,
      sukses:this.state.sukses,
      isSubmit:this.state.isSubmit,
      pesan:this.state.pesan
    }
    return(
 <div className="container mt-5 pt-5 bg-dark" >
  <div className='columns is-multiline  mx-6 is-centered h-100 is-gapless'>
     <div className='column is-one-fifth p-0 box '>
      <ul className='is-flex is-flex-column text-center p-2 tabs'>
      <li className={this.state.tab === 'edit' ? 'text-center is-active' : 'text-center'}>
      <a class="navbar-item text-center" data-tab='edit' onClick={this.openTab }>
        Edit Profile
      </a>
    </li>
    <li className={this.state.tab === 'change' ? 'text-center is-active' : 'text-center'}>
      <a class="navbar-item " data-tab='change' onClick={this.openTab }>
       Change Password
      </a>
      </li>
      </ul>
     </div>
     <div className='column is-two-thirds box '>
{this.state.tab === 'edit' ? <EditProfileForm data={data}/> : <ChangePassword  id={this.props.data.uid}/>}
      </div>
        {/* END COLUMN RIGHT */}
    </div>
    {/* END COLUMNS */}
</div>
// END CONTAINER
    )
  }
}


export default EditProfile;


