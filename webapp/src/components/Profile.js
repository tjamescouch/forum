import React, {useState, useEffect} from 'react';
import UserAPI from '../api/UserAPI';
import { connect } from 'react-redux';
import './Profile.css'

function Posts ({isAuthenticated}) {
  const [user, setUser] = useState({});

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

  return (
    isAuthenticated ?
      <div>
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
