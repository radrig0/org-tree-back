import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  create(employee: Employee): Promise<Employee> {
    const newEmployee = this.employeesRepository.create(employee);
    return this.employeesRepository.save(newEmployee);
  }

  getList(): Promise<Employee[]> {
    return this.employeesRepository.find();
  }

  getById(id: number): Promise<Employee | null> {
    return this.employeesRepository.findOne({ where: { id } });
  }

  async updateParentId(
    employeeId: number,
    newParentId: number | null,
  ): Promise<Employee> {
    const employee = await this.employeesRepository.findOne({
      where: { id: employeeId },
    });
    employee.parentId = newParentId;
    return this.employeesRepository.save(employee);
  }

  async remove(id: number): Promise<void> {
    // TODO: replace parentId to null for Entity.parentId === id
    await this.employeesRepository.delete(id);
  }
}
