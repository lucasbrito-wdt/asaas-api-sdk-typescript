# 📡 Guia Completo de Webhooks - Asaas API SDK TypeScript

Este guia apresenta exemplos práticos de como configurar e usar webhooks com o SDK Asaas TypeScript, incluindo integração com NestJS.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Configuração Básica](#configuração-básica)
3. [Gerenciamento de Webhooks](#gerenciamento-de-webhooks)
4. [Recebendo Eventos](#recebendo-eventos)
5. [Integração com NestJS](#integração-com-nestjs)
6. [Eventos Disponíveis](#eventos-disponíveis)
7. [Boas Práticas](#boas-práticas)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

Webhooks permitem que você receba notificações em tempo real sobre eventos que acontecem na sua conta Asaas, como pagamentos confirmados, vencidos, reembolsados, etc.

### Como Funciona

1. Você configura um webhook no Asaas apontando para uma URL do seu servidor
2. Quando um evento acontece, o Asaas envia uma requisição POST para sua URL
3. Seu servidor processa o evento e retorna status 200 para confirmar recebimento

---

## ⚙️ Configuração Básica

### 1. Criar um Webhook

```typescript
import { AsaasSdk, Environment } from '@luquinhasbrito/asaas-api-sdk-typescript';

const sdk = new AsaasSdk({
  apiKeyAuthConfig: {
    apiKey: 'sua-api-key-aqui',
  },
  environment: Environment.PRODUCTION,
});

// Criar webhook para receber eventos de pagamento
const webhook = await sdk.webhook.createNewWebhook({
  name: 'Webhook de Pagamentos',
  url: 'https://seusite.com/webhook/asaas',
  email: 'webhook@seusite.com',
  enabled: true,
  interrupted: false,
  apiVersion: 3,
  authToken: 'seu-token-secreto-aqui', // Token para validar requisições
  sendType: 'NON_SEQUENTIALLY', // ou 'SEQUENTIALLY'
  events: [
    'PAYMENT_CREATED',
    'PAYMENT_UPDATED',
    'PAYMENT_CONFIRMED',
    'PAYMENT_RECEIVED',
    'PAYMENT_OVERDUE',
    'PAYMENT_DELETED',
    'PAYMENT_RESTORED',
    'PAYMENT_REFUNDED',
    'PAYMENT_CHARGEBACK_REQUESTED',
    'PAYMENT_CHARGEBACK_DISPUTE',
    'PAYMENT_AWAITING_RISK_ANALYSIS',
    'PAYMENT_APPROVED_BY_RISK_ANALYSIS',
    'PAYMENT_REPROVED_BY_RISK_ANALYSIS',
    'PAYMENT_RECEIVED',
  ],
});

console.log('Webhook criado:', webhook.id);
console.log('URL:', webhook.url);
```

### 2. Listar Webhooks

```typescript
// Listar todos os webhooks
const webhooks = await sdk.webhook.listWebhooks({
  offset: 0,
  limit: 20,
});

console.log(`Total de webhooks: ${webhooks.totalCount}`);
webhooks.data?.forEach((wh) => {
  console.log(`- ${wh.name}: ${wh.url} (${wh.enabled ? 'Ativo' : 'Inativo'})`);
});
```

### 3. Obter Webhook Específico

```typescript
const webhook = await sdk.webhook.retrieveASingleWebhook('webhook_123456789');
console.log('Nome:', webhook.name);
console.log('URL:', webhook.url);
console.log('Eventos:', webhook.events);
console.log('Ativo:', webhook.enabled);
```

### 4. Atualizar Webhook

```typescript
const webhookAtualizado = await sdk.webhook.updateExistingWebhook('webhook_123456789', {
  name: 'Webhook Atualizado',
  url: 'https://seusite.com/webhook/asaas/novo',
  enabled: true,
  events: ['PAYMENT_CONFIRMED', 'PAYMENT_RECEIVED'],
});
```

### 5. Deletar Webhook

```typescript
const resultado = await sdk.webhook.removeWebhook('webhook_123456789');
console.log('Webhook removido:', resultado.deleted);
```

---

## 📨 Recebendo Eventos

### Exemplo com Express.js

```typescript
import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json());

// Token configurado no webhook
const WEBHOOK_TOKEN = 'seu-token-secreto-aqui';

// Middleware para validar assinatura do webhook
function validateWebhookSignature(req: express.Request, res: express.Response, next: express.NextFunction) {
  const signature = req.headers['asaas-access-token'] as string;
  
  if (!signature || signature !== WEBHOOK_TOKEN) {
    return res.status(401).json({ error: 'Token inválido' });
  }
  
  next();
}

// Endpoint para receber eventos
app.post('/webhook/asaas', validateWebhookSignature, (req, res) => {
  const event = req.body;
  
  console.log('Evento recebido:', event.event);
  console.log('Dados:', JSON.stringify(event, null, 2));
  
  // Processar evento baseado no tipo
  switch (event.event) {
    case 'PAYMENT_CREATED':
      handlePaymentCreated(event);
      break;
      
    case 'PAYMENT_CONFIRMED':
      handlePaymentConfirmed(event);
      break;
      
    case 'PAYMENT_RECEIVED':
      handlePaymentReceived(event);
      break;
      
    case 'PAYMENT_OVERDUE':
      handlePaymentOverdue(event);
      break;
      
    case 'PAYMENT_REFUNDED':
      handlePaymentRefunded(event);
      break;
      
    default:
      console.log('Evento não tratado:', event.event);
  }
  
  // Sempre retornar 200 para confirmar recebimento
  res.status(200).json({ received: true });
});

// Handlers de eventos
function handlePaymentCreated(event: any) {
  const payment = event.payment;
  console.log(`Pagamento criado: ${payment.id} - Cliente: ${payment.customer}`);
  // Atualizar banco de dados, enviar email, etc.
}

function handlePaymentConfirmed(event: any) {
  const payment = event.payment;
  console.log(`Pagamento confirmado: ${payment.id} - Valor: ${payment.value}`);
  // Liberar acesso ao produto/serviço, enviar confirmação, etc.
}

function handlePaymentReceived(event: any) {
  const payment = event.payment;
  console.log(`Pagamento recebido: ${payment.id}`);
  // Processar confirmação de recebimento
}

function handlePaymentOverdue(event: any) {
  const payment = event.payment;
  console.log(`Pagamento vencido: ${payment.id}`);
  // Enviar notificação, bloquear acesso, etc.
}

function handlePaymentRefunded(event: any) {
  const payment = event.payment;
  console.log(`Pagamento reembolsado: ${payment.id}`);
  // Reverter acesso, atualizar status, etc.
}

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

### Exemplo com Next.js API Route

```typescript
// pages/api/webhook/asaas.ts ou app/api/webhook/asaas/route.ts
import { NextApiRequest, NextApiResponse } from 'next';

const WEBHOOK_TOKEN = process.env.ASAAS_WEBHOOK_TOKEN!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validar token
  const token = req.headers['asaas-access-token'] as string;
  if (token !== WEBHOOK_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const event = req.body;

  try {
    // Processar evento
    await processWebhookEvent(event);
    
    // Sempre retornar 200
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    // Ainda retornar 200 para não causar retry desnecessário
    return res.status(200).json({ received: true, error: 'Processing failed' });
  }
}

async function processWebhookEvent(event: any) {
  switch (event.event) {
    case 'PAYMENT_CONFIRMED':
      // Atualizar status no banco de dados
      await updatePaymentStatus(event.payment.id, 'CONFIRMED');
      break;
    // ... outros casos
  }
}
```

---

## 🚀 Integração com NestJS

### Estrutura de Arquivos

```
src/
├── asaas/
│   ├── asaas.module.ts
│   ├── asaas.service.ts
│   └── dto/
│       └── webhook-event.dto.ts
├── webhooks/
│   ├── webhooks.controller.ts
│   ├── webhooks.service.ts
│   ├── webhooks.module.ts
│   ├── guards/
│   │   └── webhook-auth.guard.ts
│   └── dto/
│       └── webhook-payload.dto.ts
└── app.module.ts
```

### 1. Módulo Asaas

```typescript
// src/asaas/asaas.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AsaasSdk, Environment } from '@luquinhasbrito/asaas-api-sdk-typescript';
import { AsaasService } from './asaas.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'ASAAS_SDK',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new AsaasSdk({
          apiKeyAuthConfig: {
            apiKey: configService.get<string>('ASAAS_API_KEY')!,
          },
          environment: configService.get<string>('ASAAS_ENVIRONMENT') === 'production' 
            ? Environment.PRODUCTION 
            : Environment.SANDBOX,
          timeout: configService.get<number>('ASAAS_TIMEOUT', 10000),
        });
      },
    },
    AsaasService,
  ],
  exports: ['ASAAS_SDK', AsaasService],
})
export class AsaasModule {}
```

### 2. Service do Asaas

```typescript
// src/asaas/asaas.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { AsaasSdk } from '@luquinhasbrito/asaas-api-sdk-typescript';
import { WebhookConfigSaveRequestDto } from '@luquinhasbrito/asaas-api-sdk-typescript';

@Injectable()
export class AsaasService {
  constructor(
    @Inject('ASAAS_SDK') private readonly sdk: AsaasSdk,
  ) {}

  /**
   * Configura um webhook no Asaas
   */
  async setupWebhook(config: {
    name: string;
    url: string;
    email: string;
    authToken: string;
    events: string[];
  }) {
    const webhookConfig: WebhookConfigSaveRequestDto = {
      name: config.name,
      url: config.url,
      email: config.email,
      enabled: true,
      interrupted: false,
      apiVersion: 3,
      authToken: config.authToken,
      sendType: 'NON_SEQUENTIALLY',
      events: config.events,
    };

    return await this.sdk.webhook.createNewWebhook(webhookConfig);
  }

  /**
   * Lista todos os webhooks configurados
   */
  async listWebhooks() {
    return await this.sdk.webhook.listWebhooks();
  }

  /**
   * Obtém um webhook específico
   */
  async getWebhook(id: string) {
    return await this.sdk.webhook.retrieveASingleWebhook(id);
  }

  /**
   * Atualiza um webhook
   */
  async updateWebhook(id: string, updates: Partial<WebhookConfigSaveRequestDto>) {
    return await this.sdk.webhook.updateExistingWebhook(id, updates);
  }

  /**
   * Remove um webhook
   */
  async removeWebhook(id: string) {
    return await this.sdk.webhook.removeWebhook(id);
  }

  /**
   * Acesso direto ao SDK (para outros métodos)
   */
  get sdkInstance() {
    return this.sdk;
  }
}
```

### 3. DTOs para Webhook

```typescript
// src/webhooks/dto/webhook-payload.dto.ts
import { IsString, IsOptional, IsObject, IsArray } from 'class-validator';

export class WebhookPayloadDto {
  @IsString()
  event!: string;

  @IsObject()
  payment?: any;

  @IsObject()
  customer?: any;

  @IsObject()
  subscription?: any;

  @IsOptional()
  @IsArray()
  errors?: any[];

  [key: string]: any;
}
```

```typescript
// src/asaas/dto/webhook-event.dto.ts
export enum WebhookEventType {
  PAYMENT_CREATED = 'PAYMENT_CREATED',
  PAYMENT_UPDATED = 'PAYMENT_UPDATED',
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  PAYMENT_OVERDUE = 'PAYMENT_OVERDUE',
  PAYMENT_DELETED = 'PAYMENT_DELETED',
  PAYMENT_RESTORED = 'PAYMENT_RESTORED',
  PAYMENT_REFUNDED = 'PAYMENT_REFUNDED',
  PAYMENT_CHARGEBACK_REQUESTED = 'PAYMENT_CHARGEBACK_REQUESTED',
  PAYMENT_CHARGEBACK_DISPUTE = 'PAYMENT_CHARGEBACK_DISPUTE',
  PAYMENT_AWAITING_RISK_ANALYSIS = 'PAYMENT_AWAITING_RISK_ANALYSIS',
  PAYMENT_APPROVED_BY_RISK_ANALYSIS = 'PAYMENT_APPROVED_BY_RISK_ANALYSIS',
  PAYMENT_REPROVED_BY_RISK_ANALYSIS = 'PAYMENT_REPROVED_BY_RISK_ANALYSIS',
}
```

### 4. Guard para Autenticação do Webhook

```typescript
// src/webhooks/guards/webhook-auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class WebhookAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['asaas-access-token'] as string;
    const expectedToken = this.configService.get<string>('ASAAS_WEBHOOK_TOKEN');

    if (!expectedToken) {
      throw new UnauthorizedException('Webhook token not configured');
    }

    if (token !== expectedToken) {
      throw new UnauthorizedException('Invalid webhook token');
    }

    return true;
  }
}
```

### 5. Service para Processar Webhooks

```typescript
// src/webhooks/webhooks.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { WebhookPayloadDto } from './dto/webhook-payload.dto';
import { WebhookEventType } from '../asaas/dto/webhook-event.dto';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  /**
   * Processa eventos recebidos do webhook
   */
  async processWebhookEvent(payload: WebhookPayloadDto): Promise<void> {
    this.logger.log(`Processando evento: ${payload.event}`);

    try {
      switch (payload.event) {
        case WebhookEventType.PAYMENT_CREATED:
          await this.handlePaymentCreated(payload);
          break;

        case WebhookEventType.PAYMENT_CONFIRMED:
          await this.handlePaymentConfirmed(payload);
          break;

        case WebhookEventType.PAYMENT_RECEIVED:
          await this.handlePaymentReceived(payload);
          break;

        case WebhookEventType.PAYMENT_OVERDUE:
          await this.handlePaymentOverdue(payload);
          break;

        case WebhookEventType.PAYMENT_REFUNDED:
          await this.handlePaymentRefunded(payload);
          break;

        case WebhookEventType.PAYMENT_DELETED:
          await this.handlePaymentDeleted(payload);
          break;

        case WebhookEventType.PAYMENT_CHARGEBACK_REQUESTED:
          await this.handleChargebackRequested(payload);
          break;

        default:
          this.logger.warn(`Evento não tratado: ${payload.event}`);
      }
    } catch (error) {
      this.logger.error(`Erro ao processar evento ${payload.event}:`, error);
      throw error;
    }
  }

  private async handlePaymentCreated(payload: WebhookPayloadDto) {
    const payment = payload.payment;
    this.logger.log(`Pagamento criado: ${payment.id} - Cliente: ${payment.customer}`);
    
    // Implementar lógica: salvar no banco, enviar email, etc.
    // Exemplo:
    // await this.paymentRepository.create({
    //   asaasId: payment.id,
    //   customerId: payment.customer,
    //   value: payment.value,
    //   status: payment.status,
    //   ...
    // });
  }

  private async handlePaymentConfirmed(payload: WebhookPayloadDto) {
    const payment = payload.payment;
    this.logger.log(`Pagamento confirmado: ${payment.id} - Valor: ${payment.value}`);
    
    // Implementar lógica: liberar acesso, atualizar status, etc.
    // Exemplo:
    // await this.paymentRepository.update(
    //   { asaasId: payment.id },
    //   { status: 'CONFIRMED', confirmedAt: new Date() }
    // );
    // await this.accessService.grantAccess(payment.customer);
  }

  private async handlePaymentReceived(payload: WebhookPayloadDto) {
    const payment = payload.payment;
    this.logger.log(`Pagamento recebido: ${payment.id}`);
    
    // Implementar lógica de confirmação de recebimento
  }

  private async handlePaymentOverdue(payload: WebhookPayloadDto) {
    const payment = payload.payment;
    this.logger.warn(`Pagamento vencido: ${payment.id}`);
    
    // Implementar lógica: enviar notificação, bloquear acesso, etc.
    // Exemplo:
    // await this.notificationService.sendOverdueNotification(payment.customer);
    // await this.accessService.blockAccess(payment.customer);
  }

  private async handlePaymentRefunded(payload: WebhookPayloadDto) {
    const payment = payload.payment;
    this.logger.log(`Pagamento reembolsado: ${payment.id}`);
    
    // Implementar lógica: reverter acesso, atualizar status, etc.
    // Exemplo:
    // await this.paymentRepository.update(
    //   { asaasId: payment.id },
    //   { status: 'REFUNDED', refundedAt: new Date() }
    // );
    // await this.accessService.revokeAccess(payment.customer);
  }

  private async handlePaymentDeleted(payload: WebhookPayloadDto) {
    const payment = payload.payment;
    this.logger.log(`Pagamento deletado: ${payment.id}`);
    
    // Implementar lógica de limpeza
  }

  private async handleChargebackRequested(payload: WebhookPayloadDto) {
    const payment = payload.payment;
    this.logger.warn(`Chargeback solicitado: ${payment.id}`);
    
    // Implementar lógica: notificar equipe, iniciar disputa, etc.
  }
}
```

### 6. Controller para Receber Webhooks

```typescript
// src/webhooks/webhooks.controller.ts
import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
  UseGuards,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { WebhookPayloadDto } from './dto/webhook-payload.dto';
import { WebhookAuthGuard } from './guards/webhook-auth.guard';
import { IsString, IsNotEmpty, validate } from 'class-validator';

class WebhookEventDto {
  @IsString()
  @IsNotEmpty()
  event!: string;

  @IsNotEmpty()
  payment?: any;
}

@Controller('webhooks')
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('asaas')
  @UseGuards(WebhookAuthGuard)
  @HttpCode(HttpStatus.OK)
  async handleAsaasWebhook(@Body() payload: WebhookPayloadDto) {
    // Validar payload básico
    const dto = new WebhookEventDto();
    dto.event = payload.event;
    dto.payment = payload.payment;

    const errors = await validate(dto);
    if (errors.length > 0) {
      this.logger.warn('Payload inválido recebido:', errors);
      throw new BadRequestException('Invalid webhook payload');
    }

    this.logger.log(`📥 Webhook recebido: ${payload.event}`);

    // Processar de forma assíncrona
    setImmediate(async () => {
      try {
        await this.webhooksService.processWebhookEvent(payload);
        this.logger.log(`✅ Evento ${payload.event} processado com sucesso`);
      } catch (error) {
        this.logger.error(`❌ Erro ao processar evento ${payload.event}:`, error);
        // Aqui você pode enviar para uma fila de retry (Bull, RabbitMQ, etc.)
      }
    });

    return {
      received: true,
      event: payload.event,
      timestamp: new Date().toISOString(),
    };
  }
}
```

### 7. Módulo de Webhooks

```typescript
// src/webhooks/webhooks.module.ts
import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';
import { AsaasModule } from '../asaas/asaas.module';

@Module({
  imports: [AsaasModule],
  controllers: [WebhooksController],
  providers: [WebhooksService],
})
export class WebhooksModule {}
```

### 8. App Module

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AsaasModule } from './asaas/asaas.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AsaasModule,
    WebhooksModule,
  ],
})
export class AppModule {}
```

### 9. Variáveis de Ambiente (.env)

```env
# Asaas Configuration
ASAAS_API_KEY=seu_api_key_aqui
ASAAS_ENVIRONMENT=sandbox
ASAAS_TIMEOUT=10000
ASAAS_WEBHOOK_TOKEN=seu_token_secreto_webhook

# Application
PORT=3000
NODE_ENV=development
WEBHOOK_URL=https://seusite.com/webhooks/asaas
WEBHOOK_EMAIL=webhook@seusite.com
```

### 10. Script para Configurar o Webhook

```typescript
// scripts/setup-webhook.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { AsaasService } from '../src/asaas/asaas.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const asaasService = app.get(AsaasService);
  const configService = app.get(ConfigService);

  const webhookUrl = configService.get<string>('WEBHOOK_URL') || 
    'https://seusite.com/webhooks/asaas';
  const webhookToken = configService.get<string>('ASAAS_WEBHOOK_TOKEN')!;
  const webhookEmail = configService.get<string>('WEBHOOK_EMAIL') || 
    'webhook@seusite.com';

  try {
    console.log('🔧 Configurando webhook no Asaas...');

    const webhook = await asaasService.setupWebhook({
      name: 'Webhook Principal - NestJS',
      url: webhookUrl,
      email: webhookEmail,
      authToken: webhookToken,
      events: [
        'PAYMENT_CREATED',
        'PAYMENT_CONFIRMED',
        'PAYMENT_RECEIVED',
        'PAYMENT_OVERDUE',
        'PAYMENT_REFUNDED',
        'PAYMENT_DELETED',
        'PAYMENT_CHARGEBACK_REQUESTED',
      ],
    });

    console.log('✅ Webhook configurado com sucesso!');
    console.log(`   ID: ${webhook.id}`);
    console.log(`   URL: ${webhook.url}`);
    console.log(`   Eventos: ${webhook.events?.join(', ')}`);

    await app.close();
  } catch (error) {
    console.error('❌ Erro ao configurar webhook:', error);
    await app.close();
    process.exit(1);
  }
}

bootstrap();
```

### 11. Adicionar Script no package.json

```json
{
  "scripts": {
    "setup-webhook": "ts-node scripts/setup-webhook.ts"
  }
}
```

---

## 📋 Eventos Disponíveis

### Eventos de Pagamento

| Evento | Descrição |
|--------|-----------|
| `PAYMENT_CREATED` | Pagamento criado |
| `PAYMENT_UPDATED` | Pagamento atualizado |
| `PAYMENT_CONFIRMED` | Pagamento confirmado |
| `PAYMENT_RECEIVED` | Pagamento recebido |
| `PAYMENT_OVERDUE` | Pagamento vencido |
| `PAYMENT_DELETED` | Pagamento deletado |
| `PAYMENT_RESTORED` | Pagamento restaurado |
| `PAYMENT_REFUNDED` | Pagamento reembolsado |
| `PAYMENT_CHARGEBACK_REQUESTED` | Chargeback solicitado |
| `PAYMENT_CHARGEBACK_DISPUTE` | Disputa de chargeback |
| `PAYMENT_AWAITING_RISK_ANALYSIS` | Aguardando análise de risco |
| `PAYMENT_APPROVED_BY_RISK_ANALYSIS` | Aprovado pela análise de risco |
| `PAYMENT_REPROVED_BY_RISK_ANALYSIS` | Reprovado pela análise de risco |

### Estrutura do Payload

```typescript
{
  event: "PAYMENT_CONFIRMED",
  payment: {
    id: "pay_123456789",
    customer: "cus_123456789",
    value: 100.00,
    netValue: 95.00,
    originalValue: 100.00,
    interestValue: 0.00,
    description: "Pagamento de exemplo",
    billingType: "BOLETO",
    status: "CONFIRMED",
    dueDate: "2025-02-15",
    originalDueDate: "2025-02-15",
    paymentDate: "2025-02-10",
    clientPaymentDate: "2025-02-10",
    installmentNumber: null,
    invoiceUrl: "https://...",
    bankSlipUrl: "https://...",
    transactionReceiptUrl: null,
    invoiceNumber: "123456",
    externalReference: null,
    deleted: false,
    anticipated: false,
    anticipable: false,
    refunds: null,
    chargebacks: null,
    // ... outros campos
  }
}
```

---

## ✅ Boas Práticas

### 1. Sempre Validar o Token

```typescript
// ✅ CORRETO
const token = req.headers['asaas-access-token'];
if (token !== EXPECTED_TOKEN) {
  return res.status(401).json({ error: 'Unauthorized' });
}

// ❌ ERRADO - Não validar token
app.post('/webhook', (req, res) => {
  // Processar sem validação
});
```

### 2. Sempre Retornar 200

```typescript
// ✅ CORRETO - Sempre retornar 200
app.post('/webhook', async (req, res) => {
  try {
    await processEvent(req.body);
    res.status(200).json({ received: true });
  } catch (error) {
    // Ainda retornar 200 mesmo em caso de erro
    res.status(200).json({ received: true, error: 'Processing failed' });
  }
});

// ❌ ERRADO - Retornar erro pode causar retry infinito
app.post('/webhook', async (req, res) => {
  try {
    await processEvent(req.body);
  } catch (error) {
    res.status(500).json({ error: 'Internal error' }); // ❌ Causa retry
  }
});
```

### 3. Processar de Forma Assíncrona

```typescript
// ✅ CORRETO - Processar em background
app.post('/webhook', (req, res) => {
  // Responder imediatamente
  res.status(200).json({ received: true });
  
  // Processar em background
  setImmediate(async () => {
    try {
      await processEvent(req.body);
    } catch (error) {
      console.error('Erro:', error);
      // Enviar para fila de retry
    }
  });
});

// ❌ ERRADO - Processar de forma síncrona
app.post('/webhook', async (req, res) => {
  await processEvent(req.body); // Pode demorar muito
  res.status(200).json({ received: true });
});
```

### 4. Implementar Idempotência

```typescript
// ✅ CORRETO - Verificar se evento já foi processado
async function processEvent(event: any) {
  const eventId = event.payment?.id + '_' + event.event;
  
  // Verificar se já foi processado
  const processed = await db.events.findOne({ eventId });
  if (processed) {
    console.log('Evento já processado:', eventId);
    return;
  }
  
  // Processar evento
  await handleEvent(event);
  
  // Marcar como processado
  await db.events.create({ eventId, processedAt: new Date() });
}
```

### 5. Implementar Logs

```typescript
// ✅ CORRETO - Logar todos os eventos
app.post('/webhook', (req, res) => {
  const event = req.body;
  
  // Logar recebimento
  logger.info('Webhook recebido', {
    event: event.event,
    paymentId: event.payment?.id,
    timestamp: new Date().toISOString(),
  });
  
  // Processar...
});
```

### 6. Usar Fila para Processamento

```typescript
// ✅ CORRETO - Usar fila (Bull, RabbitMQ, etc.)
import Queue from 'bull';

const webhookQueue = new Queue('webhooks', {
  redis: { host: 'localhost', port: 6379 },
});

app.post('/webhook', (req, res) => {
  // Adicionar à fila
  webhookQueue.add(req.body, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  });
  
  res.status(200).json({ received: true });
});

// Processar da fila
webhookQueue.process(async (job) => {
  await processEvent(job.data);
});
```

---

## 🔧 Troubleshooting

### Problema: Webhook não está recebendo eventos

**Soluções:**

1. **Verificar se o webhook está ativo:**
```typescript
const webhook = await sdk.webhook.retrieveASingleWebhook('webhook_id');
console.log('Ativo:', webhook.enabled); // Deve ser true
```

2. **Verificar URL do webhook:**
```typescript
console.log('URL:', webhook.url); // Deve ser acessível publicamente
```

3. **Testar endpoint manualmente:**
```bash
curl -X POST https://seusite.com/webhooks/asaas \
  -H "asaas-access-token: seu-token" \
  -H "Content-Type: application/json" \
  -d '{"event":"TEST","payment":{"id":"test"}}'
```

### Problema: Token inválido

**Solução:**

Verificar se o token configurado no webhook corresponde ao token esperado no servidor:

```typescript
// No webhook configurado
authToken: 'meu-token-secreto-123'

// No servidor
const EXPECTED_TOKEN = 'meu-token-secreto-123'; // Deve ser igual
```

### Problema: Eventos duplicados

**Solução:**

Implementar idempotência:

```typescript
const processedEvents = new Set<string>();

app.post('/webhook', (req, res) => {
  const eventId = `${req.body.payment?.id}_${req.body.event}`;
  
  if (processedEvents.has(eventId)) {
    return res.status(200).json({ received: true, duplicate: true });
  }
  
  processedEvents.add(eventId);
  // Processar...
});
```

### Problema: Timeout no processamento

**Solução:**

Processar de forma assíncrona:

```typescript
app.post('/webhook', (req, res) => {
  // Responder imediatamente
  res.status(200).json({ received: true });
  
  // Processar depois
  setTimeout(async () => {
    await processEvent(req.body);
  }, 0);
});
```

---

## 🧪 Testando Localmente

### Usando ngrok

```bash
# 1. Instalar ngrok
npm install -g ngrok

# 2. Iniciar seu servidor
npm run start:dev

# 3. Em outro terminal, criar túnel
ngrok http 3000

# 4. Usar a URL do ngrok (ex: https://abc123.ngrok.io) no webhook
# 5. Configurar webhook apontando para: https://abc123.ngrok.io/webhooks/asaas
```

### Testando com curl

```bash
# Simular evento de pagamento confirmado
curl -X POST http://localhost:3000/webhooks/asaas \
  -H "asaas-access-token: seu-token-secreto" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "PAYMENT_CONFIRMED",
    "payment": {
      "id": "pay_123456789",
      "customer": "cus_123456789",
      "value": 100.00,
      "status": "CONFIRMED"
    }
  }'
```

---

## 📚 Recursos Adicionais

- [Documentação Oficial da API Asaas](https://docs.asaas.com/)
- [Documentação de Webhooks Asaas](https://docs.asaas.com/docs/webhooks)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Express.js Documentation](https://expressjs.com/)

---

## 📝 Exemplo Completo de Uso

```typescript
import { AsaasSdk, Environment } from '@luquinhasbrito/asaas-api-sdk-typescript';

async function setupWebhook() {
  const sdk = new AsaasSdk({
    apiKeyAuthConfig: {
      apiKey: process.env.ASAAS_API_KEY!,
    },
    environment: Environment.PRODUCTION,
  });

  // Criar webhook
  const webhook = await sdk.webhook.createNewWebhook({
    name: 'Webhook Principal',
    url: 'https://api.meusite.com/webhook/asaas',
    email: 'dev@meusite.com',
    enabled: true,
    apiVersion: 3,
    authToken: process.env.ASAAS_WEBHOOK_TOKEN!,
    sendType: 'NON_SEQUENTIALLY',
    events: [
      'PAYMENT_CREATED',
      'PAYMENT_CONFIRMED',
      'PAYMENT_RECEIVED',
      'PAYMENT_OVERDUE',
      'PAYMENT_REFUNDED',
    ],
  });

  console.log('✅ Webhook configurado:', webhook.id);
  return webhook;
}

setupWebhook().catch(console.error);
```

---

**Desenvolvido com ❤️ para a comunidade Asaas**

