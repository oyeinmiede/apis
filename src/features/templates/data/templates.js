const templates = [
    {
        id: "kanban",
        title: "Kanban Board",
        emoji: "📋",
        category: "Productivity",
        description: "Track work from To Do to Done.",
        coverColor: "#3b82f6",
        columns: [
            { title: "To Do", cards: ["Research", "Wireframe", "Meeting"] },
            { title: "Doing", cards: ["Homepage UI"] },
            { title: "Done", cards: ["Create project"] }
        ]
    },
    {
        id: "weekly",
        title: "Weekly Planner",
        emoji: "📅",
        category: "Personal",
        description: "Plan your entire week.",
        coverColor: "#10b981",
        columns: [
            { title: "Monday", cards: [] },
            { title: "Tuesday", cards: [] },
            { title: "Wednesday", cards: [] },
            { title: "Thursday", cards: [] },
            { title: "Friday", cards: [] },
            { title: "Weekend", cards: [] }
        ]
    },
    {
        id: "habit",
        title: "Habit Tracker",
        emoji: "🔥",
        category: "Personal",
        description: "Build daily habits.",
        coverColor: "#f97316",
        columns: [
            { title: "Morning", cards: ["Read", "Exercise"] },
            { title: "Afternoon", cards: [] },
            { title: "Night", cards: ["Journal"] }
        ]
    },
    {
        id: "semester",
        title: "Semester Planner",
        emoji: "🎓",
        category: "School",
        description: "Organize courses.",
        coverColor: "#8b5cf6",
        columns: [
            { title: "Courses", cards: ["CSC401", "MAT405"] },
            { title: "Assignments", cards: [] },
            { title: "Exams", cards: [] }
        ]
    },
    {
        id: "assignment",
        title: "Assignment Tracker",
        emoji: "✍️",
        category: "School",
        description: "Never miss deadlines.",
        coverColor: "#ec4899",
        columns: [
            { title: "Pending", cards: ["Math"] },
            { title: "Doing", cards: [] },
            { title: "Submitted", cards: [] }
        ]
    },
    {
        id: "roadmap",
        title: "Project Roadmap",
        emoji: "🛣️",
        category: "Work",
        description: "Plan milestones.",
        coverColor: "#14b8a6",
        columns: [
            { title: "Ideas", cards: [] },
            { title: "Q1", cards: [] },
            { title: "Q2", cards: [] },
            { title: "Released", cards: [] }
        ]
    },
    {
        id: "content",
        title: "Content Calendar",
        emoji: "🎥",
        category: "Creative",
        description: "Plan posts.",
        coverColor: "#f43f5e",
        columns: [
            { title: "Ideas", cards: [] },
            { title: "Recording", cards: [] },
            { title: "Editing", cards: [] },
            { title: "Published", cards: [] }
        ]
    },
    {
        id: "brainstorm",
        title: "Brainstorm",
        emoji: "💡",
        category: "Creative",
        description: "Capture ideas.",
        coverColor: "#eab308",
        columns: [
            { title: "Ideas", cards: ["New feature"] },
            { title: "Worth Building", cards: [] }
        ]
    },
    {
        id: "reading",
        title: "Reading List",
        emoji: "📚",
        category: "Personal",
        description: "Books to read.",
        coverColor: "#6366f1",
        columns: [
            { title: "Want to Read", cards: ["Atomic Habits"] },
            { title: "Reading", cards: [] },
            { title: "Finished", cards: [] }
        ]
    },
    {
        id: "daily",
        title: "Daily Tasks",
        emoji: "✅",
        category: "Productivity",
        description: "Today's focus.",
        coverColor: "#22c55e",
        columns: [
            { title: "Today", cards: ["Email", "Design"] },
            { title: "Done", cards: [] }
        ]
    }
];

export default templates;