import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  private readonly logger = new Logger('ClientsService');
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRespository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const query = 'CALL add_client(?, ?, ?, ?)';
    const parameters = [
      createClienteDto.nombre,
      createClienteDto.tipo_identificacion,
      createClienteDto.numero_identificacion,
      createClienteDto.genero,
    ];

    try {
      await this.clienteRespository.query(query, parameters);
      return {
        message: 'Creacion Satifactoria',
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const result = await this.clienteRespository.query('CALL list_client');
    return result[0];
  }

  async findOne(id: number) {
    const query = 'CALL list_id_client(?)';
    const parameters = [id];

    try {
      const result = await this.clienteRespository.query(query, parameters);
      return result[0];
    } catch (error) {
      console.log(`Error al llamar el SP`);
    }
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const query = 'CALL update_client(?, ?, ?, ?, ?)';
    const parameters = [
      id,
      updateClienteDto.nombre,
      updateClienteDto.tipo_identificacion,
      updateClienteDto.numero_identificacion,
      updateClienteDto.genero,
    ];

    try {
      await this.clienteRespository.query(query, parameters);
      return {
        message: 'Actualizacion Satifactoria',
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number, eliminado: number) {
    const query = 'CALL delete_client(?, ?)';
    const parameters = [id, eliminado];

    try {
      await this.clienteRespository.query(query, parameters);
      return {
        message: 'Eliminacion Satifactoria',
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === 'ER_DUP_ENTRY')
      throw new BadRequestException(error.sqlMessage);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
