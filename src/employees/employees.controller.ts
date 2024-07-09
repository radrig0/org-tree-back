import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeeService.getList();
  }

  @Post()
  create(@Body() employee: Employee): Promise<Employee> {
    return this.employeeService.create(employee);
  }

  @Patch(':id')
  update(
    @Param() params: { id: string },
    @Body() fields: { parentId: number },
  ): Promise<Employee> {
    console.log('send:', params.id, fields.parentId);
    return this.employeeService.updateParentId(
      Number(params.id),
      fields.parentId,
    );
  }

  @Get(':id')
  findOne(@Param() params: { id: string }): Promise<Employee | null> {
    return this.employeeService.getById(Number(params.id));
  }

  @Delete(':id')
  delete(@Param() params: { id: string }): Promise<void> {
    return this.employeeService.remove(Number(params.id));
  }
}
