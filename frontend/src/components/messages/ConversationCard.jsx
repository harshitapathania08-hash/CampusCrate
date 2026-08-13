import { FaUserCircle } from "react-icons/fa";

function ConversationCard({ conversation, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl p-4 text-left transition-all duration-200 ${
        selected
          ? "bg-[#F7F4EE] border border-[#E8DCCA]"
          : "hover:bg-[#F7F4EE]"
      }`}
    >
      <div className="flex items-center gap-4">

        <FaUserCircle className="text-5xl text-[#1E3A8A]" />

        <div className="flex-1">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold text-[#111827]">
            {conversation.user?.fullName}
            </h3>

            <span className="text-xs text-[#94A3B8]">
              {conversation.time}
            </span>

          </div>

          <p className="mt-1 truncate text-sm text-[#64748B]">
            {conversation.lastMessage}
          </p>

        </div>

        {conversation.unread && (
          <div className="h-3 w-3 rounded-full bg-[#1E3A8A]" />
        )}

      </div>
    </button>
  );
}

export default ConversationCard;