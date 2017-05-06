import React from "react";

class UserInfo extends React.Component {

  render() {
    let { user } = this.props;
    return (
      <div className='orgdown-userinfo'>
        <p><span className='pt-icon-standard pt-icon-refresh'></span> {user.name}</p>
      </div>
    )
  }
}

export default UserInfo;
