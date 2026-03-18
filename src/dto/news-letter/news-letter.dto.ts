import { Type } from "class-transformer";
import {
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";

export class CreateNewsLetterDto {
  @IsEmail()
  @MaxLength(255)
  email!: string;
}

export class NewsLetterTemplateDto {
  @IsInt()
  @Min(1)
  recruitedCount!: number;

  @IsArray()
  @MinLength(2, { each: true })
  destinationCountries!: string[];

  @IsOptional()
  @IsString()
  @MaxLength(150)
  companyName?: string;
}

export class SendNewsletterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  subject!: string;

  @ValidateNested()
  @Type(() => NewsLetterTemplateDto)
  template!: NewsLetterTemplateDto;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  fromName?: string;
}
