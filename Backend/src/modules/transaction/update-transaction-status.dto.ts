import {IsIn} from 'class-validator';


export class UpdateTransactionStatusDto {
    @IsIn(['APPROVED', 'DECLINED'])
    status: 'APPROVED' | 'DECLINED';
}