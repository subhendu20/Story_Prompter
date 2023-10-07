import React from 'react'
import './css/Book.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { increment } from '../Action';

interface DataProps {
          data: {
                    _id: string,
                    name: string,
                    author: string,
                    pages: number,
                    image: string,
                    description: string,
                    published: string,
                    publication: string,
                    price: number,

          };
}





const Book: React.FC<DataProps> = ({ data }) => {
          const dispatch = useDispatch();



          const buy=()=>{
                    axios.post('http://localhost:7001/books/buybook',data,{
                              withCredentials:true
                    }).then(()=>{

                    }).catch((e)=>{
                              console.log(e)

                    })

          }


          const addCart=()=>{
                    axios.post('http://localhost:7001/books/addtocart',{bookid:data._id,bookname:data.name,author:data.author,image:data.image},{
                              withCredentials:true
                    }).then(()=>{
                              dispatch(increment())
                              
                    }).catch((e)=>{
                              console.log(e)
                    })
          }

          return (
                    <div className='books'>
                              <h2>{data.name}</h2>
                              <h3>{data.author}</h3>
                              <img src={data.image} alt="loading" />
                              <p>{data.description}</p>
                              <span><p>{data.publication}</p><p>{data.published}</p><p>{data.pages}</p></span>
                              <h2 className='price-tag'>{data.price}</h2>
                              <span className="buy-buttons">
                                        <button onClick={buy} className="buy-book">
                                                  Buy now
                                        </button>
                                        <button onClick={addCart} className="add-cart-button">
                                                  Add to cart
                                        </button>

                              </span>


                    </div>
          )
}

export default Book
