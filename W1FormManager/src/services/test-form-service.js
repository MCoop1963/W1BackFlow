/* eslint-disable class-methods-use-this */
import { apiService } from './api';

class TestFormService {
  fetchSubmissionToken(notificationId) {
    return apiService({
      method: 'get',
      url: `TestNotificationSet('${notificationId}')`,
      headers: { 'X-CSRF-Token': 'Fetch' },
    });
  }

  submitForm(data, token) {
    return apiService({
      method: 'put',
      url: "TestFormSet('AN')",
      headers: { 'X-CSRF-Token': token },
      data,
    });
  }

  removeAssembly(notificationId, data, token) {
    const removingData = data;
    removingData.TestType = 'RM';

    return apiService({
      method: 'put',
      url: `TestFormSet('${notificationId}')`,
      headers: { 'X-CSRF-Token': token },
      data: removingData,
    });
  }
}

export const testFormService = new TestFormService();
