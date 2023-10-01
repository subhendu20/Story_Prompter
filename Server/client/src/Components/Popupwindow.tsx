import React, { FormEvent } from 'react'
import './css/Popupwindow.css'
import axios from 'axios'
import $ from 'jquery'
import { useDispatch } from 'react-redux';
import {increment} from '../Action';
interface starr {
          addline: boolean,
          addstory: boolean,

}


const Popupwindow: React.FC = () => {
          const dispatch = useDispatch();
          const [statusarr, setstatusarr] = React.useState<starr>({
                    addline: true,
                    addstory: false,

          })
          const [command, setcommand] = React.useState<string>('')
          const [story, setstory] = React.useState<string>('')


          const add_line = (e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault()
                    axios.post('http://localhost:7001/story/generatestory', { command }, {
                              withCredentials: true
                    }).then((res) => {

                              setstory(res.data)

                              setstatusarr({
                                        addline: false,
                                        addstory: true,


                              })

                    }).catch((e) => {
                              console.log(e)
                    })


          }
          const add_story = (e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault()
                    axios.post('http://localhost:7001/story/addstory', { story }, {
                              withCredentials: true
                    }).then(() => {
                              dispatch(increment())
                              setstatusarr({
                                        addline: true,
                                        addstory: false,


                              })
                              setcommand('')
                              setstory('')
                              $('.story-det').val('')
                              $('#float-window').toggleClass('none')
                              $('#post-window').toggleClass('back-blur')

                    }).catch((e) => {
                              console.log(e)
                    })



          }





          return (
                    <React.Fragment>
                              <h1 id='p-head'>Add keywords and Create your own story</h1>
                              {(statusarr.addline) && <form className='form-add-story' onSubmit={add_line}>
                                        <h3>Enter your desires ,we'll create for you!</h3>
                                        <input type="text" className='story-det' name='line' required min={10} onChange={(e) => {
                                                  setcommand(e.target.value)
                                        }} />
                                        <button type='submit'>Generate story</button>

                              </form>}
                              {(statusarr.addstory) && <form className='form-add-story' onSubmit={add_story}>
                                        <h3>Edit your story and save it</h3>
                                        <textarea name="body" cols={30} rows={10} className='story-det' value={story} required onChange={(e) => {
                                                  setstory(e.target.value)
                                        }}></textarea>
                                        <button type='submit'>Upload</button>

                              </form>}
                              


                    </React.Fragment>
          )
}

export default Popupwindow
