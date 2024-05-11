import dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcrypt';
import cors from 'cors'
import express from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken';
import { getDbConnection, initializeDbConnection } from './dbConn.js';
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors())
const generateSecretKey = () => {
    const length = 32; // 256 bits
    return crypto.randomBytes(length).toString('hex');
};

function run() {
  initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
}
// Endpoints
app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.post("/api/login",async (req, res) => {

    const { email, password } = req.body;

    const db = getDbConnection(process.env.API_DB_NAME);

    const user = await db.collection('users').findOne({ email })

    if (!user) {
        res.sendStatus(401);
        return;
    }

    const { _id: id, isEmailVerified, passwordHash, apiVersion, username } = user;

    const isCorrect = await bcrypt.compare(password, passwordHash);

    if (isCorrect) {
        jwt.sign(
            {
                id,
                isEmailVerified,
                email,
                username,
                apiVersion
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.API_LOGIN_PERIOD
            }, (err, token) => {
                if (err) {
                    res.status(500).json(err);
                    return;
                }
                res.status(200).json({ token });
            }
        )
    } else {
        res.sendStatus(401);
    }

})

app.post("/api/signup",async (req, res) => {
    const { username, email, password } = req.body;
    console.log(process.env.API_DB_NAME)
    const db = getDbConnection(process.env.API_DB_NAME);
    const user = await db.collection('users').findOne({ email });

    console.log(user)
    if (user) {
        res.sendStatus(409);
        return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.collection('users').insertOne({
        email,
        passwordHash,
        username,
        isEmailVerified: false,
        apiVersion: 1
    })

    const { insertedId } = result;

    console.log(insertedId);

    jwt.sign(
        {
            id: insertedId,
            email,
            username,
            isEmailVerified: false

        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.API_LOGIN_PERIOD
        },
        (err, token) => {

            if (err) {
                res.status(500).send(err);
                return;
            }

            res.status(200).json({ token });

        })

})

app.put("/api/create-website/:id",async (req, res) => {

    //get auth header from client
    const { authorization } = req.headers;
    const { id } = req.params;

    const getNewWebsite = ({
        websiteName
    }) => ({
        websiteName,
        author: id,
        published: false
    });


    const indexPage = {
        projectId: "",
        pageUri: "/index",
        pageName: "Home",
        projectAuthor: id,
        websiteSetting: {
            siteName: "My Website",
            favIco: "https://reactjs.org/favicon.ico",
            socialImage: "",
            desc: "Description for the webpage"
        },
        published: false,
        pageMode: 1,
        settigMode: -1,
        isDropEnabled: true,
        analyticsID: "",
        dropIndex: 0,
        fonts: [{
            "font": "Poppins",
            "weights": [
                "300",
                "regular",
                "700"
            ]
        }],
        elements: []
    }



    if (!authorization) {
        return res.status(401).json({ message: "No Authorization header sent." })
    }

    const token = authorization.split(" ")[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        async (err, decoded) => {
            if (err) return res.status(401).json({ message: "Unable to verify user" });

            const { id: _id } = decoded;

            if (id !== _id) {
                return res.status(403).json({ message: "Does not have privilage to create website" });
            }

            const db = getDbConnection(process.env.API_DB_NAME);

            let newWebsite = getNewWebsite(req.body);

            const website = await db.collection("websites").insertOne(newWebsite);

            const { insertedId: webId } = website;

            res.status(200).json({ message: "Website created", webId })

        }
    )


})

run()
