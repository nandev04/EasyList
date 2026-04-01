import emailMask from './emailMask.js';

describe('Mask email', () => {
  test('Should return mask email, showing 3 local part characters and domain', async () => {
    const emailTest = 'exemplo.teste@gmail.com';
    const emailTest2 = 'exem@gmail.com';
    const expectReturn = 'exe**********@gmail.com';
    const expectReturn2 = 'exe*@gmail.com';

    const emailMasked = emailMask(emailTest);
    const emailMasked2 = emailMask(emailTest2);

    expect(emailMasked).toEqual(expectReturn);
    expect(emailMasked2).toEqual(expectReturn2);
  });

  test('Should return mask email, hiding everything because the local part is less than or equal 3', async () => {
    const expectReturnTwo = '**@gmail.com';
    const expectReturnThreeCharacters = '***@gmail.com';

    const emailMaskedTwo = emailMask(expectReturnTwo);
    const emailMaskedThree = emailMask(expectReturnThreeCharacters);

    expect(emailMaskedTwo).toEqual(expectReturnTwo);
    expect(emailMaskedThree).toEqual(expectReturnThreeCharacters);
  });
});
