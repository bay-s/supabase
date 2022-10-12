import React from 'react'
import banners from '../banner2.jpg'
import supabase from '../supabase-config'


class Banner extends React.Component{
    constructor(){
        super()
        this.state = {
         hide:false,
         isSubmit:false,
         isUpload:false,
         imgUpload:'',
         url:'',
         pesan:'',
         error:false,
         sukses:false
        }
      }


      
    ImageChange = event => {
        console.log(event.target.files);
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          const randName =  (Math.random() + 1).toString(36).substring(3);
          const imgStr = img.name.split(".")
          this.setState({
            imgUpload: URL.createObjectURL(img),
            url:img,
            hide:true,
            isUpload:true,
            imgName:`${randName}.${imgStr[1]}`
          });
          }
    
      };

      uploadImage = async e => {
        e.preventDefault()
        if(!this.state.imgUpload){
          this.setState({
            isError:true,
            isSubmit:false,
            pesan:'Input fields required'
          })
          return
        }
        this.setState({isSubmit:true})
        const { data, error} = await supabase.storage
        .from('images')
        .upload(`public/${this.state.imgName}`, this.state.url, {
          cacheControl: '604800',
          upsert: false
        })
        if(error){
            console.log(error);
            this.setState({
              isError:true,
              pesan:error.message,
              loading:false
            })
        }
        if(data){
            console.log(data);
            const imgUrl = data.Key
            this.getURL(imgUrl)
            this.setState({
              isError:false,
              sukses:true,
              isUpload:true,
              isSubmit:false,
              pesan:'Create post success'
            })
        }
      }
      
      getURL = async (url) => {
      const { data,error } = supabase
        .storage
        .from('images')
        .getPublicUrl(`public/${this.state.imgName}`)
        if(data){
          const imgUrl= data.publicURL;
          console.log(imgUrl);
          this.UploadBanner(imgUrl) 
        }
        if(error){
          console.log(error);
        }
      }

      UploadBanner = async (url) => {
        const {data,err} = await supabase 
        .from('users')
        .update({banner:url})
        .eq('uid',this.props.user.uid)
        if(err){
          console.log(err);
          this.setState({
            error:true,
            sukses:false,
            pesan:`Something wrong ${err.message}`
          })
        }
        if(data){
          this.setState({
            error:false,
            sukses:true,
            isUpload:true,
            hide:false
          })
          alert("Upload banner success")
        }
      }

render(){
   let banner;
if(this.props.user.banner !== null){
    banner = {
        backgroundImage:`url(${this.props.user.banner})`,
        height:`${200}px`
    }
}else if(this.state.imgUpload !== ''){
    banner = {
        backgroundImage:`url(${this.state.imgUpload})`,
        height:`${200}px`
    }
}else{
    banner = {
        backgroundImage:`url(${banners})`,
        height:`${200}px`
    }
}



    return(
<div className='banner-container is-relative'>
<div class="banner" style={banner}></div>
{/* START UPLOAD */}
<form class="file banner-upload is-flex is-flex-column" onSubmit={this.uploadImage }>
  <label class="file-label">
    <input class="file-input" type="file" name="resume" onChange={this.ImageChange}/>
    <span class="file-cta">
      <span class="file-icon">
        <i class="fa fa-upload"></i>
      </span>
    </span>
  </label>
<div class={this.state.hide ? "buttons my-3" : 'is-hidden'}>
{this.state.isSubmit ? "" :   <span class="button is-clickable">Cancel</span>}
{this.state.isSubmit ?  <button class="button is-link is-loading" disabled>Saving</button> : <button type='button' class="button is-link">Save</button>}
</div>
</form>
{/* END UPLOAD */}
</div>
    )
}

}

export default Banner;