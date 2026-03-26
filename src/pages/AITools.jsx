import { useState } from 'react';
import { generateSummary } from '../services/aiService';

function AITools() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSummarize() {
    if (!input.trim() || loading) return;
    setLoading(true);
    setOutput('');
    setError('');
    try {
      const result = await generateSummary(input);
      setOutput(result);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  // Convert **bold** and bullet points to clean HTML
  function formatOutput(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line)
      .map((line) =>
        line.startsWith('*') || line.startsWith('-')
          ? `<li>${line.replace(/^[\*\-]\s*/, '')}</li>`
          : `<p>${line}</p>`
      )
      .join('');
  }

  return (
    <div>
      <h2>🤖 AI Tools</h2>
      <p style={{ color: '#555' }}>Paste your study notes and get a clean summary!</p>

      <textarea
        rows={6}
        placeholder="Paste your study material here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={styles.textarea}
      />
      <br />
      <button onClick={handleSummarize} disabled={loading} style={{
        ...styles.button,
        opacity: loading ? 0.7 : 1,
        cursor: loading ? 'not-allowed' : 'pointer',
      }}>
        {loading ? '⏳ Summarizing...' : '✨ Generate Summary'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}

      {output && (
        <div style={styles.output}>
          <h3>📋 Summary:</h3>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}
            dangerouslySetInnerHTML={{ __html: formatOutput(output) }}
          />
        </div>
      )}
    </div>
  );
}

const styles = {
  textarea: {
    width: '100%',
    maxWidth: '600px',
    padding: '12px',
    fontSize: '14px',
    marginTop: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    marginTop: '12px',
    padding: '10px 20px',
    backgroundColor: '#1e1e2e',
    color: 'white',
    border: 'none',
    fontSize: '15px',
    borderRadius: '6px',
  },
  output: {
    marginTop: '20px',
    padding: '16px',
    backgroundColor: '#f4f4f4',
    borderRadius: '6px',
    maxWidth: '600px',
    border: '1px solid #ddd',
    lineHeight: '1.8',
  },
};

export default AITools;