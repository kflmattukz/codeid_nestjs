import { Test, TestingModule } from '@nestjs/testing';
import { JhController } from './jh.controller';

describe('JhController', () => {
  let controller: JhController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JhController],
    }).compile();

    controller = module.get<JhController>(JhController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
