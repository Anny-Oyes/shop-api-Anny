import { IsString, IsNotEmpty, IsNumber, MinLength, IsArray, IsOptional } from "class-validator";

export class CreateShirtDto {
    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    sizes?: string[];
}