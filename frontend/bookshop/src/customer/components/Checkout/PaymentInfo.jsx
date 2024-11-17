import React, { useState } from 'react';
import { CreditCard, Wallet, Building2, CircleDollarSign } from 'lucide-react';

// Mock data for payment methods
const paymentMethods = [
  {
    id: 1,
    name: 'Thẻ tín dụng/ghi nợ',
    icon: CreditCard,
    description: 'Thanh toán an toàn với Visa, Mastercard, JCB'
  },
  {
    id: 2,
    name: 'Ví điện tử',
    icon: Wallet,
    description: 'Momo, ZaloPay, VNPay'
  },
  {
    id: 3,
    name: 'Chuyển khoản ngân hàng',
    icon: Building2,
    description: 'Chuyển khoản qua tài khoản ngân hàng'
  },
  {
    id: 4,
    name: 'Thanh toán khi nhận hàng',
    icon: CircleDollarSign,
    description: 'Thanh toán bằng tiền mặt khi nhận hàng'
  }
];

// Mock data for order summary
const orderSummary = {
  subtotal: 1200000,
  shipping: 30000,
  discount: 50000,
  total: 1180000
};

const PaymentInfo = () => {
  const [selectedMethod, setSelectedMethod] = useState(1);

  return (
      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Thông tin thanh toán</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Payment Methods Section */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Chọn hình thức thanh toán</h2>

            <div className="space-y-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                    <div
                        key={method.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all
                    ${selectedMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'}`}
                        onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">{method.name}</h3>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <div className={`w-5 h-5 rounded-full border-2 
                        ${selectedMethod === method.id
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'}`}
                          />
                        </div>
                      </div>
                    </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Tổng đơn hàng</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span>{orderSummary.subtotal.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span>{orderSummary.shipping.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Giảm giá</span>
                <span className="text-green-600">-{orderSummary.discount.toLocaleString()}đ</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between font-semibold">
                <span>Tổng cộng</span>
                <span className="text-lg text-blue-600">{orderSummary.total.toLocaleString()}đ</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>
  );
};

export default PaymentInfo;