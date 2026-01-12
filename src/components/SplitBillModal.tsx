import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Minus,
  DollarSign,
  Percent,
  Check,
  X,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface Participant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  share: number;
  isPaid: boolean;
}

interface SplitBillModalProps {
  isOpen: boolean;
  onClose: () => void;
  billName?: string;
  billAmount?: number;
}

const defaultParticipants: Participant[] = [
  { id: "1", name: "Arnav Garhwal", email: "arnav.g@email.com", share: 0, isPaid: true },
  { id: "2", name: "Sarah Johnson", email: "sarah.j@email.com", share: 0, isPaid: false },
  { id: "3", name: "Michael Chen", email: "m.chen@email.com", share: 0, isPaid: false },
];

const SplitBillModal = ({ isOpen, onClose, billName = "Bill", billAmount = 100 }: SplitBillModalProps) => {
  const { toast } = useToast();
  const [totalAmount, setTotalAmount] = useState(billAmount.toString());
  const [participants, setParticipants] = useState<Participant[]>(defaultParticipants);
  const [splitEqually, setSplitEqually] = useState(true);
  const [newParticipant, setNewParticipant] = useState({ name: "", email: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  const amount = parseFloat(totalAmount) || 0;
  const equalShare = participants.length > 0 ? amount / participants.length : 0;

  const updateShares = () => {
    if (splitEqually) {
      setParticipants(
        participants.map((p) => ({ ...p, share: equalShare }))
      );
    }
  };

  const handleAddParticipant = () => {
    if (!newParticipant.name) {
      toast({
        title: "Error",
        description: "Please enter a name.",
        variant: "destructive",
      });
      return;
    }

    const participant: Participant = {
      id: Date.now().toString(),
      name: newParticipant.name,
      email: newParticipant.email,
      share: splitEqually ? amount / (participants.length + 1) : 0,
      isPaid: false,
    };

    const updatedParticipants = [...participants, participant];
    if (splitEqually) {
      const newShare = amount / updatedParticipants.length;
      setParticipants(updatedParticipants.map((p) => ({ ...p, share: newShare })));
    } else {
      setParticipants(updatedParticipants);
    }

    setNewParticipant({ name: "", email: "" });
    setShowAddForm(false);
  };

  const handleRemoveParticipant = (id: string) => {
    const updatedParticipants = participants.filter((p) => p.id !== id);
    if (splitEqually && updatedParticipants.length > 0) {
      const newShare = amount / updatedParticipants.length;
      setParticipants(updatedParticipants.map((p) => ({ ...p, share: newShare })));
    } else {
      setParticipants(updatedParticipants);
    }
  };

  const handleShareChange = (id: string, share: number) => {
    setParticipants(
      participants.map((p) => (p.id === id ? { ...p, share } : p))
    );
  };

  const handleTogglePaid = (id: string) => {
    setParticipants(
      participants.map((p) => (p.id === id ? { ...p, isPaid: !p.isPaid } : p))
    );
  };

  const handleSendRequests = () => {
    const unpaidParticipants = participants.filter((p) => !p.isPaid);
    toast({
      title: "Payment Requests Sent",
      description: `Sent to ${unpaidParticipants.length} participant(s).`,
    });
    onClose();
  };

  const totalShares = participants.reduce((sum, p) => sum + p.share, 0);
  const paidAmount = participants.filter((p) => p.isPaid).reduce((sum, p) => sum + p.share, 0);
  const remainingAmount = amount - paidAmount;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Split Bill: {billName}
          </DialogTitle>
          <DialogDescription>
            Divide the bill among participants
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Total Amount */}
          <div className="space-y-2">
            <Label htmlFor="totalAmount">Total Bill Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="totalAmount"
                type="number"
                value={totalAmount}
                onChange={(e) => {
                  setTotalAmount(e.target.value);
                  if (splitEqually) {
                    const newAmount = parseFloat(e.target.value) || 0;
                    const newShare = participants.length > 0 ? newAmount / participants.length : 0;
                    setParticipants(participants.map((p) => ({ ...p, share: newShare })));
                  }
                }}
                className="pl-9 text-lg font-semibold"
              />
            </div>
          </div>

          {/* Split Options */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Split Equally</p>
              <p className="text-sm text-muted-foreground">
                Each person pays ${equalShare.toFixed(2)}
              </p>
            </div>
            <Switch
              checked={splitEqually}
              onCheckedChange={(checked) => {
                setSplitEqually(checked);
                if (checked) {
                  setParticipants(
                    participants.map((p) => ({ ...p, share: equalShare }))
                  );
                }
              }}
            />
          </div>

          {/* Participants */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Participants ({participants.length})</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(!showAddForm)}
                className="gap-1"
              >
                {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {showAddForm ? "Cancel" : "Add"}
              </Button>
            </div>

            {/* Add Participant Form */}
            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 p-4 border border-dashed border-border rounded-lg"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Name"
                      value={newParticipant.name}
                      onChange={(e) =>
                        setNewParticipant({ ...newParticipant, name: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Email (optional)"
                      value={newParticipant.email}
                      onChange={(e) =>
                        setNewParticipant({ ...newParticipant, email: e.target.value })
                      }
                    />
                  </div>
                  <Button onClick={handleAddParticipant} size="sm" className="w-full">
                    Add Participant
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Participant List */}
            <div className="space-y-2">
              {participants.map((participant) => (
                <motion.div
                  key={participant.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    participant.isPaid
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : "border-border bg-muted/50"
                  }`}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>
                      {participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground truncate">
                        {participant.name}
                      </p>
                      {participant.isPaid && (
                        <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs">
                          Paid
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {participant.email || "No email"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {!splitEqually && (
                      <div className="relative w-24">
                        <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                        <Input
                          type="number"
                          value={participant.share.toFixed(2)}
                          onChange={(e) =>
                            handleShareChange(participant.id, parseFloat(e.target.value) || 0)
                          }
                          className="pl-6 h-8 text-sm"
                        />
                      </div>
                    )}
                    {splitEqually && (
                      <span className="font-medium text-foreground">
                        ${participant.share.toFixed(2)}
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleTogglePaid(participant.id)}
                    >
                      <Check
                        className={`w-4 h-4 ${
                          participant.isPaid ? "text-emerald-500" : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                    {participants.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleRemoveParticipant(participant.id)}
                      >
                        <Minus className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Bill</span>
              <span className="font-medium text-foreground">${amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Already Paid</span>
              <span className="text-emerald-500">${paidAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-medium border-t border-border pt-2">
              <span className="text-foreground">Remaining</span>
              <span className="text-foreground">${remainingAmount.toFixed(2)}</span>
            </div>
            {!splitEqually && Math.abs(totalShares - amount) > 0.01 && (
              <p className="text-xs text-destructive">
                ⚠️ Shares don't add up to total (${totalShares.toFixed(2)} vs ${amount.toFixed(2)})
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSendRequests} className="flex-1">
              Send Payment Requests
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SplitBillModal;
