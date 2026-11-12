export interface SkillGroup {
  category: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "Dart", "C++", "JavaScript", "SQL"]
  },
  {
    category: "Machine Learning",
    skills: [
      "XGBoost", "LightGBM", "Random Forest", "KNN", "Linear Regression",
      "Logistic Regression", "MLflow", "Optuna", "SHAP", "Scikit-learn", 
      "NumPy", "Pandas", "Matplotlib", "Streamlit"
    ]
  },
  {
    category: "Deep Learning & NLP",
    skills: ["PyTorch", "HuggingFace Transformers", "BERT", "YOLOv8", "spaCy", "PyMuPDF"]
  },
  {
    category: "Mobile Development",
    skills: ["Flutter", "Firebase", "Firestore", "Auth", "FCM", "Riverpod", "Dart", "Android Studio"]
  },
  {
    category: "Web & Backend",
    skills: ["ASP.NET Web Forms", "SQL Server", "AES Encryption"]
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Linux"]
  }
];
