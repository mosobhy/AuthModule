
export class BaseResponseDto<TRes> {
    data : TRes;
    statusCode: number;
    message: string;
}