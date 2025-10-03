import { ArrowUp } from "lucide-react";
import { PromptInput, PromptInputTextarea, PromptInputActions, PromptInputAction } from "./input";

interface InputProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isInitializing: boolean;
  isLoading: boolean;
  status: string;
  stop: () => void;
}

export const Input = ({
  input,
  handleInputChange,
  isInitializing,
  isLoading,
  status,
  stop,
}: InputProps) => {
  const handleSubmit = () => {
    // This will be handled by the form onSubmit
  };

  const handleValueChange = (value: string) => {
    // Convert to the expected event format
    const event = {
      target: { value }
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(event);
  };

  return (
    <PromptInput
      value={input}
      onValueChange={handleValueChange}
      onSubmit={handleSubmit}
      isLoading={isLoading || isInitializing}
      className="bg-secondary"
    >
      <PromptInputTextarea
        placeholder="Tell me what to do..."
        disabled={isLoading || isInitializing}
        autoFocus
      />
      <PromptInputActions>
        {status === "streaming" || status === "submitted" ? (
          <PromptInputAction tooltip="Stop generation">
            <button
              type="button"
              onClick={stop}
              className="cursor-pointer rounded-full p-2 bg-black hover:bg-zinc-800 disabled:bg-zinc-300 disabled:cursor-not-allowed transition-colors"
            >
              <div className="animate-spin h-4 w-4">
                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            </button>
          </PromptInputAction>
        ) : (
          <PromptInputAction tooltip="Send message">
            <button
              type="submit"
              disabled={isLoading || !input.trim() || isInitializing}
              className="rounded-full p-2 bg-black hover:bg-zinc-800 disabled:bg-zinc-300 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowUp className="h-4 w-4 text-white" />
            </button>
          </PromptInputAction>
        )}
      </PromptInputActions>
    </PromptInput>
  );
};
