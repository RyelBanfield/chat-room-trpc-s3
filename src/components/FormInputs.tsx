import { Button, FileButton, TextInput } from "@mantine/core";
import { useState } from "react";

import { api } from "~/utils/api";

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
};

const FormInputs = ({ file, setFile }: Props) => {
  const messages = api.messages.getMessages.useQuery();

  const [message, setMessage] = useState("");

  const createMessageMutation = api.messages.createMessage.useMutation({
    onSettled: () => messages.refetch(),
  });

  const sendMessage = async (message: string) => {
    if (file) {
      const fileType = encodeURIComponent(file.type);

      const { uploadURL, Key } = (await fetch("/api/getSignedUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileType }),
      }).then((res) => res.json())) as { uploadURL: string; Key: string };

      createMessageMutation.mutate(
        { message, image: Key },
        {
          onSuccess: () => {
            setMessage("");
            setFile(null);
          },
          onError: () => createMessageMutation.reset(),
        }
      );

      return await fetch(uploadURL, {
        method: "PUT",
        body: file,
      }).then(() => createMessageMutation.reset());
    } else {
      createMessageMutation.mutate(
        { message, image: null },
        {
          onSuccess: () => setMessage(""),
          onError: () => createMessageMutation.reset(),
        }
      );
    }
  };

  return (
    <div className="flex flex-row justify-between gap-1">
      <TextInput
        placeholder="Enter message..."
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={
          message.length > 0 || file
            ? (e) => {
                if (e.key === "Enter") {
                  void sendMessage(message);
                }
              }
            : undefined
        }
        className="w-full"
      />

      <div className="flex flex-row gap-1">
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => (
            <Button
              {...props}
              variant="filled"
              className="bg-neutral-100 text-blue-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>
            </Button>
          )}
        </FileButton>

        <Button
          type="button"
          variant="filled"
          uppercase
          disabled={message.length === 0 && !file}
          className="w-1/2 min-w-min bg-blue-600"
          onClick={() => {
            void sendMessage(message);
          }}
        >
          <p>Send</p>
        </Button>
      </div>
    </div>
  );
};

export default FormInputs;
