import { Module } from '@nestjs/common';
import { AuthDomainModule } from 'src/auth.domain/auth.domain.module';

@Module({
    imports: [
        AuthDomainModule
    ]
})
export class AuthInfrastructureModule {}
