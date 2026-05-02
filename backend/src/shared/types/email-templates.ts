export type namesTemplates =
  | 'otpChangeEmail'
  | 'emailChangeNotification'
  | 'otpForgotPassword'
  | 'accountVerification';

export type EmailTemplates = {
  otpChangeEmail: {
    email: string;
    code: string;
  };

  emailChangeNotification: {
    oldEmail: string;
    newEmail: string;
    changeDate: string;
  };

  otpForgotPassword: {
    code: string;
  };

  accountVerification: {
    verificationLink: string;
  };
};
