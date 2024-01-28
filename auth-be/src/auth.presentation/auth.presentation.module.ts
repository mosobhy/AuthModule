import { Module } from '@nestjs/common';
import { AuthApplicationModule } from 'src/auth.application/auth.application.module';
import { AuthSharedModule } from 'src/auth.shared/auth.shared.module';

@Module({
    imports: [
        AuthApplicationModule,
        AuthSharedModule
    ]
})
export class AuthPresentationModule {}
