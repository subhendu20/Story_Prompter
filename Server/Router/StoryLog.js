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




router.use(cookie());
router.use(cors({
    origin: 'http://127.0.0.1:5173',
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
    credentials: true
}));


const generateStory = async (text) => {
    var keyArray = await text.split(" ")
    console.log(keyArray)
    return keyArray



    // var myHeaders = await new Headers();
    // await myHeaders.append("apikey", "l04ZrNgLIHsCZy1IcXPYSMbL9toqbgu8");

    // var raw = text;

    // var requestOptions = {
    //     method: 'POST',
    //     redirect: 'follow',
    //     headers: myHeaders,
    //     body: raw
    // };

    // fetch("https://api.apilayer.com/keyword", requestOptions)
    //     .then(response => 
    //         response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));


}



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


        const keyList = await generateStory(command);
        res.send({
            "story": command,
            "keys": keyList
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});






//-------------------------------------------add story-------------------------------------------------------------//


router.post('/addstory', async (req, res) => {
    const { story, keys } = req.body


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
            console.log(`${req.body}`)
            const find = await user.findById(check)

            const newstory = await new Story({
                userId: check,
                body: story,
                username: find.name,
                upVote: [],
                keyWord: keys
            })


            newstory.save().then(() => {



                res.send(newstory)

            }).catch((e) => {

            })

        }




    } catch (error) {

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

    const getcookie = await req.cookies.signintoken
    if (!getcookie) {

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