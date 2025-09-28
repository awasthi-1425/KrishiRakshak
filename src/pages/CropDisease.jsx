import React, { useState, useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { motion } from "framer-motion";
import { FaLeaf, FaNotesMedical, FaMicroscope, FaDownload, FaCamera, FaUpload, FaTimes, FaCameraRetro, FaTint, FaBug, FaTractor } from "react-icons/fa";
import jsPDF from "jspdf";

// --- 1. ALL TEXT MOVED TO A TRANSLATION OBJECT ---
const translations = {
    en: {
        mainTitle: "Plant Disease Detection",
        uploadTitle: "Your image will appear here",
        uploadSubtitle: "Upload a file or use your camera",
        uploadFile: "Upload File",
        openCamera: "Open Camera",
        scanButton: "Scan Plant",
        modelLoading: "AI Model Loading...",
        scanning: "Scanning...",
        analysisTitle: "Analysis Results",
        plant: "Plant",
        condition: "Condition",
        confidence: "Confidence",
        downloadReport: "Download Full Report",
        analysisPlaceholder: "Upload a plant image and click 'Scan Plant' to see the analysis.",
        actionsTitle: "Recommended Actions",
        fertilizerTitle: "Fertilizer Guidance",
        fertilizerProducts: "Suggested Products:",
        irrigationTitle: "Irrigation",
        pestControlTitle: "Pest Control",
        pesticides: "Pesticides / Fungicides:",
        insecticides: "Insecticides:",
        treatmentPlaceholder: "Treatment steps will appear here after a disease is detected.",
        pdfReportTitle: "Plant Disease Analysis Report",
    },
    ml: {
        mainTitle: "സസ്യരോഗ നിർണ്ണയം",
        uploadTitle: "നിങ്ങളുടെ ചിത്രം ഇവിടെ ദൃശ്യമാകും",
        uploadSubtitle: "ഒരു ഫയൽ അപ്‌ലോഡ് ചെയ്യുക അല്ലെങ്കിൽ ക്യാമറ ഉപയോഗിക്കുക",
        uploadFile: "ഫയൽ അപ്‌ലോഡ് ചെയ്യുക",
        openCamera: "ക്യാമറ തുറക്കുക",
        scanButton: "സസ്യം സ്കാൻ ചെയ്യുക",
        modelLoading: "AI മോഡൽ ലോഡ് ചെയ്യുന്നു...",
        scanning: "സ്കാൻ ചെയ്യുന്നു...",
        analysisTitle: "വിശകലന ഫലങ്ങൾ",
        plant: "സസ്യം",
        condition: "അവസ്ഥ",
        confidence: "കൃത്യത",
        downloadReport: "പൂർണ്ണ റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക",
        analysisPlaceholder: "വിശകലനം കാണുന്നതിന് ഒരു ചിത്രം അപ്‌ലോഡ് ചെയ്ത് 'സസ്യം സ്കാൻ ചെയ്യുക' ക്ലിക്കുചെയ്യുക.",
        actionsTitle: "ശുപാർശ ചെയ്യുന്ന പ്രവർത്തനങ്ങൾ",
        fertilizerTitle: "വളപ്രയോഗ മാർഗ്ഗനിർദ്ദേശം",
        fertilizerProducts: "ശുപാർശ ചെയ്യുന്ന ഉൽപ്പന്നങ്ങൾ:",
        irrigationTitle: "ജലസേചനം",
        pestControlTitle: "കീടനിയന്ത്രണം",
        pesticides: "കീടനാശിനികൾ / കുമിൾനാശിനികൾ:",
        insecticides: "പ്രാണിനാശിനികൾ:",
        treatmentPlaceholder: "ഒരു രോഗം കണ്ടെത്തിയതിന് ശേഷം ചികിത്സാ മാർഗ്ഗങ്ങൾ ഇവിടെ ദൃശ്യമാകും.",
        pdfReportTitle: "സസ്യരോഗ വിശകലന റിപ്പോർട്ട്",
    }
};

// --- EMBEDDED TREATMENT DATA ---
const embeddedTreatmentData = {
    "Apple___Apple_scab": {
        "description": "A common fungal disease of apple trees that causes dark, scabby spots on leaves and fruit.",
        "steps": ["Prune trees to improve air circulation and sunlight penetration.", "Rake and destroy fallen leaves in autumn to reduce spore survival.", "Apply urea to fallen leaves to accelerate decomposition.", "Use resistant varieties like Liberty, Enterprise, or Pristine.", "Follow a preventative fungicide spray schedule during wet spring weather."],
        "fertilizer": {"recommendation": "Apply a balanced fertilizer in early spring. Avoid excessive nitrogen, which promotes lush, susceptible growth.", "products": ["10-10-10 (balanced NPK)", "Compost", "Aged manure"]},
        "irrigation": "Water at the base of the tree using drip irrigation to keep foliage dry. Ensure deep watering during dry spells.",
        "pest_control": {"pesticides": ["Myclobutanil", "Captan", "Sulfur", "Liquid copper fungicide"], "insecticides": ["Not applicable for this fungal disease."]}
    },
    "Apple___Black_rot": {
        "description": "A fungal disease that can cause leaf spots, fruit rot, and cankers on apple trees.",
        "steps": ["Prune out and destroy all cankered and dead branches during dormancy.", "Remove mummified (dried, shriveled) fruits from trees and the ground.", "Practice proper sanitation by removing all plant debris.", "Maintain tree health with proper watering and feeding to reduce stress.", "Ensure good air circulation around the branches and fruit."],
        "fertilizer": {"recommendation": "Maintain balanced nutrition based on a soil test. Adequate potassium levels can help with disease resistance.", "products": ["Potassium sulfate", "Balanced 10-10-10 fertilizer"]},
        "irrigation": "Avoid overhead watering. Use drip irrigation to keep the trunk and leaves dry. Water deeply and infrequently.",
        "pest_control": {"pesticides": ["Thiophanate-methyl", "Captan", "Copper-based sprays (during dormancy)"], "insecticides": ["Not applicable for this fungal disease."]}
    },
    // ... (rest of the embedded data remains the same)
};


export default function CropDisease() {
    const fileInputRef = useRef(null);
    const imageRef = useRef(null);
    const videoRef = useRef(null);
    
    // --- 2. LANGUAGE STATE ---
    const [language, setLanguage] = useState('en');
    const [mediaStream, setMediaStream] = useState(null);
    const [model, setModel] = useState(null);
    const [classIndices, setClassIndices] = useState(null);
    const [treatmentData, setTreatmentData] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModelLoading, setIsModelLoading] = useState(true);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isPreviewReady, setIsPreviewReady] = useState(false);

    const t = translations[language]; // Select the current language object

    useEffect(() => {
        if (mediaStream && videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play().catch(error => {
                console.error("Video play failed:", error);
                alert("Could not start camera preview. Please check browser permissions.");
            });
        }
    }, [mediaStream]);

    useEffect(() => {
        const loadResources = async () => {
            try {
                const loadedModel = await tf.loadLayersModel("/web_model/model.json");
                setModel(loadedModel);
                const indicesResponse = await fetch("/class_indices.json");
                const indicesData = await indicesResponse.json();
                setClassIndices(indicesData);
                setTreatmentData(embeddedTreatmentData);
                console.log("Model and data loaded successfully!");
            } catch (error) {
                console.error("Failed to load model or data:", error);
                alert("Failed to load necessary resources.");
            } finally {
                setIsModelLoading(false);
            }
        };
        loadResources();
    }, []);

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsPreviewReady(false);
            setImageURL(URL.createObjectURL(file));
            setPredictionResult(null);
        }
    };

    const handleScanClick = async () => {
        if (!imageURL || !imageRef.current) {
            alert("Please select an image first!");
            return;
        }
        if (isModelLoading || !model) {
            alert("The AI model is still loading.");
            return;
        }

        setIsLoading(true);
        setPredictionResult(null);
        try {
            const imageElement = imageRef.current;
            const tensor = tf.browser.fromPixels(imageElement).resizeNearestNeighbor([224, 224]).toFloat().div(tf.scalar(255.0)).expandDims();
            const predictions = await model.predict(tensor).data();
            tf.dispose(tensor);

            const topPredictionIndex = predictions.indexOf(Math.max(...predictions));
            const confidence = Math.max(...predictions);
            const predictedClassKey = classIndices[topPredictionIndex];
            
            const parts = predictedClassKey.split("___");
            const plant = parts[0].replace(/_/g, " ");
            const disease = parts.length > 1 ? parts[1].replace(/_/g, " ") : parts[0].replace(/_/g, " ");

            setPredictionResult({
                plant,
                disease,
                confidence: Math.round(confidence * 100),
                treatment: treatmentData[predictedClassKey] || {
                    description: "No specific treatment information available.",
                    steps: [],
                    fertilizer: { recommendation: "N/A", products: [] },
                    irrigation: "N/A",
                    pest_control: { pesticides: [], insecticides: [] }
                },
            });
        } catch (error) {
            console.error("Error during prediction:", error);
            alert("An error occurred while analyzing the image.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenCamera = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setMediaStream(stream);
                setIsCameraOpen(true);
            } catch (err) {
                console.error("Error accessing camera:", err);
                alert("Could not access camera. Check permissions.");
            }
        } else {
            alert("Camera access not supported by this browser.");
        }
    };

    const stopStream = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
        }
    };

    const handleCloseCamera = () => {
        stopStream();
        setIsCameraOpen(false);
    };

    const handleCapture = () => {
        if (!videoRef.current) return;
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setIsPreviewReady(false);
        setImageURL(dataUrl);
        setPredictionResult(null);
        handleCloseCamera();
    };

    const handleDownloadReport = () => {
        if (!predictionResult || !imageURL) {
            alert("Please scan an image first to generate a report.");
            return;
        }
    
        const doc = new jsPDF("p", "mm", "a4");
        // Add Malayalam font support
        doc.addFont('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf', 'Roboto', 'normal');
        doc.setFont('Roboto');

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15;
        let currentY = margin;
    
        const checkPageBreak = (heightNeeded) => {
            if (currentY + heightNeeded > pageHeight - margin) {
                doc.addPage();
                currentY = margin;
            }
        };
    
        const drawTitle = (title) => {
            checkPageBreak(12);
            doc.setFont("Roboto", "normal"); // Changed to use custom font
            doc.setFontSize(16);
            doc.text(title, margin, currentY);
            currentY += 8;
            doc.setFontSize(11);
        };
    
        const drawText = (text, indent = 0) => {
            const lines = doc.splitTextToSize(text, pageWidth - (margin * 2) - indent);
            checkPageBreak(lines.length * 5);
            doc.text(lines, margin + indent, currentY);
            currentY += lines.length * 5;
        };
    
        doc.setFont("Roboto", "normal");
        doc.setFontSize(22);
        doc.text(t.pdfReportTitle, pageWidth / 2, currentY, { align: "center" });
        currentY += 8;
        doc.setFontSize(10);
        doc.text(new Date().toLocaleString('en-IN'), pageWidth / 2, currentY, { align: "center" });
        currentY += 12;
    
        const img = new Image();
        img.src = imageURL;
        const imgWidth = 80;
        const imgHeight = (img.height * imgWidth) / img.width;
        checkPageBreak(imgHeight + 10);
        doc.addImage(img, "JPEG", (pageWidth - imgWidth) / 2, currentY, imgWidth, imgHeight);
        currentY += imgHeight + 10;
    
        drawTitle(t.analysisTitle);
        drawText(`${t.plant}: ${predictionResult.plant}`);
        currentY += 2;
        drawText(`${t.condition}: ${predictionResult.disease}`);
        currentY += 2;
        drawText(`${t.confidence}: ${predictionResult.confidence}%`);
        currentY += 2;
        drawText(`Description: ${predictionResult.treatment.description}`);
        currentY += 10;
    
        drawTitle(t.actionsTitle);
        predictionResult.treatment.steps.forEach((step, index) => {
            drawText(`${index + 1}. ${step}`, 5);
            currentY += 2;
        });
        currentY += 8;
    
        drawTitle(t.fertilizerTitle);
        drawText(`Recommendation: ${predictionResult.treatment.fertilizer.recommendation}`);
        currentY += 2;
        if (predictionResult.treatment.fertilizer.products.length > 0) {
            drawText(t.fertilizerProducts, 5);
            predictionResult.treatment.fertilizer.products.forEach(product => {
                drawText(`• ${product}`, 10);
            });
        }
        currentY += 10;
    
        drawTitle(t.irrigationTitle);
        drawText(predictionResult.treatment.irrigation);
        currentY += 10;
    
        drawTitle(t.pestControlTitle);
        if (predictionResult.treatment.pest_control.pesticides.length > 0) {
            drawText(t.pesticides, 5);
            predictionResult.treatment.pest_control.pesticides.forEach(pesticide => {
                drawText(`• ${pesticide}`, 10);
            });
            currentY += 5;
        }
        if (predictionResult.treatment.pest_control.insecticides.length > 0) {
            drawText(t.insecticides, 5);
            predictionResult.treatment.pest_control.insecticides.forEach(insecticide => {
                drawText(`• ${insecticide}`, 10);
            });
        }
    
        doc.save(`${predictionResult.plant}_${predictionResult.disease}_Report.pdf`);
    };

    return (
        <>
            {isCameraOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
                    <video ref={videoRef} playsInline className="w-full max-w-2xl h-auto rounded-lg shadow-lg" style={{ transform: "scaleX(-1)" }} />
                    <div className="flex items-center gap-4 mt-6">
                        <button onClick={handleCapture} className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition text-2xl"><FaCameraRetro /></button>
                        <button onClick={handleCloseCamera} className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition"><FaTimes /></button>
                    </div>
                </motion.div>
            )}

            <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-8" style={{ backgroundImage: "url('/diseasebg.jpg')" }}>
                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl w-full">
                    {/* Left Side: Upload and Scan */}
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-white/20 flex flex-col">
                        
                        {/* --- 3. LANGUAGE SWITCHER UI --- */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-green-200 flex items-center gap-2"><FaMicroscope /> {t.mainTitle}</h2>
                            <div className="flex gap-2">
                                <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-sm rounded-md transition ${language === 'en' ? 'bg-green-500 text-white' : 'bg-white/20 text-gray-200 hover:bg-white/30'}`}>English</button>
                                <button onClick={() => setLanguage('ml')} className={`px-3 py-1 text-sm rounded-md transition ${language === 'ml' ? 'bg-green-500 text-white' : 'bg-white/20 text-gray-200 hover:bg-white/30'}`}>മലയാളം</button>
                            </div>
                        </div>

                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                        <div className="border-2 border-dashed border-green-300 rounded-lg p-4 text-center text-gray-200 aspect-video flex flex-col justify-center items-center flex-grow">
                            {imageURL ? (
                                <img ref={imageRef} src={imageURL} alt="Plant Preview" className="max-h-full w-auto object-contain rounded-md" onLoad={() => setIsPreviewReady(true)} />
                            ) : (
                                <div>
                                    <p className="text-lg">📷 {t.uploadTitle}</p>
                                    <p className="text-sm mt-2">{t.uploadSubtitle}</p>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <button onClick={handleBrowseClick} className="w-full py-3 bg-gray-500/50 hover:bg-gray-600/50 text-white rounded-lg shadow-lg transition flex items-center justify-center gap-2"><FaUpload /> {t.uploadFile}</button>
                            <button onClick={handleOpenCamera} className="w-full py-3 bg-sky-500/80 hover:bg-sky-600/80 text-white rounded-lg shadow-lg transition flex items-center justify-center gap-2"><FaCamera /> {t.openCamera}</button>
                        </div>
                        <button onClick={handleScanClick} disabled={isLoading || isModelLoading || !imageURL || !isPreviewReady} className="mt-4 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg transition disabled:bg-gray-500/70 disabled:cursor-not-allowed">
                            {isModelLoading ? t.modelLoading : isLoading ? t.scanning : t.scanButton}
                        </button>
                    </motion.div>

                    {/* Right Side: Results */}
                    <div className="flex flex-col gap-6 overflow-y-auto" style={{maxHeight: '85vh'}}>
                        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20">
                            <h3 className="text-lg font-semibold text-green-200 flex items-center gap-2"><FaLeaf /> {t.analysisTitle}</h3>
                            {predictionResult ? (
                                <>
                                    <p className="mt-2 text-white">{t.plant}: <strong>{predictionResult.plant}</strong></p>
                                    <p className="mt-1 text-white">{t.condition}: <strong>{predictionResult.disease}</strong></p>
                                    <p className="text-green-300 mt-1">{t.confidence}: {predictionResult.confidence}%</p>
                                    <div className="w-full bg-white/20 rounded-full h-2 mt-2"><div className="bg-green-400 h-2 rounded-full" style={{ width: `${predictionResult.confidence}%` }}></div></div>
                                    <p className="text-sm text-gray-200 mt-3">{predictionResult.treatment.description}</p>
                                    <button onClick={handleDownloadReport} className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition flex items-center justify-center gap-2"><FaDownload /> {t.downloadReport}</button>
                                </>
                            ) : (
                                <p className="text-gray-300 mt-4">{t.analysisPlaceholder}</p>
                            )}
                        </motion.div>

                        {predictionResult && (
                        <>
                            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20">
                                <h3 className="text-lg font-semibold text-green-200 flex items-center gap-2"><FaNotesMedical /> {t.actionsTitle}</h3>
                                {predictionResult.treatment.steps.length > 0 ?
                                    <ul className="list-decimal ml-6 mt-3 space-y-2 text-gray-100 text-sm">
                                        {predictionResult.treatment.steps.map((step, index) => (<li key={index}>{step}</li>))}
                                    </ul> :
                                    <p className="text-gray-300 mt-4">{t.treatmentPlaceholder}</p>
                                }
                            </motion.div>
                            
                            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20">
                                <h3 className="text-lg font-semibold text-green-200 flex items-center gap-2"><FaTractor /> {t.fertilizerTitle}</h3>
                                <p className="text-sm text-gray-200 mt-2">{predictionResult.treatment.fertilizer.recommendation}</p>
                                <p className="text-sm font-semibold text-gray-100 mt-3">{t.fertilizerProducts}</p>
                                <ul className="list-disc ml-6 mt-1 space-y-1 text-gray-100 text-sm">
                                    {predictionResult.treatment.fertilizer.products.map((item, index) => (<li key={index}>{item}</li>))}
                                </ul>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20">
                                <h3 className="text-lg font-semibold text-green-200 flex items-center gap-2"><FaTint /> {t.irrigationTitle}</h3>
                                <p className="text-sm text-gray-200 mt-2">{predictionResult.treatment.irrigation}</p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20">
                                <h3 className="text-lg font-semibold text-green-200 flex items-center gap-2"><FaBug /> {t.pestControlTitle}</h3>
                                {predictionResult.treatment.pest_control.pesticides.length > 0 && 
                                    <>
                                        <p className="text-sm font-semibold text-gray-100 mt-3">{t.pesticides}</p>
                                        <ul className="list-disc ml-6 mt-1 space-y-1 text-gray-100 text-sm">
                                            {predictionResult.treatment.pest_control.pesticides.map((item, index) => (<li key={index}>{item}</li>))}
                                        </ul>
                                    </>
                                }
                                {predictionResult.treatment.pest_control.insecticides.length > 0 && 
                                    <>
                                        <p className="text-sm font-semibold text-gray-100 mt-3">{t.insecticides}</p>
                                        <ul className="list-disc ml-6 mt-1 space-y-1 text-gray-100 text-sm">
                                            {predictionResult.treatment.pest_control.insecticides.map((item, index) => (<li key={index}>{item}</li>))}
                                        </ul>
                                    </>
                                }
                            </motion.div>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}