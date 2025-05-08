import { Injectable } from '@nestjs/common';
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
    return await this.serviceRepo.save(createServiceDto);
  }

  findAll(page: number = 1, limit: number = 10) {
    return this.serviceRepo.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number) {
    return await this.serviceRepo.findOneBy({ id });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
