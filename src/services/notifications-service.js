/* eslint-disable class-methods-use-this */
import { apiService } from './api';

class NotificationsService {
  getNotification(id) {
    return apiService.get(`TestNotificationSet('${id}')`);
  }

  getByManufacturer(manufacturer, model, serial) {
    return apiService.get(`TestNotificationSet?$filter=Manufacturer eq '${manufacturer}' and ModelNo eq '${model}' and SerialNo eq '${serial}'`);
  }
}

export const notificationsService = new NotificationsService();
