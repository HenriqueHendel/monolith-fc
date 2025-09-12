export interface InputProcessPaymentFacadeDto {
  amount: number
  orderId: string
}

export interface OutputProcessPaymentFacadeDto {
  transactionId: string
  amount: number
  orderId: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface PaymentFacadeInterface {
  processPayment: (
    input: InputProcessPaymentFacadeDto,
  ) => Promise<OutputProcessPaymentFacadeDto>
}
