import {Component} from 'react'

import Navbar from '../Navbar'

import './index.css'

class Home extends Component {
  render() {
          return (
            <>
              <Navbar />
              <div className='home-container'>
                <h1 className='home-page-text'>Welcome to the Dashboard</h1>
              </div>
            </>
            )
        }
}



export default Home
