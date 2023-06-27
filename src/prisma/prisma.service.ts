import { INestApplication, Injectable, OnModuleInit, Logger } from "@nestjs/common"
import { Prisma, PrismaClient } from "@prisma/client"
import { bgBlueBright } from 'chalk'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            log: [
                {
                    emit: "event",
                    level: "query",
                },
                {
                    emit: "event",
                    level: "error",
                },
                {
                    emit: "stdout",
                    level: "info",
                },
                {
                    emit: "stdout",
                    level: "warn",
                },
            ],
            errorFormat: "pretty",
        })
    }
    async onModuleInit() {
        await this.$connect()

        this.$on<any>('query', (e: Prisma.QueryEvent) => {
            console.log('------------------------ query ------------------------')
            console.log(bgBlueBright(`Prisma query took: ${e.duration} ms`))
            console.log(`Prisma query ${e.query}`)
        })
    }


    async enableShutdownHooks(app: INestApplication) {
        this.$on("beforeExit", async () => {
            await app.close()
        })
    }
}
