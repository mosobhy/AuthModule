import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/User';
import 'dotenv/config'

@Module({
    imports: [
        MongooseModule.forRoot(process.env.DATABASE_HOST),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ]
})
export class AuthDomainModule {}
