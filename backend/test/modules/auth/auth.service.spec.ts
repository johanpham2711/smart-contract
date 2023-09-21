import { Test, TestingModule } from '@nestjs/testing';

//@ts-ignore
import { AuthService } from '../../../src/modules/auth/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    console.log('test');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
