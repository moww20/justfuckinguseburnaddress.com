import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface TerminalBlockProps {
    label?: string;
    content: string;
    language?: string;
    allowCopy?: boolean;
    maxHeight?: string;
}

export function TerminalBlock({ label = 'bash', content, allowCopy = true, maxHeight }: TerminalBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="terminal-block" style={{
            background: '#0a0a0a',
            border: '1px solid #333',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem'
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
            <div style={{ padding: '1rem', overflowX: 'auto', overflowY: maxHeight ? 'auto' : 'visible', maxHeight: maxHeight || 'none', color: 'var(--text-main)' }}>
                <pre style={{ margin: 0 }}>
                    <code>{content}</code>
                </pre>
            </div>
        </div>
    );
}
