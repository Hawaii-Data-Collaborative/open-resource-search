import { getAppConfigValue } from '@util/getAppConfigValue';
import axios from 'axios';

let user;

function init() {
  const rawUser = window.localStorage.getItem('analyticsUser');
  if (rawUser) {
    user = JSON.parse(rawUser);
  } else {
    user = { id: `user_${Date.now()}` };
    localStorage.setItem('analyticsUser', JSON.stringify(user));
  }
}

export function logEvent(eventName, data) {
  if (!user) {
    init();
  }

  window.gtag('event', eventName, data);

  const url = `${getAppConfigValue('apiUrl')}/api/v1/user-activity`;
  axios.post(url, { userId: user.id, event: eventName, data });
}
