import { Controller, Post,Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { JwtPayLoad } from './dto/jwt-payload.interface';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from './get-user.decorator'
@Controller('auth')
export class AuthController {
constructor(private authService: AuthService){}

@Post('/signup')
signUp(@Body(ValidationPipe) authCredentialDto:AuthCredentialsDto): Promise<void>{
   return this.authService.signUp(authCredentialDto);
}

@Post('/signin')
signIn(@Body(ValidationPipe) authCredentialDto:AuthCredentialsDto): Promise<{accessToken: string}>{
   return this.authService.signIn(authCredentialDto);
}

@Post('/test')
@UseGuards(AuthGuard())
test(@getUser() req){
   console.log(req);
}

}
