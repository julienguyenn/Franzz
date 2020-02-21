import React from 'react';
import { useField } from '../../../hooks/useField';
import auth from '../../../service/authService';

const Username = ({ setState }) => {
  const username = useField('text');
  const handleSelectUser = async (e) => {
    e.preventDefault();
    const guestObj = {
      username: username.value,
    };
    auth
      .guestLogin(guestObj)
      .then((loggedIn) => {
        if (loggedIn) {
          setState((prev) => ({
            ...prev,
            authorization: window.localStorage.getItem('authorization'),
            username: window.localStorage.getItem('username'),
            currentUser: window.localStorage.getItem('userID'),
            guest: window.localStorage.getItem('guest'),
          }));
        }
      });
  };

  return (
    <div className="usernameLogin">
      <form>
        <input
          placeholder="username"
          {...username}
          reset={undefined}
          onKeyPress={(e) => (e.key === 'Enter' ? handleSelectUser(e) : null)}
        />
      </form>
    </div>
  );
};

export default Username;
