import fastify from "fastify"
import fastifyView from "@fastify/view"
import fastifyStatic from "@fastify/static"
import fastifyFormBody from "@fastify/formbody"
import fastifySecureSession from "@fastify/secure-session"
import ejs from "ejs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { createPost, listPosts, showPost } from "./actions/posts.js"
import { RecordNotFoundError } from "./errors/RecordNotFoundError.js"
import { NotAuthenticatedError } from "./errors/NotAuthenticatedError.js";
import { loginAction, logoutAction } from "./actions/auth.js"
import { readFileSync } from "node:fs"
import { chat, sendMessage } from "./actions/chat.js"
import { displayAllMsgs, sendNewMsg } from "./actions/messages.js"

const app = fastify()
const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
console.log(rootDir)

app.register(fastifyView, {
    engine: {
        ejs: ejs
    }
})

// Enregistrement du module de session encrypté
app.register(fastifySecureSession, {
    // On cré un cookie 'session' dans lequel on stock la clé
    cookieName: 'session',
    // Lecture de la clé de décodage à partir du fichier secret-key
    key: readFileSync(join(rootDir, 'secret-key')),
    cookie: {
      path: '/'
    }
})

app.register(fastifyStatic, {
    root: join(rootDir, 'public')
})
app.register(fastifyFormBody)

app.get('/', listPosts)
app.post('/', createPost)
app.get('/login', loginAction)
app.post('/login', loginAction)
app.post('/logout', logoutAction)
app.get('/article/:id', showPost)
app.get('/messages', displayAllMsgs)
app.post('/messages', sendNewMsg)
app.get('/chat', chat)
app.post('/chat', sendMessage)

app.setErrorHandler((error, req, res) => {
    if (error instanceof RecordNotFoundError) {
        res.statusCode = 404
        return res.view('templates/404.ejs', {
            error: 'Cet enregistrement n\'existe pas'
        })
    } else if (error instanceof NotAuthenticatedError) {
        return res.redirect('/login')
    }
    console.log(error)
    res.statusCode = 500
    return {
        error: error.message
    }
})

const start = async () => {
    try {
        await app.listen({port:3000})
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
start()
