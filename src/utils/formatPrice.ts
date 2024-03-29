export function formatPrice(value: number) {
  const { locale } = Intl.DateTimeFormat().resolvedOptions();

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: locale === 'pt-BR' ? 'USD' : 'BRL',
  }).format(value);
}
