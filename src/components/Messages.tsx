import { type Message } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

import { api } from "~/utils/api";
import formatDate from "~/utils/formatDate";

const Messages = () => {
  const messages = api.messages.getMessages.useQuery();

  const [hoveredMessage, setHoveredMessage] = useState<Message | null>(null);

  const deleteMessageMutation = api.messages.deleteMessage.useMutation({
    onSettled: () => messages.refetch(),
  });

  return (
    <div className="mb-6 flex h-0 flex-grow overflow-auto">
      {messages.data ? (
        <ul className="flex w-full flex-col gap-2">
          {messages.data.map((message) => (
            <li
              key={message.id}
              onMouseEnter={() => setHoveredMessage(message)}
              onMouseLeave={() => setHoveredMessage(null)}
              className="flex flex-row items-center gap-2"
            >
              <div className="flex flex-col gap-1 rounded bg-neutral-100 p-3">
                {message.image && (
                  <Image
                    src={message.image}
                    alt="Image Preview"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="mb-3 h-40 w-40 rounded object-cover"
                  />
                )}
                <p className="text-sm font-medium text-neutral-900">
                  {message.text}
                </p>
                <p className="text-sm text-neutral-400">
                  {formatDate(message.createdAt.toString())}
                </p>
              </div>
              {hoveredMessage === message && (
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() =>
                    deleteMessageMutation.mutate({ id: message.id })
                  }
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Messages;
