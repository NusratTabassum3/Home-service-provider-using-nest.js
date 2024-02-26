import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedBackDto {
  @IsInt({ message: 'Id should be integer' })
  @IsNotEmpty({ message: 'Id is required' })
  id: number;
  @IsInt({ message: 'rating should be integer' })
  @IsNotEmpty({ message: 'rating is required' })
  rating: number;

  @IsString({ message: 'comment Should be string' })
  @IsNotEmpty({ message: 'comment is required' })
  comment: string;

  ServiceId: number;
}
