import axios, { AxiosInstance } from "axios";
import { AsaasSdkConfig, createAsaasSdkConfig } from "./config/asaas-sdk-config";
import { Environment } from "./http/environment";
import { createDefaultHeadersInterceptor } from "./http/interceptors/default-headers-interceptor";
import { createRetryInterceptor } from "./http/interceptors/retry-interceptor";
import { PaymentService } from "./services/payment-service";
import { CustomerService } from "./services/customer-service";
import { SubscriptionService } from "./services/subscription-service";
import { PixService } from "./services/pix-service";
import { PaymentRefundService } from "./services/payment-refund-service";
import { PaymentDocumentService } from "./services/payment-document-service";
import { PaymentDunningService } from "./services/payment-dunning-service";
import { PaymentLinkService } from "./services/payment-link-service";
import { PaymentSplitService } from "./services/payment-split-service";
import { PaymentWithSummaryDataService } from "./services/payment-with-summary-data-service";
import { PixTransactionService } from "./services/pix-transaction-service";
import { RecurringPixService } from "./services/recurring-pix-service";
import { FinanceService } from "./services/finance-service";
import { FinancialTransactionService } from "./services/financial-transaction-service";
import { TransferService } from "./services/transfer-service";
import { AnticipationService } from "./services/anticipation-service";
import { WebhookService } from "./services/webhook-service";
import { InvoiceService } from "./services/invoice-service";
import { AccountInfoService } from "./services/account-info-service";
import { NotificationService } from "./services/notification-service";
import { InstallmentService } from "./services/installment-service";
import { CreditCardService } from "./services/credit-card-service";
import { CheckoutService } from "./services/checkout-service";
import { SubaccountService } from "./services/subaccount-service";
import { AccountDocumentService } from "./services/account-document-service";
import { BillService } from "./services/bill-service";
import { ChargebackService } from "./services/chargeback-service";
import { CreditBureauReportService } from "./services/credit-bureau-report-service";
import { EscrowAccountService } from "./services/escrow-account-service";
import { FiscalInfoService } from "./services/fiscal-info-service";
import { MobilePhoneRechargeService } from "./services/mobile-phone-recharge-service";
import { SandboxActionsService } from "./services/sandbox-actions-service";

/**
 * Classe principal do SDK Asaas
 * Fornece acesso a todos os serviços da API
 */
export class AsaasSdk {
  // Serviços principais
  public readonly payment: PaymentService;
  public readonly customer: CustomerService;
  public readonly subscription: SubscriptionService;
  public readonly pix: PixService;
  public readonly paymentRefund: PaymentRefundService;
  public readonly paymentDocument: PaymentDocumentService;
  public readonly paymentDunning: PaymentDunningService;
  public readonly paymentLink: PaymentLinkService;
  public readonly paymentSplit: PaymentSplitService;
  public readonly paymentWithSummaryData: PaymentWithSummaryDataService;
  public readonly pixTransaction: PixTransactionService;
  public readonly recurringPix: RecurringPixService;
  public readonly finance: FinanceService;
  public readonly financialTransaction: FinancialTransactionService;
  public readonly transfer: TransferService;
  public readonly anticipation: AnticipationService;
  public readonly webhook: WebhookService;
  public readonly invoice: InvoiceService;
  public readonly accountInfo: AccountInfoService;
  public readonly notification: NotificationService;
  public readonly installment: InstallmentService;
  public readonly creditCard: CreditCardService;
  public readonly checkout: CheckoutService;
  public readonly subaccount: SubaccountService;
  public readonly accountDocument: AccountDocumentService;
  public readonly bill: BillService;
  public readonly chargeback: ChargebackService;
  public readonly creditBureauReport: CreditBureauReportService;
  public readonly escrowAccount: EscrowAccountService;
  public readonly fiscalInfo: FiscalInfoService;
  public readonly mobilePhoneRecharge: MobilePhoneRechargeService;
  public readonly sandboxActions: SandboxActionsService;
  // public readonly mobilePhoneRecharge: MobilePhoneRechargeService;
  // public readonly sandboxActions: SandboxActionsService;

  private readonly config: Required<Omit<AsaasSdkConfig, "baseUrl" | "environment">> & {
    baseUrl: string;
    environment?: Environment;
  };
  private readonly httpClient: AxiosInstance;

  /**
   * Cria uma nova instância do SDK com configuração padrão
   */
  constructor();
  /**
   * Cria uma nova instância do SDK com configuração personalizada
   */
  constructor(config?: AsaasSdkConfig);
  constructor(config?: AsaasSdkConfig) {
    // Cria configuração com valores padrão
    this.config = createAsaasSdkConfig(config);

    // Cria instância do Axios com interceptors
    this.httpClient = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Adiciona interceptor de headers padrão
    this.httpClient.interceptors.request.use(createDefaultHeadersInterceptor(this.config));

    // Adiciona interceptor de autenticação por API Key
    this.httpClient.interceptors.request.use((requestConfig) => {
      if (this.config.apiKeyAuthConfig?.apiKey) {
        const apiKeyHeader = this.config.apiKeyAuthConfig.apiKeyHeader || "access_token";
        requestConfig.headers[apiKeyHeader] = this.config.apiKeyAuthConfig.apiKey;
      }
      return requestConfig;
    });

    // Adiciona interceptor de retry
    const retryInterceptor = createRetryInterceptor(this.config.retryConfig, this.httpClient);
    this.httpClient.interceptors.response.use(retryInterceptor.onFulfilled, retryInterceptor.onRejected);

    // Inicializa serviços principais
    this.payment = new PaymentService(this.httpClient, this.config);
    this.customer = new CustomerService(this.httpClient, this.config);
    this.subscription = new SubscriptionService(this.httpClient, this.config);
    this.pix = new PixService(this.httpClient, this.config);
    this.paymentRefund = new PaymentRefundService(this.httpClient, this.config);
    this.paymentDocument = new PaymentDocumentService(this.httpClient, this.config);
    this.paymentDunning = new PaymentDunningService(this.httpClient, this.config);
    this.paymentLink = new PaymentLinkService(this.httpClient, this.config);
    this.paymentSplit = new PaymentSplitService(this.httpClient, this.config);
    this.paymentWithSummaryData = new PaymentWithSummaryDataService(this.httpClient, this.config);
    this.pixTransaction = new PixTransactionService(this.httpClient, this.config);
    this.recurringPix = new RecurringPixService(this.httpClient, this.config);
    this.finance = new FinanceService(this.httpClient, this.config);
    this.financialTransaction = new FinancialTransactionService(this.httpClient, this.config);
    this.transfer = new TransferService(this.httpClient, this.config);
    this.anticipation = new AnticipationService(this.httpClient, this.config);
    this.webhook = new WebhookService(this.httpClient, this.config);
    this.invoice = new InvoiceService(this.httpClient, this.config);
    this.accountInfo = new AccountInfoService(this.httpClient, this.config);
    this.notification = new NotificationService(this.httpClient, this.config);
    this.installment = new InstallmentService(this.httpClient, this.config);
    this.creditCard = new CreditCardService(this.httpClient, this.config);
    this.checkout = new CheckoutService(this.httpClient, this.config);
    this.subaccount = new SubaccountService(this.httpClient, this.config);
    this.accountDocument = new AccountDocumentService(this.httpClient, this.config);
    this.bill = new BillService(this.httpClient, this.config);
    this.chargeback = new ChargebackService(this.httpClient, this.config);
    this.creditBureauReport = new CreditBureauReportService(this.httpClient, this.config);
    this.escrowAccount = new EscrowAccountService(this.httpClient, this.config);
    this.fiscalInfo = new FiscalInfoService(this.httpClient, this.config);
    this.mobilePhoneRecharge = new MobilePhoneRechargeService(this.httpClient, this.config);
    this.sandboxActions = new SandboxActionsService(this.httpClient, this.config);
  }

  /**
   * Define o ambiente da API (Production ou Sandbox)
   */
  setEnvironment(environment: Environment): void {
    this.config.environment = environment;
    this.config.baseUrl = environment;
    this.httpClient.defaults.baseURL = environment;
  }

  /**
   * Define a URL base da API
   */
  setBaseUrl(baseUrl: string): void {
    this.config.baseUrl = baseUrl;
    this.httpClient.defaults.baseURL = baseUrl;
  }

  /**
   * Define a API Key para autenticação
   */
  setApiKey(apiKey: string): void {
    if (!this.config.apiKeyAuthConfig) {
      this.config.apiKeyAuthConfig = {};
    }
    this.config.apiKeyAuthConfig.apiKey = apiKey;
  }

  /**
   * Define o nome do header para a API Key
   */
  setApiKeyHeader(apiKeyHeader: string): void {
    if (!this.config.apiKeyAuthConfig) {
      this.config.apiKeyAuthConfig = {};
    }
    this.config.apiKeyAuthConfig.apiKeyHeader = apiKeyHeader;
  }
}

