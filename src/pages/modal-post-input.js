import React from 'react'

function ModalPostInput(props){

    return(
 <div className='has-text-centered is-flex is-flex-direction-column is-vcentered is-flex-gap-md my-auto'>
      <div className='is-flex is-flex-direction-column'>
      <i class='fa fa-picture-o  is-size-1' aria-hidden="true" ref={props.icons}></i>
        <p class="modal-card-title is-size-5">Drag photos and videos here</p>
        
      </div>
<div class="file is-info is-small is-centered ">
  <label class="file-label is-flex is-flex-direction-column">
    <input class="file-input" type="file" name="image-post" onChange={props.ImageChange}/>
    <span class="file-cta">
      <span class="file-icon">
        <i class="fa fa-upload"></i>
      </span>
      <span class="file-label">
        Select from computer
      </span>
    </span>
  </label>
</div>
       </div> 
    )
}

export default ModalPostInput;