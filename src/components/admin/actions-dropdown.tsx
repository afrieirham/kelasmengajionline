import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/core/dropdown-menu";

interface Action {
  label: string;
  variant?: "default" | "destructive";
  onClick?: () => void;
  isSeparator?: boolean;
  key?: string;
}

interface ActionsDropdownProps {
  actions: Action[];
}

export function ActionsDropdown({ actions }: ActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type="button"
          className="border-border bg-background hover:bg-muted hover:text-foreground inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium whitespace-nowrap disabled:pointer-events-none disabled:opacity-50"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) =>
          action.isSeparator ? (
            <DropdownMenuSeparator key={`sep-${action.key || index}`} />
          ) : (
            <DropdownMenuItem
              key={action.key || action.label}
              variant={action.variant}
              onClick={(e) => {
                e.preventDefault();
                action.onClick?.();
              }}
            >
              {action.label}
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
