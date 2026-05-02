export type namesTemplates =
  | 'emailChangeConfirmation'
  | 'emailChangeNotice'
  | 'forgotPassword'
  | 'verifyAccount';

export type EmailTemplates = {
  emailChangeConfirmation: {
    email: string;
    code: string;
  };

  emailChangeNotice: {
    oldEmail: string;
    newEmail: string;
    changeDate: string;
  };

  forgotPassword: {
    code: string;
  };

  verifyAccount: {
    verificationLink: string;
  };
};
