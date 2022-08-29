import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppService } from './app.service';
import * as xml2js from 'xml2js';
import * as fs from 'fs';
import * as util from 'util';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename(req, file, callback) {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    console.log('file ', file);

    return this.myPrivateParser(file);
  }
  myPrivateParser(file) {
    const parser = new xml2js.Parser();
    fs.readFile(`${file.destination}/${file.filename}`, function (err, data) {
      parser.parseString(data, function (err, result) {
        console.log(util.inspect(result, false, null));
        return result;
        console.log('Done');
      });
    });
  }
}
