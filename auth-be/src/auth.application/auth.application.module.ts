import { Module } from '@nestjs/common';
import { AuthDomainModule } from 'src/auth.domain/auth.domain.module';
import { AuthInfrastructureModule } from 'src/auth.infrastructure/auth.infrastructure.module';
import { AuthSharedModule } from 'src/auth.shared/auth.shared.module';

@Module({
    imports: [
        AuthSharedModule,
        AuthDomainModule,
        AuthInfrastructureModule
    ]
})
export class AuthApplicationModule {}
