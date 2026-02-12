import { OmitType } from '@nestjs/swagger';
import { Label } from '../entities/label.entity';

export class CreateLabelDto extends OmitType(Label, ['id']) {}
