import React from 'react';
import Header from '../Components/Header';
import Toast from '../Components/Toast';

const MainWrapper = props => {
    const { children } = props;


    return  <>


     <div id="app" className="container width100">
    <main>
<Toast/>
    <Header/>{children}
    {/* {loginState && loginState.isLoggedIn ? (<>
     <Header/>{children}</>):children} */}
    </main>
  </div>
    </>}

    export default MainWrapper
