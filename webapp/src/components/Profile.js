import React, {useState, useEffect, useRef} from 'react';
import UserAPI from '../api/UserAPI';
import { getUploadUrl } from '../api/APIUtils';
import { connect } from 'react-redux';
import './Profile.css'

function Posts ({isAuthenticated}) {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState(null);
  const fileInput = useRef(null);
  const submitInput = useRef(null);

  useEffect(()=>{
    loadData();
  }, []);

  async function loadData() {
    try {
      let user = await UserAPI.getSelf();
      setUser(user);
      if(user.avatar) {
        setAvatar(getUploadUrl(user.avatar));
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  }

  function onChangeFile(e) {
    let file = null;
    let fileList = e.target.files;
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].type.match(/^image\//)) { //Check for image MIME type
        file = fileList[i];
        break;
      }
    }

    if (file !== null) {
      setAvatar(URL.createObjectURL(file));

      let data = new FormData();
      data.append('file', file);
      UserAPI.setAvatar(data);
    }
  }

  function onSelectAvatar() {
    fileInput.current.click();
  }

  return (
    isAuthenticated ?
      <div>
        {avatar ?
          <img class="avatar" src={avatar} alt="Avatar" onClick={onSelectAvatar}/>
          :
          <div class="avatar-placeholder" onClick={onSelectAvatar}>Select Avatar</div>
        }
        <input ref={fileInput} style={{display: "none"}} type="file" name="file" accept="image/*" onChange={onChangeFile} />


        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
      :
      <p>Sign in to view profile</p>
  );
}

function mapStateToProps(state, ownProps) {
    return {...state.authentication};
}

export default connect(mapStateToProps)(Posts);
