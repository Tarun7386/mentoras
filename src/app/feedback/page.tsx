'use client'
import { useState } from "react";
export default function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState<{ id: number;  message: string; response: string | null }[]>([
        { id: 1,  message: "Great feature!", response: "Thank you!" },
        { id: 2,  message: "Can we have dark mode?", response: "We're working on it!" },
    ]);
    const [newFeedback, setNewFeedback] = useState("");

    const handleSendFeedback = () => {
        if (newFeedback.trim() !== "") {
            setFeedbacks([...feedbacks, { id: feedbacks.length + 1,  message: newFeedback, response: null }]);
            setNewFeedback("");
        }
    };

    return (
        <div>
            <h1>Feedback</h1>
            <div>
                {feedbacks.map((fb) => (
                    <div key={fb.id}>
                        <p>{"Anonyms"}: {fb.message}</p>
                        {fb.response && <p>Admin: {fb.response}</p>}
                    </div>
                ))}
            </div>
            <div>
                <input
                    value={newFeedback}
                    onChange={(e) => setNewFeedback(e.target.value)}
                    placeholder="Type your feedback..."
                />
                <button onClick={handleSendFeedback}>Send</button>
            </div>
        </div>
    );
}
