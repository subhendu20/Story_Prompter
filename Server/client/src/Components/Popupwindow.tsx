import React, { FormEvent } from 'react'
import './css/Popupwindow.css'
import axios from 'axios'
import $ from 'jquery'
import { useDispatch } from 'react-redux';
import { increment } from '../Action';
interface starr {
          addline: boolean,
          addstory: boolean,

}

interface storyList {
          story: string,
          keys: [string] | []
}


const Popupwindow: React.FC = () => {
          const dispatch = useDispatch();
          const [statusarr, setstatusarr] = React.useState<starr>({
                    addline: true,
                    addstory: false,

          })
          const [command, setcommand] = React.useState<string>('')
          const [storylist, setstorylist] = React.useState<storyList>({ story: '', keys: [] })


          const add_line = (e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault()
                    axios.post('http://localhost:7001/story/generatestory', { command }, {
                              withCredentials: true
                    }).then((res) => {

                              setstorylist({
                                        story: res.data.story,
                                        keys: res.data.keys
                              })

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
                    console.log(storylist)
                    axios.post('http://localhost:7001/story/addstory', { storylist }, {
                              withCredentials: true
                    }).then(() => {
                              dispatch(increment())
                              setstatusarr({
                                        addline: true,
                                        addstory: false,


                              })
                              setcommand('')
                              setstorylist({
                                        story: '', keys: []

                              })
                              $('.story-det').val('')
                              $('#float-window').toggleClass('none')
                              $('#post-window').toggleClass('back-blur')

                    }).catch((e) => {
                              console.log(e)
                    })



          }





          return (
                    <React.Fragment>
                              <h1 id='p-head'> Create your own story and Add keywords</h1>
                              {(statusarr.addline) && <form className='form-add-story' onSubmit={add_line}>
                                        <h3>Write a story</h3>
                                        <textarea  name='line' required  cols={30} rows={10} className='story-det' onChange={(e) => {
                                                  setcommand(e.target.value)
                                        }}></textarea>
                                        <button type='submit'>Generate story</button>

                              </form>}
                              {(statusarr.addstory) && <form className='form-add-story' onSubmit={add_story}>
                                        <h3>Add or remove your keywords</h3>
                                        <input className='story-det' name="body" min={10}  value={storylist.keys.map((e)=>{
                                                  return `#${e}`

                                        })} required onChange={(e) => {
                                                  setstorylist({...storylist,
                                                            story:e.target.value
                                                  })
                                        }}/>
                                        <button type='submit'>Upload</button>

                              </form>}



                    </React.Fragment>
          )
}

export default Popupwindow
