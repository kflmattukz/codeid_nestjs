import { Test, TestingModule } from '@nestjs/testing';
import { JhService } from './jh.service';

describe('JhService', () => {
  let service: JhService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JhService],
    }).compile();

    service = module.get<JhService>(JhService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
