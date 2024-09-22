import React, { useState, useEffect } from "react";

const TextAnalyzer = () => {
  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [replaceTerm, setReplaceTerm] = useState("");
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [vowelCount, setVowelCount] = useState(0);
  const [avgWordLength, setAvgWordLength] = useState(0);
  const [consonantCount, setConsonantCount] = useState(0);
  const [digitCount, setDigitCount] = useState(0);
  const [specialCharCount, setSpecialCharCount] = useState(0);
  const [longestWord, setLongestWord] = useState("");

  // Function to calculate statistics
  useEffect(() => {
    const calculateStats = () => {
      const wordsArray = text.toLowerCase().match(/\b[a-z0-9]+\b/g) || [];
      const uniqueWords = new Set(wordsArray);
      setUniqueWordCount(uniqueWords.size);

      const characterCount = text.replace(/[\s\W]/g, "").length;
      setCharCount(characterCount);

      const vowels = text.match(/[aeiou]/gi) || [];
      setVowelCount(vowels.length);

      // Average word length
      const totalWordLength = wordsArray.reduce(
        (acc, word) => acc + word.length,
        0
      );
      setAvgWordLength(
        wordsArray.length ? (totalWordLength / wordsArray.length).toFixed(2) : 0
      );

      // Consonant count
      const consonants = text.match(/[bcdfghjklmnpqrstvwxyz]/gi) || [];
      setConsonantCount(consonants.length);

      // Digit count
      const digits = text.match(/\d/g) || [];
      setDigitCount(digits.length);

      // Special character count
      const specialChars = text.match(/[^\w\s]/g) || [];
      setSpecialCharCount(specialChars.length);

      // Longest word
      const longest = wordsArray.reduce(
        (longest, word) => (word.length > longest.length ? word : longest),
        ""
      );
      setLongestWord(longest);
    };

    calculateStats();
  }, [text]);

  const handleReplaceAll = () => {
    const updatedText = text.split(searchTerm).join(replaceTerm);
    setText(updatedText);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="container mx-auto bg-white rounded-xl shadow-xl p-6 md:p-10 w-full max-w-3xl">
        {/* Text Analyzer Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-red-500">Text Analyzer</h2>
          <textarea
            className="w-full h-48 p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {/* Display real-time stats */}
          <div className="grid grid-cols-3 gap-4 text-center text-gray-700">
            <div>
              <p className="text-gray-600">Unique Words</p>
              <p className="font-semibold text-lg">{uniqueWordCount}</p>
            </div>
            <div>
              <p className="text-gray-600">Character Count</p>
              <p className="font-semibold text-lg">{charCount}</p>
            </div>
            <div>
              <p className="text-gray-600">Vowel Count</p>
              <p className="font-semibold text-lg">{vowelCount}</p>
            </div>
            <div>
              <p className="text-gray-600">Avg Word Length</p>
              <p className="font-semibold text-lg">{avgWordLength}</p>
            </div>
            <div>
              <p className="text-gray-600">Consonant Count</p>
              <p className="font-semibold text-lg">{consonantCount}</p>
            </div>
            <div>
              <p className="text-gray-600">Digit Count</p>
              <p className="font-semibold text-lg">{digitCount}</p>
            </div>
            <div>
              <p className="text-gray-600">Special Char Count</p>
              <p className="font-semibold text-lg">{specialCharCount}</p>
            </div>
            <div>
              <p className="text-gray-600">Longest Word</p>
              <p className="font-semibold text-lg">{longestWord}</p>
            </div>
          </div>
        </div>

        {/* String Replacement Section */}
        <div className="mt-10 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            String Replacement
          </h3>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Search for..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Replace with..."
            value={replaceTerm}
            onChange={(e) => setReplaceTerm(e.target.value)}
          />
          <button
            className="w-full p-3 bg-red-500 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={handleReplaceAll}
          >
            Replace All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextAnalyzer;
