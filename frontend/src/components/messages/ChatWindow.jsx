

import { useState } from "react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

function ChatWindow({ conversation, onSend }) {
    const [message, setMessage] = useState("");
  return (
    <div className="flex h-full min-h-0 flex-col rounded-3xl border border-[#E8DCCA] bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-4 border-b border-[#E8DCCA] px-6 py-5">

        <FaUserCircle className="text-5xl text-[#1E3A8A]" />

        <div>

          <h2 className="text-lg font-semibold text-[#111827]">
          {conversation.user?.fullName}
          </h2>

          <p className="text-sm text-green-600">
            ● Online
          </p>

        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 min-h-0 overflow-y-auto bg-[#FDFBF8] px-6 py-6 space-y-5">

      {(conversation.messages || []).map((message, index) => (

          <div
          key={`${message.time}-${index}`}
            className={`flex ${
              message.sender === "me"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
                message.sender === "me"
                  ? "bg-[#1E3A8A] text-white"
                  : "bg-[#F7F4EE] text-[#111827]"
              }`}
            >

              <p>{message.text}</p>

              <p
                className={`mt-2 text-xs ${
                  message.sender === "me"
                    ? "text-blue-100"
                    : "text-[#94A3B8]"
                }`}
              >
                {message.time}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Input */}

      <div className="border-t border-[#E8DCCA] p-5">

        <div className="flex gap-3">

        <textarea
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
  
      if (!message.trim()) return;
  
      onSend(message);
      setMessage("");
    }
  }}
  placeholder="Type your message..."
  rows={2}
  className="flex-1 resize-none rounded-2xl border border-[#E8DCCA] px-5 py-3 outline-none focus:border-[#1E3A8A]"
/>

<button
  onClick={() => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  }}
  className="rounded-2xl bg-[#1E3A8A] px-6 text-white transition hover:bg-[#17317A]"
>
  <FaPaperPlane />
</button>

        </div>

      </div>

    </div>
  );
}

export default ChatWindow;