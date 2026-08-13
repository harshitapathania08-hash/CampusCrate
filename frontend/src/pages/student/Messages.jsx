import { useState, useEffect } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import API from "../../api/axios";
import ConversationCard from "../../components/messages/ConversationCard";
import ChatWindow from "../../components/messages/ChatWindow";

function Messages() {
  const [chatList, setChatList] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchingUsers, setSearchingUsers] = useState(false);

  // --------------------------------
  // Fetch conversations
  // --------------------------------

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await API.get("/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const conversations = (data.conversations || []).map(
          (conversation) => ({
            ...conversation,
            id: conversation.user._id,
            name: conversation.user.fullName,
            messages: [],
          })
        );

        setChatList(conversations);

        // Open first conversation automatically
        if (conversations.length > 0) {
          fetchMessages(conversations[0]);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  // --------------------------------
  // Search users
  // --------------------------------

  useEffect(() => {
    const searchUsers = async () => {
      if (!search.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setSearchingUsers(true);

        const token = localStorage.getItem("token");

const { data } = await API.get(
  `/messages/search?query=${encodeURIComponent(search)}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        setSearchResults(data.users || []);
      } catch (error) {
        console.error("Error searching users:", error);
        setSearchResults([]);
      } finally {
        setSearchingUsers(false);
      }
    };

    const delay = setTimeout(searchUsers, 300);

    return () => clearTimeout(delay);
  }, [search]);

  // --------------------------------
  // Fetch messages with user
  // --------------------------------

  const fetchMessages = async (conversation) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get(
        `/messages/${conversation.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedConversation({
        ...conversation,
        id: conversation.user._id,
        name: conversation.user.fullName,
        messages: (data.messages || []).map((msg) => ({
          sender:
            msg.sender._id === conversation.user._id
              ? "them"
              : "me",
          text: msg.text,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        })),
      });

      // Clear search after selecting a user
      setSearch("");
      setSearchResults([]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // --------------------------------
  // Select searched user
  // --------------------------------

  const handleSelectUser = (user) => {
    const existingConversation = chatList.find(
      (conversation) => conversation.user?._id === user._id
    );

    if (existingConversation) {
      fetchMessages(existingConversation);
    } else {
      // New conversation
      fetchMessages({
        user,
        id: user._id,
        name: user.fullName,
        lastMessage: "",
        time: "",
        messages: [],
      });
    }
  };

  // --------------------------------
  // Send message
  // --------------------------------

  const handleSendMessage = async (text) => {
    if (!text.trim() || !selectedConversation) return;
  
    try {
      const token = localStorage.getItem("token");
  
      const receiverId = selectedConversation.user?._id;
  
      if (!receiverId) {
        console.error("Receiver ID missing");
        return;
      }
  
      const { data } = await API.post(
        "/messages",
        {
          receiver: receiverId,
          text: text.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Message sent:", data.message);
  
      const newMessage = {
        sender: "me",
        text: data.message.text,
        time: new Date(data.message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
  
      // Update open chat safely
      setSelectedConversation((prev) => {
        if (!prev) return prev;
  
        return {
          ...prev,
          lastMessage: data.message.text,
          time: new Date(data.message.createdAt),
          messages: [...(prev.messages || []), newMessage],
        };
      });
  
      // Update conversation list safely
      setChatList((prev) =>
        prev.map((chat) =>
          chat.user._id === selectedConversation.user._id
            ? {
                ...chat,
                lastMessage: text,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }
            : chat
        )
      );
  
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error
      );
    }
  };
  // --------------------------------
  // Search existing conversations
  // --------------------------------

  const filteredConversations = chatList.filter((conversation) =>
    conversation.user?.fullName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Heading */}

      <div>
        <h1 className="text-2xl font-bold text-[#111827]">
          Messages
        </h1>

        <p className="mt-2 text-base text-[#64748B]">
          Chat with students regarding lost and found items.
        </p>
      </div>

      {/* Main Layout */}

      <div className="grid h-[calc(100vh-180px)] grid-cols-12 gap-6">

        {/* Left Side */}

        <div className="col-span-4 rounded-3xl border border-[#E8DCCA] bg-white shadow-sm">

          {/* Search */}

          <div className="border-b border-[#E8DCCA] p-5">

            <div className="flex items-center overflow-hidden rounded-2xl border border-[#E8DCCA]">

              <div className="flex h-12 w-12 items-center justify-center">
                <FaSearch className="text-[#94A3B8]" />
              </div>

              <div className="h-6 w-px bg-[#E8DCCA]" />

              <input
                type="text"
                placeholder="Search students by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 flex-1 px-4 outline-none"
              />

            </div>

          </div>

          {/* Search Results */}

          {search.trim() && (
            <div className="border-b border-[#E8DCCA] p-3">

              <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                Students
              </p>

              {searchingUsers ? (
                <p className="p-3 text-center text-sm text-[#64748B]">
                  Searching...
                </p>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1">

                  {searchResults.map((user) => (
                    <button
                      key={user._id}
                      onClick={() => handleSelectUser(user)}
                      className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition hover:bg-[#F7F4EE]"
                    >

                      <FaUserCircle className="text-4xl text-[#1E3A8A]" />

                      <div>
                        <p className="font-semibold text-[#111827]">
                          {user.fullName}
                        </p>

                        <p className="text-sm text-[#64748B]">
                          {user.email}
                        </p>
                      </div>

                    </button>
                  ))}

                </div>
              ) : (
                <p className="p-3 text-center text-sm text-[#64748B]">
                  No students found.
                </p>
              )}

            </div>
          )}

          {/* Conversation List */}

          <div className="space-y-2 p-4">

            <p className="px-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Conversations
            </p>

            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => (
                <ConversationCard
                  key={conversation.user._id}
                  conversation={conversation}
                  selected={
                    selectedConversation?.user?._id ===
                    conversation.user?._id
                  }
                  onClick={() =>
                    fetchMessages(conversation)
                  }
                />
              ))
            ) : (
              <p className="p-4 text-center text-sm text-[#64748B]">
                No conversations yet.
              </p>
            )}

          </div>

        </div>

        {/* Right Side */}

        <div className="col-span-8">

          {selectedConversation ? (
            <ChatWindow
              conversation={selectedConversation}
              onSend={handleSendMessage}
            />
          ) : (
            <div className="flex h-full items-center justify-center rounded-3xl border border-[#E8DCCA] bg-white text-[#64748B]">
              Search for a student or select a conversation to start chatting.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Messages;