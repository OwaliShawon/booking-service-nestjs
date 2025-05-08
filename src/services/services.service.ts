import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    try {
      return await this.serviceRepo.save(createServiceDto);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create service',
        error.message,
      );
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      return await this.serviceRepo.find({
        skip: (page - 1) * limit,
        take: limit,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch services',
        error.message,
      );
    }
  }

  async findOne(id: number) {
    try {
      const service = await this.serviceRepo.findOneBy({ id });
      if (!service) {
        throw new NotFoundException(`Service with ID ${id} not found`);
      }
      return service;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException(
            'Failed to fetch service',
            error.message,
          );
    }
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      const result = await this.serviceRepo.update(id, updateServiceDto);
      if (result.affected === 0) {
        throw new NotFoundException(`Service with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException(
            'Failed to update service',
            error.message,
          );
    }
  }

  async remove(id: number) {
    try {
      const result = await this.serviceRepo.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Service with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException(
            'Failed to delete service',
            error.message,
          );
    }
  }
}
