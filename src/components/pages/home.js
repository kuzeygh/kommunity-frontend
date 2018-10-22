import React from 'react';
import Header from '@/components/commons/header';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="home">
          hello world!
        </div>
      </div>
    );
  }
}

export default Home;
