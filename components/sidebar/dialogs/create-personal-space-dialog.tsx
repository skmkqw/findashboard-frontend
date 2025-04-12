import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTeamStore } from "@/stores/team-store";
import { useState, useEffect } from "react";

interface CreatePersonalSpaceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export const CreatePersonalSpaceDialog: React.FC<CreatePersonalSpaceDialogProps> = ({
    open,
    onOpenChange,
    onSuccess,
}) => {
    const [spaceName, setSpaceName] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const createPersonalSpace = useTeamStore((state) => state.createPersonalSpace);

    useEffect(() => {
        if (open) {
            setError("");
            setSpaceName("");
        }
    }, [open]);

    const handleSubmit = async () => {
        if (!spaceName.trim()) {
            setError("Space name is required");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            await createPersonalSpace({ spaceName });
            onSuccess?.();
            onOpenChange(false);
        } catch (err: any) {
            setError("");
            setTimeout(() => {
                setError(err.message || "Failed to create personal space");
            }, 200);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Personal Space</DialogTitle>
                    <DialogDescription>
                        Create your personal space to get started. This will be your default workspace.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="spaceName">Space Name</Label>
                        <Input
                            id="spaceName"
                            value={spaceName}
                            onChange={(e) => setSpaceName(e.target.value)}
                            placeholder="Enter space name"
                        />
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full"
                    >
                        {isLoading ? "Creating..." : "Create Space"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}; 