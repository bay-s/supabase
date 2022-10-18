import React, { useContext } from 'react'
import { AppContext } from '../App'
import UploadAvatar from './edit-avatar.js';

const EditProfileForm = (props) => {
const {value} = useContext(AppContext);
console.log(value);
    return(
        <div className='p-3'>
<UploadAvatar id={value.data.uid} data={value.data}/>
{/* END UPLOAD INPUT */}
<form className='is-flex is-flex-direction-column is-flex-gap-lg' onSubmit={props.data.UpdateProfile}>
<div class="field">
<label class="label">Fullname</label>
<div class="control">
<input class="input  is-link has-text-dark" type="text" name='fullname' placeholder={value.data.fullname} defaultValue={value.data.fullname} onChange={props.data.handlerChange}/>
</div>
</div>

<div class="field">
<label class="label">Username</label>
<div class="control">
<input class="input  is-link" type="text" name='username' placeholder={value.data.username}  defaultValue={value.data.username}  onChange={props.data.handlerChange}/>
</div>
</div>

<div class="field">
<label class="label">Website Link</label>
<div class="control">
<input class="input  is-link" type="text" name='link' placeholder={value.data.link} defaultValue={value.data.link} onChange={props.data.handlerChange}/>
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
          <input class="input is-link" type="tel" name='phone' placeholder={value.data.phone} defaultValue={value.data.phone} onChange={props.data.handlerChange}/>
        </p>
      </div>
      <p class="help">Do not enter the first zero</p>
    </div>
  </div>
</div>

<div class="field">
<label class="label">Bio</label>
<textarea class="textarea is-link is-small" name='biodata' placeholder={value.data.biodata} defaultValue={value.data.biodata} onChange={props.data.handlerChange}></textarea>
</div>


<article class={props.data.error ? "message is-danger" : 'hide'}>
  <div class="message-body">
 <i> {props.data.pesan}</i>
  </div>
</article>
<article class={props.data.sukses ? "message is-success" : 'hide'}>
  <div class="message-body">
 <i> {props.data.pesan}</i>
  </div>
</article>

<div class="field">
{props.data.isSubmit ?  <button class="button is-link" title="Disabled button">Submit</button> : <button class="button is-link" title="Disabled button" disabled>Submit</button>}
</div>
                </form>
   </div>
    )
}

export default EditProfileForm;