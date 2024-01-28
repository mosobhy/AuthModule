import { plainToInstance, Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { RegisterRequestDto } from '../Requests/RegisterRequestDto';
import { LoginRequestDto } from '../Requests/LoginRequestDto';


export class BaseRequestDto<TReq> {
  @IsDefined()
  @ValidateNested()
  @Type(() => Object)
  data: TReq;

//   constructor(data: TReq) {
//     this.data = plainToClass<TReq, BaseRequestDto<TReq>>(Object, data, {
//       excludeExtraneousValues: true,
//     });
//   }
}