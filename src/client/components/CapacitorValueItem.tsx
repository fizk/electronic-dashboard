import React, { useRef, useState, useEffect }  from 'react';
import { Button, FormRow, FormStack, Textarea, Toggle } from '../elements/Form';
import Info from '../icons/Info';
import Basket from '../icons/Basket';
import Markdown from 'react-markdown';
import type {CapacitorValue} from '../types';
import type { ChangeEvent, MouseEvent, ReactNode } from 'react';
import './CapacitorValueItem.css';

interface Props {
    item: CapacitorValue,
    onSelect: (item: CapacitorValue) => void
    onAdd: (item: CapacitorValue) => void
    onUpdate: (item: CapacitorValue) => void
    format: (value: CapacitorValue) => ReactNode
}

export default function CapacitorValueItem ({item, onSelect, onAdd, format, onUpdate}: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isEditDialog, setIsEditDialog] = useState(false);
    const [text, setText] = useState(item.notes);

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
            <header className="capacitor-value-item__header">
                <Toggle checked={item.active} onToggle={() => onSelect(item)} />
                <span className="capacitor-value-item__label">{format(item)}</span>
                <div className="capacitor-value-item__controls">
                    <Info onClick={() => handleToggleDialog(!isOpenDialog)} kind={item.notes ? 'normal' : 'disabled' } />
                    <Basket onClick={() => onAdd(item)} />
                </div>
            </header>
            <dialog className="capacitor-value-item__dialog" ref={dialogRef} onClose={() => handleToggleDialog(false)}>
                {isEditDialog && (
                    <div className="capacitor-value-item__dialog-content">
                        <header className="capacitor-value-item__dialog-header">
                            {item.farad < 1000 && (
                                <h3>{item.micro_value}</h3>
                            )}
                            {item.farad >= 1000 && (
                                <h3>{item.farad_value}</h3>
                            )}
                        </header>
                        <section className="capacitor-value-item__dialog-description">
                        <Textarea value={text} onChange={handleTextChange} autoFocus={true} />
                        </section>
                        <footer className="capacitor-value-item__dialog-footer">
                            <FormRow variants={['end']}>
                                <Button kind="warning" onClick={handleSave}>save</Button>
                                <Button kind="danger" onClick={() => setIsEditDialog(false)}>cancel</Button>
                            </FormRow>
                        </footer>
                    </div>
                )}
                {!isEditDialog && (
                    <div className="capacitor-value-item__dialog-content">
                        <header className="capacitor-value-item__dialog-header">
                            {item.farad < 1000 && (
                                <h3>{item.micro_value}</h3>
                            )}
                            {item.farad >= 1000 && (
                                <h3>{item.farad_value}</h3>
                            )}
                        </header>
                        <section className="capacitor-value-item__dialog-description">
                            <Markdown>{item.notes}</Markdown>
                        </section>
                        <footer className="capacitor-value-item__dialog-footer">
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
