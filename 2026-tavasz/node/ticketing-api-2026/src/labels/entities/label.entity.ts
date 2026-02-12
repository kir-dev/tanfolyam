import {
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class Label {
  @IsNumber()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsHexColor()
  color: string;
}
