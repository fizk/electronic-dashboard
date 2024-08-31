import React, { useState, useRef , useEffect} from 'react';
import { Button, FormRow, Textarea, Toggle } from '../elements/Form';
import Info from '../icons/Info';
import Basket from '../icons/Basket';
import Markdown from 'react-markdown';
import type {ChangeEvent, MouseEvent} from 'react';
import type {ResistorValue} from '../types.d';
import './ResistorValueItem.css';

interface Props {
    item: ResistorValue,
    onSelect: (item: ResistorValue) => void
    onAdd: (item: ResistorValue) => void
    onUpdate: (item: ResistorValue) => void
}

export default function ResistorValueItem ({item, onSelect, onAdd, onUpdate}: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isEditDialog, setIsEditDialog] = useState(false);
    const [text, setText] = useState<string|null>(item.notes || null);

    useEffect(() => {
        isOpenDialog && dialogRef.current?.showModal();
        !isOpenDialog && dialogRef.current?.close();
    }, [isOpenDialog]);

    const handleToggleDialog = (status: boolean) => {
        setIsOpenDialog(status);
    }
    const handleToggleEdit = (status: boolean) => {
        setIsEditDialog(status);
    }
    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.currentTarget.value);
    }
    const handleSave = (event: MouseEvent<HTMLButtonElement>) => {
        onUpdate({
            ...item,
            notes: text
        });
        setIsEditDialog(false);
    }

    return (
        <>
            <header className="resistor-value-item__header">
                <Toggle checked={item.active} onToggle={() => onSelect(item)} />
                <span className="resistor-value-item__label">{item.text}</span>
                <div className="resistor-value-item__controls">
                    <Info onClick={() => handleToggleDialog(!isOpenDialog)} kind={item.notes ? 'normal' : 'disabled' } />
                    <Basket onClick={() => onAdd(item)} />
                </div>
            </header>
            <dialog className="resistor-value-item__dialog" ref={dialogRef} onClose={() => handleToggleDialog(false)}>
                {isEditDialog && (
                    <div className="resistor-value-item__dialog-content">
                        <header className="resistor-value-item__dialog-header">
                            <h3>{item.text}</h3>
                        </header>
                        <section className="resistor-value-item__dialog-description">
                        <Textarea value={text || undefined} onChange={handleTextChange} autoFocus={true} />
                        </section>
                        <footer className="resistor-value-item__dialog-footer">
                            <FormRow variants={['end']}>
                                <Button kind="warning" onClick={handleSave}>save</Button>
                                <Button kind="danger" onClick={() => setIsEditDialog(false)}>cancel</Button>
                            </FormRow>
                        </footer>
                    </div>
                )}
                {!isEditDialog && (
                    <div className="resistor-value-item__dialog-content">
                        <header className="resistor-value-item__dialog-header">
                            <h3>{item.text}</h3>
                        </header>
                        <section className="resistor-value-item__dialog-description">
                            <Markdown>{item.notes}</Markdown>
                        </section>
                        <footer className="resistor-value-item__dialog-footer">
                            <FormRow variants={['end']}>
                                <Button kind="warning" autoFocus={true} onClick={() => handleToggleEdit(true)}>edit</Button>
                                <Button onClick={() => handleToggleDialog(false)}>close</Button>
                            </FormRow>
                        </footer>
                    </div>
                )}
            </dialog>
        </>
    )
}
