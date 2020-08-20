import React, { Component } from 'react';
import Image from "react-bootstrap/Image";
import Firebase from '../images/firebase.png'
import Css from '../images/css.png'
import Material from '../images/material.png'
import Reactjs from '../images/react.png'
import ContactPage from './ContactPage'

class AboutPage extends Component {
  render() {
    return (
        <div className='about'>
       <h1>About The Creator</h1>
       <p>My name is Ishmaeel Elie Elijah From Cape town south African...
         I created a Istagram Clone as part of my school project and it is not a full clone but only with certain things that i have made within this app
         This web app was made with the following Technologies:
       </p>
    
    <div className="image1">
    <Image src={Firebase}  roundedCircle />
   <Image src={Css} roundedCircle />
  <Image src={Material} roundedCircle />
  <Image src={Reactjs} roundedCircle />
  </div>
  
      <ContactPage/>
        </div>
    );
  }
}

export default AboutPage;