export const limitTelInput = (maxLength: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
  if (value.length > maxLength) {
    event.target.value = value.slice(0, maxLength);
    return;
  }
  if (/\D/g.test(value)) {
    const _value = value.replace(/\D/g, '');
    event.target.value = _value;
  }
};
