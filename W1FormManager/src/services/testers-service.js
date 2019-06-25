/* eslint-disable class-methods-use-this */
import { apiService } from './api';

class TestersService {
  findTesterByCertificationId(id) {
    return apiService.get(`TesterSet('${id}')`);
  }
}

export const testersService = new TestersService();
