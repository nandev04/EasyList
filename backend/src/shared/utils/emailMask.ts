const emailMask = (email: string) => {
  const [localPart, domain] = email.split('@');

  if (localPart.length <= 3) {
    return `${'*'.repeat(localPart.length) + '@' + domain}`;
  }

  const visible = localPart.slice(0, 3);

  return `${visible + '*'.repeat(localPart.length - 3) + '@' + domain}`;
};

export default emailMask;
