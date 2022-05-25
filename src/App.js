import logo from './logo.svg';
import './App.css';
import Cookies from 'js-cookie';
import React from 'react';
// import { render } from '@testing-library/react';

function App() {
  const generateRedirection=async(resp)=>{
    const value = await resp.json();
    // const data = JSON.parse(value);
    console.log(value);
    window.location.href = value['redirect-url'];
}
  const [valid, setvalid] = React.useState(false);
  const [result,setresult] = React.useState('');
  const [saml_req,setsaml_req] = React.useState('');
  const [redirect_url,setredirect_url] = React.useState('');
  const handleClick = async (e) => {
    e.preventDefault();
    console.log('Clicked');
            var myHeaders = new Headers();
            var cookie = Cookies.get('cookie_frontend');
            console.log(cookie);
            myHeaders.append("Access-Control-Allow-Origin","*")
            // myHeaders.append("Cookie", "cookie_frontend=Ijc0NWU5ODNmMWZiMDQ5YjQ5OTNkMTQ1NWUwNDE4M2ZiIg.Yo4F_g.dYuo2FbSEIBijBz4h0Y2EKALE94;");
            myHeaders.append("Content-Type", "application/json");
            // console.log(myHeaders);
            // myHeaders.append("Cookie", "cookie=IjFkNWU1ZjJkMGRlZTRiYzFiZWRlNWQ0ZTUxMmEwM2QzIg.YiSH9A.81I7pl2pAjbrZgpwzv7772yg9WU");

            var requestOptions = {
              credentials: 'include',
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify({
                "email": "syed@gmail.com",
                "password": "admin"
            })
            };

            fetch("http://18.134.217.103/api/v1/login", requestOptions)
            .then(response => response.json()
            )
            .then(result => {
                console.log(result)
                // console.log(result.status)
                if (result.statuscode === 307) {
                  setredirect_url(result['redirect_url']);
                  setsaml_req(result['saml_response']);
                  setvalid(true);
                }
                
                // setresult(result);
                // generateRedirection(result);
      
                
                  
                
          
                
                // document.body.innerHTML = result;
                
                
               
            })
            // .then(response => response.text())
            // .then(response =>{
            //     console.log(response)
            // })
            .catch(error => console.log('error', error));
                
  }
  // React.useEffect(() => {
  //   if (valid === true) {

  if (valid === true){
    
    return(
      <>
                
                <form action={redirect_url} method="post">
                        <input type="hidden" name="SAMLResponse" value={saml_req}/>
                        <input type="hidden" name="RelayState" value="/whoami"/>
                        {/* <noscript> */}
                          <input type="submit" value="Continue"/>
                        {/* </noscript> */}
                  </form>
                
      </>

      
      );
  }
  else{
    return (
      <div className="App">
        <form onSubmit={handleClick}>
          <input type="email" placeholder="Enter your name" />
        
          <input type="password" placeholder="Enter your password" />
        
        
          <input type="submit"/>
        </form>
      </div>
    );
  }

}

export default App;
