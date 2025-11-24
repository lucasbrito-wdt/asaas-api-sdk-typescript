# SDK Asaas TypeScript

SDK TypeScript oficial para integração com a API Asaas.

## Instalação

```bash
npm install @asaas/api-sdk-typescript
# ou
yarn add @asaas/api-sdk-typescript
# ou
pnpm add @asaas/api-sdk-typescript
```

## Uso Básico

```typescript
import { AsaasSdk, Environment } from '@asaas/api-sdk-typescript';

const sdk = new AsaasSdk({
  environment: Environment.SANDBOX,
  apiKeyAuthConfig: {
    apiKey: 'sua_api_key_aqui'
  }
});

// Criar um cliente
const customer = await sdk.customer.createNewCustomer({
  name: 'João Silva',
  cpfCnpj: '12345678900',
  email: 'joao@example.com'
});

// Criar um pagamento
const payment = await sdk.payment.createNewPayment({
  customer: customer.id!,
  billingType: 'BOLETO',
  value: 100.00,
  dueDate: '2025-02-15'
});
```

## Documentação

Para mais informações, consulte a [documentação completa](https://asaas.com/developers).

## Licença

MIT

