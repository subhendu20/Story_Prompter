import React from 'react'
import './css/post.css'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import {increment,decrement} from '../Action';

import $ from 'jquery'

interface PostProps {
          data: {
                    _id: string,
                    body: string;
                    userId:string;
                    username: string,
                    upVote: [string],
                    keyword:[string]

                    
          };
}


const Post: React.FC<PostProps> = ({data}) => {
          const dispatch = useDispatch();
  
          const [votes, setVotes] = React.useState<number>(data.upVote.length);

          const userId = sessionStorage.getItem('uid')??''
          const add_vote=()=>{
                    
                   
                    axios.patch(`http://localhost:7001/story/addvote/${data._id}`,{}, {
                              withCredentials: true
                    }).then(()=>{
                              setVotes(prevVotes => prevVotes + 1);
                             
                              $(`#novoted${data._id}`).toggleClass('bx-upvote bxs-upvote')
                              dispatch(increment())
                              

                    }).catch((e)=>{
                              console.log(e)
                    })
          
          }
          const remove_vote=()=>{
                
                    axios.patch(`http://localhost:7001/story/reducevote/${data._id}`,{},{
                              withCredentials: true
                    }).then(()=>{
                              setVotes(prevVotes => prevVotes - 1);
                              $(`#voted${data._id}`).toggleClass('bxs-upvote bx-upvote')
                              dispatch(decrement())
                              

                    }).catch((e)=>{
                              console.log(e)
                    })
                    
          }
          
         


          return (
                    <div className='post-box'>
                              <h2>{data.username}</h2>
                              <p>{data.body}</p>
                              <span className="keywords">
                              {
                                        (data.keyword.length>0) && data.keyword.map((e)=>{
                                                  return <a href="/" className='keys'>`#${e}`</a>

                                        })
                              }

                              </span>
                             

                              <span className="button">{(data.upVote.includes(userId))?<i className='bx bxs-upvote' id={`voted${data._id}`} onClick={remove_vote}></i>:<i className='bx bx-upvote' id={`novoted${data._id}`} onClick={add_vote}></i>}<p>{votes} Upvotes</p></span>
                    </div>
          )
}

export default Post
