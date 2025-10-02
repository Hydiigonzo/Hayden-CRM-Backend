
import { IsString, IsNumber, IsInt, IsArray } from 'class-validator';

export class CreateDealDto {
  @IsString()
  title: string;
  @IsString()
  stage: string;
  @IsNumber()
  amount: number;
  @IsInt()
  companyId: number;    
  @IsArray()
  @IsInt({ each: true })
  contactIds: number[];
}
