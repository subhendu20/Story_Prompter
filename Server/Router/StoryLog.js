const express = require('express');
const router = express.Router();
const cors = require('cors');
const user = require('../Schema/Users');
const Story = require('../Schema/Story');
const auth = require('bcryptjs');
const dotenv = require('dotenv').config();
const JWT = require('jsonwebtoken');
const cookie = require('cookie-parser');
const jwtoken = process.env.TOKEN;
const axios = require('axios');
const axiosRetry = require('axios-retry');

const API_KEY = process.env.APIKEY;
const ENGINE = 'text-davinci-003';
const MAX_TOKENS = 5;



router.use(cookie());
router.use(cors({
    origin: 'http://127.0.0.1:5173',
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
    credentials: true
}));


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateStoryWithRetry(prompt, retryCount = 0) {
    try {
        const response = await axios.post(
            `https://api.openai.com/v1/engines/${ENGINE}/completions`,
            {
                prompt: prompt,
                max_tokens: MAX_TOKENS
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                }
            }
        );

        return response.data.choices[0].text.trim();
    } catch (error) {
        if (error.response && error.response.status === 429) {
          console.log("hg")
          
            const waitTime = Math.pow(2, retryCount) * 1000; // Wait for 2^retryCount seconds
            await sleep(waitTime);
            return generateStoryWithRetry(prompt, retryCount + 1);
        } else if (error.response && error.response.status === 503) {
          console.log("fi")
           
            const retryAfter = parseInt(error.response.headers['retry-after']) || 1;
            await sleep(retryAfter * 1000); 
            return generateStoryWithRetry(prompt, retryCount);
        }
        throw error;
    }
}

axiosRetry(axios, { retries: 0, retryDelay: axiosRetry.exponentialDelay });



router.post('/generatestory', async (req, res) => {
    const { command } = req.body;

    const getcookie = await req.cookies.signintoken;
    if (!getcookie) {
        return res.status(400).send("you are logged out");
    }

    try {
        const check = await JWT.verify(getcookie, jwtoken);
        if (!check) {
            return res.send("you are logged out");
        }
        console.log(command)

        const story = await generateStoryWithRetry(command);
        res.send(story);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});






//-------------------------------------------add story-------------------------------------------------------------//


router.post('/addstory', async (req, res) => {
          const { story } = req.body


          try {
                    console.log(story)
                    const getcookie = await req.cookies.signintoken
                    if (!getcookie) {
                              return res.status(400).send("you are logged out")
                    }
                    const check = await JWT.verify(getcookie, jwtoken)
                    if (!check) {
                              return res.send("you are logged out")
                    }
                    else {
                              const find = await user.findById(check)
                              console.log(find)
                              const newstory = new Story({
                                        userId: check,
                                        body: story,
                                        username: find.name,
                                        upVote: []
                              })
                              console.log(newstory)

                              newstory.save().then(() => {

                                        console.log(newstory)

                                        res.send(newstory)

                              }).catch((e) => {
                                        console.log(e)
                              })

                    }




          } catch (error) {
                    console.log(error)
                    res.send(error)


          }



})

// --------------------------------------get all story--------------------------------------------------------//
router.get('/getstories', async (req, res) => {
          try {
                    const getcookie = await req.cookies.signintoken
                    if (!getcookie) {
                              return res.status(400).send("you are logged out")
                    }
                    const check = await JWT.verify(getcookie, jwtoken)
                    if (!check) {
                              return res.send("you are logged out")
                    }
                    else {
                              const stotylist = await Story.find({}).sort({ upVote: -1 });
                              res.send(stotylist);

                    }

          } catch (error) {
                    console.log(error)

          }
})


//----------------------------------------remove story-------------------------------------------------------------//
router.post('/removestory', async (req, res) => {




          const { email, password } = req.body
          const a = await user.findOne({ email })




          if (!a) {
                    return res.status(400).send("invalid Credentials")
          }
          const passwordcheck = await auth.compare(password, a.password)

          if (!passwordcheck) {
                    return res.status(400).send("invalid pasword")
          }

          const cookie = await JWT.sign(a.id, jwtoken)


          const cok = await res.cookie("signintoken", cookie).send("done")












})


// --------------------------------------------upvote---------------------------------------------- //

router.patch('/addvote/:id', async (req, res) => {
          console.log(req.cookies)
          const getcookie = await req.cookies.signintoken
          if (!getcookie) {
                    console.log(getcookie)
                    return res.status(400).send("Logged out")
          }

          const check = await JWT.verify(getcookie, jwtoken)
          if (!check) {
                    return res.send("you are logged out")
          }
          else {
                    const updatedStory = await Story.findByIdAndUpdate(
                              req.params.id,
                              { $push: { upVote: check } },
                              { new: true }
                    );

                    if (!updatedStory) {
                              return res.status(400).send('Error')
                    }
                    return res.send('added')

          }


})


// -------------------------------------------reducevote------------------------------------------------- //

router.patch('/reducevote/:id', async (req, res) => {
          const getcookie = await req.cookies.signintoken
          if (!getcookie) {
                    console.log(getcookie)
                    return res.status(400).send("Logged out")
          }

          const check = await JWT.verify(getcookie, jwtoken)
          if (!check) {
                    return res.send("you are logged out")
          }
          else {
                    const updatedStory = await Story.findByIdAndUpdate(
                              req.params.id,
                              { $pull: { upVote: check } },
                              { new: true }
                    );

                    if (!updatedStory) {
                              return res.status(400).send('Error')
                    }
                    return res.send('Removed')

          }


})


























module.exports = router;