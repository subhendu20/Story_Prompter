import React from 'react'
import './css/Header.css'
import $ from 'jquery'


const Header: React.FC = () => {
          
          return (
                    <header>
                              <span className="logo">LOGO</span>
                              <nav>
                                        <ul>
                                                  <li onClick={() => {
                                                            $('#float-window').toggleClass('none')
                                                            $('#post-window').toggleClass('back-blur')

                                                  }}>Add Story  <i className='bx bxs-message-alt-add'  ></i></li>
                                                  <li>Liked  <i className='bx bxs-like' ></i></li>
                                                  <li onClick={() => {
                                                            $('#log-window').toggleClass('none')
                                                  }}>Log out  <i className='bx bx-log-out-circle'></i></li>
                                        </ul>
                              </nav>
                    </header>
          )
}

export default Header
