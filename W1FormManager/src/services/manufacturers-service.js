/* eslint-disable class-methods-use-this */
import { apiService } from './api';

class ManufacturersService {
  getAll() {
    return apiService.get('ManufacturerSet');
  }

  getModels() {
    return apiService.get('ModelNumberSet');
  }
}

export const manufacturersService = new ManufacturersService();
