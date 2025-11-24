# 🚀 Integração Completa do SDK Asaas com NestJS

Este guia apresenta passo a passo como integrar o SDK Asaas TypeScript em uma aplicação NestJS, incluindo configuração, módulos, serviços, controllers e exemplos práticos.

---

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação](#instalação)
3. [Configuração Inicial](#configuração-inicial)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Módulo Asaas](#módulo-asaas)
6. [Service Asaas](#service-asaas)
7. [Controllers](#controllers)
8. [Webhooks](#webhooks)
9. [Validação e DTOs](#validação-e-dtos)
10. [Tratamento de Erros](#tratamento-de-erros)
11. [Testes](#testes)
12. [Exemplos Completos](#exemplos-completos)

---

## 📦 Pré-requisitos

- Node.js >= 16.0.0
- NestJS >= 10.0.0
- TypeScript >= 5.0.0
- Conta Asaas com API Key

---

## 🔧 Instalação

### 1. Instalar Dependências

```bash
# Instalar NestJS CLI (se ainda não tiver)
npm i -g @nestjs/cli

# Criar novo projeto NestJS (se necessário)
nest new meu-projeto-asaas

# Entrar no diretório
cd meu-projeto-asaas

# Instalar SDK Asaas
npm install @luquinhasbrito/asaas-api-sdk-typescript

# Instalar dependências adicionais do NestJS
npm install @nestjs/config class-validator class-transformer
```

### 2. Estrutura de Pastas Recomendada

```
src/
├── asaas/
│   ├── asaas.module.ts
│   ├── asaas.service.ts
│   ├── asaas.controller.ts
│   └── dto/
│       ├── create-payment.dto.ts
│       ├── create-customer.dto.ts
│       └── webhook-event.dto.ts
├── webhooks/
│   ├── webhooks.module.ts
│   ├── webhooks.service.ts
│   ├── webhooks.controller.ts
│   ├── guards/
│   │   └── webhook-auth.guard.ts
│   └── dto/
│       └── webhook-payload.dto.ts
├── payments/
│   ├── payments.module.ts
│   ├── payments.service.ts
│   └── payments.controller.ts
├── customers/
│   ├── customers.module.ts
│   ├── customers.service.ts
│   └── customers.controller.ts
└── app.module.ts
```

---

## ⚙️ Configuração Inicial

### 1. Variáveis de Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto:

```env
# Asaas Configuration
ASAAS_API_KEY=sua_api_key_aqui
ASAAS_ENVIRONMENT=sandbox
ASAAS_TIMEOUT=10000
ASAAS_WEBHOOK_TOKEN=seu_token_secreto_webhook

# Application
PORT=3000
NODE_ENV=development
WEBHOOK_URL=https://seusite.com/webhooks/asaas
WEBHOOK_EMAIL=webhook@seusite.com
```

### 2. Configurar ConfigModule

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AsaasModule } from './asaas/asaas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AsaasModule,
  ],
})
export class AppModule {}
```

---

## 📁 Módulo Asaas

### 1. Criar Módulo Asaas

```typescript
// src/asaas/asaas.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AsaasSdk, Environment } from '@luquinhasbrito/asaas-api-sdk-typescript';
import { AsaasService } from './asaas.service';
import { AsaasController } from './asaas.controller';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'ASAAS_SDK',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const apiKey = configService.get<string>('ASAAS_API_KEY');
        const environment = configService.get<string>('ASAAS_ENVIRONMENT');
        const timeout = configService.get<number>('ASAAS_TIMEOUT', 10000);

        if (!apiKey) {
          throw new Error('ASAAS_API_KEY não configurada nas variáveis de ambiente');
        }

        return new AsaasSdk({
          apiKeyAuthConfig: {
            apiKey,
            apiKeyHeader: 'access_token',
          },
          environment: environment === 'production' 
            ? Environment.PRODUCTION 
            : Environment.SANDBOX,
          timeout,
          retryConfig: {
            maxRetries: 3,
            initialDelay: 200,
            maxDelay: 2000,
            backoffFactor: 2,
            statusCodesToRetry: [408, 429, 500, 502, 503, 504],
            httpMethodsToRetry: ['GET', 'POST'],
          },
        });
      },
    },
    AsaasService,
  ],
  controllers: [AsaasController],
  exports: ['ASAAS_SDK', AsaasService],
})
export class AsaasModule {}
```

### 2. Criar Service Asaas

```typescript
// src/asaas/asaas.service.ts
import { Injectable, Inject, Logger } from '@nestjs/common';
import { AsaasSdk } from '@luquinhasbrito/asaas-api-sdk-typescript';
import {
  WebhookConfigSaveRequestDto,
  WebhookConfigUpdateRequestDto,
} from '@luquinhasbrito/asaas-api-sdk-typescript';

@Injectable()
export class AsaasService {
  private readonly logger = new Logger(AsaasService.name);

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
    this.logger.log(`Configurando webhook: ${config.name}`);

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

    try {
      const webhook = await this.sdk.webhook.createNewWebhook(webhookConfig);
      this.logger.log(`Webhook criado com sucesso: ${webhook.id}`);
      return webhook;
    } catch (error) {
      this.logger.error('Erro ao criar webhook:', error);
      throw error;
    }
  }

  /**
   * Lista todos os webhooks configurados
   */
  async listWebhooks(offset = 0, limit = 20) {
    return await this.sdk.webhook.listWebhooks({ offset, limit });
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
  async updateWebhook(id: string, updates: Partial<WebhookConfigUpdateRequestDto>) {
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

### 3. Criar Controller Asaas (Opcional - para gerenciar webhooks)

```typescript
// src/asaas/asaas.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AsaasService } from './asaas.service';
import { ConfigService } from '@nestjs/config';

@Controller('asaas')
export class AsaasController {
  constructor(
    private readonly asaasService: AsaasService,
    private readonly configService: ConfigService,
  ) {}

  @Post('webhooks/setup')
  @HttpCode(HttpStatus.CREATED)
  async setupWebhook(@Body() config: {
    name: string;
    url: string;
    email: string;
    authToken: string;
    events: string[];
  }) {
    return await this.asaasService.setupWebhook(config);
  }

  @Get('webhooks')
  async listWebhooks(
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.asaasService.listWebhooks(offset, limit);
  }

  @Get('webhooks/:id')
  async getWebhook(@Param('id') id: string) {
    return await this.asaasService.getWebhook(id);
  }

  @Put('webhooks/:id')
  async updateWebhook(
    @Param('id') id: string,
    @Body() updates: any,
  ) {
    return await this.asaasService.updateWebhook(id, updates);
  }

  @Delete('webhooks/:id')
  @HttpCode(HttpStatus.OK)
  async removeWebhook(@Param('id') id: string) {
    return await this.asaasService.removeWebhook(id);
  }
}
```

---

## 💳 Módulo de Pagamentos

### 1. DTOs

```typescript
// src/asaas/dto/create-payment.dto.ts
import { IsString, IsNumber, IsOptional, IsEnum, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum BillingType {
  BOLETO = 'BOLETO',
  CREDIT_CARD = 'CREDIT_CARD',
  PIX = 'PIX',
  DEBIT_CARD = 'DEBIT_CARD',
}

class CreditCardDto {
  @IsString()
  holderName!: string;

  @IsString()
  number!: string;

  @IsString()
  expiryMonth!: string;

  @IsString()
  expiryYear!: string;

  @IsString()
  ccv!: string;
}

class CreditCardHolderInfoDto {
  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  cpfCnpj!: string;

  @IsString()
  postalCode!: string;

  @IsString()
  addressNumber!: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

export class CreatePaymentDto {
  @IsString()
  customer!: string;

  @IsEnum(BillingType)
  billingType!: BillingType;

  @IsNumber()
  value!: number;

  @IsString()
  dueDate!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  externalReference?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreditCardDto)
  creditCard?: CreditCardDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreditCardHolderInfoDto)
  creditCardHolderInfo?: CreditCardHolderInfoDto;

  @IsOptional()
  @IsString()
  remoteIp?: string;
}
```

### 2. Service de Pagamentos

```typescript
// src/payments/payments.service.ts
import { Injectable, Inject, Logger } from '@nestjs/common';
import { AsaasSdk } from '@luquinhasbrito/asaas-api-sdk-typescript';
import { CreatePaymentDto } from '../asaas/dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @Inject('ASAAS_SDK') private readonly sdk: AsaasSdk,
  ) {}

  /**
   * Cria um novo pagamento
   */
  async createPayment(dto: CreatePaymentDto) {
    this.logger.log(`Criando pagamento para cliente: ${dto.customer}`);

    try {
      const payment = await this.sdk.payment.createPayment({
        customer: dto.customer,
        billingType: dto.billingType,
        value: dto.value,
        dueDate: dto.dueDate,
        description: dto.description,
        externalReference: dto.externalReference,
        creditCard: dto.creditCard,
        creditCardHolderInfo: dto.creditCardHolderInfo,
        remoteIp: dto.remoteIp,
      });

      this.logger.log(`Pagamento criado com sucesso: ${payment.id}`);
      return payment;
    } catch (error) {
      this.logger.error('Erro ao criar pagamento:', error);
      throw error;
    }
  }

  /**
   * Lista pagamentos
   */
  async listPayments(params?: {
    offset?: number;
    limit?: number;
    customer?: string;
    status?: string;
    billingType?: string;
  }) {
    return await this.sdk.payment.listPayments(params);
  }

  /**
   * Obtém um pagamento específico
   */
  async getPayment(id: string) {
    return await this.sdk.payment.retrieveASinglePayment(id);
  }

  /**
   * Atualiza um pagamento
   */
  async updatePayment(id: string, updates: any) {
    return await this.sdk.payment.updatePayment(id, updates);
  }

  /**
   * Deleta um pagamento
   */
  async deletePayment(id: string) {
    return await this.sdk.payment.deletePayment(id);
  }

  /**
   * Captura um pagamento pré-autorizado
   */
  async capturePayment(id: string, value?: number) {
    return await this.sdk.payment.capturePayment(id, { value });
  }
}
```

### 3. Controller de Pagamentos

```typescript
// src/payments/payments.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from '../asaas/dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.CREATED)
  async createPayment(@Body() dto: CreatePaymentDto) {
    return await this.paymentsService.createPayment(dto);
  }

  @Get()
  async listPayments(
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
    @Query('customer') customer?: string,
    @Query('status') status?: string,
    @Query('billingType') billingType?: string,
  ) {
    return await this.paymentsService.listPayments({
      offset,
      limit,
      customer,
      status,
      billingType,
    });
  }

  @Get(':id')
  async getPayment(@Param('id') id: string) {
    return await this.paymentsService.getPayment(id);
  }

  @Put(':id')
  async updatePayment(
    @Param('id') id: string,
    @Body() updates: any,
  ) {
    return await this.paymentsService.updatePayment(id, updates);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletePayment(@Param('id') id: string) {
    return await this.paymentsService.deletePayment(id);
  }

  @Post(':id/capture')
  @HttpCode(HttpStatus.OK)
  async capturePayment(
    @Param('id') id: string,
    @Body('value') value?: number,
  ) {
    return await this.paymentsService.capturePayment(id, value);
  }
}
```

### 4. Módulo de Pagamentos

```typescript
// src/payments/payments.module.ts
import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { AsaasModule } from '../asaas/asaas.module';

@Module({
  imports: [AsaasModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
```

---

## 👤 Módulo de Clientes

### 1. DTOs

```typescript
// src/asaas/dto/create-customer.dto.ts
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsBoolean,
} from 'class-validator';

export enum PersonType {
  FISICA = 'FISICA',
  JURIDICA = 'JURIDICA',
}

export class CreateCustomerDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  cpfCnpj!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  mobilePhone?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  addressNumber?: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  externalReference?: string;

  @IsOptional()
  @IsBoolean()
  notificationDisabled?: boolean;

  @IsOptional()
  @IsEnum(PersonType)
  personType?: PersonType;
}
```

### 2. Service de Clientes

```typescript
// src/customers/customers.service.ts
import { Injectable, Inject, Logger } from '@nestjs/common';
import { AsaasSdk } from '@luquinhasbrito/asaas-api-sdk-typescript';
import { CreateCustomerDto } from '../asaas/dto/create-customer.dto';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger(CustomersService.name);

  constructor(
    @Inject('ASAAS_SDK') private readonly sdk: AsaasSdk,
  ) {}

  async createCustomer(dto: CreateCustomerDto) {
    this.logger.log(`Criando cliente: ${dto.name}`);

    try {
      const customer = await this.sdk.customer.createCustomer(dto);
      this.logger.log(`Cliente criado com sucesso: ${customer.id}`);
      return customer;
    } catch (error) {
      this.logger.error('Erro ao criar cliente:', error);
      throw error;
    }
  }

  async listCustomers(params?: {
    offset?: number;
    limit?: number;
    name?: string;
    email?: string;
    cpfCnpj?: string;
  }) {
    return await this.sdk.customer.listCustomers(params);
  }

  async getCustomer(id: string) {
    return await this.sdk.customer.retrieveASingleCustomer(id);
  }

  async updateCustomer(id: string, updates: any) {
    return await this.sdk.customer.updateCustomer(id, updates);
  }

  async deleteCustomer(id: string) {
    return await this.sdk.customer.deleteCustomer(id);
  }
}
```

### 3. Controller de Clientes

```typescript
// src/customers/customers.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from '../asaas/dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.CREATED)
  async createCustomer(@Body() dto: CreateCustomerDto) {
    return await this.customersService.createCustomer(dto);
  }

  @Get()
  async listCustomers(
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('cpfCnpj') cpfCnpj?: string,
  ) {
    return await this.customersService.listCustomers({
      offset,
      limit,
      name,
      email,
      cpfCnpj,
    });
  }

  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    return await this.customersService.getCustomer(id);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updates: any,
  ) {
    return await this.customersService.updateCustomer(id, updates);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteCustomer(@Param('id') id: string) {
    return await this.customersService.deleteCustomer(id);
  }
}
```

### 4. Módulo de Clientes

```typescript
// src/customers/customers.module.ts
import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { AsaasModule } from '../asaas/asaas.module';

@Module({
  imports: [AsaasModule],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
```

---

## 🔔 Webhooks

### 1. DTOs

```typescript
// src/webhooks/dto/webhook-payload.dto.ts
import { IsString, IsOptional, IsObject, IsArray } from 'class-validator';

export class WebhookPayloadDto {
  @IsString()
  event!: string;

  @IsOptional()
  @IsObject()
  payment?: any;

  @IsOptional()
  @IsObject()
  customer?: any;

  @IsOptional()
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

### 2. Guard de Autenticação

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

### 3. Service de Webhooks

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
  }

  private async handlePaymentOverdue(payload: WebhookPayloadDto) {
    const payment = payload.payment;
    this.logger.warn(`Pagamento vencido: ${payment.id}`);
    
    // Implementar lógica: enviar notificação, bloquear acesso, etc.
  }

  private async handlePaymentRefunded(payload: WebhookPayloadDto) {
    const payment = payload.payment;
    this.logger.log(`Pagamento reembolsado: ${payment.id}`);
    
    // Implementar lógica: reverter acesso, atualizar status, etc.
  }

  private async handlePaymentDeleted(payload: WebhookPayloadDto) {
    const payment = payload.payment;
    this.logger.log(`Pagamento deletado: ${payment.id}`);
  }

  private async handleChargebackRequested(payload: WebhookPayloadDto) {
    const payment = payload.payment;
    this.logger.warn(`Chargeback solicitado: ${payment.id}`);
    
    // Implementar lógica: notificar equipe, iniciar disputa, etc.
  }
}
```

### 4. Controller de Webhooks

```typescript
// src/webhooks/webhooks.controller.ts
import {
  Controller,
  Post,
  Body,
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

### 5. Módulo de Webhooks

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

---

## 🛡️ Tratamento de Erros

### 1. Exception Filter Global

```typescript
// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiError, ErrorResponseDtoException } from '@luquinhasbrito/asaas-api-sdk-typescript';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = typeof exceptionResponse === 'string' 
        ? exceptionResponse 
        : (exceptionResponse as any).message || message;
      details = typeof exceptionResponse === 'object' ? exceptionResponse : null;
    } else if (exception instanceof ApiError) {
      status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
      details = {
        status: exception.status,
        response: exception.response?.data,
      };
    } else if (exception instanceof ErrorResponseDtoException) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
      details = {
        errors: exception.errorModel?.errors,
      };
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    this.logger.error(
      `HTTP ${status} Error: ${message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      ...(details && { details }),
    });
  }
}
```

### 2. Usar o Filter no App Module

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
```

---

## 📝 App Module Completo

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AsaasModule } from './asaas/asaas.module';
import { PaymentsModule } from './payments/payments.module';
import { CustomersModule } from './customers/customers.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AsaasModule,
    PaymentsModule,
    CustomersModule,
    WebhooksModule,
  ],
})
export class AppModule {}
```

---

## 🧪 Script para Configurar Webhook

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

### Adicionar Script no package.json

```json
{
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "setup-webhook": "ts-node scripts/setup-webhook.ts"
  }
}
```

---

## 🧪 Testes

### 1. Teste Unitário do Service

```typescript
// src/payments/payments.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { AsaasSdk } from '@luquinhasbrito/asaas-api-sdk-typescript';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let sdk: jest.Mocked<AsaasSdk>;

  beforeEach(async () => {
    const mockSdk = {
      payment: {
        createPayment: jest.fn(),
        listPayments: jest.fn(),
        retrieveASinglePayment: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: 'ASAAS_SDK',
          useValue: mockSdk,
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
    sdk = module.get('ASAAS_SDK');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a payment', async () => {
    const mockPayment = { id: 'pay_123', value: 100 };
    sdk.payment.createPayment.mockResolvedValue(mockPayment);

    const result = await service.createPayment({
      customer: 'cus_123',
      billingType: 'BOLETO',
      value: 100,
      dueDate: '2025-02-15',
    });

    expect(result).toEqual(mockPayment);
    expect(sdk.payment.createPayment).toHaveBeenCalled();
  });
});
```

---

## 📚 Exemplos de Uso

### Criar Cliente e Pagamento

```typescript
// Exemplo de uso em um controller ou service
async function criarVenda() {
  // 1. Criar cliente
  const customer = await customersService.createCustomer({
    name: 'João Silva',
    email: 'joao@example.com',
    cpfCnpj: '12345678900',
    phone: '47999999999',
    postalCode: '01310100',
    address: 'Rua Exemplo',
    addressNumber: '123',
    city: 'São Paulo',
    state: 'SP',
  });

  // 2. Criar pagamento
  const payment = await paymentsService.createPayment({
    customer: customer.id!,
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

  return { customer, payment };
}
```

---

## 🚀 Deploy e Produção

### 1. Variáveis de Ambiente em Produção

Certifique-se de configurar todas as variáveis de ambiente:

```env
ASAAS_API_KEY=sua_api_key_producao
ASAAS_ENVIRONMENT=production
ASAAS_TIMEOUT=10000
ASAAS_WEBHOOK_TOKEN=token_secreto_forte
WEBHOOK_URL=https://api.seudominio.com/webhooks/asaas
WEBHOOK_EMAIL=webhook@seudominio.com
```

### 2. Build para Produção

```bash
# Build
npm run build

# Iniciar em produção
npm run start:prod
```

---

## 📖 Recursos Adicionais

- [Documentação NestJS](https://docs.nestjs.com/)
- [Documentação SDK Asaas](./GUIA_USO.md)
- [Guia de Webhooks](./WEBHOOKS.md)
- [Documentação API Asaas](https://docs.asaas.com/)

---

**Desenvolvido com ❤️ para a comunidade Asaas**

