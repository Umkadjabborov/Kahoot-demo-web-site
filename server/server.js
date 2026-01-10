const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

const quizzes = [
  {
    id: 1,
    topic: "JavaScript Basics",
    questions: [
      { question: "JavaScript nima?", options: ["Markup language", "Programming language", "Database", "OS"], correctAnswer: "Programming language", level: "easy" },
      { question: "JS fayl kengaytmasi?", options: [".java", ".js", ".html", ".css"], correctAnswer: ".js", level: "easy" },
      { question: "console.log() nima qiladi?", options: ["Alert chiqaradi", "Console ga chiqaradi", "HTML yozadi", "CSS beradi"], correctAnswer: "Console ga chiqaradi", level: "easy" },

      { question: "=== nimani tekshiradi?", options: ["Qiymat", "Type", "Qiymat va type", "Hech narsa"], correctAnswer: "Qiymat va type", level: "medium" },
      { question: "Array uzunligi qanday olinadi?", options: ["size", "length", "count", "total"], correctAnswer: "length", level: "medium" },

      { question: "Closure nima?", options: ["Loop", "Function ichidagi scope", "Array", "Class"], correctAnswer: "Function ichidagi scope", level: "hard" },
      { question: "Promise nechta holatga ega?", options: ["2", "3", "4", "5"], correctAnswer: "3", level: "hard" }
    ]
  },

  {
    id: 2,
    topic: "HTML Fundamentals",
    questions: [
      { question: "HTML nima?", options: ["Programming", "Markup", "Database", "OS"], correctAnswer: "Markup", level: "easy" },
      { question: "Paragraph tegi?", options: ["<div>", "<p>", "<span>", "<h1>"], correctAnswer: "<p>", level: "easy" },

      { question: "Semantic HTML nima?", options: ["CSS", "Meaningful tags", "JS", "API"], correctAnswer: "Meaningful tags", level: "medium" },
      { question: "Class nimaga kerak?", options: ["JS", "Bir nechta element", "SEO", "DB"], correctAnswer: "Bir nechta element", level: "medium" },

      { question: "ARIA nima?", options: ["CSS", "Accessibility", "JS", "API"], correctAnswer: "Accessibility", level: "hard" },
      { question: "SEO uchun muhim teg?", options: ["<b>", "<i>", "<h1>", "<span>"], correctAnswer: "<h1>", level: "hard" }
    ]
  },

  {
    id: 3,
    topic: "CSS Basics",
    questions: [
      { question: "CSS nima?", options: ["Style", "Script", "DB", "OS"], correctAnswer: "Style", level: "easy" },
      { question: "Class selector?", options: ["#", ".", "*", "&"], correctAnswer: ".", level: "easy" },

      { question: "Flexbox nima?", options: ["Grid", "Layout", "Font", "Color"], correctAnswer: "Layout", level: "medium" },
      { question: "padding nima?", options: ["Ichki", "Tashqi", "Border", "Shadow"], correctAnswer: "Ichki", level: "medium" },

      { question: "Z-index nima?", options: ["Depth", "Color", "Font", "Margin"], correctAnswer: "Depth", level: "hard" },
      { question: "Media query nima?", options: ["JS", "Responsive", "API", "DB"], correctAnswer: "Responsive", level: "hard" }
    ]
  },

  {
    id: 4,
    topic: "Web & Backend",
    questions: [
      { question: "HTTPS nimasi bilan farq qiladi?", options: ["Secure", "Fast", "Free", "Old"], correctAnswer: "Secure", level: "hard" },
      { question: "Client-server modeli?", options: ["Request/Response", "Loop", "Array", "DOM"], correctAnswer: "Request/Response", level: "hard" },
      { question: "REST nima?", options: ["Architecture", "Language", "DB", "UI"], correctAnswer: "Architecture", level: "hard" },
      { question: "Deployment nima?", options: ["Upload server", "Design", "Code", "Test"], correctAnswer: "Upload server", level: "hard" }
    ]
  }
];

/* =========================
   API ROUTES
========================= */

// Mavzular
app.get("/api/topics", (req, res) => {
  res.json(quizzes.map(q => ({
    id: q.id,
    topic: q.topic
  })));
});

// Savollar
app.get("/api/questions/:id", (req, res) => {
  const quiz = quizzes.find(q => q.id === Number(req.params.id));
  if (!quiz) {
    return res.status(404).json({ message: "Topilmadi" });
  }
  res.json(quiz.questions);
});

/* =========================
   SERVER
========================= */
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
/* =====================
   FETCH QUESTIONS (MOD)
===================== */
