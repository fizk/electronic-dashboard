import React, { ChangeEvent, KeyboardEvent, useState, } from "react";
import { WantListEntry } from "../types";
import { Button, LabelInput, Textarea, Toggle } from "../elements/Form";
import Markdown from "react-markdown";
import './WantlistDetails.css';

interface Props {
    item: WantListEntry
    onSelect: (item: WantListEntry) => void
    onRemove: (item: WantListEntry) => void
    onUpdate: (item: WantListEntry) => void
}

export default function WantlistDetails ({item, onSelect, onRemove, onUpdate}: Props) {

    const [itemState, setItemState] = useState<{name: string, description: string | null | undefined} | null>(null);

    const handleRequestUpdate = (item: WantListEntry) => {
        setItemState({
            name: item.name,
            description: item.description
        });
    }

    const handleRequestCancel = (item: WantListEntry) => {
        setItemState(null);
    }
    
    const handleUpdate = (item: WantListEntry) => {
        onUpdate({
            ...item,
            ...itemState
        });
        setItemState(null);
    }

    const handleToggle = (event: any) => {
        if (!event.currentTarget.open) {
            setItemState(null);
        }
    };

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setItemState({
            name: event.currentTarget.value,
            description: itemState?.description
        });
    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setItemState({
            name: itemState?.name || '',
            description: event.currentTarget.value,
        });
    }

    const handleDisableSpacebarToggle = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.code === 'Space' && itemState){
            event.preventDefault();
          }
    }

    return (
        <details className="want-list-details" onToggle={handleToggle}>
            <summary className="want-list-details__summary" onKeyUp={handleDisableSpacebarToggle}>
                <Toggle checked={item.done} onChange={() => onSelect(item)}/>
                    {itemState && (
                        <span className="want-list-details__title">
                            <LabelInput value={itemState?.name} 
                                onChange={handleTitleChange}
                                autoFocus
                            />
                        </span>
                    )}
                    {!itemState && (
                        <span className="want-list-details__title">{item.name}</span>
                    )}
                <time className="want-list-details__time"> 
                    {new Intl.DateTimeFormat('en-GB').format(new Date(item.date))}
                </time>
            </summary>
            {item.description && !itemState && (
                <section className="want-list-details__description">
                    <Markdown>{item.description}</Markdown>
                </section>
            )}
            {itemState && (
                <section className="want-list-details__description">
                    <Textarea onChange={handleDescriptionChange} value={itemState.description || ''} />
                </section>
            )}
            <footer className="want-list-details__footer">
                {!itemState && (
                    <Button onClick={() => handleRequestUpdate(item)} kind="warning">edit</Button>
                )}
                {itemState && (
                    <>
                        <Button onClick={() => handleUpdate(item)} kind="normal">save</Button>
                        <Button onClick={() => handleRequestCancel(item)} kind="warning">cancel</Button>
                    </>
                )}
                <Button onClick={() => onRemove(item)} kind="danger">delete</Button>
            </footer>
        </details>
    )
}