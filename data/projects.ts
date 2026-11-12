export interface ProjectType {
  slug: string
  title: string
  description: string
  tags: string[]
  category: "ML" | "DL" | "NLP" | "CV" | "Mobile" | "Web"
  github: string | null
  demo: string | null
  metrics: string[]
  image: string
  year: number
  featured: boolean
}

export const projects: ProjectType[] = [
  {
    slug: "customer-churn-prediction",
    title: "Customer Churn Prediction: MLOps Pipeline",
    description: "Built a production-grade telecom churn prediction pipeline using XGBoost and LightGBM with Optuna Bayesian tuning (30 trials) and SMOTE for class imbalance, tracking all experiments with MLflow and deploying SHAP-based explanations via Streamlit.",
    tags: ["XGBoost", "LightGBM", "MLflow", "Optuna", "SHAP", "Streamlit", "Python"],
    category: "ML",
    github: "https://github.com/BilalAamir4",
    demo: null,
    metrics: ["ROC-AUC: 0.853", "F1: 0.627"],
    image: "/images/customer-churn-prediction.jpg",
    year: 2025,
    featured: true
  },
  {
    slug: "bert-sentiment-analysis",
    title: "BERT Sentiment Analysis",
    description: "Fine-tuned bert-base-uncased on 50K IMDB reviews using PyTorch and HuggingFace Transformers for binary sentiment classification, then deployed the model as a Streamlit app with live inference and confidence score breakdown.",
    tags: ["BERT", "PyTorch", "HuggingFace", "Transformers", "Streamlit", "Python"],
    category: "NLP",
    github: "https://github.com/BilalAamir4",
    demo: null,
    metrics: ["Accuracy: 88.88%", "F1: 0.89", "Test set: 25K samples"],
    image: "/images/bert-sentiment-analysis.jpg",
    year: 2025,
    featured: true
  },
  {
    slug: "multi-domain-object-detection",
    title: "Multi-Domain Object Detection",
    description: "Trained a YOLOv8 object detector using transfer learning on COCO 2017 to generalize across four real-world environments (Traffic, Home, Wildlife, and Classroom), analyzing domain shift and class-level performance tradeoffs.",
    tags: ["YOLOv8", "Transfer Learning", "COCO 2017", "Python"],
    category: "CV",
    github: "https://github.com/BilalAamir4",
    demo: null,
    metrics: [],
    image: "/images/multi-domain-object-detection.jpg",
    year: 2025,
    featured: true
  },
  {
    slug: "resume-parser",
    title: "Resume Parser",
    description: "Trained a custom spaCy NER model on an annotated resume dataset and combined it with PyMuPDF-based PDF extraction to build an end-to-end resume parser that identifies name, skills, education, experience, and contacts.",
    tags: ["spaCy", "NER", "PyMuPDF", "Streamlit", "Python"],
    category: "NLP",
    github: "https://github.com/BilalAamir4",
    demo: null,
    metrics: [],
    image: "/images/resume-parser.jpg",
    year: 2025,
    featured: false
  },
  {
    slug: "dengue-outbreak-prediction",
    title: "Dengue Outbreak Prediction",
    description: "Built a dual-task dengue outbreak prediction system using XGBoost and Random Forest on engineered epidemiological features, combining binary outbreak classification with case count regression.",
    tags: ["XGBoost", "Random Forest", "SMOTE", "Streamlit", "Python"],
    category: "ML",
    github: "https://github.com/BilalAamir4",
    demo: null,
    metrics: ["AUC-ROC: 0.9945"],
    image: "/images/dengue-outbreak-prediction.jpg",
    year: 2025,
    featured: false
  },
  {
    slug: "ml-algorithms-from-scratch",
    title: "ML Algorithms From Scratch",
    description: "Implemented KNN, Linear Regression, and Logistic Regression from scratch using only NumPy and Pandas without any ML libraries, applying data preprocessing, feature scaling, and model evaluation with full visualizations.",
    tags: ["NumPy", "Pandas", "Matplotlib", "Python"],
    category: "ML",
    github: "https://github.com/BilalAamir4",
    demo: null,
    metrics: [],
    image: "/images/ml-algorithms-from-scratch.jpg",
    year: 2025,
    featured: false
  },
  {
    slug: "nexchat-messaging-app",
    title: "NexChat: Real-Time Messaging App",
    description: "Built a cross-platform Flutter messaging app with direct and group chats, voice messages, OTP authentication, presence tracking, and FCM push notifications, featuring a radar-based animated user discovery screen with state managed via Riverpod.",
    tags: ["Flutter", "Firebase", "Firestore", "Riverpod", "FCM", "Dart"],
    category: "Mobile",
    github: "https://github.com/BilalAamir4",
    demo: null,
    metrics: [],
    image: "/images/nexchat-messaging-app.jpg",
    year: 2025,
    featured: false
  }
];