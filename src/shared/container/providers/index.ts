import { container } from 'tsyringe';

import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import MailProviderInterface from './MailProvider/MailProviderInterface';

import DateProviderInterface from './DateProvider/DateProviderInterface';
import DayjsDateProvider from './DateProvider/implementations/DayjsDateProvider';

container.registerInstance<MailProviderInterface>(
  'EtherealMailProvider',
  new EtherealMailProvider()
);

container.registerSingleton<DateProviderInterface>(
  'DayjsDateProvider',
  DayjsDateProvider
);
