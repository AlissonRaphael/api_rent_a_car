/* eslint-disable class-methods-use-this */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import DateProviderInterface from '../DateProviderInterface';

dayjs.extend(utc);

export default class DayjsDateProvider implements DateProviderInterface {
  dateNow(): Date {
    return dayjs().toDate();
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const endDateUTC = this.convertToUTC(end_date);
    const startDateUTC = this.convertToUTC(start_date);

    return dayjs(endDateUTC).diff(startDateUTC, 'hours');
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const endDateUTC = this.convertToUTC(end_date);
    const startDateUTC = this.convertToUTC(start_date);

    return dayjs(endDateUTC).diff(startDateUTC, 'days');
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hours').toDate();
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}
