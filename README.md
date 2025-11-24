# Asaas API SDK TypeScript

SDK TypeScript oficial para integração com a API Asaas v3.0.0.

[![npm version](https://img.shields.io/npm/v/@luquinhasbrito/asaas-api-sdk-typescript.svg)](https://www.npmjs.com/package/@luquinhasbrito/asaas-api-sdk-typescript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📦 Instalação

```bash
npm install @luquinhasbrito/asaas-api-sdk-typescript
# ou
pnpm add @luquinhasbrito/asaas-api-sdk-typescript
# ou
yarn add @luquinhasbrito/asaas-api-sdk-typescript
```

## 🚀 Início Rápido

```typescript
import { AsaasSdk, Environment } from '@luquinhasbrito/asaas-api-sdk-typescript';

// Configuração do SDK
const sdk = new AsaasSdk({
  apiKeyAuthConfig: {
    apiKey: 'sua-api-key-aqui',
  },
  environment: Environment.PRODUCTION, // ou Environment.SANDBOX
});

// Criar um pagamento
const pagamento = await sdk.payment.createPayment({
  customer: 'cus_123456789',
  billingType: 'BOLETO',
  value: 100.00,
  dueDate: '2025-02-15',
  description: 'Pagamento de exemplo',
});

console.log('Pagamento criado:', pagamento.id);
console.log('Linha digitável:', pagamento.bankSlipUrl);
```

## 📚 Documentação Completa

Para exemplos detalhados de uso de todos os serviços, consulte o [**Guia Completo de Uso**](./GUIA_USO.md).

## ✨ Funcionalidades

- ✅ **32 Serviços Implementados** - Cobertura completa da API Asaas
- ✅ **TypeScript Nativo** - Tipagem forte e autocomplete completo
- ✅ **Suporte a Multipart/Form-Data** - Upload de arquivos
- ✅ **Retry Automático** - Configurável com backoff exponencial
- ✅ **Tratamento de Erros** - Sistema estruturado de exceções
- ✅ **Ambientes** - Production e Sandbox
- ✅ **Documentação JSDoc** - Em português

## 🎯 Serviços Disponíveis

### Pagamentos e Transações
- `payment` - Gerenciamento de pagamentos
- `paymentRefund` - Reembolsos
- `paymentDocument` - Documentos de pagamentos
- `paymentDunning` - Cobranças de inadimplência
- `paymentLink` - Links de pagamento
- `paymentSplit` - Splits de pagamento

### Pagamentos Resumidos e PIX
- `paymentWithSummaryData` - Pagamentos com dados resumidos
- `pixTransaction` - Transações PIX
- `recurringPix` - PIX recorrente
- `pix` - Chaves PIX

### Clientes e Assinaturas
- `customer` - Gerenciamento de clientes
- `subscription` - Assinaturas recorrentes

### Financeiro
- `finance` - Informações financeiras
- `financialTransaction` - Transações financeiras
- `transfer` - Transferências
- `anticipation` - Antecipações

### Outros Serviços
- `webhook` - Configuração de webhooks
- `invoice` - Notas fiscais
- `accountInfo` - Informações da conta
- `notification` - Notificações
- `installment` - Parcelas
- `creditCard` - Tokenização de cartões
- `checkout` - Checkout
- `subaccount` - Subcontas
- `accountDocument` - Documentos da conta
- `bill` - Contas a pagar
- `chargeback` - Estornos
- `creditBureauReport` - Relatórios de crédito
- `escrowAccount` - Contas garantia
- `fiscalInfo` - Informações fiscais
- `mobilePhoneRecharge` - Recarga de celular
- `sandboxActions` - Ações de sandbox (apenas testes)

## 📖 Exemplos de Uso

### Criar Cliente

```typescript
const cliente = await sdk.customer.createCustomer({
  name: 'João Silva',
  email: 'joao@example.com',
  cpfCnpj: '12345678900',
  phone: '47999999999',
  postalCode: '01310100',
  address: 'Rua Exemplo',
  addressNumber: '123',
  province: 'Centro',
  city: 'São Paulo',
  state: 'SP',
});
```

### Criar Assinatura

```typescript
const assinatura = await sdk.subscription.createSubscription({
  customer: cliente.id!,
  billingType: 'CREDIT_CARD',
  value: 99.90,
  nextDueDate: '2025-02-15',
  cycle: 'MONTHLY',
  description: 'Assinatura Premium',
});
```

### Upload de Documento

```typescript
import * as fs from 'fs';

const arquivo = fs.readFileSync('caminho/para/arquivo.pdf');

const documento = await sdk.paymentDocument.uploadPaymentDocuments(
  'pay_123456789',
  {
    file: arquivo,
    type: 'RECEIPT',
    availableAfterPayment: true,
  },
  'recibo.pdf'
);
```

### Criar PIX

```typescript
const pix = await sdk.pix.createPixQrCode({
  addressKey: 'chave-pix@example.com',
  description: 'Pagamento via PIX',
  value: 100.00,
});
```

## 🛠️ Configuração Avançada

### Configuração com Retry Personalizado

```typescript
import { HttpMethod } from '@luquinhasbrito/asaas-api-sdk-typescript';

const sdk = new AsaasSdk({
  apiKeyAuthConfig: {
    apiKey: 'sua-api-key-aqui',
  },
  retryConfig: {
    maxRetries: 3,
    initialDelay: 200,
    maxDelay: 2000,
    backoffFactor: 2,
    statusCodesToRetry: [408, 429, 500, 502, 503, 504],
    httpMethodsToRetry: [HttpMethod.GET, HttpMethod.POST],
  },
});
```

### Alterar Configuração Dinamicamente

```typescript
// Alterar ambiente
sdk.setEnvironment(Environment.SANDBOX);

// Alterar API Key
sdk.setApiKey('nova-api-key');

// Alterar header da API Key
sdk.setApiKeyHeader('Authorization');
```

## 🚨 Tratamento de Erros

```typescript
import { ApiError, ErrorResponseDtoException } from '@luquinhasbrito/asaas-api-sdk-typescript';

try {
  const pagamento = await sdk.payment.createPayment({...});
} catch (error) {
  if (error instanceof ErrorResponseDtoException) {
    // Erro 400 - Validação ou erro da API
    console.error('Erro da API:', error.message);
    console.error('Detalhes:', error.errorModel);
  } else if (error instanceof ApiError) {
    // Outros erros HTTP
    console.error('Erro HTTP:', error.status, error.message);
  } else {
    console.error('Erro desconhecido:', error);
  }
}
```

## 📋 Requisitos

- Node.js >= 14.0.0
- TypeScript >= 4.9.0

## 🔗 Links Úteis

- [Guia Completo de Uso](./GUIA_USO.md) - Exemplos detalhados de todos os serviços
- [Integração com NestJS](./docs/NESTJS_INTEGRATION.md) - Guia completo de integração com NestJS
- [Guia de Webhooks](./docs/WEBHOOKS.md) - Configuração e integração de webhooks
- [Documentação da API Asaas](https://docs.asaas.com/)
- [SDK Java Original](https://github.com/asaasdev/asaas-api-sdk-java)

## 📄 Licença

MIT License - veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia o [CONTRIBUTING.md](./CONTRIBUTING.md) antes de enviar pull requests.

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte a [documentação completa](./GUIA_USO.md)
2. Verifique a [documentação oficial da API Asaas](https://docs.asaas.com/)
3. Abra uma issue no repositório

---

**Desenvolvido com ❤️ para a comunidade Asaas**
