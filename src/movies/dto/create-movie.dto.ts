import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {
  // class 내에서 타입 유효성 검증 
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })

  readonly genres: string[];
}