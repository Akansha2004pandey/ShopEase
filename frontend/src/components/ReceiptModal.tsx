import { Receipt } from '@/api/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ReceiptModalProps {
  receipt: Receipt | null;
  open: boolean;
  onClose: () => void;
}

const ReceiptModal = ({ receipt, open, onClose }: ReceiptModalProps) => {
  const navigate = useNavigate();

  if (!receipt) return null;

  // 🧾 Download receipt as a text file
  const handleDownload = () => {
    const content = `
      🧾 Order Receipt
      ------------------------------
      Order ID: ${receipt.id}
      Customer: ${receipt.name}
      Email: ${receipt.email}
      Date: ${new Date(receipt.date).toLocaleString()}
      ------------------------------
      Items:
      ${receipt.items
        .map(
          (item) =>
            `• ${item.product} (x${item.quantity}) - ₹${(
              item.price * item.quantity
            ).toFixed(2)}`
        )
        .join('\n')}
      ------------------------------
      Total: ₹${receipt.total.toFixed(2)}
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `receipt_${receipt.id}.txt`;
    link.click();
  };

  const handleContinueShopping = () => {
    onClose();
    navigate('/');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-accent-foreground" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Order Confirmed!</DialogTitle>
          <DialogDescription className="text-center">
            Thank you for your purchase, {receipt.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Order Details */}
          <div className="bg-secondary rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Order ID</p>
                <p className="font-mono font-medium">{receipt.id}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Date</p>
                <p className="font-medium">{new Date(receipt.date).toLocaleDateString()}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground mb-1">Email</p>
                <p className="font-medium">{receipt.email}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="space-y-2">
              {receipt.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-border last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.product}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-primary/10 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-primary">
                ₹{receipt.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
            <Button className="flex-1" onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;
