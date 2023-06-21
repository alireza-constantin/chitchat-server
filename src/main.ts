import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import * as session from "express-session"
import * as passport from "passport"
import Redis from "ioredis"
import connectRedis from "connect-redis"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix("api")
    app.useGlobalPipes(new ValidationPipe())

    const redisClient = new Redis(process.env.REDIS_URL)

    redisClient.on("error", (err) =>
        console.error("Could not establish a connection with redis. " + err)
    )
    redisClient.on("connect", () => console.log("Connected to redis successfully"))

    const redisStore = new connectRedis({ client: redisClient, prefix: "chitchat" })

    app.use(
        session({
            store: redisStore,
            secret: process.env.COOKIE_SECRET,
            saveUninitialized: false,
            resave: false,
            cookie: {
                maxAge: 60 * 60 * 24, // 1day
            },
        })
    )

    app.use(passport.initialize())
    app.use(passport.session())

    const PORT = process.env.PORT || 8080
    try {
        await app.listen(PORT, () => console.log(`Server is Running on ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
bootstrap()
