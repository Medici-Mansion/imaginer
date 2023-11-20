import { SubmitButtonProps } from "@/types";
import { Button } from "@/components/ui/button";

const SubmitButton = ({
  children,
  disabled,
  onClick,
  ...rest
}: SubmitButtonProps) => {
  return (
    <Button {...rest} disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
};

export default SubmitButton;
