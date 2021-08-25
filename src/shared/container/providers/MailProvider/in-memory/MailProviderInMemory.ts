/* eslint-disable @typescript-eslint/no-explicit-any */
import TemplateVariablesDTOInterface from '../../../../../modules/accounts/dtos/TemplateVariablesDTOInterface';
import MailProviderInterface from '../MailProviderInterface';

export default class MailProviderInMemory implements MailProviderInterface {
  private message: any[];

  constructor() {
    this.message = [];
  }

  async sendMail(
    to: string,
    subject: string,
    variables: TemplateVariablesDTOInterface,
    path: string
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}
