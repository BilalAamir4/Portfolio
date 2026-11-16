import type { EarlierProject } from "../schema.ts";

const gh = "https://github.com/BilalAamir4/";

export const earlierProjects: EarlierProject[] = [
  {
    name: "Churn Prediction MLOps",
    href: `${gh}Churn-Prediction-MLOps`,
    line: "XGBoost and LightGBM with MLflow tracking, Optuna tuning and SHAP explanations, served through a Streamlit app.",
  },
  {
    name: "BERT Sentiment Analysis",
    href: `${gh}BERT-Sentiment-Analysis`,
    line: "BERT fine-tuned on IMDB movie reviews and deployed as an interactive Streamlit app.",
  },
  {
    name: "Resume Parser",
    href: `${gh}Resume-Parcer`,
    line: "A custom-trained spaCy NER model that pulls names, skills, education and experience out of PDF and DOCX files.",
  },
  {
    name: "Multi-Domain Object Detection",
    href: `${gh}MultiDomain-ObjectDetection-YOLOv8`,
    line: "YOLOv8 trained on COCO 2017 to detect 30 object categories across traffic, home, wildlife and classroom scenes.",
  },
  {
    name: "Dengue Outbreak Prediction",
    href: `${gh}Dengue-Outbreak-Prediction`,
    line: "Outbreak classification and case-count regression with XGBoost and Random Forest, with a Streamlit dashboard.",
  },
];
