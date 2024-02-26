import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Session,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { loginDto } from './dto/login.dto';
import { SessionGuard } from './session.guard';
import { UserListService } from './user-list.service';
@Controller('user')
export class UserListController {
  constructor(private readonly userListService: UserListService) {}
  @UsePipes(new ValidationPipe())
  @Post('/insert')
  create(@Body() createUserListDto: CreateUserListDto) {
    return this.userListService.create(createUserListDto);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  @Get('/get')
  findAll() {
    return this.userListService.findAll();
  }
  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  @Get('/get/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userListService.findOne(+id);
  }
  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  @Put('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() createUserListDto: CreateUserListDto,
  ) {
    return this.userListService.update(+id, createUserListDto);
  }
  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userListService.remove(+id);
  }
  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  @Post('/sendemail')
  sendEmail(@Body() mydata) {
    return this.userListService.sendEmail(mydata);
  }
  @Post('/signup')
  @UseInterceptors(
    FileInterceptor('myfile', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  signup(
    @Body() mydto: CreateUserListDto,

    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 160000 }),
          new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    mydto.filename = file.filename;
    console.log(file);
    return this.userListService.signup(mydto);
  }
  @Get('/signin')
  signin(@Session() session, @Body() mydto: loginDto) {
    if (this.userListService.signin(mydto)) {
      session.email = mydto.email;

      console.log(session.email);
      return { message: 'success' };
    } else {
      return { message: 'invalid credentials' };
    }
  }
  @Get('/signout')
  signout(@Session() session) {
    if (session.destroy()) {
      return { message: 'you are logged out' };
    } else {
      throw new UnauthorizedException('invalid actions');
    }
  }
}
