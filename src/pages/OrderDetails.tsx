import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrder } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Upload, CheckCircle, XCircle, Clock, CreditCard, Package } from 'lucide-react';
import { orderService } from '@/services/orderService';
import { Order } from '@/types/api';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { acceptOrder, cancelOrder, cancelAcceptance, confirmPayment, uploadProof, confirmDelivery } = useOrder();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelReason, setCancelReason] = useState('');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showProofDialog, setShowProofDialog] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const response = await orderService.getOrderById(id);
        setOrder(response.data);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [id]);
  
  const handleAcceptOrder = async () => {
    if (!id) return;
    
    try {
      await acceptOrder(id);
      // Refresh order details
      const response = await orderService.getOrderById(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Failed to accept order:', error);
    }
  };
  
  const handleCancelOrder = async () => {
    if (!id) return;
    
    try {
      await cancelOrder(id, cancelReason);
      // Refresh order details
      const response = await orderService.getOrderById(id);
      setOrder(response.data);
      setShowCancelDialog(false);
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };
  
  const handleCancelAcceptance = async () => {
    if (!id) return;
    
    try {
      await cancelAcceptance(id, cancelReason);
      // Refresh order details
      const response = await orderService.getOrderById(id);
      setOrder(response.data);
      setShowCancelDialog(false);
    } catch (error) {
      console.error('Failed to cancel acceptance:', error);
    }
  };
  
  const handleConfirmPayment = async () => {
    if (!id) return;
    
    try {
      await confirmPayment(id);
      // Refresh order details
      const response = await orderService.getOrderById(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Failed to confirm payment:', error);
    }
  };
  
  const handleUploadProof = async () => {
    if (!id || !proofFile) return;
    
    try {
      await uploadProof(id, proofFile);
      // Refresh order details
      const response = await orderService.getOrderById(id);
      setOrder(response.data);
      setShowProofDialog(false);
      setProofFile(null);
    } catch (error) {
      console.error('Failed to upload proof:', error);
    }
  };
  
  const handleConfirmDelivery = async () => {
    if (!id) return;
    
    try {
      await confirmDelivery(id);
      // Refresh order details
      const response = await orderService.getOrderById(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Failed to confirm delivery:', error);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Accepted</Badge>;
      case 'payment_confirmed':
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Payment Confirmed</Badge>;
      case 'proof_uploaded':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Proof Uploaded</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="container max-w-4xl mx-auto py-10">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The order you're looking for doesn't exist or you don't have permission to view it.
              </p>
              <Button onClick={() => navigate('/dashboard')}>
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const isCardHolder = user?.role === 'card_holder';
  const isBuyer = user?.role === 'buyer';
  const canCancel = order.status === 'pending' || order.status === 'accepted';
  const canAccept = order.status === 'pending' && isCardHolder;
  const canConfirmPayment = order.status === 'accepted' && isBuyer;
  const canUploadProof = order.status === 'payment_confirmed' && isBuyer;
  const canConfirmDelivery = order.status === 'proof_uploaded' && isCardHolder;
  
  return (
    <div className="container max-w-4xl mx-auto py-10">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Order #{order.id.substring(0, 8)}</CardTitle>
              <CardDescription>
                Created on {new Date(order.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
            {getStatusBadge(order.status)}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Order Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Product</span>
                  <span className="font-medium">{order.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Amount</span>
                  <span className="font-medium">${order.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Reward</span>
                  <span className="font-medium">${order.reward.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total</span>
                  <span className="font-medium">${(order.amount + order.reward).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Participants</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Buyer</span>
                  <span className="font-medium">{order.buyer?.name || 'Not assigned'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Card Holder</span>
                  <span className="font-medium">{order.cardHolder?.name || 'Not assigned'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Order Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-3 bg-green-100 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Order Created</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              
              {order.acceptedAt && (
                <div className="flex items-start">
                  <div className="mr-3 bg-blue-100 p-2 rounded-full">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Order Accepted</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.acceptedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              
              {order.paymentConfirmedAt && (
                <div className="flex items-start">
                  <div className="mr-3 bg-indigo-100 p-2 rounded-full">
                    <CreditCard className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium">Payment Confirmed</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.paymentConfirmedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              
              {order.proofUploadedAt && (
                <div className="flex items-start">
                  <div className="mr-3 bg-purple-100 p-2 rounded-full">
                    <Upload className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Proof Uploaded</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.proofUploadedAt).toLocaleString()}
                    </p>
                    {order.proofUrl && (
                      <a 
                        href={order.proofUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline mt-1 inline-block"
                      >
                        View Proof
                      </a>
                    )}
                  </div>
                </div>
              )}
              
              {order.completedAt && (
                <div className="flex items-start">
                  <div className="mr-3 bg-green-100 p-2 rounded-full">
                    <Package className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Order Completed</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.completedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              
              {order.cancelledAt && (
                <div className="flex items-start">
                  <div className="mr-3 bg-red-100 p-2 rounded-full">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Order Cancelled</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.cancelledAt).toLocaleString()}
                    </p>
                    {order.cancelReason && (
                      <p className="text-sm mt-1">
                        Reason: {order.cancelReason}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-wrap gap-3 justify-end">
          {canCancel && (
            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                  Cancel Order
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cancel Order</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to cancel this order? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="cancel-reason">Reason for cancellation (optional)</Label>
                  <Textarea
                    id="cancel-reason"
                    placeholder="Please provide a reason for cancellation"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={isCardHolder && order.status === 'accepted' ? handleCancelAcceptance : handleCancelOrder}
                  >
                    Confirm Cancellation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          
          {canAccept && (
            <Button onClick={handleAcceptOrder}>
              Accept Order
            </Button>
          )}
          
          {canConfirmPayment && (
            <Button onClick={handleConfirmPayment}>
              Confirm Payment
            </Button>
          )}
          
          {canUploadProof && (
            <Dialog open={showProofDialog} onOpenChange={setShowProofDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="mr-2 h-4 w-4" /> Upload Proof
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Payment Proof</DialogTitle>
                  <DialogDescription>
                    Upload a screenshot or photo of your payment confirmation.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="proof-file">Payment Proof</Label>
                  <div className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
                    <input
                      id="proof-file"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <label htmlFor="proof-file" className="cursor-pointer text-center">
                      {proofFile ? (
                        <div className="text-sm">
                          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <p className="font-medium">{proofFile.name}</p>
                          <p className="text-muted-foreground">
                            {(proofFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm font-medium">Click to upload</p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, or PDF (max. 10MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowProofDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUploadProof} disabled={!proofFile}>
                    Upload Proof
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          
          {canConfirmDelivery && (
            <Button onClick={handleConfirmDelivery}>
              Confirm Delivery
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderDetails;
