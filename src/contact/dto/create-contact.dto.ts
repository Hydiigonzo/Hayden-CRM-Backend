
import { IsString, IsEmail, IsOptional, IsArray, IsInt } from 'class-validator';

export class CreateContactDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  phone?: string;
  @IsOptional()
  @IsString()
  address?: string;
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  companyIds?: number[]; 
}
