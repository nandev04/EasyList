export type namesTemplates =
  | 'otpChangeEmail'
  | 'emailChangeNotification'
  | 'otpForgotPassword'
  | 'accountVerification';

export type EmailTemplates = {
  otpChangeEmail: {
    newEmail: string;
    code: string;
  };

  emailChangeNotification: {
    oldEmail: string;
    maskedNewEmail: string;
    changeDate: string;
  };

  otpForgotPassword: {
    code: string;
  };

  accountVerification: {
    verificationLink: string;
  };
};
