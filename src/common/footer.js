import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component{

    render(){
        return(
            <>
              <div className="pos_abs">
                  <ul className="text_icons">
                     <li><a href="https://play.google.com/store/apps/details?id=com.eduvanzapplication" target="_blank" className="getappsty">
                      Get our App <img src="images/icons/app-icon.png" />
                    </a>
                    </li> 
                    <li>
                    <Link to="" className="getappsty">
                      Help <img src="images/icons/qustionmark.png" />
                    </Link>
                  </li>
                </ul>
              </div>
            </>
        )
    }
}

export default Footer;