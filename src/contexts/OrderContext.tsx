import React, { createContext, useContext, useState } from 'react';
import { orderService } from '@/services/orderService';
import { Order, CreateOrderRequest } from '@/types/api';
import { useToast } from '@/components/ui/use-toast';

interface OrderContextType {
  orders: Order[];
  acceptedOrders: Order[];
  isLoading: boolean;
  createOrder: (data: CreateOrderRequest) => Promise<Order>;
  fetchOrders: (params?: any) => Promise<void>;
  fetchAcceptedOrders: (params?: any) => Promise<void>;
  acceptOrder: (orderId: string) => Promise<void>;
  cancelOrder: (orderId: string, reason?: string) => Promise<void>;
  cancelAcceptance: (orderId: string, reason?: string) => Promise<void>;
  confirmPayment: (orderId: string) => Promise<void>;
  uploadProof: (orderId: string, file: File) => Promise<void>;
  confirmDelivery: (orderId: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [acceptedOrders, setAcceptedOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createOrder = async (data: CreateOrderRequest): Promise<Order> => {
    try {
      setIsLoading(true);
      const response = await orderService.createOrder(data);
      
      // Add the new order to the orders list
      setOrders(prevOrders => [response.data, ...prevOrders]);
      
      toast({
        title: "Order created",
        description: "Your order has been created successfully.",
      });
      
      return response.data;
    } catch (error: any) {
      toast({
        title: "Order creation failed",
        description: error.response?.data?.message || "Failed to create order. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async (params?: any) => {
    try {
      setIsLoading(true);
      const response = await orderService.getMyOrders(params);
      setOrders(response.data);
    } catch (error: any) {
      toast({
        title: "Failed to fetch orders",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAcceptedOrders = async (params?: any) => {
    try {
      setIsLoading(true);
      const response = await orderService.getMyAcceptedOrders(params);
      setAcceptedOrders(response.data);
    } catch (error: any) {
      toast({
        title: "Failed to fetch accepted orders",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const acceptOrder = async (orderId: string) => {
    try {
      setIsLoading(true);
      await orderService.acceptOrder(orderId);
      
      // Update orders list
      fetchOrders();
      fetchAcceptedOrders();
      
      toast({
        title: "Order accepted",
        description: "You have successfully accepted the order.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to accept order",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOrder = async (orderId: string, reason?: string) => {
    try {
      setIsLoading(true);
      await orderService.cancelOrder(orderId, reason);
      
      // Update orders list
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: 'cancelled' } : order
        )
      );
      
      toast({
        title: "Order cancelled",
        description: "Your order has been cancelled successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to cancel order",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelAcceptance = async (orderId: string, reason?: string) => {
    try {
      setIsLoading(true);
      await orderService.cancelAcceptance(orderId, reason);
      
      // Update orders lists
      fetchOrders();
      fetchAcceptedOrders();
      
      toast({
        title: "Acceptance cancelled",
        description: "You have cancelled your acceptance of this order.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to cancel acceptance",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const confirmPayment = async (orderId: string) => {
    try {
      setIsLoading(true);
      await orderService.confirmPayment(orderId);
      
      // Update orders list
      fetchOrders();
      fetchAcceptedOrders();
      
      toast({
        title: "Payment confirmed",
        description: "You have confirmed the payment for this order.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to confirm payment",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadProof = async (orderId: string, file: File) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('proof', file);
      
      await orderService.uploadProof(orderId, formData);
      
      // Update orders list
      fetchOrders();
      fetchAcceptedOrders();
      
      toast({
        title: "Proof uploaded",
        description: "Purchase proof has been uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to upload proof",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelivery = async (orderId: string) => {
    try {
      setIsLoading(true);
      await orderService.confirmDelivery(orderId);
      
      // Update orders list
      fetchOrders();
      fetchAcceptedOrders();
      
      toast({
        title: "Delivery confirmed",
        description: "You have confirmed the delivery of this order.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to confirm delivery",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        acceptedOrders,
        isLoading,
        createOrder,
        fetchOrders,
        fetchAcceptedOrders,
        acceptOrder,
        cancelOrder,
        cancelAcceptance,
        confirmPayment,
        uploadProof,
        confirmDelivery,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
