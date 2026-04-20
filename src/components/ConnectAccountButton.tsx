import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  useId,
  useState,
  type ComponentType,
  type PropsWithChildren,
} from "react";
import { Field, FieldLabel, FieldTitle } from "./ui/field";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { GoogleDriveIcon } from "./GoogleDriveIcon";
import { accountTypeSchema, type AccountType } from "#/lib/schemas";
import { DropboxIcon } from "./DropboxIcon";
import { connectAccountFn } from "#/lib/api/connect";
import { useServerFn } from "@tanstack/react-start";

type Props = PropsWithChildren<{}>;

const ConnectAccountButton = ({}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="xs">
          <Plus />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Storage</DialogTitle>
          <DialogDescription>
            Add a new cloud provider to your workspace
          </DialogDescription>
          <ConnectAccountForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

type AccountOptionProps<T extends string> = {
  label: string;
  description?: string;
  value: T;
  id?: string;
  Icon: ComponentType;
};
function AccountOption({
  label,
  value,
  id,
  Icon,
}: AccountOptionProps<AccountType>) {
  const fallbackId = useId();
  const optionId = id ?? fallbackId;
  return (
    <FieldLabel htmlFor={optionId}>
      <Field orientation="horizontal">
        <Icon />
        <FieldTitle>{label}</FieldTitle>
        <RadioGroupItem value={value} id={optionId} />
      </Field>
    </FieldLabel>
  );
}

function ConnectAccountForm() {
  const [type, setType] = useState<AccountType>();

  const connectAccount = useServerFn(connectAccountFn);

  return (
    <div className="space-y-4">
      <RadioGroup
        value={type}
        onValueChange={(e) => setType(accountTypeSchema.parse(e))}
      >
        <AccountOption
          label="Google drive"
          value="google"
          Icon={GoogleDriveIcon}
        />
        <AccountOption label="Dropbox" value="dropbox" Icon={DropboxIcon} />
      </RadioGroup>
      <Button
        disabled={!type}
        className="w-full"
        onClick={() => type && connectAccount({ data: { type } })}
      >
        Connect
      </Button>
    </div>
  );
}
export default ConnectAccountButton;
