# 📚 Guia Completo de Uso - Asaas API SDK TypeScript

Este guia apresenta exemplos práticos de como usar todos os serviços do SDK Asaas TypeScript.

---

## 📦 Instalação

```bash
npm install @asaas/api-sdk-typescript
# ou
pnpm add @asaas/api-sdk-typescript
# ou
yarn add @asaas/api-sdk-typescript
```

---

## 🚀 Configuração Inicial

### Configuração Básica

```typescript
import { AsaasSdk, AsaasSdkConfig, Environment } from '@asaas/api-sdk-typescript';

// Configuração do SDK
const config: AsaasSdkConfig = {
  apiKeyAuthConfig: {
    apiKey: 'sua-api-key-aqui',
    apiKeyHeader: 'access_token' // Padrão: 'access_token'
  },
  environment: Environment.PRODUCTION, // ou Environment.SANDBOX
  timeout: 10000, // 10 segundos (padrão)
};

// Inicialização
const sdk = new AsaasSdk(config);
```

### Configuração com Retry Personalizado

```typescript
import { AsaasSdk, AsaasSdkConfig, Environment } from '@asaas/api-sdk-typescript';
import { HttpMethod } from '@asaas/api-sdk-typescript';

const config: AsaasSdkConfig = {
  apiKeyAuthConfig: {
    apiKey: 'sua-api-key-aqui',
  },
  environment: Environment.PRODUCTION,
  retryConfig: {
    maxRetries: 3,
    initialDelay: 200,
    maxDelay: 2000,
    backoffFactor: 2,
    statusCodesToRetry: [408, 429, 500, 502, 503, 504],
    httpMethodsToRetry: [HttpMethod.GET, HttpMethod.POST],
  },
};

const sdk = new AsaasSdk(config);
```

### Configuração Dinâmica

```typescript
const sdk = new AsaasSdk({
  apiKeyAuthConfig: {
    apiKey: 'sua-api-key-aqui',
  },
});

// Alterar ambiente
sdk.setEnvironment(Environment.SANDBOX);

// Alterar API Key
sdk.setApiKey('nova-api-key');

// Alterar header da API Key
sdk.setApiKeyHeader('Authorization');
```

---

## 💳 1. Pagamentos (PaymentService)

### Criar Pagamento

```typescript
// Boleto Bancário
const pagamento = await sdk.payment.createPayment({
  customer: 'cus_123456789',
  billingType: 'BOLETO',
  value: 100.00,
  dueDate: '2025-02-15',
  description: 'Pagamento de exemplo',
});

console.log('Pagamento criado:', pagamento.id);
console.log('Linha digitável:', pagamento.bankSlipUrl);

// Cartão de Crédito
const pagamentoCartao = await sdk.payment.createPayment({
  customer: 'cus_123456789',
  billingType: 'CREDIT_CARD',
  value: 100.00,
  dueDate: '2025-02-15',
  creditCard: {
    holderName: 'João Silva',
    number: '4111111111111111',
    expiryMonth: '12',
    expiryYear: '2025',
    ccv: '123',
  },
  creditCardHolderInfo: {
    name: 'João Silva',
    email: 'joao@example.com',
    cpfCnpj: '12345678900',
    postalCode: '01310100',
    addressNumber: '123',
    phone: '47999999999',
  },
  remoteIp: '192.168.0.1',
});

// PIX
const pagamentoPix = await sdk.payment.createPayment({
  customer: 'cus_123456789',
  billingType: 'PIX',
  value: 100.00,
  dueDate: '2025-02-15',
});
```

### Listar Pagamentos

```typescript
// Listar todos
const pagamentos = await sdk.payment.listPayments();

// Com filtros
const pagamentosFiltrados = await sdk.payment.listPayments({
  offset: 0,
  limit: 20,
  customer: 'cus_123456789',
  subscription: 'sub_123456789',
  status: 'PENDING',
  billingType: 'BOLETO',
  startDate: '2025-01-01',
  endDate: '2025-01-31',
});
```

### Obter Pagamento Específico

```typescript
const pagamento = await sdk.payment.retrieveASinglePayment('pay_123456789');
console.log('Status:', pagamento.status);
console.log('Valor:', pagamento.value);
```

### Atualizar Pagamento

```typescript
const pagamentoAtualizado = await sdk.payment.updatePayment('pay_123456789', {
  description: 'Nova descrição',
  value: 150.00,
  dueDate: '2025-02-20',
});
```

### Deletar Pagamento

```typescript
const resultado = await sdk.payment.deletePayment('pay_123456789');
console.log('Deletado:', resultado.deleted);
```

### Capturar Pré-Autorização

```typescript
const pagamentoCapturado = await sdk.payment.capturePayment('pay_123456789', {
  value: 100.00,
});
```

---

## 👤 2. Clientes (CustomerService)

### Criar Cliente

```typescript
// Pessoa Física
const clientePF = await sdk.customer.createCustomer({
  name: 'João Silva',
  email: 'joao@example.com',
  phone: '47999999999',
  mobilePhone: '47999999999',
  cpfCnpj: '12345678900',
  postalCode: '01310100',
  address: 'Rua Exemplo',
  addressNumber: '123',
  complement: 'Apto 45',
  province: 'Centro',
  city: 'São Paulo',
  state: 'SP',
  country: 'Brasil',
  externalReference: 'CLIENTE_001',
  notificationDisabled: false,
  additionalEmails: 'joao2@example.com',
  municipalInscription: '123456',
  canDelete: true,
  canEdit: true,
  personType: 'FISICA',
  companyType: null,
});

// Pessoa Jurídica
const clientePJ = await sdk.customer.createCustomer({
  name: 'Empresa Exemplo LTDA',
  email: 'contato@empresa.com',
  phone: '1133333333',
  mobilePhone: '11999999999',
  cpfCnpj: '12345678000190',
  postalCode: '01310100',
  address: 'Av. Exemplo',
  addressNumber: '456',
  province: 'Centro',
  city: 'São Paulo',
  state: 'SP',
  country: 'Brasil',
  personType: 'JURIDICA',
  companyType: 'LTDA',
});
```

### Listar Clientes

```typescript
const clientes = await sdk.customer.listCustomers({
  offset: 0,
  limit: 20,
  name: 'João',
  email: 'joao@example.com',
  cpfCnpj: '12345678900',
  externalReference: 'CLIENTE_001',
});
```

### Obter Cliente Específico

```typescript
const cliente = await sdk.customer.retrieveASingleCustomer('cus_123456789');
```

### Atualizar Cliente

```typescript
const clienteAtualizado = await sdk.customer.updateCustomer('cus_123456789', {
  name: 'João Silva Santos',
  email: 'joao.novo@example.com',
});
```

### Deletar Cliente

```typescript
const resultado = await sdk.customer.deleteCustomer('cus_123456789');
```

---

## 🔄 3. Assinaturas (SubscriptionService)

### Criar Assinatura

```typescript
const assinatura = await sdk.subscription.createSubscription({
  customer: 'cus_123456789',
  billingType: 'CREDIT_CARD',
  value: 99.90,
  nextDueDate: '2025-02-15',
  cycle: 'MONTHLY',
  description: 'Assinatura Premium',
  endDate: '2025-12-31',
  maxPayments: 12,
  externalReference: 'SUB_001',
  creditCard: {
    holderName: 'João Silva',
    number: '4111111111111111',
    expiryMonth: '12',
    expiryYear: '2025',
    ccv: '123',
  },
  creditCardHolderInfo: {
    name: 'João Silva',
    email: 'joao@example.com',
    cpfCnpj: '12345678900',
    postalCode: '01310100',
    addressNumber: '123',
    phone: '47999999999',
  },
  remoteIp: '192.168.0.1',
});
```

### Listar Assinaturas

```typescript
const assinaturas = await sdk.subscription.listSubscriptions({
  offset: 0,
  limit: 20,
  customer: 'cus_123456789',
  status: 'ACTIVE',
});
```

### Obter Assinatura Específica

```typescript
const assinatura = await sdk.subscription.retrieveASingleSubscription('sub_123456789');
```

### Atualizar Assinatura

```typescript
const assinaturaAtualizada = await sdk.subscription.updateSubscription('sub_123456789', {
  value: 149.90,
  description: 'Assinatura Premium Plus',
});
```

### Deletar Assinatura

```typescript
const resultado = await sdk.subscription.deleteSubscription('sub_123456789');
```

---

## 💰 4. Reembolsos (PaymentRefundService)

### Listar Reembolsos

```typescript
const reembolsos = await sdk.paymentRefund.listRefunds('pay_123456789', {
  offset: 0,
  limit: 20,
});
```

### Reembolsar Boleto Bancário

```typescript
const reembolso = await sdk.paymentRefund.refundBankSlip('pay_123456789', {
  value: 100.00,
  description: 'Reembolso solicitado pelo cliente',
});
```

---

## 📄 5. Documentos de Pagamento (PaymentDocumentService)

### Listar Documentos

```typescript
const documentos = await sdk.paymentDocument.listPaymentDocuments('pay_123456789');
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

### Obter Documento

```typescript
const documento = await sdk.paymentDocument.retrieveASinglePaymentDocument(
  'pay_123456789',
  'doc_123456789'
);
```

### Deletar Documento

```typescript
const resultado = await sdk.paymentDocument.deletePaymentDocument(
  'pay_123456789',
  'doc_123456789'
);
```

---

## 🔔 6. Cobranças de Inadimplência (PaymentDunningService)

### Listar Cobranças

```typescript
const cobrancas = await sdk.paymentDunning.listDunnings({
  offset: 0,
  limit: 20,
  payment: 'pay_123456789',
});
```

### Criar Cobrança

```typescript
import * as fs from 'fs';

const arquivo = fs.readFileSync('caminho/para/notificacao.pdf');

const cobranca = await sdk.paymentDunning.createDunning('pay_123456789', {
  type: 'NOTIFICATION',
  documentFile: arquivo,
  description: 'Notificação de cobrança',
}, 'notificacao.pdf');
```

### Simular Cobrança

```typescript
const simulacao = await sdk.paymentDunning.simulateDunning('pay_123456789', {
  type: 'NOTIFICATION',
});
```

### Obter Cobrança Específica

```typescript
const cobranca = await sdk.paymentDunning.retrieveASingleDunning('pay_123456789', 'dun_123456789');
```

### Cancelar Cobrança

```typescript
const resultado = await sdk.paymentDunning.cancelDunning('pay_123456789', 'dun_123456789');
```

---

## 🔗 7. Links de Pagamento (PaymentLinkService)

### Criar Link

```typescript
const link = await sdk.paymentLink.createPaymentLink({
  name: 'Produto Exemplo',
  description: 'Descrição do produto',
  billingType: 'BOLETO',
  chargeType: 'DETACHED',
  value: 100.00,
  dueDate: '2025-02-15',
  maxInstallmentCount: 12,
  externalReference: 'LINK_001',
});
```

### Listar Links

```typescript
const links = await sdk.paymentLink.listPaymentLinks({
  offset: 0,
  limit: 20,
  name: 'Produto',
});
```

### Obter Link Específico

```typescript
const link = await sdk.paymentLink.retrieveASinglePaymentLink('link_123456789');
```

### Atualizar Link

```typescript
const linkAtualizado = await sdk.paymentLink.updatePaymentLink('link_123456789', {
  name: 'Produto Atualizado',
  value: 150.00,
});
```

### Remover Link

```typescript
const resultado = await sdk.paymentLink.removePaymentLink('link_123456789');
```

### Restaurar Link Removido

```typescript
const linkRestaurado = await sdk.paymentLink.restorePaymentLink('link_123456789');
```

### Gerenciar Imagens do Link

```typescript
// Listar imagens
const imagens = await sdk.paymentLink.listPaymentLinkImages('link_123456789');

// Adicionar imagem
import * as fs from 'fs';
const imagem = fs.readFileSync('caminho/para/imagem.jpg');
const imagemAdicionada = await sdk.paymentLink.addPaymentLinkImage(
  'link_123456789',
  { imageFile: imagem },
  'produto.jpg'
);

// Obter imagem
const imagem = await sdk.paymentLink.retrieveASinglePaymentLinkImage(
  'link_123456789',
  'img_123456789'
);

// Remover imagem
const resultado = await sdk.paymentLink.removePaymentLinkImage(
  'link_123456789',
  'img_123456789'
);

// Definir imagem principal
const resultado = await sdk.paymentLink.setMainPaymentLinkImage(
  'link_123456789',
  'img_123456789'
);
```

---

## 💵 8. Splits de Pagamento (PaymentSplitService)

### Listar Splits Pagos

```typescript
const splitsPagos = await sdk.paymentSplit.listPaidSplits({
  offset: 0,
  limit: 20,
  payment: 'pay_123456789',
});
```

### Obter Split Pago Específico

```typescript
const splitPago = await sdk.paymentSplit.retrieveASinglePaidSplit('split_123456789');
```

### Listar Splits Recebidos

```typescript
const splitsRecebidos = await sdk.paymentSplit.listReceivedSplits({
  offset: 0,
  limit: 20,
});
```

### Obter Split Recebido Específico

```typescript
const splitRecebido = await sdk.paymentSplit.retrieveASingleReceivedSplit('split_123456789');
```

---

## 📊 9. Pagamentos com Dados Resumidos (PaymentWithSummaryDataService)

### Listar Pagamentos Resumidos

```typescript
const pagamentosResumidos = await sdk.paymentWithSummaryData.listPaymentsWithSummaryData({
  offset: 0,
  limit: 20,
  customer: 'cus_123456789',
});
```

### Obter Pagamento Resumido Específico

```typescript
const pagamentoResumido = await sdk.paymentWithSummaryData.retrieveASinglePaymentWithSummaryData(
  'pay_123456789'
);
```

---

## 🏦 10. PIX (PixService)

### Criar QR Code PIX

```typescript
const qrCode = await sdk.pix.createPixQrCode({
  addressKey: 'chave-pix@example.com',
  description: 'Pagamento via PIX',
  value: 100.00,
  format: 'ALL',
  expirationDate: '2025-02-15',
  allowsMultiplePayments: false,
});
```

### Listar Chaves PIX

```typescript
const chaves = await sdk.pix.listKeys({
  offset: 0,
  limit: 20,
});
```

### Obter Chave PIX Específica

```typescript
const chave = await sdk.pix.retrieveASingleKey('chave-pix@example.com');
```

### Deletar Chave PIX

```typescript
const resultado = await sdk.pix.deleteKey('chave-pix@example.com');
```

---

## 📱 11. Transações PIX (PixTransactionService)

### Listar Transações PIX

```typescript
const transacoes = await sdk.pixTransaction.listPixTransactions({
  offset: 0,
  limit: 20,
  startDate: '2025-01-01',
  endDate: '2025-01-31',
});
```

### Obter Transação PIX Específica

```typescript
const transacao = await sdk.pixTransaction.retrieveASinglePixTransaction('pix_123456789');
```

### Cancelar Transação PIX

```typescript
const resultado = await sdk.pixTransaction.cancelPixTransaction('pix_123456789');
```

---

## 🔁 12. PIX Recorrente (RecurringPixService)

### Criar PIX Recorrente

```typescript
const pixRecorrente = await sdk.recurringPix.createRecurringPix({
  addressKey: 'chave-pix@example.com',
  description: 'PIX Recorrente Mensal',
  value: 100.00,
  scheduleDate: '2025-02-15',
  externalReference: 'PIX_REC_001',
});
```

### Listar PIX Recorrentes

```typescript
const pixRecorrentes = await sdk.recurringPix.listRecurringPix({
  offset: 0,
  limit: 20,
});
```

### Obter PIX Recorrente Específico

```typescript
const pixRecorrente = await sdk.recurringPix.retrieveASingleRecurringPix('rec_pix_123456789');
```

### Atualizar PIX Recorrente

```typescript
const pixRecorrenteAtualizado = await sdk.recurringPix.updateRecurringPix('rec_pix_123456789', {
  value: 150.00,
  description: 'PIX Recorrente Atualizado',
});
```

### Deletar PIX Recorrente

```typescript
const resultado = await sdk.recurringPix.deleteRecurringPix('rec_pix_123456789');
```

---

## 💼 13. Financeiro (FinanceService)

### Obter Saldo

```typescript
const saldo = await sdk.finance.getBalance();
console.log('Saldo disponível:', saldo.available);
console.log('Saldo bloqueado:', saldo.blocked);
```

### Obter Estatísticas de Pagamentos

```typescript
const estatisticas = await sdk.finance.getPaymentStatistics({
  startDate: '2025-01-01',
  endDate: '2025-01-31',
});
```

### Obter Estatísticas de Splits

```typescript
const estatisticasSplits = await sdk.finance.getSplitStatistics({
  startDate: '2025-01-01',
  endDate: '2025-01-31',
});
```

---

## 💸 14. Transações Financeiras (FinancialTransactionService)

### Listar Transações Financeiras

```typescript
const transacoes = await sdk.financialTransaction.listFinancialTransactions({
  offset: 0,
  limit: 20,
  startDate: '2025-01-01',
  endDate: '2025-01-31',
  transactionType: 'CREDIT',
});
```

### Obter Transação Financeira Específica

```typescript
const transacao = await sdk.financialTransaction.retrieveASingleFinancialTransaction(
  'fin_123456789'
);
```

---

## 🔄 15. Transferências (TransferService)

### Criar Transferência

```typescript
const transferencia = await sdk.transfer.createTransfer({
  value: 1000.00,
  bankAccount: 'bank_123456789',
  transferFee: 0.00,
  scheduleDate: '2025-02-15',
  description: 'Transferência de exemplo',
});
```

### Listar Transferências

```typescript
const transferencias = await sdk.transfer.listTransfers({
  offset: 0,
  limit: 20,
  startDate: '2025-01-01',
  endDate: '2025-01-31',
});
```

### Obter Transferência Específica

```typescript
const transferencia = await sdk.transfer.retrieveASingleTransfer('tra_123456789');
```

### Criar Transferência Interna

```typescript
const transferenciaInterna = await sdk.transfer.createInternalTransfer({
  value: 500.00,
  walletId: 'wallet_123456789',
  description: 'Transferência interna',
});
```

---

## ⏰ 16. Antecipações (AnticipationService)

### Listar Antecipações

```typescript
const antecipacoes = await sdk.anticipation.listAnticipations({
  offset: 0,
  limit: 20,
  startDate: '2025-01-01',
  endDate: '2025-01-31',
});
```

### Criar Antecipação

```typescript
import * as fs from 'fs';

const arquivo = fs.readFileSync('caminho/para/contrato.pdf');

const antecipacao = await sdk.anticipation.createAnticipation({
  paymentIds: ['pay_123456789', 'pay_987654321'],
  totalValue: 2000.00,
  contractFile: arquivo,
}, 'contrato.pdf');
```

### Simular Antecipação

```typescript
const simulacao = await sdk.anticipation.simulateAnticipation({
  paymentIds: ['pay_123456789'],
  totalValue: 1000.00,
});
```

### Obter Antecipação Específica

```typescript
const antecipacao = await sdk.anticipation.retrieveASingleAnticipation('ant_123456789');
```

### Obter Limites de Antecipação

```typescript
const limites = await sdk.anticipation.getAnticipationLimits();
```

### Obter Configuração de Antecipação

```typescript
const configuracao = await sdk.anticipation.getAnticipationConfiguration();
```

### Atualizar Configuração de Antecipação

```typescript
const configuracaoAtualizada = await sdk.anticipation.updateAnticipationConfiguration({
  automaticAnticipation: true,
  anticipationDays: 30,
});
```

---

## 🔔 17. Webhooks (WebhookService)

### Criar Configuração de Webhook

```typescript
const webhook = await sdk.webhook.createWebhookConfig({
  url: 'https://seusite.com/webhook',
  email: 'webhook@seusite.com',
  apiVersion: 3,
  authToken: 'token-secreto',
  enabled: true,
  interrupted: false,
});
```

### Listar Configurações de Webhook

```typescript
const webhooks = await sdk.webhook.listWebhookConfigs({
  offset: 0,
  limit: 20,
});
```

### Obter Configuração de Webhook Específica

```typescript
const webhook = await sdk.webhook.retrieveASingleWebhookConfig('webhook_123456789');
```

### Atualizar Configuração de Webhook

```typescript
const webhookAtualizado = await sdk.webhook.updateWebhookConfig('webhook_123456789', {
  url: 'https://seusite.com/webhook/novo',
  enabled: true,
});
```

### Deletar Configuração de Webhook

```typescript
const resultado = await sdk.webhook.deleteWebhookConfig('webhook_123456789');
```

---

## 📄 18. Notas Fiscais (InvoiceService)

### Criar Nota Fiscal

```typescript
const notaFiscal = await sdk.invoice.createInvoice({
  serviceDescription: 'Serviço de exemplo',
  observations: 'Observações da nota fiscal',
  value: 100.00,
  taxes: 18.00,
  netValue: 82.00,
  paymentDate: '2025-01-15',
  customer: 'cus_123456789',
  payment: 'pay_123456789',
  municipalServiceId: 'municipal_123',
  municipalServiceCode: '123456',
  municipalServiceName: 'Serviço Municipal',
  deductions: 0.00,
  effectiveDate: '2025-01-15',
});
```

### Listar Notas Fiscais

```typescript
const notasFiscais = await sdk.invoice.listInvoices({
  offset: 0,
  limit: 20,
  customer: 'cus_123456789',
  payment: 'pay_123456789',
});
```

### Obter Nota Fiscal Específica

```typescript
const notaFiscal = await sdk.invoice.retrieveASingleInvoice('inv_123456789');
```

### Atualizar Nota Fiscal

```typescript
const notaFiscalAtualizada = await sdk.invoice.updateInvoice('inv_123456789', {
  serviceDescription: 'Serviço atualizado',
  value: 150.00,
});
```

### Cancelar Nota Fiscal

```typescript
const resultado = await sdk.invoice.cancelInvoice('inv_123456789', {
  reason: 'Erro na emissão',
});
```

---

## 👤 19. Informações da Conta (AccountInfoService)

### Obter Informações da Conta

```typescript
const infoConta = await sdk.accountInfo.getAccountInfo();
console.log('Nome:', infoConta.name);
console.log('Email:', infoConta.email);
console.log('CPF/CNPJ:', infoConta.cpfCnpj);
```

### Atualizar Informações da Conta

```typescript
const infoAtualizada = await sdk.accountInfo.updateAccountInfo({
  name: 'Nome Atualizado',
  email: 'novo@email.com',
  phone: '11999999999',
});
```

---

## 🔔 20. Notificações (NotificationService)

### Atualizar Notificação

```typescript
const notificacao = await sdk.notification.updateNotification('not_123456789', {
  enabled: true,
  emailEnabledForProvider: true,
  smsEnabledForProvider: true,
  emailEnabledForCustomer: true,
  smsEnabledForCustomer: true,
  whatsappEnabledForCustomer: true,
});
```

### Obter Notificação Específica

```typescript
const notificacao = await sdk.notification.retrieveASingleNotification('not_123456789');
```

### Atualizar Notificações em Lote

```typescript
const resultado = await sdk.notification.batchUpdateNotifications({
  notifications: [
    {
      id: 'not_123456789',
      enabled: true,
    },
    {
      id: 'not_987654321',
      enabled: false,
    },
  ],
});
```

---

## 📦 21. Parcelas (InstallmentService)

### Criar Parcela

```typescript
const parcela = await sdk.installment.createInstallment({
  installmentCount: 12,
  customer: 'cus_123456789',
  value: 100.00,
  billingType: 'BOLETO',
  dueDate: '2025-02-15',
  totalValue: 1200.00,
  description: 'Parcela de exemplo',
});
```

### Listar Parcelas

```typescript
const parcelas = await sdk.installment.listInstallments({
  offset: 0,
  limit: 20,
});
```

### Obter Parcela Específica

```typescript
const parcela = await sdk.installment.retrieveASingleInstallment('ins_123456789');
```

### Remover Parcela

```typescript
const resultado = await sdk.installment.removeInstallment('ins_123456789');
```

### Listar Pagamentos de uma Parcela

```typescript
const pagamentos = await sdk.installment.listPaymentsOfAInstallment('ins_123456789', {
  status: 'CONFIRMED',
});
```

### Gerar Carnê de Parcelas (PDF)

```typescript
const pdf = await sdk.installment.generateInstallmentBooklet('ins_123456789', {
  sort: 'dueDate',
  order: 'ASC',
});

// Salvar PDF
import * as fs from 'fs';
fs.writeFileSync('carne.pdf', pdf);
```

### Reembolsar Parcela

```typescript
const parcelaReembolsada = await sdk.installment.refundInstallment('ins_123456789', {
  value: 100.00,
});
```

---

## 💳 22. Cartões de Crédito (CreditCardService)

### Tokenizar Cartão de Crédito

```typescript
const token = await sdk.creditCard.creditCardTokenization({
  customer: 'cus_123456789',
  creditCard: {
    holderName: 'João Silva',
    number: '4111111111111111',
    expiryMonth: '12',
    expiryYear: '2025',
    ccv: '123',
  },
  creditCardHolderInfo: {
    name: 'João Silva',
    email: 'joao@example.com',
    cpfCnpj: '12345678900',
    postalCode: '01310100',
    addressNumber: '123',
    phone: '47999999999',
  },
  remoteIp: '192.168.0.1',
});

console.log('Token do cartão:', token.creditCardToken);
console.log('Últimos 4 dígitos:', token.creditCardNumber);
console.log('Bandeira:', token.creditCardBrand);
```

---

## 🛒 23. Checkout (CheckoutService)

### Criar Novo Checkout

```typescript
const checkout = await sdk.checkout.createNewCheckout({
  billingTypes: ['CREDIT_CARD', 'BOLETO', 'PIX'],
  chargeTypes: ['DETACHED'],
  items: [
    {
      name: 'Produto 1',
      description: 'Descrição do produto 1',
      quantity: 1,
      unitValue: 100.00,
    },
    {
      name: 'Produto 2',
      description: 'Descrição do produto 2',
      quantity: 2,
      unitValue: 50.00,
    },
  ],
  callback: {
    successUrl: 'https://seusite.com/sucesso',
    autoRedirect: true,
  },
  minutesToExpire: 30,
  customerData: {
    name: 'João Silva',
    email: 'joao@example.com',
    cpfCnpj: '12345678900',
    phone: '47999999999',
  },
});

console.log('URL do checkout:', checkout.url);
console.log('ID do checkout:', checkout.id);
```

### Cancelar Checkout

```typescript
const checkoutCancelado = await sdk.checkout.cancelACheckout('checkout_123456789', {
  reason: 'Cancelado pelo cliente',
});
```

---

## 🏢 24. Subcontas (SubaccountService)

### Criar Subconta

```typescript
const subconta = await sdk.subaccount.createSubaccount({
  name: 'Subconta Exemplo',
  email: 'subconta@example.com',
  cpfCnpj: '12345678000190',
  mobilePhone: '11999999999',
  incomeValue: 10000.00,
  address: 'Rua Exemplo',
  addressNumber: '123',
  province: 'Centro',
  postalCode: '01310100',
  loginEmail: 'login@example.com',
  companyType: 'LTDA',
});
```

### Listar Subcontas

```typescript
const subcontas = await sdk.subaccount.listSubaccounts({
  offset: 0,
  limit: 20,
  cpfCnpj: '12345678000190',
  email: 'subconta@example.com',
  name: 'Subconta',
});
```

### Obter Subconta Específica

```typescript
const subconta = await sdk.subaccount.retrieveASingleSubaccount('acc_123456789');
```

---

## 📎 25. Documentos da Conta (AccountDocumentService)

### Verificar Documentos Pendentes

```typescript
const documentosPendentes = await sdk.accountDocument.checkPendingDocuments();
console.log('Documentos pendentes:', documentosPendentes.pendingDocuments);
```

### Enviar Documento

```typescript
import * as fs from 'fs';

const arquivo = fs.readFileSync('caminho/para/documento.pdf');

const documento = await sdk.accountDocument.sendDocuments(
  'doc_123456789',
  {
    documentFile: arquivo,
    type: 'IDENTITY_FRONT',
  },
  'documento.pdf'
);
```

### Visualizar Documento Enviado

```typescript
const documento = await sdk.accountDocument.viewDocumentSent('doc_123456789');
```

### Atualizar Documento Enviado

```typescript
import * as fs from 'fs';

const arquivo = fs.readFileSync('caminho/para/documento-novo.pdf');

const documentoAtualizado = await sdk.accountDocument.updateSentDocument(
  'doc_123456789',
  {
    documentFile: arquivo,
    type: 'IDENTITY_BACK',
  },
  'documento-novo.pdf'
);
```

### Remover Documento Enviado

```typescript
const resultado = await sdk.accountDocument.removeSentDocument('doc_123456789');
```

---

## 💸 26. Contas a Pagar (BillService)

### Criar Conta a Pagar

```typescript
const conta = await sdk.bill.createABillPayment({
  value: 500.00,
  dueDate: '2025-02-15',
  description: 'Conta de exemplo',
});
```

### Simular Conta a Pagar

```typescript
const simulacao = await sdk.bill.simulateABillPayment({
  value: 500.00,
  dueDate: '2025-02-15',
});

console.log('Valor total:', simulacao.totalValue);
console.log('Valor líquido:', simulacao.netValue);
console.log('Taxas:', simulacao.fees);
```

### Listar Contas a Pagar

```typescript
const contas = await sdk.bill.listBillPayments({
  offset: 0,
  limit: 20,
});
```

### Obter Conta a Pagar Específica

```typescript
const conta = await sdk.bill.retrieveASingleBillPayment('bill_123456789');
```

### Cancelar Conta a Pagar

```typescript
const contaCancelada = await sdk.bill.cancelBillPayment('bill_123456789', {
  reason: 'Cancelado pelo usuário',
});
```

---

## 🔙 27. Estornos (ChargebackService)

### Criar Disputa de Estorno

```typescript
import * as fs from 'fs';

const arquivo = fs.readFileSync('caminho/para/comprovante.pdf');

const disputa = await sdk.chargeback.createAChargebackDispute(
  'chargeback_123456789',
  {
    files: arquivo,
  },
  'comprovante.pdf'
);
```

### Listar Estornos

```typescript
const estornos = await sdk.chargeback.listChargebacks({
  offset: 0,
  limit: 20,
});
```

### Obter Estorno Específico

```typescript
const estorno = await sdk.chargeback.retrieveASingleChargeback('pay_123456789');
```

---

## 📊 28. Relatórios de Crédito (CreditBureauReportService)

### Fazer Consulta de Relatório

```typescript
const relatorio = await sdk.creditBureauReport.makeConsultation({
  cpfCnpj: '12345678900',
});

console.log('Status do relatório:', relatorio.status);
console.log('Dados:', relatorio.data);
```

### Listar Relatórios

```typescript
const relatorios = await sdk.creditBureauReport.listCreditBureauReports({
  offset: 0,
  limit: 20,
  startDate: '2025-01-01',
  endDate: '2025-01-31',
});
```

### Obter Relatório Específico

```typescript
const relatorio = await sdk.creditBureauReport.retrieveACreditBureauReport('rep_123456789');
```

---

## 🔒 29. Contas Garantia (EscrowAccountService)

### Finalizar Pagamento em Conta Garantia

```typescript
const pagamentoFinalizado = await sdk.escrowAccount.finishPaymentEscrowInTheEscrowAccount(
  'escrow_123456789',
  {
    value: 1000.00,
  }
);
```

---

## 📋 30. Informações Fiscais (FiscalInfoService)

### Obter Informações Fiscais

```typescript
const infoFiscal = await sdk.fiscalInfo.retrieveTaxInformation();
```

### Criar/Atualizar Informações Fiscais

```typescript
import * as fs from 'fs';

const certificado = fs.readFileSync('caminho/para/certificado.pfx');

const infoFiscal = await sdk.fiscalInfo.createAndUpdateTaxInformation(
  {
    file: certificado,
  },
  'certificado.pfx'
);
```

### Listar Configurações Municipais

```typescript
const opcoesMunicipais = await sdk.fiscalInfo.listMunicipalConfigurations();
```

### Listar Serviços Municipais

```typescript
const servicos = await sdk.fiscalInfo.listMunicipalServices({
  offset: 0,
  limit: 20,
});
```

### Listar Códigos NBS

```typescript
const codigosNBS = await sdk.fiscalInfo.listInvoiceNbsCodes({
  offset: 0,
  limit: 20,
});
```

### Configurar Portal de Emissão de Notas Fiscais

```typescript
const configuracao = await sdk.fiscalInfo.configureInvoiceIssuingPortal({
  useNationalPortal: true,
});
```

---

## 📱 31. Recarga de Celular (MobilePhoneRechargeService)

### Solicitar Recarga

```typescript
const recarga = await sdk.mobilePhoneRecharge.requestRecharge({
  phone: '47999999999',
  value: 50.00,
});
```

### Listar Recargas

```typescript
const recargas = await sdk.mobilePhoneRecharge.listMobileRecharges({
  offset: 0,
  limit: 20,
});
```

### Obter Recarga Específica

```typescript
const recarga = await sdk.mobilePhoneRecharge.retrieveASingleMobileRecharge('rec_123456789');
```

### Cancelar Recarga

```typescript
const recargaCancelada = await sdk.mobilePhoneRecharge.cancelACellphoneRecharge(
  'rec_123456789',
  {
    reason: 'Cancelado pelo usuário',
  }
);
```

### Buscar Provedor pelo Número

```typescript
const provedor = await sdk.mobilePhoneRecharge.searchForCellPhoneProvider('47999999999');
console.log('Provedor:', provedor.provider);
```

---

## 🧪 32. Ações de Sandbox (SandboxActionsService)

> **⚠️ ATENÇÃO:** Este serviço só funciona no ambiente de sandbox!

### Confirmar Pagamento (Sandbox)

```typescript
const pagamentoConfirmado = await sdk.sandboxActions.confirmPayment('pay_123456789', {
  value: 100.00,
});
```

### Forçar Vencimento de Cobrança (Sandbox)

```typescript
const pagamentoVencido = await sdk.sandboxActions.forceExpire('pay_123456789', {});
```

---

## 🛠️ Tratamento de Erros

### Exemplo Completo com Try/Catch

```typescript
import { AsaasSdk, ApiError, ErrorResponseDtoException } from '@asaas/api-sdk-typescript';

try {
  const pagamento = await sdk.payment.createPayment({
    customer: 'cus_123456789',
    billingType: 'BOLETO',
    value: 100.00,
    dueDate: '2025-02-15',
  });
  
  console.log('Pagamento criado:', pagamento.id);
} catch (error) {
  if (error instanceof ErrorResponseDtoException) {
    // Erro 400 - Validação ou erro da API
    console.error('Erro da API:', error.message);
    console.error('Detalhes:', error.errorModel);
  } else if (error instanceof ApiError) {
    // Outros erros HTTP
    console.error('Erro HTTP:', error.status, error.message);
  } else {
    // Erro desconhecido
    console.error('Erro desconhecido:', error);
  }
}
```

### Tratamento de Erros Específicos

```typescript
try {
  const cliente = await sdk.customer.createCustomer({
    name: 'João Silva',
    email: 'joao@example.com',
    cpfCnpj: '12345678900',
    // ... outros campos
  });
} catch (error) {
  if (error instanceof ErrorResponseDtoException) {
    // Verificar erros específicos
    if (error.errorModel?.errors) {
      error.errorModel.errors.forEach((err) => {
        console.error(`Campo: ${err.field}, Erro: ${err.message}`);
      });
    }
  }
}
```

---

## 🔄 Uso Assíncrono

Todos os métodos têm versões assíncronas (sufixo `Async`):

```typescript
// Versão normal (async/await)
const pagamento = await sdk.payment.createPayment({...});

// Versão assíncrona (Promise)
const pagamentoPromise = sdk.payment.createPaymentAsync({...});
pagamentoPromise.then((pagamento) => {
  console.log('Pagamento criado:', pagamento.id);
});
```

---

## 📝 Exemplos Práticos Completos

### Exemplo 1: Fluxo Completo de Venda

```typescript
import { AsaasSdk, Environment } from '@asaas/api-sdk-typescript';

const sdk = new AsaasSdk({
  apiKeyAuthConfig: {
    apiKey: process.env.ASAAS_API_KEY!,
  },
  environment: Environment.PRODUCTION,
});

async function processarVenda() {
  try {
    // 1. Criar cliente
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

    // 2. Criar pagamento
    const pagamento = await sdk.payment.createPayment({
      customer: cliente.id!,
      billingType: 'CREDIT_CARD',
      value: 299.90,
      dueDate: '2025-02-15',
      description: 'Compra de produto',
      creditCard: {
        holderName: 'João Silva',
        number: '4111111111111111',
        expiryMonth: '12',
        expiryYear: '2025',
        ccv: '123',
      },
      creditCardHolderInfo: {
        name: 'João Silva',
        email: 'joao@example.com',
        cpfCnpj: '12345678900',
        postalCode: '01310100',
        addressNumber: '123',
        phone: '47999999999',
      },
      remoteIp: '192.168.0.1',
    });

    // 3. Verificar status
    if (pagamento.status === 'CONFIRMED') {
      console.log('Pagamento confirmado!');
      
      // 4. Criar nota fiscal
      const notaFiscal = await sdk.invoice.createInvoice({
        customer: cliente.id!,
        payment: pagamento.id!,
        serviceDescription: 'Venda de produto',
        value: 299.90,
        taxes: 53.98,
        netValue: 245.92,
        paymentDate: new Date().toISOString().split('T')[0],
      });

      console.log('Nota fiscal criada:', notaFiscal.id);
    }

    return { cliente, pagamento };
  } catch (error) {
    console.error('Erro ao processar venda:', error);
    throw error;
  }
}
```

### Exemplo 2: Gerenciamento de Assinaturas

```typescript
async function gerenciarAssinatura() {
  // Criar assinatura mensal
  const assinatura = await sdk.subscription.createSubscription({
    customer: 'cus_123456789',
    billingType: 'CREDIT_CARD',
    value: 99.90,
    nextDueDate: '2025-02-15',
    cycle: 'MONTHLY',
    description: 'Assinatura Premium',
    creditCard: {
      holderName: 'João Silva',
      number: '4111111111111111',
      expiryMonth: '12',
      expiryYear: '2025',
      ccv: '123',
    },
    creditCardHolderInfo: {
      name: 'João Silva',
      email: 'joao@example.com',
      cpfCnpj: '12345678900',
      postalCode: '01310100',
      addressNumber: '123',
      phone: '47999999999',
    },
    remoteIp: '192.168.0.1',
  });

  // Listar pagamentos da assinatura
  const pagamentos = await sdk.payment.listPayments({
    subscription: assinatura.id!,
  });

  console.log(`Assinatura ${assinatura.id} tem ${pagamentos.data?.length} pagamentos`);
}
```

### Exemplo 3: Upload de Documentos

```typescript
import * as fs from 'fs';
import * as path from 'path';

async function uploadDocumentosPagamento(paymentId: string) {
  const documentos = [
    { arquivo: 'recibo.pdf', tipo: 'RECEIPT' },
    { arquivo: 'comprovante.pdf', tipo: 'RECEIPT' },
  ];

  for (const doc of documentos) {
    const arquivoPath = path.join(__dirname, 'documentos', doc.arquivo);
    
    if (fs.existsSync(arquivoPath)) {
      const arquivo = fs.readFileSync(arquivoPath);
      
      const documento = await sdk.paymentDocument.uploadPaymentDocuments(
        paymentId,
        {
          file: arquivo,
          type: doc.tipo,
          availableAfterPayment: true,
        },
        doc.arquivo
      );

      console.log(`Documento ${doc.arquivo} enviado:`, documento.id);
    }
  }
}
```

---

## 🎯 Boas Práticas

### 1. Sempre Trate Erros

```typescript
try {
  const resultado = await sdk.payment.createPayment({...});
} catch (error) {
  // Sempre trate os erros adequadamente
  console.error('Erro:', error);
}
```

### 2. Use Variáveis de Ambiente para API Key

```typescript
const sdk = new AsaasSdk({
  apiKeyAuthConfig: {
    apiKey: process.env.ASAAS_API_KEY!, // Nunca hardcode a API key
  },
});
```

### 3. Valide Dados Antes de Enviar

```typescript
function validarCPF(cpf: string): boolean {
  // Implementar validação de CPF
  return /^\d{11}$/.test(cpf.replace(/\D/g, ''));
}

const cpf = '12345678900';
if (!validarCPF(cpf)) {
  throw new Error('CPF inválido');
}

const cliente = await sdk.customer.createCustomer({
  cpfCnpj: cpf,
  // ... outros campos
});
```

### 4. Use Paginação para Listas Grandes

```typescript
async function listarTodosPagamentos() {
  const todosPagamentos = [];
  let offset = 0;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    const resultado = await sdk.payment.listPayments({
      offset,
      limit,
    });

    todosPagamentos.push(...(resultado.data || []));
    hasMore = resultado.hasMore || false;
    offset += limit;
  }

  return todosPagamentos;
}
```

### 5. Configure Retry para Operações Críticas

```typescript
const sdk = new AsaasSdk({
  apiKeyAuthConfig: {
    apiKey: process.env.ASAAS_API_KEY!,
  },
  retryConfig: {
    maxRetries: 3,
    initialDelay: 200,
    maxDelay: 2000,
    backoffFactor: 2,
    statusCodesToRetry: [408, 429, 500, 502, 503, 504],
  },
});
```

---

## 📚 Recursos Adicionais

- **Documentação da API Asaas:** https://docs.asaas.com/
- **SDK Java Original:** https://github.com/asaasdev/asaas-api-sdk-java
- **TypeScript:** https://www.typescriptlang.org/
- **Axios:** https://axios-http.com/

---

## ❓ Suporte

Para dúvidas ou problemas:
1. Consulte a documentação oficial da API Asaas
2. Verifique os exemplos neste guia
3. Abra uma issue no repositório do SDK

---

**Desenvolvido com ❤️ para a comunidade Asaas**

