import React, { useState, useRef , useEffect} from 'react';
import { Button, FormRow, FormStack, Textarea, Toggle } from '../elements/Form';
import Cart from "../icons/Cart";
import Info from '../icons/Info';
import Burger from '../icons/Burger';
import Markdown from 'react-markdown';
import type {ChangeEvent, MouseEvent} from 'react';
import type {ResistorValue} from '../types.d';
import './ResistorValueItem.css';

interface Props {
    value: ResistorValue,
    onSelect: (item: ResistorValue) => void
    onAdd: (item: ResistorValue) => void
    onUpdate: (item: ResistorValue) => void
}

export default function ResistorValueItem ({value, onSelect, onAdd, onUpdate}: Props) {
    const [notes, setNotes] = useState(value.notes);
    
    const infoRef = useRef<any>();
    const editRef = useRef<any>();
    const [infoDialog, setInfoDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);

    useEffect(() => {
        infoDialog
            ? infoRef.current?.showModal()
            : infoRef.current?.close();
    }, [infoDialog]);

    useEffect(() => {
        editDialog 
            ? editRef.current?.showModal()
            : editRef.current?.close();
    }, [editDialog]);

    const handleNotesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(event.currentTarget.value);
    }

    const handleSave = (event: MouseEvent<HTMLButtonElement>) => {
        onUpdate({
            ...value,
            notes: notes
        });
        setEditDialog(false);
    }

    const handleAdd = (value: ResistorValue) => {
        onAdd(value);
        setEditDialog(false);
    }
    
    return (
        <>
            <header className="resistor-value-item__header">
                <Toggle checked={value.active} onToggle={() => onSelect(value)} />
                <span className="resistor-value-item__label">{value.text}</span>
                <span className="resistor-value-item__controlls">
                    <Info data-info kind={value.notes ? 'normal' : 'disabled'}  onClick={value.notes ? () => setInfoDialog(true) : () => {}}/>
                    <Burger data-menu kind="normal"  onClick={() => setEditDialog(true)} />
                </span>
            </header>
            <dialog ref={infoRef} onCancel={() => setInfoDialog(false)}>
                <h3>{value.text}</h3>
                <Markdown>{value.notes}</Markdown>
                <Button onClick={() => setInfoDialog(false)}>close</Button>
            </dialog>
            <dialog className="resistor-value-item__panel" ref={editRef} onCancel={() => setEditDialog(false)}>
                <header>
                    <h3>{value.text}</h3>
                </header>
                <section>
                    <span>Add to wantlist</span>
                    <Button onClick={() => handleAdd(value)}><Cart /></Button>
                </section>
                <section>
                    <FormStack variants={['stretch']}>
                        <Textarea autoFocus value={notes || ''} onChange={handleNotesChange} />
                        <FormRow>
                            <Button onClick={handleSave}>save</Button>
                            <Button onClick={() => setEditDialog(false)}>cancel</Button>
                        </FormRow>
                    </FormStack>
                </section>
            </dialog>
        </>
    )
}
