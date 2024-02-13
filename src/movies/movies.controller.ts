import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Movie } from "./entities/movie.entity";
import { MoviesService } from "./movies.service";
import {
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Patch,
  Body,
  Query,
} from "@nestjs/common";

@Controller("movies")
export class MoviesController {
  // express 처럼 import 해주는 것이 아니라 controller 내에서 요청
  constructor(private readonly MoviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.MoviesService.getAll();
  }

  @Get("search")
  search(@Query("year") searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  @Get(":id")
  getOne(@Param("id") movieId: number): Movie {
    return this.MoviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.MoviesService.create(movieData);
  }

  @Delete(":id")
  remove(@Param("id") movieId: number) {
    return this.MoviesService.deleteOne(movieId);
  }

  @Patch(":id")
  path(@Param("id") movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.MoviesService.update(movieId, updateData);
  }
}
