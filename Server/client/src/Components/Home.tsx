import React from 'react'
import './css/Home.css'
import Post from './Post'
import Popupwindow from './Popupwindow'
import $ from 'jquery'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { selectStatus,selectCount } from '../Action';

interface MyObject {
          _id: string;
          userId: string;
          username:string;
          body:string;
          upVote:[string],
          keyword:[string]

          
        }

const Home: React.FC = () => {
          const logStatus = useSelector(selectStatus);
          const count = useSelector(selectCount)

          const [storylist,setstorylist]=React.useState<MyObject[]>([])

          React.useEffect(()=>{
                    axios.get('http://localhost:7001/story/getstories', {
                              withCredentials: true
                    }).then((res)=>{
                              
                              setstorylist(res.data)
                    }).catch((e)=>{
                              console.log(e)
                    })

          },[logStatus,count])


          return (
                    <React.Fragment>
                              <div id="float-window" className='none'>
                                        <i className='bx bx-x' id='cls-pop' onClick={() => {
                                                  $('#float-window').toggleClass('none')
                                                  $('#post-window').toggleClass('back-blur')
                                        }}></i>
                                        <Popupwindow />
                              </div>
                              <main id='post-window' className=''>

                                        {(storylist.length!==0)?storylist.map((e)=>{
                                                  return <Post key={e._id} data={e}/>
                                        }):<p>No Story</p>}

                              </main>
                    </React.Fragment>
          )
}

export default Home
