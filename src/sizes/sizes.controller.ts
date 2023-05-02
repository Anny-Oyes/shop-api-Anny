import { Body, Controller, Get, Post, Patch, ParseUUIDPipe } from "@nestjs/common";
import { Delete, Param } from "@nestjs/common/decorators";
import { CreateShirtDto } from "./dto/shirts.dto";
import { SizeService } from "./sizes.service";

@Controller('shirts')

export class SizeController {
    constructor(
        private readonly shirtServiceRepo: SizeService
    ) { }
    @Post()
    create(@Body() shirtDto: CreateShirtDto) {
        return this.shirtServiceRepo.create(shirtDto);
    }

    @Get()
    findAll() {
        return this.shirtServiceRepo.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id', ParseUUIDPipe) id: string) {
        return this.shirtServiceRepo.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.shirtServiceRepo.remove(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateShirtDto: CreateShirtDto
    ) {
        return this.shirtServiceRepo.update(id, updateShirtDto);
    }
}