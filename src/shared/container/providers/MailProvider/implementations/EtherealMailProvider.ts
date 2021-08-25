/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { injectable } from 'tsyringe';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

import MailProviderInterface from '../MailProviderInterface';
import TemplateVariablesDTOInterface from '../../../../../modules/accounts/dtos/TemplateVariablesDTOInterface';

@injectable()
export default class EtherealMailProvider implements MailProviderInterface {
  private client!: nodemailer.Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.error(err));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: TemplateVariablesDTOInterface,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: 'Locar <noreplay@locar.com',
      subject,
      html: templateHTML,
    });

    console.log(`Menssage sent: ${message.messageId}`);
    console.log(`Menssage sent: ${nodemailer.getTestMessageUrl(message)}`);
  }
}
