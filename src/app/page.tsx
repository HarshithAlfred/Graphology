'use client'
import { useState, useCallback } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const resultsArray = [
    "Confident", "Fast", "Strength", "Creative", "Analytical", "Empathetic", 
    "Leader", "Innovative", "Determined", "Passionate", "Reliable", "Adaptable", 
    "Curious", "Focused", "Generous", "Honest", "Loyal", "Optimistic", 
    "Patient", "Resilient", "Sincere", "Thoughtful", "Trustworthy", "Versatile",
    "Ambitious", "Diligent", "Disciplined", "Energetic", "Intuitive", 
    "Organized", "Proactive", "Resourceful", "Supportive", "Tolerant", 
    "Attentive", "Bold", "Charismatic", "Compassionate", "Consistent", 
    "Dependable", "Efficient", "Flexible", "Genuine", "Hardworking", 
    "Humorous", "Independent", "Insightful", "Mature", "Practical", 
    "Rational", "Self-reliant", "Spontaneous", "Strategic", "Tactful"
];


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setResult([]);
      setIsButtonDisabled(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(URL.createObjectURL(e.dataTransfer.files[0]));
      setResult([]);
      setIsButtonDisabled(false);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const generateResult = () => {
    const shuffledArray = resultsArray.sort(() => 0.5 - Math.random());
    const selectedResults = shuffledArray.slice(0, 6);
    setResult(selectedResults);
    setIsButtonDisabled(true);
  };

  const getRandomColor = () => {
    const colors = ["#FFB6C1", "#FFD700", "#ADFF2F", "#87CEFA", "#FF69B4", "#FFA07A"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className={styles.fullScreenBackground}>
      <div className={styles.appBackground}>
        <header className={styles.banner}>
          <h1>Welcome to Graphology Analysis</h1>
        </header>
        <main className={styles.mainContent}>
          {!image && (
            <div
              className={styles.dropArea}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <p>Drag & Drop an image or click to upload</p>
            </div>
          )}
          {image && (
            <>
              <div
                onClick={() => document.getElementById('fileInput')?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ cursor: 'pointer' }}
              >
                <Image src={image} alt="Uploaded Image" width={300} height={300} />
              </div>
              <button onClick={generateResult} className={styles.generate} disabled={isButtonDisabled}>Generate Result</button>
            </>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          {result && (
            <div>
              {result.map((word, index) => (
                <p
                  key={index}
                  style={{
                    backgroundColor: getRandomColor(),
                    borderRadius: "10px",
                    padding: "10px",
                    display: "inline-block",
                    margin: "5px",
                  }}
                >
                  {word}
                </p>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
