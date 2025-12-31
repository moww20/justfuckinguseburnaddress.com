import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
    title?: string;
    children: ReactNode;
    delay?: number;
}

export function Section({ title, children, delay = 0 }: SectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay }}
            style={{ marginBottom: '4rem' }}
        >
            {title && (
                <h2 style={{
                    fontSize: '1.5rem',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '0.5rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <span style={{ color: 'var(--accent)', fontSize: '1rem' }}>#</span>
                    {title}
                </h2>
            )}
            {children}
        </motion.section>
    );
}
