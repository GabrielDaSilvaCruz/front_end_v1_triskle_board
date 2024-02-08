export function separateCamelCase(input: string): string{
    // Usa uma expressão regular para separar palavras em CamelCase
    return input.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();  
}

export function formatMoney(item: number) {
  return new Intl.NumberFormat('pt-BR',{
    style: 'currency',
    currency: 'BRL'
  }).format(item);
}

export function formatNumber(item: number, minimumFractionDigits: number = 2, maximumFractionDigits: number = 2) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(item);
}

export function formatPercentual(item: number, minimumFractionDigits: number = 2, maximumFractionDigits: number = 2) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(item) + '%';
}

