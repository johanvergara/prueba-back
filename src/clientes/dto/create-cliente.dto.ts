import { IsNumber, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsNumber()
  public tipo_identificacion: number;

  @IsString()
  public numero_identificacion: string;

  @IsString()
  public nombre: string;

  @IsNumber()
  public genero: number;
}
