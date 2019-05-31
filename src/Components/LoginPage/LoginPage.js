import React from 'react';

class LoginPage extends React.Component{
    state={ 
        loading: true,
        error: "",
        submitError: false,
        showMessage: false,
        username: null,
        password:null
    }
    
    onSubmit = (e) =>{
        e.preventDefault();
        let data={username:this.state.username,password:this.state.password}
        this.props.loginUser(data);
       
    }

    handleXClick = e => {
        this.setState({ showMessage: false, formSubmitted: false });
      };

    render(){
        return (
            <div>
                <h2 class="ui center aligned icon header">
                    <i className="user huge user circle icon " />  Login
    </h2>
                <form className="ui form">
                    <div className="field">
                        <label>User Name</label>
                        <input type="text"  id='username' placeholder="User Name" onChange={ e => this.setState({username : e.target.value})} />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" id='password'placeholder="Password" onChange={ e => this.setState({password: e.target.value})} />
                    </div>
                    <button className="ui secondary button" type="submit" onClick={this.onSubmit}>Submit</button>
                </form>
            </div>
        );
    }
    
}

export default LoginPage;