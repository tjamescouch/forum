import React, {useState, useEffect, useRef} from 'react';
import UserAPI from '../api/UserAPI';
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
    }

    let data = new FormData();
    data.append('file', file);
    UserAPI.setAvatar(data);
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
        <form method="post" encType="multipart/form-data" action="/upload">
          <input ref={fileInput} style={{display: "none"}} type="file" name="file" accept="image/*" onChange={onChangeFile} />
          <input ref={submitInput} style={{display: "none"}} type="submit" value="Submit" />
        </form>

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
