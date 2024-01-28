import { BaseRequestDto } from "../DTOs/Bases/BaseRequestDto"
import { BaseResponseDto  } from "../DTOs/Bases/BaseResponseDto"

export interface IBaseUseCase<TReq, TRes> {
    
    Handle(req: BaseRequestDto<TReq>): Promise<BaseResponseDto<TRes>> 
}