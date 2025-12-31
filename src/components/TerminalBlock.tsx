import { useState, useEffect, useRef } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';

interface TerminalBlockProps {
    label?: string;
    content: string;
    language?: string;
    allowCopy?: boolean;
    maxHeight?: string;
}

// Map label to Prism language
const labelToLanguage: Record<string, string> = {
    'javascript': 'javascript',
    'typescript': 'typescript',
    'bash': 'bash',
    'text': 'text',
    'address': 'text',
    'curve point': 'text',
    'ADDRESS': 'text',
};

export function TerminalBlock({ label = 'bash', content, allowCopy = true, maxHeight }: TerminalBlockProps) {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef<HTMLElement>(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Apply Prism highlighting
    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [content]);

    const prismLanguage = labelToLanguage[label.toLowerCase()] || 'javascript';

    return (
        <div className="terminal-block" style={{
            background: '#0a0a0a',
            border: '1px solid #333',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 1rem',
                background: '#111',
                borderBottom: '1px solid #333',
                color: '#666',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Terminal size={14} />
                    <span>{label}</span>
                </div>
                {allowCopy && (
                    <button
                        onClick={handleCopy}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: copied ? 'var(--accent)' : '#666',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '0.75rem',
                            transition: 'color 0.2s'
                        }}
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'COPIED' : 'COPY'}
                    </button>
                )}
            </div>
            <div style={{
                padding: '1rem',
                overflowX: 'auto',
                overflowY: maxHeight ? 'auto' : 'visible',
                maxHeight: maxHeight || 'none',
                background: '#1d1f21'
            }}>
                <pre style={{ margin: 0, background: 'transparent' }}>
                    <code ref={codeRef} className={`language-${prismLanguage}`}>
                        {content}
                    </code>
                </pre>
            </div>
        </div>
    );
}
