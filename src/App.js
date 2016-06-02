import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

var App = function (props) {
  return (
    <div>
      <Header />
      <div className="container">
        {props.children}
      </div>
      <Footer />
    </div>
  )
}

export default App;