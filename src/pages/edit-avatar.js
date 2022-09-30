import React from 'react'
import akun from '../akun.jpg'
import supabase from '../supabase-config'
import ErrorMessage from './error-message'

class  EditAvatar extends React.Component{
    constructor(){
        super()
        this.state = {
         hide:false,
         isSubmit:false,
         isUpload:false,
         website:'',
         imgUpload:'',
         url:'',
         isValid:false,
         pesan:'',
         error:false,
         sukses:false
        }
      }


      
    ImageChange = event => {
        console.log(event.target.files);
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          const exten = ['png','jpeg','jpg','gif','bmp'];
          const imgStr = img.name.split(".")


          this.setState({
            imgUpload: URL.createObjectURL(img),
            url:img,
            hide:true,
            isUpload:true
          });
          }

        
      };

 uploadImage = async e => {
        e.preventDefault()
        this.setState({isUpload:false})
        const { data, error} = await supabase.storage
        .from('images')
        .upload(`public/avatar/${this.state.url.name}`, this.state.url,{
          cacheControl: '604800',
          upsert: false
        })
        if(error){
            console.log(error);
            this.setState({
              isUpload:true,
              error:true,
              sukses:false,
              pesan:`Something wrong ${error.message}`
            })   
        }
        if(data){
            console.log(data);
            const url = data.Key
            this.setState({isUpload:true})
            this.getURL(url)
        }
      }

getURL = async (url) => {
  const { data,error } = supabase.storage
  .from('images')
  .getPublicUrl(`public/avatar/${this.state.url.name}`)
  if(data){
    const imgUrl= data.publicURL;
    this.updateAvatar(imgUrl) 
  }
  if(error){
    this.setState({
      error:true,
      sukses:false,
      pesan:`Something wrong ${error.message}`
    })
    console.log(error);
  }

    }

      updateAvatar = async (url) => {
        const {data,err} = await supabase 
        .from('users')
        .update({avatar:url})
        .eq('uid',this.props.id)
        if(err){
          console.log(err);
          this.setState({
            error:true,
            sukses:false,
            pesan:`Something wrong ${err.message}`
          })
        }
        if(data){
          console.log(data);
          this.setState({
            error:false,
            sukses:true,
            isUpload:true,
            pesan:'Uploaded succcess'
          })
        }
      }
render(){


        return(
<form className='my-3' onSubmit={this.uploadImage}>
<div class="field is-flex is-flex-gap-xl is-align-items-center">
<figure class="image is-48x48">
<img class="is-rounded edit-image" src={this.state.imgUpload !== '' ? this.state.imgUpload : this.props.data.avatar == null ? akun : this.props.data.avatar}  alt="profile"/>
</figure>
<div class="file is-small is-link is-flex is-flex-direction-column is-flex-gap-sm">
<label class="label p-0 m-0">{this.props.data.username}</label>
<label class="file-label">
<input class="file-input" type="file" name="resume" onChange={this.ImageChange}/>
<span class="file-cta">
<span class="file-icon">
<i class="fa fa-upload"></i>
</span>
<span class="file-label  px-2">
{this.state.url === '' ? "Upload Image" : this.state.url.name}
</span>
</span>
</label>
<div className={this.state.hide ? "" : 'hide'} >
{this.state.isUpload ?  <button type='submit' class="button is-info is-small" >Save</button> : <button class="button is-link  is-loading is-small" disabled>Loading</button>}
</div>
<ErrorMessage pesan={this.state.pesan} error={this.state.error} sukses={this.state.sukses}/>
</div>
</div>
</form>
        )

    }
}

export default  EditAvatar;