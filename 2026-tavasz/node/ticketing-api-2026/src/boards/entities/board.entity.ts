import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class Board {
  @IsNumber()
  @Min(1)
  id: number = 0;

  @IsString()
  @IsNotEmpty()
  title: string = '';

  @IsDate()
  createdAt: Date = new Date();
}
