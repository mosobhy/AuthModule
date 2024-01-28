import { Controller, Get } from "@nestjs/common";


@Controller("Home")
export class HomeController {

    @Get('GetWelcomeMessage')
    async GetWelcomeMessage() {
        return {
            data: {
                content: "Welcome to the application!"
            },
            statusCode: 200,
            message: "Success"
        }
    }
}