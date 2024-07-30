import React from 'react';
import Markdown from 'react-markdown';
import type { WantListEntry } from '../types.d';
import './WantList.css';

interface Propss {
    items: WantListEntry[]
    onSelect: (item: WantListEntry) => void
}

export default function WantList ({items, onSelect}: Propss) {
    return (
        <ul className="want-list">
            {items.map(item => (
                <li key={item.id} className="want-list__item">
                    <details>
                        <summary>
                            <input type="checkbox" defaultChecked={item.done} onChange={() => onSelect(item)} />
                            <span className="want-list__title">{item.name}</span>
                        </summary>
                            <time className="want-list__time"> 
                                {new Intl.DateTimeFormat('en-GB').format(new Date(item.date))}
                            </time>
                            <Markdown>{item.description}</Markdown>
                    </details>
                </li>
            ))}
        </ul>
    )
}
