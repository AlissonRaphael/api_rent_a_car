import TemplateVariablesDTOInterface from '../../../../modules/accounts/dtos/TemplateVariablesDTOInterface';

export default interface MailProviderInterface {
  sendMail(
    to: string,
    subject: string,
    variables: TemplateVariablesDTOInterface,
    path: string
  ): Promise<void>;
}
